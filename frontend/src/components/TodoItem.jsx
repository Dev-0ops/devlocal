import { useState } from 'react'

const CheckIcon = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2 3.5h11M5.5 3.5V2.5a1 1 0 011-1h2a1 1 0 011 1v1M6.5 6.5v4M8.5 6.5v4M3 3.5l.7 8a1 1 0 001 .9h5.6a1 1 0 001-.9l.7-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * TodoItem — 개별 할 일 아이템 컴포넌트
 */
export default function TodoItem({ todo, onToggle, onDelete }) {
  const [removing, setRemoving] = useState(false)

  const handleDelete = () => {
    setRemoving(true)
    // 애니메이션 후 실제 삭제
    setTimeout(() => onDelete(todo.id), 200)
  }

  return (
    <div
      className={`
        group flex items-center gap-3.5
        bg-surface-1 border border-border rounded-xl px-4 py-3.5
        transition-all duration-200
        hover:border-[#3a3a50] hover:bg-surface-2 hover:translate-x-0.5
        relative overflow-hidden
        ${removing ? 'animate-fadeOut' : 'animate-slideIn'}
      `}
    >
      {/* 왼쪽 강조 바 */}
      <span
        className={`
          absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full
          transition-opacity duration-200
          ${todo.completed ? 'bg-border opacity-100' : 'bg-accent opacity-0 group-hover:opacity-100'}
        `}
      />

      {/* 체크박스 */}
      <button
        onClick={() => onToggle(todo.id, todo.completed)}
        className="flex-shrink-0 relative"
        aria-label={todo.completed ? '완료 취소' : '완료 처리'}
      >
        <span
          className={`
            flex items-center justify-center w-[22px] h-[22px]
            border-2 rounded-[7px] transition-all duration-200
            ${todo.completed
              ? 'bg-accent border-accent shadow-[0_0_12px_rgba(108,99,255,0.5)]'
              : 'border-border hover:border-accent/60'
            }
          `}
        >
          <span
            className={`
              transition-all duration-200
              ${todo.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `}
          >
            <CheckIcon />
          </span>
        </span>
      </button>

      {/* 할 일 텍스트 */}
      <span
        className={`
          flex-1 text-sm leading-relaxed select-none
          task-strikethrough
          ${todo.completed ? 'text-ink-muted done' : 'text-ink'}
        `}
      >
        {todo.title}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        className="
          flex-shrink-0 text-ink-muted
          opacity-0 group-hover:opacity-100
          hover:text-rose-soft hover:bg-rose-soft/10
          p-1.5 rounded-lg transition-all duration-200
          hover:rotate-12
        "
        aria-label="삭제"
      >
        <TrashIcon />
      </button>
    </div>
  )
}
