import { useState, useEffect } from 'react'
import { fetchUsers, changePassword, deleteUser } from '../api/adminApi'

export default function AdminPage({ onLogout }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [changingPasswordId, setChangingPasswordId] = useState(null) // 비밀번호 변경 중인 유저 id
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState(null) // 성공 메시지

  // 유저 목록 불러오기
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError('유저 목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 비밀번호 변경
  const handleChangePassword = async (userId) => {
    if (!newPassword.trim() || newPassword.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    try {
      await changePassword(userId, newPassword)
      setMessage('비밀번호가 변경되었습니다.')
      setChangingPasswordId(null)
      setNewPassword('')
    } catch (err) {
      setError('비밀번호 변경에 실패했습니다.')
    }
  }

  // 유저 삭제
  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`${username} 계정을 삭제할까요?`)) return
    try {
      await deleteUser(userId)
      setMessage(`${username} 계정이 삭제되었습니다.`)
      setUsers((prev) => prev.filter((u) => u.id !== userId))
    } catch (err) {
      setError('유저 삭제에 실패했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-16">
      <div className="w-full max-w-[700px] mx-auto">

        {/* 헤더 */}
        <header className="flex items-center justify-between mb-10">
          <h1 className="font-display font-extrabold text-3xl text-ink">
            관리자 페이지
          </h1>
          <button
            onClick={onLogout}
            className="text-xs font-medium text-ink-muted border border-border rounded-full px-4 py-1.5 hover:text-rose-soft hover:border-rose-soft/50 hover:bg-rose-soft/5 transition-all duration-200"
          >
            로그아웃
          </button>
        </header>

        {/* 성공 메시지 */}
        {message && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 mb-5 text-sm text-accent">
            {message}
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-rose-soft/10 border border-rose-soft/30 rounded-xl px-4 py-3 mb-5 text-sm text-rose-soft">
            {error}
          </div>
        )}

        {/* 유저 목록 */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-surface-1 border border-border rounded-xl px-5 py-4"
              >
                {/* 유저 정보 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-ink">
                      {user.username}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                      user.role === 'ADMIN'
                        ? 'text-accent border-accent/40 bg-accent/10'
                        : 'text-ink-muted border-border'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <span className="text-xs text-ink-dim">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>

                {/* 비밀번호 변경 폼 */}
                {changingPasswordId === user.id ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="password"
                      placeholder="새 비밀번호 (6자 이상)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder-ink-muted outline-none focus:border-accent transition-all duration-200"
                    />
                    <button
                      onClick={() => handleChangePassword(user.id)}
                      className="text-xs font-medium bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      변경
                    </button>
                    <button
                      onClick={() => { setChangingPasswordId(null); setNewPassword('') }}
                      className="text-xs font-medium text-ink-muted border border-border px-4 py-2 rounded-lg hover:border-ink-muted transition-all duration-200"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => { setChangingPasswordId(user.id); setError(null); setMessage(null) }}
                      className="text-xs font-medium text-ink-muted border border-border rounded-lg px-3 py-1.5 hover:text-accent hover:border-accent/50 transition-all duration-200"
                    >
                      비밀번호 변경
                    </button>
                    {user.role !== 'ADMIN' && (
                      <button
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="text-xs font-medium text-ink-muted border border-border rounded-lg px-3 py-1.5 hover:text-rose-soft hover:border-rose-soft/50 transition-all duration-200"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}