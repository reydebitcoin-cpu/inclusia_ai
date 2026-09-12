import { useApp } from "../core/app.store";
import { IconBell, IconX, IconAlert, IconBolt, IconSparkles } from "../design-system/icons";

const icons = {
  urgent: <IconAlert size={15} />,
  action: <IconBolt size={15} />,
  info: <IconBell size={15} />,
  ia: <IconSparkles size={15} />,
};

const colors = {
  urgent: "var(--danger)",
  action: "var(--warn)",
  info: "#60A5FA",
  ia: "var(--lavender)",
};

export function NotificationCenter() {
  const open = useApp((s) => s.notifOpen);
  const setOpen = useApp((s) => s.setNotifOpen);
  const notices = useApp((s) => s.notices);
  const unread = useApp((s) => s.unread);
  const markAllRead = useApp((s) => s.markAllRead);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[360px] max-w-[92vw] border-l border-[var(--glass-border)] bg-[var(--bg-1)]/80 backdrop-blur-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog" aria-label="Centro de notificaciones">
        <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-4">
          <div className="font-display text-[17px] font-semibold">Notificaciones</div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={markAllRead} className="btn btn-ghost text-[12px]">Marcar leídas</button>
            )}
            <button aria-label="Cerrar" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--t-2)] hover:bg-[var(--glass-hover)]">
              <IconX size={17} />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto p-3" style={{ height: "calc(100% - 66px)" }}>
          {notices.map((n) => (
            <button
              key={n.id}
              className="mb-2 w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-4 text-left transition-colors hover:bg-[var(--glass-hover)]"
            >
              <div className="flex items-center gap-2">
                <span style={{ color: colors[n.cat] }}>{icons[n.cat]}</span>
                <span className="flex-1 text-[13px] font-semibold">{n.title}</span>
                {n.cat === "ia" && <span className="ai-chip">⚡ IA</span>}
              </div>
              {n.body && <p className="mt-1.5 text-[13px] text-[var(--t-2)]">{n.body}</p>}
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-[var(--t-3)]">{n.at}</span>
                {n.actionLabel && <span className="font-semibold text-[var(--indigo)]">{n.actionLabel}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}