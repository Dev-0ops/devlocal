package com.todo.app.config;

import com.todo.app.entity.Todo;
import com.todo.app.entity.User;                          
import com.todo.app.repository.TodoRepository;
import com.todo.app.repository.UserRepository;           
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value; 
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder; 

/**
 * DataInitializer — 앱 시작 시 샘플 데이터를 삽입합니다.
 *
 * @Profile("!prod"): 프로덕션 환경에서는 실행되지 않습니다.
 * 프로덕션 배포 시 application-prod.yml에 spring.profiles.active=prod 설정.
 */
@Slf4j
@Configuration
@Profile("!prod")
@RequiredArgsConstructor
public class DataInitializer {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Todo 샘플 데이터
            if (todoRepository.count() == 0) {
                todoRepository.save(Todo.builder().title("Spring Boot API 개발하기").completed(true).build());
                todoRepository.save(Todo.builder().title("React 프론트엔드 연동하기").completed(true).build());
                todoRepository.save(Todo.builder().title("JPA 엔티티 설계하기").completed(false).build());
                todoRepository.save(Todo.builder().title("REST API 테스트 작성하기").completed(false).build());
                todoRepository.save(Todo.builder().title("배포 환경 구성하기").completed(false).build());
            }

            // 관리자 계정 자동 생성
            if (!userRepository.existsByUsername(adminUsername)) {
                userRepository.save(User.builder()
                        .username(adminUsername)
                        .password(passwordEncoder.encode(adminPassword))
                        .role("ADMIN")
                        .build());
                log.info("관리자 계정 생성 완료: {}", adminUsername);
            }
        };
    }
}