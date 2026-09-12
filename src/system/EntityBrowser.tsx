import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../core/api";
import { Button } from "../design-system/Button";
import { Field, TextInput, Select } from "../design-system/Field";
import { SmartTable } from "../design-system/SmartTable";
import type { EntityMeta, FieldDef } from "./UniversalModule";

type Row = { id: string; data: any; createdAt?: string; updatedAt?: string };

const fmtValue = (v: unknown, type: string): React.ReactNode => {
  if (v === null || v === undefined || v === "") return "—";
  if (type === "money") return `$${new Intl.NumberFormat().format(Number(v) || 0)}`;
  if (type === "percent") return `${Number(v) || 0}%`;
  if (type === "number") return new Intl.NumberFormat().format(Number(v) || 0);
  if (type === "boolean") return v ? "✓" : "—";
  if (type === "color")
    return (
      <span className="inline-flex items-center gap-2">
        <span className="inline-block h-3.5 w-3.5 rounded-full border border-[var(--glass-border)]" style={{ background: String(v) }} />
        {String(v)}
      </span>
    );
  if (type === "multiselect") return (Array.isArray(v) ? v : []).join(", ");
  if (type === "date" && typeof v === "string") return v.slice(0, 10);
  if (type === "datetime" && typeof v === "string") return v.replace("T", " ").slice(0, 16);
  return String(v);
};

const inputFor = (f: FieldDef, value: any, onChange: (v: any) => void) => {
  const cls = "field-input";
  switch (f.type) {
    case "textarea":
      return <textarea className={`${cls} min-h-24`} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "money":
      return <TextInput type="number" step="0.01" value={value ?? 0} onChange={(e) => onChange(e.target.value)} />;
    case "percent":
      return <TextInput type="number" step="0.01" value={value ?? 0} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return <TextInput type="number" value={value ?? 0} onChange={(e) => onChange(e.target.value)} />;
    case "date":
      return <TextInput type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "datetime":
      return <TextInput type="datetime-local" value={(value ?? "").slice(0, 16)} onChange={(e) => onChange(e.target.value)} />;
    case "boolean":
      return (
        <Select value={value ? "true" : "false"} onChange={(e) => onChange(e.target.value === "true")}>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </Select>
      );
    case "select":
      return (
        <Select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          <option value="">— Seleccionar —</option>
          {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
        </Select>
      );
    case "multiselect":
      return (
        <Select multiple value={Array.isArray(value) ? value : []} onChange={(e) => onChange(Array.from(e.target.selectedOptions).map((o) => o.value))}>
          {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
        </Select>
      );
    case "color":
      return <TextInput type="color" value={value || "#6366f1"} onChange={(e) => onChange(e.target.value)} />;
    default:
      return <TextInput type={f.type === "email" ? "email" : f.type === "phone" ? "tel" : f.type === "url" ? "url" : "text"} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  }
};

const defaultValues = (fields: FieldDef[]) =>
  Object.fromEntries(fields.map((f) => {
    if (f.default !== undefined) return [f.name, f.default];
    if (f.type === "boolean") return [f.name, false];
    if (f.type === "multiselect") return [f.name, []];
    if (["number", "money", "percent"].includes(f.type)) return [f.name, 0];
    return [f.name, ""];
  }));

export function EntityBrowser({ slug, entity, onChanged }: { slug: string; entity: EntityMeta; onChanged?: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [q, setQ] = useState("");
  const [qf, setQf] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ id?: string; data: any } | null>(null);
  const [busy, setBusy] = useState(false);

  const filterable = useMemo(
    () => entity.fields.filter((f) => f.type === "select" || f.type === "boolean" || (f.type === "multiselect" && !!f.options && f.options.length <= 12)),
    [entity],
  );

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (qf) params.set("q", qf);
    params.set("page", String(page));
    params.set("per", "20");
    for (const [k, v] of Object.entries(filters)) if (v) params.set(`f_${k}`, v);
    api
      .get(`/api/gm/${slug}/${entity.entity}`, { params })
      .then((r) => { setRows(r.data.items ?? []); setTotal(r.data.total ?? 0); setPages(r.data.pages ?? 1); setPage(r.data.page ?? 1); })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug, entity.entity, page, qf, filters]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    try {
      if (editing.id) await api.patch(`/api/gm/${slug}/${entity.entity}/${editing.id}`, editing.data);
      else await api.post(`/api/gm/${slug}/${entity.entity}`, editing.data);
      setEditing(null);
      load();
      onChanged?.();
    } catch (e: any) {
      let msg = e.response?.data?.error;
      try {
        const parsed = JSON.parse(msg);
        const first = parsed[0];
        msg = `${first.path?.[first.path.length - 1] ?? "campo"}: ${first.message}`;
      } catch {}
      alert(msg ?? "Error al guardar");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (r: Row) => {
    if (!window.confirm(`¿Eliminar ${entity.singular ?? "registro"} "${String(Object.values(r.data)[0] ?? "") || r.id}"?`)) return;
    try {
      await api.delete(`/api/gm/${slug}/${entity.entity}/${r.id}`);
      load();
      onChanged?.();
    } catch (e: any) {
      alert(e.response?.data?.error ?? "Error al eliminar");
    }
  };

  const columns = [
    ...entity.fields.map((f) => ({
      key: f.name,
      header: f.label,
      render: (r: Row) => fmtValue(r.data?.[f.name], f.type),
    })),
    {
      key: "_actions",
      header: "",
      render: (r: Row) => (
        <div className="flex justify-end gap-2">
          <Button className="btn-soft px-3 py-1 text-[12px]" onClick={() => setEditing({ id: r.id, data: { ...r.data } })}>Editar</Button>
          <Button className="btn-danger px-3 py-1 text-[12px]" onClick={() => remove(r)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  const exportCsv = async () => {
    try {
      const res = await api.get(`/api/gm/${slug}/${entity.entity}/csv`, { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}-${entity.entity}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(e.response?.data?.error ?? "Error al exportar");
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass flex flex-wrap items-center gap-3 p-4">
        <form className="flex min-w-56 flex-1 gap-2" onSubmit={(e) => { e.preventDefault(); setPage(1); setQf(q); }}>
          <TextInput className="field-input flex-1" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button type="submit">Buscar</Button>
        </form>
        {filterable.map((f) => (
          <Select
            key={f.name}
            className="field-input"
            value={filters[f.name] ?? ""}
            onChange={(e) => { setFilters((prev) => ({ ...prev, [f.name]: e.target.value })); setPage(1); }}
          >
            <option value="">{f.label}: todo</option>
            {f.type === "boolean" ? (
              <>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </>
            ) : (
              (f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)
            )}
          </Select>
        ))}
        <Button className="btn-soft" onClick={exportCsv}>⬇ CSV</Button>
        <Button onClick={() => setEditing({ data: defaultValues(entity.fields) })}>+ {entity.singular ?? "Nuevo"}</Button>
      </div>

      <div className="text-[12.5px] text-[var(--t-3)]">{total} registro{total === 1 ? "" : "s"}</div>

      <SmartTable rows={rows} columns={columns} empty={loading ? "Cargando…" : `Sin ${entity.label.toLowerCase()}`} />

      {pages > 1 && (
        <div className="glass flex items-center justify-between px-4 py-3 text-[13px] text-[var(--t-2)]">
          <span>Página {page} de {pages}</span>
          <div className="flex gap-2">
            <Button className="btn-soft" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← Anterior</Button>
            <Button className="btn-soft" disabled={page >= pages} onClick={() => setPage((p) => Math.min(pages, p + 1))}>Siguiente →</Button>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal>
          <div className="glass max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">{editing.id ? "Editar" : "Nuevo"} — {entity.singular ?? entity.label}</h3>
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {entity.fields.map((f) => (
                <Field key={f.name} label={`${f.label}${f.required ? " *" : ""}`} hint={f.hint}>
                  {inputFor(f, editing.data[f.name], (v) => setEditing((prev) => prev && { ...prev, data: { ...prev.data, [f.name]: v } }))}
                </Field>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button className="btn-soft" onClick={() => setEditing(null)} disabled={busy}>Cancelar</Button>
              <Button onClick={save} disabled={busy}>{busy ? "Guardando…" : "Guardar"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}