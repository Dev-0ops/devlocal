package com.todo.app.exception;

/**
 * TodoNotFoundException — 존재하지 않는 Todo ID 조회 시 발생
 * GlobalExceptionHandler에서 404 응답으로 변환합니다.
 */
public class TodoNotFoundException extends RuntimeException {

    public TodoNotFoundException(Long id) {
        super("ID " + id + "에 해당하는 할 일을 찾을 수 없습니다.");
    }
}