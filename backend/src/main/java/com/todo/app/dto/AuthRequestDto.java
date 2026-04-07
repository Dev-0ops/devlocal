package com.todo.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AuthRequestDto {

    @Getter
    @NoArgsConstructor
    public static class Register {

        @NotBlank(message = "아이디를 입력해주세요.")
        @Size(min = 3, max = 50, message = "아이디는 3자 이상 50자 이하로 입력해주세요.")
        private String username;

        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Size(min = 6, message = "비밀번호는 6자 이상이어야 합니다.")
        private String password;
    }

    @Getter
    @NoArgsConstructor
    public static class Login {

        @NotBlank(message = "아이디를 입력해주세요.")
        private String username;

        @NotBlank(message = "비밀번호를 입력해주세요.")
        private String password;
    }
}