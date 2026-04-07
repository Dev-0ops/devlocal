package com.todo.app.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisSessionService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${app.redis.ttl.session-seconds:86400}")
    private long sessionTtlSeconds;

    public void saveUserSession(String username, String role) {
        String key = RedisKeys.SESSION_PREFIX + username;
        redisTemplate.opsForValue().set(key, role, sessionTtlSeconds, TimeUnit.SECONDS);
    }

    public String getUserRole(String username) {
        Object value = redisTemplate.opsForValue().get(RedisKeys.SESSION_PREFIX + username);
        return value == null ? null : value.toString();
    }

    public void deleteUserSession(String username) {
        redisTemplate.delete(RedisKeys.SESSION_PREFIX + username);
    }
}
