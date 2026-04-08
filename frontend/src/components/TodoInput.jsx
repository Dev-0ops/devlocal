import { useState, useRef } from 'react'

/**
 * TodoInput — 새 할 일 입력 폼 컴포넌트
 */
export default function TodoInput({ onAdd, disabled }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    const ok = await onAdd(value)
    if (ok) {
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-7">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
        maxLength={100}
        disabled={disabled}
        className="
          flex-1 bg-surface-1 border border-border rounded-xl
          px-4 py-3 text-sm text-ink placeholder-ink-muted
          outline-none transition-all duration-200
          focus:border-accent focus:ring-2 focus:ring-accent/20
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="
          bg-accent hover:bg-accent-hover disabled:opacity-40
          text-white font-display font-bold text-xl
          px-5 py-3 rounded-xl transition-all duration-200
          hover:shadow-[0_4px_20px_rgba(108,99,255,0.4)]
          hover:-translate-y-px active:translate-y-0
          disabled:cursor-not-allowed disabled:hover:translate-y-0
          disabled:hover:shadow-none
        "
      >
        {disabled ? (
          <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          '+'
        )}
      </button>
    </form>
  )
}
