import axios from 'axios'

const api = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 응답 인터셉터: 에러 메시지 정제
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      '인증 요청 중 오류가 발생했습니다.'
    return Promise.reject(new Error(message))
  }
)
// 회원가입
export const register = (username, password) =>
  api.post('/register', { username, password }).then((res) => res.data)

// 로그인
export const login = (username, password) =>
  api.post('/login', { username, password }).then((res) => res.data)

// 로그아웃
export const logout = () =>
  api.post('/logout').then((res) => res.data)

