package com.todo.app.controller;

import com.todo.app.dto.AuthRequestDto;
import com.todo.app.dto.AuthResponseDto;
import com.todo.app.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/auth/register
     * 회원가입
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @Valid @RequestBody AuthRequestDto.Register request,
            HttpServletResponse response) {
        AuthResponseDto result = authService.register(request);
        addTokenCookie(response, result.getToken());
        return ResponseEntity.ok(new AuthResponseDto(null, result.getUsername(), result.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @Valid @RequestBody AuthRequestDto.Login request,
            HttpServletResponse response) {
        AuthResponseDto result = authService.login(request);
        addTokenCookie(response, result.getToken());
        return ResponseEntity.ok(new AuthResponseDto(null, result.getUsername(), result.getRole()));
    }

    private void addTokenCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(false)        // 로컬 개발용. HTTPS 환경에서는 true
                .path("/")
                .maxAge(86400)        // 24시간
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
