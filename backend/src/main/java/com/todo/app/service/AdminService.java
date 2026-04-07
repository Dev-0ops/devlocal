package com.todo.app.service;

import com.todo.app.dto.AdminRequestDto;
import com.todo.app.dto.UserResponseDto;
import com.todo.app.entity.User;
import com.todo.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // 모든 사용자 조회
    public List<UserResponseDto> findAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponseDto::from)
                .collect(Collectors.toList());
    }

    // 사용자 권한 변경
    @Transactional
    public void changePassword(Long userId, AdminRequestDto.ChangePassword request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        user.updatePassword(passwordEncoder.encode(request.getNewPassword()));
    }
        @Transactional
        public void deleteUser(Long userId) {
            if (!userRepository.existsById(userId)) {
                throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
            }
            userRepository.deleteById(userId);
        }
    
}
