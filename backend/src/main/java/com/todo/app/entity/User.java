package com.todo.app.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    public void updatePassword(String encodedPassowrd) {
        this.password = encodedPassowrd;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;  // 암호화된 비밀번호가 저장될 필드

    @Column(nullable = false)
    @Builder.Default
    private String role = "USER";  // ← 이것만 추가!

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
