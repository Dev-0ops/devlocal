package com.todo.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AdminRequestDto {

    @Getter
    @NoArgsConstructor
    public static class ChangePassword {
        @NotBlank(message = "새 비밀번호는 필수입니다.")
        @Size(min = 6, message = "새 비밀번호는 최소 6자 이상이어야 합니다.")
        private String newPassword;
     }       
}
