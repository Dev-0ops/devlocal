package com.todo.app.repository;

import com.todo.app.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * TodoRepository — Spring Data JPA가 구현체를 자동 생성합니다.
 * JpaRepository<엔티티 타입, PK 타입>을 상속하면
 * CRUD 메서드가 기본 제공됩니다.
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    /**
     * 생성 시간 기준 내림차순으로 전체 목록 조회
     * (최신 항목이 상단에 표시)
     */
    List<Todo> findAllByOrderByCreatedAtDesc();

    /**
     * 완료 여부로 필터링 조회
     * 예) findAllByCompleted(false) → 미완료 항목만
     */
    List<Todo> findAllByCompleted(boolean completed);
}