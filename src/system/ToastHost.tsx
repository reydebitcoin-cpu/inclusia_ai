import { useApp } from "../core/app.store";
import { IconAlert, IconCheck, IconX } from "../design-system/icons";

const style = {
  success: { color: "var(--success)", border: "rgba(16,185,129,0.4)" },
  error: { color: "var(--danger)", border: "rgba(239,68,68,0.4)" },
  info: { color: "#60A5FA", border: "rgba(96,165,250,0.4)" },
};

export function ToastHost() {
  const toasts = useApp((s) => s.toasts);
  const dismiss = useApp((s) => s.dismissToast);

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-2 md:left-auto md:right-6 md:translate-x-0">
      {toasts.map((t) => {
        const s = style[t.kind] ?? style.info;
        return (
          <div
            key={t.id}
            role="status"
            className="anim-fade-up glass glass-strong flex items-center gap-3 rounded-xl px-4 py-3 shadow-[var(--shadow-2)]"
            style={{ borderColor: s.border ?? s.color }}
          >
            <span style={{ color: s.color }}>
              {t.kind === "success" ? <IconCheck size={18} /> : t.kind === "error" ? <IconAlert size={18} /> : <IconX size={18} />}
            </span>
            <span className="flex-1 text-sm">{t.text}</span>
            <button aria-label="Descartar" onClick={() => dismiss(t.id)} className="text-[var(--t-3)] hover:text-[var(--t-1)]">
              <IconX size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}