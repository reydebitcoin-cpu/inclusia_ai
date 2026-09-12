import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../core/api";

export function TrialCounter() {
  const [days, setDays] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    api.get("/api/billing/subscription").then(({ data }) => {
      if (!data) return;
      const statusNorm = String(data.status || "").toLowerCase();
      if (statusNorm === "trial" && data.trialEndsAt) {
        const left = Math.ceil((new Date(data.trialEndsAt).getTime() - Date.now()) / 86_400_000);
        setDays(Math.max(0, left));
      } else {
        setStatus(data.status ?? "active");
      }
    }).catch(() => { /* sin permisos aún */ });
  }, []);

  if (days === null && !status) return null;
  const isActive = status && status !== "trial" && status !== "cancelled";

  return (
    <Link
      to="/pricing"
      className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-semibold transition-all ${
        isActive
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15"
          : days !== null && days <= 5
          ? "anim-pulse-warn border-amber-400/40 bg-amber-400/10 text-amber-300 hover:bg-amber-400/15"
          : "border-[var(--glass-border)] bg-[var(--glass)] text-[var(--t-2)] hover:bg-[var(--glass-hover)]"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" style={{ animation: "blinkDot 1.6s infinite" }} />
      {isActive ? "Plan activo" : days !== null ? `Trial · ${days} día${days === 1 ? "" : "s"}` : status}
    </Link>
  );
}