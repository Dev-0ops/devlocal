package com.todo.app.controller;

import com.todo.app.dto.AdminRequestDto;
import com.todo.app.dto.UserResponseDto;
import com.todo.app.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // GET /api/admin/users - 모든 사용자 조회
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.findAllUsers());
    }
    
    // PATCH /api/admin/users/{id}/password - 비밀번호 변경
    @PatchMapping("/users/{id}/password")
    public ResponseEntity<Void> changePassword(
            @PathVariable Long id,
            @Valid @RequestBody AdminRequestDto.ChangePassword request) {
        adminService.changePassword(id, request);
        return ResponseEntity.ok().build();
    }

    // DELETE /api/admin/users/{id} - 사용자 삭제
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
