package com.todo.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CorsConfig — React 개발 서버(localhost:5173)의 API 요청을 허용합니다.
 *
 * 개발 환경에서는 Vite 프록시가 CORS를 우회하지만,
 * 프로덕션 빌드 후 직접 호출 시에는 이 설정이 적용됩니다.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:5173",   // Vite 개발 서버
                    "http://localhost:3000"    // CRA 개발 서버 (필요 시)
                )
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}