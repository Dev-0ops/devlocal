package com.todo.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 요청 DTO 모음 — 클라이언트 → 서버 방향 데이터 전송 객체
 *
 * Entity를 직접 컨트롤러에 노출하지 않고 DTO로 분리하면
 * 입력 검증, API 스펙 변경에 유연하게 대응할 수 있습니다.
 */
public class TodoRequestDto {

    /**
     * POST /api/todos — 할 일 생성 요청
     */
    @Getter
    @NoArgsConstructor
    public static class Create {

        @NotBlank(message = "할 일 내용은 비워둘 수 없습니다.")
        @Size(max = 100, message = "할 일은 100자 이내로 입력해주세요.")
        private String title;

        private boolean completed = false;
    }

    /**
     * PATCH /api/todos/{id} — 완료 상태 수정 요청
     */
    @Getter
    @NoArgsConstructor
    public static class UpdateCompleted {

        private boolean completed;
    }
}