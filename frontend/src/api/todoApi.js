import axios from 'axios'

/**
 * Axios 인스턴스 - Spring Boot 백엔드와 통신
 * Vite proxy 설정(/api → http://localhost:8080)을 통해 CORS 없이 통신합니다.
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
   withCredentials: true,  
})

// 응답 인터셉터: 에러 메시지를 일관되게 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      '서버와 통신 중 오류가 발생했습니다.'
    return Promise.reject(new Error(message))
  }
)

// ─── Todo API ────────────────────────────────────────────────────────────────

/**
 * GET /api/todos
 * 모든 할 일 목록 조회
 * @returns {Promise<Todo[]>}
 */
export const fetchTodos = () =>
  api.get('/todos').then((res) => res.data)

/**
 * POST /api/todos
 * 새로운 할 일 추가
 * @param {string} title
 * @returns {Promise<Todo>}
 */
export const createTodo = (title) =>
  api.post('/todos', { title, completed: false }).then((res) => res.data)

/**
 * PATCH /api/todos/:id
 * 할 일 완료 상태 토글
 * @param {number} id
 * @param {boolean} completed
 * @returns {Promise<Todo>}
 */
export const updateTodo = (id, completed) =>
  api.patch(`/todos/${id}`, { completed }).then((res) => res.data)

/**
 * DELETE /api/todos/:id
 * 할 일 삭제
 * @param {number} id
 * @returns {Promise<void>}
 */
export const deleteTodo = (id) =>
  api.delete(`/todos/${id}`).then((res) => res.data)

/**
 * @typedef {Object} Todo
 * @property {number}  id        - 고유 식별자
 * @property {string}  title     - 할 일 제목
 * @property {boolean} completed - 완료 여부
 */