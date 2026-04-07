import { useState, useCallback } from 'react'
import { login as loginApi, register as registerApi, logout as logoutApi } from '../api/authApi'

export function useAuth() {
  const [username, setUsername] = useState(sessionStorage.getItem('username'))
  const [role, setRole] = useState(sessionStorage.getItem('role'))
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // 로그인
  const login = useCallback(async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await loginApi(username, password)
      sessionStorage.setItem('username', data.username)
      sessionStorage.setItem('role', data.role)
      setUsername(data.username)
      setRole(data.role)
      return true
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // 회원가입
  const register = useCallback(async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await registerApi(username, password)
      sessionStorage.setItem('username', data.username)
      setUsername(data.username)
      return true
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // 로그아웃
  const logout = useCallback(async () => {
    try {
      await logoutApi()
    } finally {
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('role')
      setUsername(null)
      setRole(null)
    }
  }, [])

  return {
    username,
    role,
    error,
    loading,
    login,
    register,
    logout,
    isLoggedIn: !!username,
    isAdmin: role === 'ADMIN',
  }
}


