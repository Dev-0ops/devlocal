/**
 * FilterTabs — 전체 / 진행 중 / 완료 필터 탭 컴포넌트
 */
const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행 중' },
  { key: 'done', label: '완료' },
]

export default function FilterTabs({ current, onChange }) {
  return (
    <div className="flex gap-2 mb-5">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`
            text-[13px] font-medium px-4 py-1.5 rounded-full border
            transition-all duration-200
            ${current === key
              ? 'bg-accent border-accent text-white shadow-[0_0_16px_rgba(108,99,255,0.3)]'
              : 'bg-transparent border-border text-ink-muted hover:text-ink hover:border-ink-muted'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
