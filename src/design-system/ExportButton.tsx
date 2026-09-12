import { useState } from "react";
import { IconDownload } from "./icons";

const formats = [
  { id: "csv", label: "📊 CSV" },
  { id: "pdf", label: "📄 PDF" },
  { id: "xlsx", label: "📈 Excel" },
  { id: "api", label: "🔗 API" },
] as const;

export function ExportButton({ rows, name }: { rows: unknown[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const exportCsv = () => {
    if (!rows.length) return;
    const cols = Object.keys(rows[0] as Record<string, unknown>)
      .filter((k) => typeof (rows[0] as any)[k] !== "object");
    const csv = [
      cols.join(","),
      ...rows.map((r) => cols.map((c) => `"${String((r as any)[c]).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <div className="relative">
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost text-[13px]"
      >
        <IconDownload size={16} /> {done ? "Listo ✓" : "Exportar"}
      </button>
      {open && (
        <div className="glass glass-strong absolute right-0 z-30 mt-2 min-w-[150px] overflow-hidden p-1.5">
          {formats.map((f) => (
            <button
              key={f.id}
              onClick={() => (f.id === "csv" ? exportCsv() : setOpen(false))}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--glass-hover)]"
            >
              {f.label}
              <span className="ml-auto text-[11px] text-[var(--t-3)]">{f.id === "csv" ? "✓" : "pronto"}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}