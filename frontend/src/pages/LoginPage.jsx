import { useState } from 'react'

export default function LoginPage({ onLogin, onGoRegister, error, loading }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onLogin(username, password)
  }

  return (
    <div className="min-h-screen bg-surface flex justify-center items-center px-4">
      <div className="w-full max-w-[400px]">

        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="font-display font-extrabold text-3xl text-ink mb-2">
            로그인
          </h1>
          <p className="text-ink-muted text-sm">계속하려면 로그인해주세요</p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-rose-soft/10 border border-rose-soft/30 rounded-xl px-4 py-3 mb-4 text-sm text-rose-soft">
            {error}
          </div>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="bg-surface-1 border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-40"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="bg-surface-1 border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={loading || !username.trim() || !password.trim()}
            className="bg-accent hover:bg-accent-hover disabled:opacity-40 text-white font-display font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(108,99,255,0.4)] disabled:cursor-not-allowed"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 회원가입 이동 */}
        <p className="text-center text-sm text-ink-muted mt-6">
          계정이 없으신가요?{' '}
          <button
            onClick={onGoRegister}
            className="text-accent hover:text-accent-hover font-medium transition-colors duration-200"
          >
            회원가입
          </button>
        </p>

      </div>
    </div>
  )
}