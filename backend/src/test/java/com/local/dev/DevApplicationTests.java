package com.local.dev;

import org.junit.jupiter.api.Test;
import com.todo.app.TodoAppApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = TodoAppApplication.class)  // ← 명시적으로 지정
@ActiveProfiles("test")
class DevApplicationTests {

    @Test
    void contextLoads() {
    }

}