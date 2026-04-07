package com.todo.app.controller;

import com.todo.app.dto.TodoRequestDto;
import com.todo.app.dto.TodoResponseDto;
import com.todo.app.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TodoController — /api/todos 엔드포인트를 처리하는 REST 컨트롤러
 *
 * HTTP 요청 수신 → 서비스 위임 → 응답 반환만 담당합니다.
 * 비즈니스 로직은 TodoService에 있습니다.
 */
@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    /**
     * GET /api/todos
     * 전체 할 일 목록 조회 (생성일 내림차순)
     *
     * Response: 200 OK + List<TodoResponseDto>
     */
    @GetMapping
    public ResponseEntity<List<TodoResponseDto>> getAll() {
        return ResponseEntity.ok(todoService.findAll());
    }

    /**
     * GET /api/todos/{id}
     * 특정 할 일 단건 조회
     *
     * Response: 200 OK + TodoResponseDto
     *           404 Not Found (존재하지 않는 ID)
     */
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponseDto> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.findById(id));
    }

    /**
     * POST /api/todos
     * 새로운 할 일 생성
     *
     * Request Body: { "title": "할 일 내용", "completed": false }
     * Response: 201 Created + TodoResponseDto
     *           400 Bad Request (입력값 검증 실패)
     */
    @PostMapping
    public ResponseEntity<TodoResponseDto> create(
            @Valid @RequestBody TodoRequestDto.Create request) {
        TodoResponseDto created = todoService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * PATCH /api/todos/{id}
     * 할 일 완료 상태 수정
     *
     * Request Body: { "completed": true }
     * Response: 200 OK + TodoResponseDto
     *           404 Not Found
     */
    @PatchMapping("/{id}")
    public ResponseEntity<TodoResponseDto> updateCompleted(
            @PathVariable Long id,
            @RequestBody TodoRequestDto.UpdateCompleted request) {
        return ResponseEntity.ok(todoService.updateCompleted(id, request));
    }

    /**
     * DELETE /api/todos/{id}
     * 할 일 삭제
     *
     * Response: 204 No Content
     *           404 Not Found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        todoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}