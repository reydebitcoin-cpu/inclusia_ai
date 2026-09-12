import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../core/app.store";
import { IconCommand, IconSearch, IconSparkles, IconGrid, IconBolt } from "../design-system/icons";

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "Acciones" | "Navegación" | "IA";
  icon?: React.ReactNode;
  run: () => void;
};

export function CommandBar() {
  const open = useApp((s) => s.commandOpen);
  const setOpen = useApp((s) => s.setCommandOpen);
  const toast = useApp((s) => s.toast);
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(() => [
    { id: "go-pos", label: "Ir a POS & Ventas", group: "Navegación", icon: <IconGrid size={16} />, run: () => navigate("/app/pos") },
    { id: "go-parking", label: "Ir a Parqueadero", group: "Navegación", icon: <IconGrid size={16} />, run: () => navigate("/app/parking") },
    { id: "go-loans", label: "Ir a Préstamos", group: "Navegación", icon: <IconGrid size={16} />, run: () => navigate("/app/loans") },
    { id: "go-dash", label: "Ir al Dashboard", group: "Navegación", icon: <IconGrid size={16} />, run: () => navigate("/app") },
    { id: "ai-ventas", label: "Analizar ventas de la semana", group: "IA", icon: <IconSparkles size={16} />, run: () => { toast("info", "⚡ IA: preparando análisis generativo…"); setOpen(false); } },
    { id: "ai-insight", label: "Generar insight del día", group: "IA", icon: <IconBolt size={16} />, run: () => { toast("success", "⚡ IA: ingresos +8.3% hoy, tendencia positiva."); setOpen(false); } },
  ], [navigate, toast, setOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!useApp.getState().commandOpen);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  const ql = q.trim().toLowerCase();
  const groups: Action["group"][] = ["Acciones", "Navegación", "IA"];
  const filtered = actions.filter((a) => !ql || a.label.toLowerCase().includes(ql));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[16vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="glass glass-strong glass-blur-lg w-full max-w-xl overflow-hidden rounded-2xl" role="dialog" aria-modal="true" aria-label="Buscador de comandos"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-4">
          <IconSearch size={18} className="text-[var(--t-3)]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Escribe un comando o pregunta…"
            className="flex-1 bg-transparent py-4 text-[15px] outline-none placeholder:text-[var(--t-3)]"
          />
          <kbd className="rounded-md border border-[var(--glass-border)] bg-[var(--glass-strong)] px-2 py-1 font-mono text-[11px] text-[var(--t-2)]">Esc</kbd>
        </div>
        <div className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 && <div className="px-3 py-8 text-center text-sm text-[var(--t-2)]">Sin resultados.</div>}
          {groups.map((g) => {
            const items = filtered.filter((a) => a.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--t-3)]">{g}</div>
                {items.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { a.run(); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--glass-hover)]"
                  >
                    {a.icon}
                    <span className="flex-1">{a.label}</span>
                    {a.group === "IA" && <span className="ai-chip">⚡ IA</span>}
                    <kbd className="rounded border border-[var(--glass-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--t-3)]">↵</kbd>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3 border-t border-[var(--glass-border)] px-4 py-2.5 text-[11px] text-[var(--t-3)]">
          <span className="flex items-center gap-1"><IconCommand size={12} /> ⌘K</span>
          <span>·</span>
          <span>IA con sello ético ⚡</span>
        </div>
      </div>
    </div>
  );
}