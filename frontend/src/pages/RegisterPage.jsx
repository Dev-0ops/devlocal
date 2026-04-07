import { useState } from 'react'

export default function RegisterPage({ onRegister, onGoLogin, error, loading }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    // 비밀번호 확인 검증 (프론트에서 먼저 체크)
    if (password !== passwordConfirm) {
      setLocalError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (password.length < 6) {
      setLocalError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    await onRegister(username, password)
  }

  // 서버 에러 또는 로컬 에러 둘 다 표시
  const displayError = localError || error

  return (
    <div className="min-h-screen bg-surface flex justify-center items-center px-4">
      <div className="w-full max-w-[400px]">

        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="font-display font-extrabold text-3xl text-ink mb-2">
            회원가입
          </h1>
          <p className="text-ink-muted text-sm">새 계정을 만들어주세요</p>
        </div>

        {/* 에러 메시지 */}
        {displayError && (
          <div className="bg-rose-soft/10 border border-rose-soft/30 rounded-xl px-4 py-3 mb-4 text-sm text-rose-soft">
            {displayError}
          </div>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="아이디 (3자 이상)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="bg-surface-1 border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-40"
          />
          <input
            type="password"
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="bg-surface-1 border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-40"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={loading}
            className="bg-surface-1 border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={loading || !username.trim() || !password.trim() || !passwordConfirm.trim()}
            className="bg-accent hover:bg-accent-hover disabled:opacity-40 text-white font-display font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(108,99,255,0.4)] disabled:cursor-not-allowed"
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        {/* 로그인 이동 */}
        <p className="text-center text-sm text-ink-muted mt-6">
          이미 계정이 있으신가요?{' '}
          <button
            onClick={onGoLogin}
            className="text-accent hover:text-accent-hover font-medium transition-colors duration-200"
          >
            로그인
          </button>
        </p>

      </div>
    </div>
  )
}