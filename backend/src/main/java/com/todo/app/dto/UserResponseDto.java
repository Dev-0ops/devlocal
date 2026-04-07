package com.todo.app.dto;

import com.todo.app.entity.User;
import lombok.Getter;
import lombok.Builder;

import java.time.LocalDateTime;


@Getter
@Builder
public class UserResponseDto {
    
    private Long id;
    private String username;
    private String role;  // ← role 추가
    private LocalDateTime createdAt;

    public static UserResponseDto from(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole())  
                .createdAt(user.getCreatedAt())
                .build();
    }
}
