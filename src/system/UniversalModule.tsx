import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../core/api";
import { canned } from "../core/systems";
import { KpiCard } from "../design-system/Kpi";
import { EntityBrowser } from "./EntityBrowser";

export type FieldDef = { name: string; label: string; type: string; options?: string[]; required?: boolean; hint?: string; default?: unknown };
export type EntityMeta = { entity: string; label: string; singular: string; fields: FieldDef[] };
export type ModuleMeta = {
  slug: string;
  name: string;
  icon: string;
  category: string;
  description?: string;
  entities: EntityMeta[];
  kpis: { label: string; entity: string; metric: string; field?: string }[];
};

const ACCENTS = ["blue", "violet", "cyan", "green", "amber", "red"] as const;

export function UniversalModule() {
  const { slug = "" } = useParams();
  const [meta, setMeta] = useState<ModuleMeta | null>(null);
  const [kpis, setKpis] = useState<{ label: string; value: number }[]>([]);
  const [err, setErr] = useState("");
  const [active, setActive] = useState("");

  const sys = canned(slug);

  useEffect(() => {
    let gone = false;
    setErr("");
    setMeta(null);
    setActive("");
    setKpis([]);
    api
      .get(`/api/gm/${slug}/meta`)
      .then((r) => {
        if (gone) return;
        setMeta(r.data);
        if (r.data.entities?.length) setActive(r.data.entities[0].entity);
      })
      .catch((e) => setErr(e.response?.data?.error ?? "Módulo no disponible"));
    api
      .get(`/api/gm/${slug}/kpis`)
      .then((r) => !gone && setKpis(r.data.kpis ?? []))
      .catch(() => {});
    return () => { gone = true; };
  }, [slug]);

  const reloadKpis = () =>
    api.get(`/api/gm/${slug}/kpis`).then((r) => setKpis(r.data.kpis ?? [])).catch(() => {});

  if (err) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--glass)] text-5xl shadow-2xl">
          {sys?.icon ?? "🛠️"}
        </div>
        <h1 className="mt-8 font-display text-3xl font-bold tracking-tight">{sys?.label ?? "Módulo"}</h1>
        <p className="mt-3 max-w-md text-[15px] text-[var(--t-2)]">{err}</p>
        <Link to="/app" className="btn btn-soft mt-8">← Volver al dashboard</Link>
      </main>
    );
  }

  if (!meta) {
    return (
      <main className="relative min-h-screen px-6 md:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-9 w-64 rounded-lg bg-[var(--glass)]" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-[var(--glass)]" />
            ))}
          </div>
          <div className="h-40 rounded-2xl bg-[var(--glass)]" />
        </div>
      </main>
    );
  }

  const ent = meta.entities.find((e) => e.entity === active) ?? meta.entities[0];

  return (
    <main className="relative min-h-screen px-5 pb-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center gap-4 py-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] text-3xl shadow-xl">
            {meta.icon ?? "🧩"}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{meta.name}</h1>
            {meta.description && <p className="mt-1 text-[13.5px] text-[var(--t-2)]">{meta.description}</p>}
          </div>
          <span className="ai-chip">⚡ INCLUSIA AI</span>
        </header>

        {kpis.length > 0 && (
          <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {kpis.map((k, i) => (
              <KpiCard key={k.label} title={k.label} value={k.value} accent={ACCENTS[i % ACCENTS.length]} />
            ))}
          </section>
        )}

        {meta.entities.length > 1 && (
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Entidades">
            {meta.entities.map((e) => (
              <button
                key={e.entity}
                onClick={() => setActive(e.entity)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  ent?.entity === e.entity
                    ? "bg-[var(--indigo)] text-white shadow-lg shadow-[var(--indigo)]/30"
                    : "border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--t-2)] hover:bg-[var(--glass-strong)]"
                }`}
              >
                {e.label}
              </button>
            ))}
          </nav>
        )}

        {ent && (
          <section className="mt-6">
            <EntityBrowser key={ent.entity} slug={meta.slug} entity={ent} onChanged={reloadKpis} />
          </section>
        )}
      </div>
    </main>
  );
}