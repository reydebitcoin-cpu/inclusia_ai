import { useState } from "react";
import { Link } from "react-router-dom";
import { useModules, modIcon, CATEGORIES } from "../core/modules.store";
import { Button } from "../design-system/Button";
import { BackgroundFX } from "../system/BackgroundFX";
import { IconCheck, IconSparkles } from "../design-system/icons";

const plans = [
  { id: "starter", name: "Starter", monthly: 49, yearly: 39, desc: "Para negocios que inician su digitalización.", feat: ["3 módulos a elección", "1 usuario administrador", "1 base de datos dedicada", "Soporte por chat"], hot: false },
  { id: "pro", name: "Pro", monthly: 99, yearly: 79, desc: "Todo el potencial de la Suite para crecer.", feat: ["Módulos ilimitados", "Usuarios ilimitados", "IA avanzada + generación", "Backups y seguridad avanzada", "Soporte prioritario 24/7"], hot: true },
  { id: "enterprise", name: "Enterprise", monthly: 299, yearly: 239, desc: "Para multisitios y operaciones complejas.", feat: ["Todo de Pro", "Múltiples locales", "Onboarding dedicado", "SLA 99.9%", "Gerente de cuenta"], hot: false },
];

export function Pricing() {
  const { mods, loading, categories } = useModules();
  const [cycle, setCycle] = useState<"month" | "year">("year");
  const [cat, setCat] = useState<string | null>(null);

  const list = (cat ? mods.filter((m) => m.category === cat) : mods).slice(0, 30);

  return (
    <main className="relative min-h-screen py-12">
      <BackgroundFX />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Reusable mini-nav */}
        <div className="mb-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-xl font-bold text-white" style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 6s ease infinite" }}>
              I
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-tight">INCLUSIA AI</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--indigo)]">Business Suite 2030</div>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="hidden text-[var(--t-2)] hover:text-[var(--t-1)] sm:block">Inicio</a>
            <Link to="/login" className="text-[var(--t-2)] hover:text-[var(--t-1)]">Entrar</Link>
            <Link to="/register" className="btn btn-primary text-[13px]">Empezar gratis</Link>
          </nav>
        </div>

        <div className="text-center">
          <span className="ai-chip">⚡ IA incluida en todos los planes</span>
          <h1 className="h1 mt-3">Precios transparentes</h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--t-2)]">
            Una tarifa plana. Acceso a decenas de módulos con tu base de datos dedicada, IA ética y soporte humano.
          </p>
          <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] p-1 text-[13px]">
            <button onClick={() => setCycle("month")} className={`rounded-full px-4 py-1.5 transition ${cycle === "month" ? "bg-white/10 font-semibold" : "text-[var(--t-3)]"}`}>Mensual</button>
            <button onClick={() => setCycle("year")} className={`rounded-full px-4 py-1.5 transition ${cycle === "year" ? "bg-white/10 font-semibold" : "text-[var(--t-3)]"}`}>Anual <span className="text-[11px] text-[var(--success)]">−20%</span></button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className={`relative glass p-6 ${p.hot ? "glass-strong border-2" : "glass-hover"} ${p.hot ? "border-transparent" : ""}`} style={p.hot ? { background: "linear-gradient(160deg, rgba(99,102,241,0.16), rgba(139,92,246,0.06))" } : undefined}>
              {p.hot && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[11px] font-bold text-white" style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 6s ease infinite" }}>
                  MÁS POPULAR
                </span>
              )}
              <div className="font-display text-[18px] font-semibold">{p.name}</div>
              <p className="mt-1 min-h-[40px] text-[13px] text-[var(--t-2)]">{p.desc}</p>
              <div className="mt-4">
                <span className="font-display text-[42px] font-bold leading-none">${cycle === "year" ? p.yearly : p.monthly}</span>
                <span className="text-sm text-[var(--t-3)]">/mes</span>
              </div>
              {cycle === "year" && <div className="mt-1 text-[12px] text-[var(--success)]">Facturado anualmente</div>}
              <ul className="mt-5 space-y-2 text-[13px] text-[var(--t-2)]">
                {p.feat.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <IconCheck size={15} className="mt-0.5 shrink-0 text-[var(--indigo)]" /> {f}
                  </li>
                ))}
              </ul>
              <Link to={`/register?plan=${p.id}&cycle=${cycle}`} className={`btn ${p.hot ? "btn-primary" : "btn-soft"} mt-6 w-full`}>
                {p.id === "starter" ? "Empezar gratis" : "Elegir plan"}
              </Link>
            </div>
          ))}
        </div>

        {/* Catalog */}
        <div className="mt-20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="h2">Catálogo de sistemas · {mods.length}+</h2>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCat(null)} className={`rounded-full border px-3 py-1.5 text-[12px] transition ${!cat ? "border-[var(--indigo)]/60 bg-[var(--indigo)]/10 text-white" : "border-[var(--glass-border)] bg-[var(--glass)] text-[var(--t-2)]"}`}>Todos</button>
              {CATEGORIES.filter((c) => categories.includes(c.id)).map((c) => (
                <button key={c.id} onClick={() => setCat(c.id)} className={`rounded-full border px-3 py-1.5 text-[12px] transition ${cat === c.id ? "border-[var(--indigo)]/60 bg-[var(--indigo)]/10 text-white" : "border-[var(--glass-border)] bg-[var(--glass)] text-[var(--t-2)]"}`}>{c.label}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}
            </div>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => {
                const catc = CATEGORIES.find((c) => c.id === m.category);
                return (
                  <Link key={m.id} to={`/${m.slug}`} className="glass glass-hover group flex items-start gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[var(--lavender)]" style={{ background: catc?.gradient ?? "var(--glass)", color: "#fff" }}>
                      {modIcon(m)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold">{m.name}</span>
                        {m.bundled && <span className="rounded-full bg-[var(--success)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--success)]">BUNDLE</span>}
                        {m.priority >= 5 && <span className="ai-chip">⚡ IA</span>}
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--t-2)]">{m.description}</p>
                      <div className="mt-2 flex items-center gap-3 text-[12px]">
                        <span className="font-bold text-[var(--t-1)]">{m.priceMonth > 0 ? `$${m.priceMonth}/mes` : "Incluido"}</span>
                        <span className="text-[var(--t-3)]">{catc?.label}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <IconSparkles className="mx-auto text-[var(--lavender)]" />
          <h3 className="h2 mt-2">¿No sabes por dónde empezar?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--t-2)]">Usa el modo IA y te recomendamos los módulos ideales según tu industria.</p>
          <Link to="/register" className="btn btn-primary mt-6">Empezar gratis · 14 días</Link>
        </div>
      </div>
    </main>
  );
}