import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../core/api";
import { useModules, modIcon, CATEGORIES } from "../core/modules.store";
import { Button } from "../design-system/Button";
import { BackgroundFX } from "../system/BackgroundFX";
import { IconCheck, IconSparkles, IconBolt, IconShield, IconGrid } from "../design-system/icons";

const staticCatalog: Record<string, { title: string; problem: string; solution: string; benefits: string[]; features: string[]; price: string }> = {
  prestamos: { title: "Préstamos, Cobros, Ahorros y Empeños", problem: "Controlar cartera, cuotas y mora en hojas de cálculo es lento y riesgoso.", solution: "Un sistema integral con simulador, calendario de pagos, alertas de mora y recibos.", benefits: ["Cobranza automatizada", "Reportes en tiempo real", "Ahorros y empeños integrados"], features: ["Simulador", "Calendario", "Mora", "Recibos", "Multi-sucursal"], price: "Desde $29/mes" },
  parqueadero: { title: "Parqueadero con QR", problem: "Perder tiempo en registros manuales y errores de caja.", solution: "Entrada/salida con QR, tarifas configurables y reportes diarios.", benefits: ["Operación más rápida", "Control de espacios", "Trazabilidad"], features: ["QR entrada/salida", "Tarifas", "Mensualidades", "Cámaras (listo)"], price: "Desde $29/mes" },
  "casa-de-cambio": { title: "Casa de Cambio", problem: "Tasas desactualizadas y caja descuadrada.", solution: "Tasas editables, operaciones auditadas y caja por moneda.", benefits: ["Auditoría completa", "Cierre de caja automático", "Multi-moneda"], features: ["Tasas editables", "Recibos", "Caja", "Reportes"], price: "Desde $29/mes" },
  pos: { title: "POS + Ventas + Inventario", problem: "No saber cuánto vendiste hoy ni qué producto se agota.", solution: "Punto de venta rápido con inventario en tiempo real.", benefits: ["Ventas más rápidas", "Stock siempre actual", "Reportes diarios"], features: ["Productos", "Categorías", "Ventas", "Reportes", "Códigos de barras"], price: "Desde $29/mes" },
  "juristas-animales": { title: "Juristas de Animales", problem: "Expedientes dispersos y seguimiento manual de casos.", solution: "Gestión integral de casos, animales, evidencias y documentos con asistencia IA.", benefits: ["Expediente digital", "Asistencia IA con disclaimer", "Calendario y tareas"], features: ["Casos", "Animales", "Evidencias", "Documentos", "IA documental"], price: "Desde $49/mes" },
};

export function Landing() {
  const { slug } = useParams();
  const { mods } = useModules();
  if (slug) return <ModulePage slug={slug} mods={mods} />;
  return <LandingHome mods={mods} />;
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--glass-border)] bg-[var(--bg-0)]/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold text-white" style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 6s ease infinite" }}>
            I
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-[16px] font-bold leading-tight">INCLUSIA AI</div>
            <div className="text-[9px] uppercase tracking-widest text-[var(--indigo)]">Business Suite 2030</div>
          </div>
        </Link>
        <nav className="ml-auto hidden items-center gap-5 text-sm text-[var(--t-2)] md:flex">
          <Link to="/pricing" className="hover:text-[var(--t-1)]">Sistemas</Link>
          <Link to="/#ia" className="hover:text-[var(--t-1)]">IA</Link>
          <Link to="/#faq" className="hover:text-[var(--t-1)]">FAQ</Link>
          <Link to="/login" className="hover:text-[var(--t-1)]">Entrar</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link to="/login" className="btn btn-ghost text-[13px] md:hidden">Entrar</Link>
          <Link to="/register" className="btn btn-primary text-[13px]">Empezar gratis</Link>
        </div>
      </div>
    </header>
  );
}

function LandingHome({ mods }: { mods: any[] }) {
  return (
    <main className="relative min-h-screen">
      <BackgroundFX />
      <Nav />

      <section id="ia" className="mx-auto max-w-6xl px-4 pb-16 pt-16 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="ai-chip">⚡ Sello IA ético · revisión humana incluida</span>
          <h1 className="h1 mt-5">
            El sistema operativo para tu negocio: <span className="grad-text">módulos que piensan por sí solos</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-[var(--t-2)]">
            POS, inventarios, préstamos, parqueadero, casa de cambio, juristas de animales y decenas de sistemas más.
            Cada negocio con su base de datos dedicada, segura y potenciada con IA generativa.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className="btn btn-primary px-6 py-3 text-[15px]">
              Empezar gratis · 14 días <IconSparkles size={16} className="ml-1" />
            </Link>
            <a href="#sistemas" className="btn btn-ghost px-6 py-3 text-[15px]">Ver sistemas ↓</a>
          </div>
          <p className="mt-3 text-[13px] text-[var(--t-3)]">Sin tarjeta de crédito · Migración gratuita · Soporte humano</p>
        </div>

        <div className="anim-fade-up relative mx-auto mt-14 max-w-4xl">
          <div className="glass glass-strong glass-blur-lg rotate-1 rounded-3xl p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[12px] uppercase tracking-widest text-[var(--t-3)]">Dashboard Inteligente</div>
                <div className="mt-1 font-display text-[26px] font-bold">Ventas de hoy <span className="text-[var(--success)]">+12.4%</span></div>
              </div>
              <span className="ai-chip">⚡ IA</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { l: "Ingresos", v: "$5,210", d: "↑ 8.3%", c: "var(--success)" },
                { l: "Productos vendidos", v: "127", d: "↑ 3.1%", c: "#60A5FA" },
                { l: "Mora en préstamos", v: "2.4%", d: "↓ 0.6%", c: "var(--lavender)" },
              ].map((k) => (
                <div key={k.l} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-4">
                  <div className="text-[11px] text-[var(--t-3)]">{k.l}</div>
                  <div className="kpi-num mt-1 text-[22px] font-bold md:text-[26px]" style={{ textShadow: `0 0 22px ${k.c}44` }}>{k.v}</div>
                  <div className="text-[12px]" style={{ color: k.c }}>{k.d}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-start justify-between gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-1)]/40 p-4">
              <div className="text-[13px] text-[var(--t-2)]">
                <b className="text-[var(--t-1)]">Insight IA:</b> detecté un patrón de compra a las 12h. ¿Quieres programar un cupo de inventario?
              </div>
              <button className="btn btn-soft shrink-0 text-[12px]">Aplicar</button>
            </div>
          </div>
          <div className="anim-mesh absolute -right-4 -top-6 hidden rotate-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[13px] font-semibold text-emerald-300 backdrop-blur md:block" style={{ animation: "floatP 7s ease-in-out infinite" }}>
            ✓ 50+ sistemas activos
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass)]/30 py-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
          {[
            { n: "50+", l: "sistemas verticales" },
            { n: "2030", l: "diseño futurista" },
            { n: "100%", l: "BD dedicada por cliente" },
            { n: "24/7", l: "IA y monitoreo" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-[26px] font-bold grad-text">{s.n}</div>
              <div className="text-[12px] text-[var(--t-3)]">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="sistemas" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <span className="ai-chip">⚡ Curaduría con IA</span>
          <h2 className="h1 mt-3">Un solo panel. <span className="grad-text">Todos tus sistemas.</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--t-2)]">Cada vertical se activa con un clic y comparte inventario, caja, clientes y auditoría.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mods.slice(0, 9).map((m) => {
            const catc = CATEGORIES.find((c) => c.id === m.category);
            return (
              <Link key={m.id} to={`/${m.slug}`} className="glass glass-hover group p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: catc?.gradient ?? "var(--hologram)" }}>
                    {modIcon(m)}
                  </span>
                  <span className="text-[12px] font-bold text-[var(--t-1)]">{m.priceMonth > 0 ? `$${m.priceMonth}/mes` : "Incluido"}</span>
                </div>
                <div className="mt-4 font-display text-[17px] font-bold">{m.name}</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--t-2)]">{m.description}</p>
                <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[var(--indigo)]">
                  Explorar sistema <span className="transition-transform group-hover:translate-x-1">→</span>
                  {m.priority >= 5 && <span className="ai-chip">⚡ IA</span>}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link to="/pricing" className="btn btn-soft">Ver catálogo completo ({mods.length}+) →</Link>
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass)]/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="h1 text-center">Actívalo en <span className="grad-text">3 pasos</span></h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: IconGrid, t: "1 · Elige tus sistemas", d: "Selecciona los módulos de tu industria desde el catálogo." },
              { icon: IconBolt, t: "2 · Te creamos tu negocio", d: "Aprovisionamos tu base de datos dedicada y configuramos permisos." },
              { icon: IconCheck, t: "3 · Opera con IA", d: "Factura, controla inventario y deja que la IA te alerte por ti." },
            ].map((s) => (
              <div key={s.t} className="glass p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: "var(--hologram)" }}><s.icon size={22} /></span>
                <div className="mt-4 font-display text-[17px] font-bold">{s.t}</div>
                <p className="mt-1.5 text-sm text-[var(--t-2)]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="ai-chip">⚡ INCLUSIA IA Engine</span>
            <h2 className="h1 mt-3">IA que <span className="grad-text">trabaja de noche</span>, tú descansas</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--t-2)]">
              Análisis predictivo de ventas, detección de mora temprana, redacción de informes y respuestas con tu base de conocimiento. Siempre con sello ético y revisión humana.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--t-2)]">
              {["Forecast de ingresos semanales", "Alertas de stock crítico", "Cobros y recordatorios automáticos", "Chat con tu base de conocimiento", "Generación de informes y documentos"].map((f) => (
                <li key={f} className="flex items-center gap-3"><IconCheck size={16} className="text-[var(--indigo)]" />{f}</li>
              ))}
            </ul>
            <Link to="/register" className="btn btn-primary mt-8">Probar la IA gratis</Link>
          </div>
          <div className="glass glass-strong glass-blur-lg p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ background: "var(--hologram)" }}><IconSparkles size={17} /></span>
              <div>
                <div className="text-[14px] font-bold">Asistente INCLUSIA</div>
                <div className="text-[11px] text-[var(--success)]">en línea</div>
              </div>
              <span className="ai-chip ml-auto">⚡ IA</span>
            </div>
            <div className="mt-5 space-y-3">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[var(--glass-border)] bg-[var(--glass)] p-3 text-[13px]">¿Qué negocio tengo que sistematizar para crecer?</div>
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm p-3 text-[13px] text-white" style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 8s ease infinite" }}>
                Según tu perfil: activa POS + inventarios + facturación y enlaza préstamos. Prepararé el plan de activación en 2 minutos. ⚡
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input placeholder="Pregunta algo a la IA…" className="field-input flex-1 text-[13px]" />
                <button className="btn btn-primary min-h-[40px] px-3 text-[12px]">Enviar</button>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-[var(--t-3)]">⚡ Respuestas generadas por IA. Revisa antes de tomar decisiones críticas.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--glass-border)] py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="h1">Precios <span className="grad-text">sin sorpresas</span></h2>
          <p className="mx-auto mt-3 max-w-lg text-[var(--t-2)]">Empieza gratis por 14 días y escala cuando quieras.</p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              { n: "Starter", p: "$39", d: "3 módulos · 1 usuario · BD dedicada", h: false },
              { n: "Pro", p: "$79", d: "Módulos ilimitados · IA · Usuarios ilimitados", h: true },
              { n: "Enterprise", p: "$239", d: "Multi-sucursal · SLA 99.9% · Onboarding", h: false },
            ].map((pl) => (
              <div key={pl.n} className={`glass p-6 ${pl.h ? "glass-strong" : "glass-hover"}`} style={pl.h ? { background: "linear-gradient(160deg, rgba(99,102,241,0.18), rgba(139,92,246,0.05))" } : undefined}>
                <div className="font-display text-[18px] font-bold">{pl.n}</div>
                <div className="mt-2 font-display text-[38px] font-bold">${pl.p}<span className="text-sm text-[var(--t-3)]">/mes</span></div>
                <p className="mt-2 text-[13px] text-[var(--t-2)]">{pl.d}</p>
                <Link to={`/register?plan=${pl.n.toLowerCase()}`} className={`btn ${pl.h ? "btn-primary" : "btn-soft"} mt-5 w-full`}>{pl.h ? "Empezar Pro" : "Empezar"}</Link>
              </div>
            ))}
          </div>
          <Link to="/pricing" className="mt-8 inline-block text-sm text-[var(--indigo)] hover:underline">Ver detalles de precios →</Link>
        </div>
      </section>

      <FaqSection slug="home" />

      <section className="px-4 pb-20 pt-6">
        <div className="glass glass-strong glass-blur-lg mx-auto max-w-4xl rounded-3xl p-10 text-center">
          <h2 className="h1">Tu negocio merece <span className="grad-text">un sistema que rinda en 2030</span></h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--t-2)]">14 días gratis. Sin tarjeta. Activa módulos cuando quieras.</p>
          <Link to="/register" className="btn btn-primary mt-7 px-8 py-3 text-[16px]">Crear sistema gratis <IconSparkles size={16} className="ml-1" /></Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ModulePage({ slug, mods }: { slug: string; mods: any[] }) {
  const mod = mods.find((m) => m.slug === slug);
  const st = staticCatalog[slug];
  const item = {
    title: st?.title ?? (mod?.name ?? slug),
    problem: st?.problem ?? "Los procesos manuales consumen horas, generan errores y no escalan.",
    solution: st?.solution ?? `Activa el sistema ${mod?.name ?? slug} completo en tu Suite: datos dedicados, reportes en vivo y asistencia IA.`,
    benefits: st?.benefits ?? ["Operación automatizada", "Reportes en tiempo real", "Soporte humano y IA"],
    features: st?.features ?? ["Dashboard", "Reportes", "Exportación", "IA ética"],
    price: st?.price ?? (mod ? `$${mod.priceMonth}/mes` : "Desde $29/mes"),
  };
  const catc = mod ? CATEGORIES.find((c) => c.id === mod.category) : undefined;
  const [faqs, setFaqs] = useState<any[]>([]);
  const [form, setForm] = useState({ person: "", email: "", phone: "", company: "", product: slug });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setFaqs([]);
    setSent(false);
    api.get(`/api/faq/${slug}`).then((r) => setFaqs(r.data)).catch(() => {});
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/api/leads", { ...form, source: `landing:${slug}` });
    setSent(true);
  };

  return (
    <main className="relative min-h-screen">
      <BackgroundFX />
      <Nav />
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="flex items-center gap-2 text-[13px] text-[var(--t-3)]">
          <Link to="/" className="hover:text-[var(--t-1)]">Inicio</Link> / <Link to="/pricing" className="hover:text-[var(--t-1)]">Catálogo</Link> / <span className="text-[var(--t-2)]">{item.title}</span>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {mod && (
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ background: catc?.gradient ?? "var(--hologram)" }}>
                {modIcon(mod)}
              </span>
            )}
            <h1 className="h1 mt-4">{item.title}</h1>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--t-2)]"><b className="text-[var(--t-1)]">Problema:</b> {item.problem}</p>
            <p className="mt-3 text-[16px] leading-relaxed"><b className="text-[var(--t-1)]">Solución:</b> {item.solution}</p>
            <div className="mt-8">
              <h2 className="h3">Beneficios</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {item.benefits.map((b) => (
                  <div key={b} className="glass glass-hover flex items-center gap-3 p-4 text-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "var(--hologram)" }}><IconCheck size={14} /></span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="h3">Características</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 rounded-lg border-l-2 py-1 pl-3 text-sm" style={{ borderColor: "var(--indigo)" }}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass glass-strong sticky top-24 p-6">
              <div className="font-display text-[30px] font-bold">{item.price}</div>
              <p className="mt-1 text-[13px] text-[var(--t-3)]">Incluye 14 días gratis. Sin tarjeta.</p>
              <Link to={`/register?modules=${slug}`} className="btn btn-primary mt-5 w-full">Probar gratis <IconSparkles size={15} className="ml-1" /></Link>
              <Link to="/pricing" className="btn btn-ghost mt-2 w-full">Ver catálogo completo</Link>
              <div className="mt-4 border-t border-[var(--glass-border)] pt-4 text-[12px] text-[var(--t-3)]">
                <div className="flex items-center gap-1.5"><IconShield size={13} /> SSL, backups y auditoría</div>
                <div className="mt-1 flex items-center gap-1.5"><IconSparkles size={13} className="text-[var(--lavender)]" /> IA ética con revisión humana</div>
              </div>
            </div>
          </div>
        </div>

        {faqs.length > 0 && (
          <section id="faq" className="mt-16">
            <h2 className="h2">Preguntas frecuentes</h2>
            <div className="mt-5 space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="glass rounded-xl">
                  <summary className="cursor-pointer rounded-xl px-5 py-4 text-[15px] font-semibold">{f.q}</summary>
                  <p className="px-5 pb-4 text-sm text-[var(--t-2)]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16">
          <h2 className="h2">¿Quieres una demo personalizada?</h2>
          {sent ? (
            <p className="mt-4 flex items-center gap-2 text-[var(--success)]"><IconCheck size={16} /> ¡Gracias! Te contactaremos en menos de 24h.</p>
          ) : (
            <form onSubmit={submit} className="glass mt-4 grid gap-3 p-5 sm:grid-cols-2">
              <input required placeholder="Nombre" value={form.person} onChange={(e) => setForm({ ...form, person: e.target.value })} className="field-input" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-input" />
              <input placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field-input" />
              <input placeholder="Empresa" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="field-input" />
              <Button className="sm:col-span-2">Solicitar demo</Button>
              <p className="sm:col-span-2 text-[12px] text-[var(--t-3)]">No enviamos spam. Puedes darte de baja en cualquier momento.</p>
            </form>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}

function FaqSection({ slug }: { slug: string }) {
  const [faqs, setFaqs] = useState<any[]>([]);
  useEffect(() => {
    if (slug) api.get(`/api/faq/${slug}`).then((r) => setFaqs(r.data)).catch(() => {});
  }, [slug]);
  if (!faqs.length) return null;
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14">
      <h2 className="h1 text-center">Preguntas frecuentes</h2>
      <div className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="glass rounded-xl">
            <summary className="cursor-pointer rounded-xl px-5 py-4 text-[15px] font-semibold">{f.q}</summary>
            <p className="px-5 pb-4 text-sm text-[var(--t-2)]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-[13px] text-[var(--t-3)]">
        <div className="flex items-center gap-2">
          <IconShield size={14} /> © {new Date().getFullYear()} INCLUSIA AI · Todos los derechos reservados
        </div>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="hover:text-[var(--t-1)]">Precios</Link>
          <Link to="/login" className="hover:text-[var(--t-1)]">Acceso</Link>
          <span className="ai-chip">⚡ IA ética</span>
        </div>
      </div>
    </footer>
  );
}