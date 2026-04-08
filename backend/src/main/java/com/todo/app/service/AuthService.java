package com.todo.app.service;

import com.todo.app.config.security.JwtUtil;
import com.todo.app.dto.AuthRequestDto;
import com.todo.app.dto.AuthResponseDto;
import com.todo.app.entity.User;
import com.todo.app.redis.RedisSessionService;
import com.todo.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RedisSessionService redisSessionService;

    // 회원가입
    @Transactional
    public AuthResponseDto register(AuthRequestDto.Register request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        User saved = userRepository.save(user);

        // Redis 세션 저장
        redisSessionService.saveUserSession(saved.getUsername(), saved.getRole());

        String token = jwtUtil.generateToken(saved.getUsername(), saved.getRole());
        return new AuthResponseDto(token, saved.getUsername(), saved.getRole());
    }

    // 로그인
    @Transactional(readOnly = true)
    public AuthResponseDto login(AuthRequestDto.Login request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        // Redis 세션 저장
        redisSessionService.saveUserSession(user.getUsername(), user.getRole());

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return new AuthResponseDto(token, user.getUsername(), user.getRole());
    }
}
