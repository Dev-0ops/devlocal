import React from 'react';
import './index.css';

import { useState } from 'react'
import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import StatsBar from './components/StatsBar'
import FilterTabs from './components/FilterTabs'
import ErrorBanner from './components/ErrorBanner'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'


// 배경 장식 블롭
const Blob = ({ className }) => (
  <div className={`fixed rounded-full pointer-events-none z-0 blur-[120px] ${className}`} />
)

export default function App() {

  const { isLoggedIn, isAdmin, username, error, loading, login, register, logout } = useAuth()

  const [page, setPage] = useState('login') // 'login' | 'register'

  const {
    todos,
    loading: todosLoading,
    error: todosError,
    submitting,
    stats,
    addTodo,
    toggleTodo,
    removeTodo,
    reload
  } = useTodos(isLoggedIn)
  const [filter, setFilter] = useState('all')
  // 필터링된 목록
  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'done') return t.completed
    return true
  })


  // 오늘 날짜 포매팅
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })



  // 로그인 안 됐으면 인증 페이지 표시
  if (!isLoggedIn) {
    if (page === 'register') {
      return (
        <RegisterPage
          onRegister={async (u, p) => {
            const ok = await register(u, p)
            if (ok) setPage('login')
          }}
          onGoLogin={() => setPage('login')}
          error={error}
          loading={loading}
        />
      )
    }
    return (
      <LoginPage
        onLogin={login}
        onGoRegister={() => setPage('register')}
        error={error}
        loading={loading}
      />
    )
  }
  // 관리자면 관리자 페이지로
  if (isAdmin) {
    return <AdminPage onLogout={logout} />
  }

  return (
    <div className="relative min-h-screen bg-surface flex justify-center items-start px-4 py-16 overflow-x-hidden">
      {/* 배경 장식 */}
      <Blob className="w-[500px] h-[500px] bg-accent/10 -top-32 -left-40" />
      <Blob className="w-[400px] h-[400px] bg-rose-soft/8 bottom-0 -right-24" />

      <main className="relative z-10 w-full max-w-[560px]">
        {/* ── 헤더 ──────────────────────────────────────────────────── */}
        <header className="mb-10">
          <div className="flex items-baseline justify-between mb-1">
            <div className="flex items-baseline gap-3">
              <h1 className="font-display font-extrabold text-4xl tracking-tight bg-gradient-to-br from-ink via-ink to-accent bg-clip-text text-transparent leading-none">
                오늘의 할 일
              </h1>
              <span className="w-2 h-2 rounded-full bg-rose-soft animate-pulse mb-1 flex-shrink-0" />
            </div>
            {/* 로그아웃 버튼 */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink-muted">{username}</span>
              <button
                onClick={logout}
                className="text-xs font-medium text-ink-muted border border-border rounded-full px-4 py-1.5 hover:text-rose-soft hover:border-rose-soft/50 hover:bg-rose-soft/5 transition-all duration-200"
              >
                로그아웃
              </button>
            </div>
          </div>
          <p className="text-ink-muted text-sm font-light">{today}</p>
        </header>

        {/* ── 통계바 ─────────────────────────────────────────────────── */}
        <StatsBar stats={stats} />

        {/* ── 입력 폼 ────────────────────────────────────────────────── */}
        <TodoInput onAdd={addTodo} disabled={submitting} />

        {/* ── 에러 배너 ──────────────────────────────────────────────── */}
        {todosError && <ErrorBanner message={todosError} onRetry={reload} />}

        {/* ── 필터 탭 ────────────────────────────────────────────────── */}
        <FilterTabs current={filter} onChange={setFilter} />

        {/* ── 로딩 ───────────────────────────────────────────────────── */}
        {todosLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* ── 목록 ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-2.5">
              {filtered.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={removeTodo}
                />
              ))}
            </div>

            {/* ── 빈 상태 ──────────────────────────────────────────── */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <span className="text-5xl mb-4 opacity-30">✦</span>
                <p className="font-display font-bold text-lg text-ink-dim mb-1.5">
                  {filter === 'done' ? '완료된 항목이 없어요' : '할 일이 없어요'}
                </p>
                <p className="text-sm text-ink-muted font-light">
                  {filter === 'all' ? '위에서 새로운 할 일을 추가해보세요' : ''}
                </p>
              </div>
            )}

            {/* ── 완료 항목 정리 ────────────────────────────────────── */}
            {stats.done > 0 && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    // 완료된 항목 전체 삭제
                    todos
                      .filter((t) => t.completed)
                      .forEach((t) => removeTodo(t.id))
                  }}
                  className="
                    text-xs font-medium text-ink-muted
                    border border-border rounded-full px-4 py-1.5
                    hover:text-rose-soft hover:border-rose-soft/50
                    hover:bg-rose-soft/5 transition-all duration-200
                  "
                >
                  완료된 항목 삭제 ({stats.done})
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
