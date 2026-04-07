import { useState, useEffect, useCallback } from 'react'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi'

/**
 * useTodos — 할 일 목록의 모든 상태와 API 연동 로직을 담당하는 커스텀 훅
 */
export function useTodos(isLoggedIn) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // ── 목록 조회 ──────────────────────────────────────────────────────────────
  const loadTodos = useCallback(async () => {
    if (!isLoggedIn) return

    setLoading(true)
    setError(null)
    try {
      const data = await fetchTodos()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [isLoggedIn])

  // 로그인 상태가 true로 바뀌면 즉시 목록 로딩
  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  // 로그아웃 시 이전 목록/에러 정리
  useEffect(() => {
    if (!isLoggedIn) {
      setTodos([])
      setError(null)
      setLoading(false)
      setSubmitting(false)
    }
  }, [isLoggedIn])

  // ── 할 일 추가 ─────────────────────────────────────────────────────────────
  const addTodo = useCallback(async (title) => {
    const trimmed = title.trim()
    if (!trimmed) return false

    setSubmitting(true)
    setError(null)
    try {
      const newTodo = await createTodo(trimmed)
      setTodos((prev) => [newTodo, ...prev])
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [])

  // ── 완료 토글 ──────────────────────────────────────────────────────────────
  const toggleTodo = useCallback(async (id, currentCompleted) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !currentCompleted } : t))
    )
    try {
      await updateTodo(id, !currentCompleted)
    } catch (err) {
      // 실패 시 롤백
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: currentCompleted } : t))
      )
      setError(err.message)
    }
  }, [])

  // ── 할 일 삭제 ─────────────────────────────────────────────────────────────
  const removeTodo = useCallback(async (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    try {
      await deleteTodo(id)
    } catch (err) {
      setError(err.message)
      await loadTodos()
    }
  }, [loadTodos])

  // ── 파생 상태 ──────────────────────────────────────────────────────────────
  const stats = {
    total: todos.length,
    done: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  }

  return {
    todos,
    loading,
    error,
    submitting,
    stats,
    addTodo,
    toggleTodo,
    removeTodo,
    reload: loadTodos,
  }
}
