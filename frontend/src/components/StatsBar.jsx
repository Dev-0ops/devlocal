/**
 * StatsBar — 할 일 통계 및 진행률 표시 컴포넌트
 */
export default function StatsBar({ stats }) {
  const { total, done, active } = stats
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="flex items-center gap-4 bg-surface-1 border border-border rounded-xl px-5 py-3.5 mb-7">
      <StatChip label="전체" value={total} />
      <Divider />
      <StatChip label="완료" value={done} accent />
      <Divider />
      <StatChip label="남은 것" value={active} />
      <Divider />

      {/* Progress */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <span className="text-[11px] uppercase tracking-widest text-ink-muted">
          진행률 {pct}%
        </span>
        <div className="h-[4px] bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-rose-soft rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function StatChip({ label, value, accent }) {
  return (
    <div className="flex flex-col gap-0.5 flex-shrink-0">
      <span className={`font-display font-bold text-lg leading-none ${accent ? 'text-accent' : 'text-ink'}`}>
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-widest text-ink-muted">{label}</span>
    </div>
  )
}

function Divider() {
  return <span className="self-stretch w-px bg-border" />
}
