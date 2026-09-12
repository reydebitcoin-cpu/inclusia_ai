import { useState } from "react";
import api from "../core/api";
import { useAuth } from "../core/auth.store";
import { IconBot, IconX } from "../design-system/icons";

type Msg = { role: "user" | "ai"; text: string };

export function ChatbotIA() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const user = useAuth((s) => s.user);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setBusy(true);
    try {
      if (user) {
        const { data } = await api.post("/api/ai/ask", { prompt: text, purpose: "chat" });
        setMsgs((m) => [...m, { role: "ai", text: data.text }]);
      } else {
        setMsgs((m) => [...m, { role: "ai", text: "Soy el asistente de INCLUSIA 2030. Inicia sesión para que responda con tu base de conocimiento y datos reales. ⚡ Información generada por IA, requiere revisión humana." }]);
      }
    } catch {
      setMsgs((m) => [...m, { role: "ai", text: "No pude conectar ahora. Intenta de nuevo. ⚡ Información generada por IA." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[420px] w-[340px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-1)]/85 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: "var(--hologram)" }}>
                <IconBot size={17} />
              </span>
              <div>
                <div className="text-[13px] font-bold">Asistente IA</div>
                <div className="flex items-center gap-1 text-[11px] text-[var(--success)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" style={{ animation: "blinkDot 1.6s infinite" }} />
                  en línea
                </div>
              </div>
            </div>
            <button aria-label="Cerrar chat" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--t-2)] hover:bg-[var(--glass-hover)]">
              <IconX size={17} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.length === 0 && (
              <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-3 text-[13px] text-[var(--t-2)]">
                Pregúntame sobre tu negocio: ventas, stock, préstamos, parqueadero… <span className="ai-chip ml-1">⚡ IA</span>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] ${
                    m.role === "user"
                      ? "bg-[var(--hologram)] text-white"
                      : "border border-[var(--glass-border)] bg-[var(--glass)]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {busy && <div className="text-[12px] text-[var(--t-3)]">⚡ analizando…</div>}
          </div>
          <div className="flex items-center gap-2 border-t border-[var(--glass-border)] p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Pregúntale a la IA…"
              className="field-input min-h-[40px] text-[13px]"
            />
            <button onClick={send} disabled={busy} className="btn btn-primary min-h-[40px] px-3 text-[13px]">Enviar</button>
          </div>
        </div>
      )}
      <button
        aria-label="Abrir asistente IA"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[var(--shadow-2)]"
        style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 6s ease infinite" }}
      >
        {open ? <IconX size={22} /> : <IconBot size={24} />}
      </button>
    </>
  );
}