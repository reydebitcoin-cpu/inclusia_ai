import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../core/api";
import { useAuth } from "../core/auth.store";
import { BackgroundFX } from "../system/BackgroundFX";
import { KpiCard } from "../design-system/Kpi";
import { SmartTable } from "../design-system/SmartTable";
import { Skeleton } from "../design-system/Skeleton";
import { Button } from "../design-system/Button";
import { ThemeToggle } from "../design-system/ThemeToggle";
import { IconLogout, IconUsers, IconGrid, IconBolt, IconShield, IconBell, IconSparkles } from "../design-system/icons";

type Row = {
  id: string;
  name: string;
  slug: string;
  status: string;
  plan: string;
  createdAt: string;
  _count: { users: number };
  modules: any[];
};

export function AdminConsole() {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const [dash, setDash] = useState<any>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [mods, setMods] = useState<any[]>([]);
  const [tab, setTab] = useState<"overview" | "tenants" | "modules">("overview");
  const [busy, setBusy] = useState<string | null>(null);
  const toast = (t: string) => alert(t);

  const load = () => {
    api.get("/api/admin/dashboard").then(({ data }) => setDash(data)).catch(() => {});
    api.get("/api/admin/tenants").then(({ data }) => setRows(data.rows)).catch(() => {});
    api.get("/api/admin/modules").then(({ data }) => setMods(data)).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const act = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(label);
    try { await fn(); toast("✓ " + label); load(); } catch (e: any) { alert(e.response?.data?.error ?? "Error"); } finally { setBusy(null); }
  };

  const provision = (id: string) => act(`provision-${id}`, () => api.post(`/api/admin/tenants/${id}/provision`));
  const setStatus = (id: string, status: string) => act(`status-${id}`, () => api.post(`/api/admin/tenants/${id}/status`, { status }));
  const toggleMod = (id: string) => act(`mod-${id}`, () => api.post(`/api/admin/modules/${id}/toggle`));

  return (
    <main className="relative min-h-screen">
      <BackgroundFX dim />
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--glass-border)] bg-[var(--bg-0)]/60 px-5 backdrop-blur-xl">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold text-white" style={{ background: "var(--hologram)" }}>I</span>
        <div>
          <div className="font-display text-[16px] font-bold leading-tight">Consola Admin</div>
          <div className="text-[11px] text-[var(--t-3)]">INCLUSIA AI · {user?.email}</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button aria-label="Notificaciones" className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass)]"><IconBell size={17} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--danger)]" /></button>
          <button aria-label="Cerrar sesión" onClick={() => { void logout(); navigate("/admin/login"); }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] px-3 text-[13px]"><IconLogout size={16} /> Salir</button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center gap-2">
          {([["overview", "Resumen"], ["tenants", "Clientes"], ["modules", "Catálogo"]] as const).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`btn ${tab === id ? "btn-primary" : "btn-ghost"} text-[13px]`}>{label}</button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            {!dash ? <Skeleton className="h-40" /> : (
              <>
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <KpiCard icon={<IconUsers size={16} />} title="Clientes" value={dash.tenants} accent="blue" />
                  <KpiCard icon={<IconGrid size={16} />} title="Módulos activos" value={dash.activeMods} accent="violet" />
                  <KpiCard icon={<IconBolt size={16} />} title="Trials activos" value={dash.trials} accent="cyan" />
                  <KpiCard icon={<IconShield size={16} />} title="MRR estimado" value={dash.mrr} currency accent="green" />
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <div className="glass p-5">
                    <div className="text-[13px] font-semibold text-[var(--t-2)]">Últimos registros</div>
                    <div className="mt-3 space-y-2">
                      {dash.recent.length === 0 && <div className="text-sm text-[var(--t-3)]">Sin clientes aún.</div>}
                      {dash.recent.map((t: any) => (
                        <div key={t.id} className="flex items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ background: "var(--hologram)" }}>{t.name.slice(0, 2).toUpperCase()}</span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-semibold">{t.name}</div>
                            <div className="text-[11px] text-[var(--t-3)]">@{t.slug} · {new Date(t.createdAt).toLocaleDateString("es-CO")}</div>
                          </div>
                          <Badge status={t.status} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass p-5">
                    <div className="text-[13px] font-semibold text-[var(--t-2)]">Estado global</div>
                    <div className="mt-3 space-y-2 text-sm">
                      {[
                        ["Usuarios totales", dash.users],
                        ["Leads capturados", dash.leads],
                        ["Clientes activos", dash.active],
                        ["Suspendidos", dash.suspended],
                      ].map(([l, v]) => (
                        <div key={l as string} className="flex justify-between rounded-xl border border-[var(--glass-border)] p-3">
                          <span className="text-[var(--t-2)]">{l}</span>
                          <b className="font-display">{v}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {tab === "tenants" && (
          <div className="mt-6">
            {rows.length === 0 ? <Skeleton className="h-40" /> : (
              <SmartTable
                rows={rows}
                columns={[
                  { key: "name", header: "Cliente", render: (r) => <div><div className="font-semibold">{r.name}</div><div className="text-[11px] text-[var(--t-3)]">@{r.slug}</div></div> },
                  { key: "status", header: "Estado", render: (r) => <Badge status={r.status} /> },
                  { key: "plan", header: "Plan", render: (r) => <span className="rounded-full bg-[var(--glass)] px-2.5 py-1 text-[12px] capitalize">{r.plan}</span> },
                  { key: "users", header: "Usuarios", render: (r) => <span className="text-[var(--t-2)]">{r._count.users}</span> },
                  { key: "modules", header: "Módulos", render: (r) => <span className="text-[12px] text-[var(--t-2)]">{r.modules.length} · {r.modules.slice(0, 3).map((m) => m.name.split(" ")[0]).join(", ")}{r.modules.length > 3 ? "…" : ""}</span> },
                  { key: "actions", header: "Acciones", render: (r) => (
                    <div className="flex gap-1.5">
                      <Button variant="ghost" className="text-[11px] px-2" disabled={busy === `provision-${r.id}`} onClick={() => provision(r.id)}>{busy === `provision-${r.id}` ? "…" : "Crear BD"}</Button>
                      {r.status === "active"
                        ? <Button variant="danger" className="text-[11px] px-2" disabled={busy === `status-${r.id}`} onClick={() => setStatus(r.id, "suspended")}>Suspender</Button>
                        : <Button variant="success" className="text-[11px] px-2" disabled={busy === `status-${r.id}`} onClick={() => setStatus(r.id, "active")}>Activar</Button>}
                    </div>
                  )},
                ]}
              />
            )}
          </div>
        )}

        {tab === "modules" && (
          <div className="mt-6">
            {mods.length === 0 ? <Skeleton className="h-40" /> : (
              <SmartTable
                rows={mods}
                columns={[
                  { key: "name", header: "Módulo", render: (r) => <div><div className="font-semibold">{r.icon} {r.name}</div><div className="text-[11px] text-[var(--t-3)]">{r.description}</div></div> },
                  { key: "cat", header: "Categoría", render: (r) => <span className="rounded-full bg-[var(--glass)] px-2.5 py-1 text-[12px] capitalize">{r.category}</span> },
                  { key: "price", header: "Precio", render: (r) => <span className="text-[var(--t-2)]">${r.priceMonth}.00</span> },
                  { key: "active", header: "Estado", render: (r) => <Badge status={r.active ? "active" : "suspended"} /> },
                  { key: "toggle", header: "", render: (r) => <Button variant={r.active ? "ghost" : "success"} className="text-[11px] px-2" disabled={busy === `mod-${r.id}`} onClick={() => toggleMod(r.id)}>{r.active ? "Desactivar" : "Activar"}</Button> },
                ]}
              />
            )}
          </div>
        )}
      </div>
      <span className="sr-only"><IconSparkles size={0} /></span>
    </main>
  );
}

function Badge({ status }: { status: string }) {
  const ok = status === "active";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${ok ? "bg-emerald-400/10 text-emerald-300" : status === "suspended" ? "bg-red-500/10 text-red-400" : "bg-[var(--glass)] text-[var(--t-2)]"}`}>
      {ok ? "✓ activo" : status}
    </span>
  );
}