import { GlassCard } from "./Glass";
import { IconArrowUp, IconSparkles } from "./icons";
import { useCountUp, fmt } from "./useCountUp";

type Trend = { dir: "up" | "down" | "flat"; label: string };

export function KpiCard({
  icon,
  title,
  value,
  currency = false,
  trend,
  sparkline,
  accent,
  ia = false,
  decimals = 0,
}: {
  icon?: React.ReactNode;
  title: string;
  value: number;
  currency?: boolean;
  trend?: Trend;
  sparkline?: number[];
  accent?: "green" | "blue" | "violet" | "cyan" | "amber" | "red";
  ia?: boolean;
  decimals?: number;
}) {
  const n = useCountUp(value);
  const color = {
    green: "var(--success)",
    blue: "#60A5FA",
    violet: "var(--violet)",
    cyan: "var(--cyan)",
    amber: "var(--warn)",
    red: "var(--danger)",
  }[accent ?? "blue"];
  const up = trend?.dir === "up";
  const down = trend?.dir === "down";

  return (
    <GlassCard hover className="relative overflow-hidden p-5">
      {sparkline && sparkline.length > 1 && (
        <Sparkline data={sparkline} color={color} />
      )}
      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-[var(--t-2)]">
            <span style={{ color }}>{icon}</span>
            {title}
            {ia && <span className="ai-chip">⚡ IA</span>}
          </div>
          <div className="mt-2 kpi-num text-[34px] md:text-[40px]" style={{ color: "var(--t-1)", textShadow: `0 0 28px ${color}55` }}>
            {currency ? "$" : ""}{fmt(n, false)}
          </div>
        </div>
      </div>
      {trend && (
        <div className="relative mt-3 flex items-center gap-2 text-[13px]">
          <span
            className="inline-flex h-5 items-center gap-1 rounded-full px-2 text-[11px] font-bold"
            style={{
              color: down ? "var(--danger)" : up || trend.dir === "flat" ? "var(--success)" : "var(--t-2)",
              background: (down ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)"),
            }}
          >
            {down ? "↓" : up ? "↑" : "→"} {trend.label}
          </span>
        </div>
      )}
    </GlassCard>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 160;
  const h = 44;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((d, i) => {
    const x = (i / Math.max(1, data.length - 1)) * w;
    const y = h - 4 - ((d - min) / (max - min || 1)) * (h - 10);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg className="pointer-events-none absolute bottom-0 right-0 opacity-25" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={2} />
    </svg>
  );
}

export function AIInsight({ title, children, onApply }: { title: string; children: React.ReactNode; onApply?: () => void }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[var(--lavender)]">
          <IconSparkles size={16} /> {title}
        </div>
        <span className="ai-chip">⚡ IA</span>
      </div>
      <p className="mt-2 text-sm text-[var(--t-2)]">{children}</p>
      {onApply && (
        <button onClick={onApply} className="btn btn-soft mt-3 text-[13px]">
          Aplicar
        </button>
      )}
    </GlassCard>
  );
}