
/**
 * ErrorBanner — 에러 메시지 표시 및 재시도 컴포넌트
 */
export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-rose-soft/10 border border-rose-soft/30 rounded-xl px-4 py-3 mb-5 text-sm">
      <div className="flex items-center gap-2 text-rose-soft min-w-0">
        <span className="flex-shrink-0">⚠</span>
        <span className="truncate">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex-shrink-0 text-xs font-medium text-rose-soft/80 hover:text-rose-soft border border-rose-soft/30 hover:border-rose-soft/60 px-3 py-1 rounded-lg transition-all duration-200"
        >
          재시도
        </button>
      )}
    </div>
  )
}
