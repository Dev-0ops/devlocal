package com.todo.app.dto;

import com.todo.app.entity.Todo;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * TodoResponseDto — 서버 → 클라이언트 방향 응답 DTO
 *
 * Entity를 그대로 반환하면 불필요한 필드가 노출되거나
 * 순환 참조 문제가 생길 수 있어 별도 DTO로 변환합니다.
 */
@Getter
@Builder
public class TodoResponseDto {

    private Long id;
    private String title;
    private boolean completed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * Todo 엔티티 → TodoResponseDto 변환 (정적 팩토리 메서드)
     */
    public static TodoResponseDto from(Todo todo) {
        return TodoResponseDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}