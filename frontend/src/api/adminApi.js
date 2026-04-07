import axios from 'axios'

const api = axios.create({
  baseURL: '/api/admin',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,  // httpOnly 쿠키 자동 전송
})

// 전체 유저 목록 조회
export const fetchUsers = () =>
  api.get('/users').then((res) => res.data)

// 비밀번호 변경
export const changePassword = (userId, newPassword) =>
  api.patch(`/users/${userId}/password`, { newPassword }).then((res) => res.data)

// 유저 삭제
export const deleteUser = (userId) =>
  api.delete(`/users/${userId}`).then((res) => res.data)