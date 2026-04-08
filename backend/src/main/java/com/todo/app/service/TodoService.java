package com.todo.app.service;

import com.todo.app.dto.TodoRequestDto;
import com.todo.app.dto.TodoResponseDto;
import com.todo.app.entity.Todo;
import com.todo.app.exception.TodoNotFoundException;
import com.todo.app.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * TodoService — 비즈니스 로직 계층
 *
 * 컨트롤러는 HTTP 요청/응답만 처리하고,
 * 실제 비즈니스 규칙은 이 서비스 계층에 집중시킵니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)  // 기본: 읽기 전용 (쓰기 메서드에 @Transactional 별도 지정)
public class TodoService {

    private final TodoRepository todoRepository;

    // ── 전체 목록 조회 ─────────────────────────────────────────────────
    public List<TodoResponseDto> findAll() {
        log.debug("전체 할 일 목록 조회");
        return todoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(TodoResponseDto::from)
                .collect(Collectors.toList());
    }

    // ── 단건 조회 ──────────────────────────────────────────────────────
    public TodoResponseDto findById(Long id) {
        Todo todo = getOrThrow(id);
        return TodoResponseDto.from(todo);
    }

    // ── 할 일 생성 ─────────────────────────────────────────────────────
    @Transactional
    public TodoResponseDto create(TodoRequestDto.Create request) {
        log.debug("할 일 생성: {}", request.getTitle());
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .completed(request.isCompleted())
                .build();
        Todo saved = todoRepository.save(todo);
        return TodoResponseDto.from(saved);
    }

    // ── 완료 상태 수정 (PATCH) ──────────────────────────────────────────
    @Transactional
    public TodoResponseDto updateCompleted(Long id, TodoRequestDto.UpdateCompleted request) {
        log.debug("할 일 완료 상태 수정: id={}, completed={}", id, request.isCompleted());
        Todo todo = getOrThrow(id);
        todo.setCompleted(request.isCompleted());
        // @Transactional 범위 안이므로 save() 없이 dirty checking으로 자동 반영됩니다.
        return TodoResponseDto.from(todo);
    }

    // ── 할 일 삭제 ─────────────────────────────────────────────────────
    @Transactional
    public void delete(Long id) {
        log.debug("할 일 삭제: id={}", id);
        if (!todoRepository.existsById(id)) {
            throw new TodoNotFoundException(id);
        }
        todoRepository.deleteById(id);
    }

    // ── 내부 헬퍼 ──────────────────────────────────────────────────────
    private Todo getOrThrow(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }
}