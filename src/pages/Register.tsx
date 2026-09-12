import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../core/api";
import { useAuth } from "../core/auth.store";
import { useModules, modIcon, CATEGORIES, Mod } from "../core/modules.store";
import { Button } from "../design-system/Button";
import { TextInput, Field } from "../design-system/Field";
import { BackgroundFX } from "../system/BackgroundFX";
import { IconSparkles, IconCheck, IconShield } from "../design-system/icons";

export function Register() {
  const { mods, loading } = useModules();
  const setSession = useAuth((s) => s.setSession);
  const navigate = useNavigate();
  const [biz, setBiz] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picked, setPicked] = useState<string[]>((mods ?? []).filter((m) => m.bundled).map((m) => m.id));
  const [plan, setPlan] = useState<"starter" | "pro">("starter");
  const [cycle, setCycle] = useState<"month" | "year">("year");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const togglePick = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { data } = await api.post("/api/auth/register", {
        businessName: biz,
        adminName,
        email,
        password,
        plan,
        billingCycle: cycle,
        moduleIds: picked,
      });
      localStorage.setItem("access_token", data.accessToken);
      setSession(data.user, data.mustChangePassword ?? true);
      navigate("/app");
    } catch (err: any) {
      setError(err.response?.data?.error ?? "No se pudo crear la cuenta");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative min-h-screen py-10">
      <BackgroundFX />
      <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-6 px-4 md:grid-cols-[1fr_1.2fr] md:py-8">
        {/* Left panel */}
        <div className="hidden md:flex md:flex-col md:justify-between">
          <div className="anim-fade-up">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-xl font-bold text-white" style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 6s ease infinite" }}>
                I
              </div>
              <div>
                <div className="font-display text-lg font-bold leading-tight">INCLUSIA AI</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--indigo)]">Business Suite 2030</div>
              </div>
            </Link>
            <h1 className="h2 mt-10">Tu negocio, <span className="grad-text">sistematizado en minutos</span></h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--t-2)]">
              Una cuenta, un panel, decenas de sistemas. Te aprovisionamos una base de datos privada, segura y con IA integrada.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--t-2)]">
              {["Base de datos dedicada por negocio", "Módulos ilimitados a tarifa plana", "IA ética con revisión humana", "Soporte prioritario y migración gratuita"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ background: "var(--hologram)" }}><IconCheck size={13} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 flex items-center gap-1.5 text-[12px] text-[var(--t-3)]">
            <IconShield size={13} /> SSL · encriptación · backups diarios · sellado IA ético
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="anim-fade-up glass glass-strong glass-blur-lg p-6 md:p-8">
          <h2 className="font-display text-xl font-bold">Crea tu cuenta</h2>
          <p className="mt-1 text-sm text-[var(--t-2)]">14 días de prueba · sin tarjeta de crédito</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Nombre de tu negocio">
              <TextInput required value={biz} onChange={(e) => setBiz(e.target.value)} placeholder="Mi empresa S.A.S." autoComplete="organization" />
            </Field>
            <Field label="Tu nombre">
              <TextInput required value={adminName} onChange={(e) => setAdminName(e.target.value)} placeholder="Ana Pérez" autoComplete="name" />
            </Field>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Email corporativo">
              <TextInput type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" autoComplete="email" />
            </Field>
            <Field label="Contraseña" hint="Mínimo 8 caracteres.">
              <TextInput type="password" required value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} autoComplete="new-password" />
            </Field>
          </div>

          <div className="mt-5">
            <div className="field-label">Tu negocio opera con</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="ai-chip">⚡ Elegí los sistemas de tu negocio</span>
            </div>
          </div>

          {/* Modules (first 12) */}
          {loading ? (
            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
            </div>
          ) : (
            <div className="mt-3 grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1 md:grid-cols-3">
              {mods.filter((m) => m.bundled || CATEGORIES.some((c) => c.id === m.category)).slice(0, 15).map((m: Mod) => {
                const on = picked.includes(m.id);
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => togglePick(m.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[12px] font-medium transition-all ${
                      on
                        ? "border-[var(--indigo)]/60 bg-[var(--indigo)]/15 text-white"
                        : "border-[var(--glass-border)] bg-[var(--glass)] text-[var(--t-2)] hover:bg-[var(--glass-hover)]"
                    }`}
                  >
                    <span className={on ? "text-[var(--lavender)]" : "text-[var(--t-3)]"}>{modIcon(m)}</span>
                    <span className="flex-1 truncate">{m.name}</span>
                    {on && <IconCheck size={13} className="text-[var(--indigo)]" />}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-5">
            <div className="mb-2 flex items-center gap-2">
              <div className="field-label mb-0">Plan</div>
              <div className="ml-auto flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] p-1 text-[12px]">
                <button type="button" onClick={() => setCycle("month")} className={`rounded-full px-3 py-1 ${cycle === "month" ? "bg-white/10" : "text-[var(--t-3)]"}`}>Mensual</button>
                <button type="button" onClick={() => setCycle("year")} className={`rounded-full px-3 py-1 ${cycle === "year" ? "bg-white/10" : "text-[var(--t-3)]"}`}>Anual −20%</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: "starter", name: "Starter", cost: cycle === "year" ? 39 : 49, note: "3 módulos, 1 usuario", hot: false },
                { id: "pro", name: "Pro", cost: cycle === "year" ? 79 : 99, note: "Todo, usuarios ilimitados", hot: true },
              ] as const).map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`relative rounded-xl border p-4 text-left transition-all ${plan === p.id ? "border-[var(--indigo)]/70 bg-[var(--indigo)]/10" : "border-[var(--glass-border)] bg-[var(--glass)] hover:bg-[var(--glass-hover)]"}`}
                >
                  {p.hot && <span className="absolute -right-1 -top-2 rounded-full bg-[var(--hologram)] px-2 py-0.5 text-[9px] font-bold text-white">HOT</span>}
                  <div className="text-[12px] font-semibold text-[var(--t-2)]">{p.name}</div>
                  <div className="mt-1 font-display text-[20px] font-bold">{p.hot ? "$" : "$"}{p.cost}<span className="text-[11px] font-normal text-[var(--t-3)]">/mes</span></div>
                  <div className="text-[11px] text-[var(--t-3)]">{p.note}</div>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="anim-shake mt-4 text-sm text-[var(--danger)]">{error}</p>}
          <Button type="submit" disabled={busy} className="mt-6 w-full">
            {busy ? "Creando tu sistema…" : <>Crear sistema <IconSparkles size={15} className="ml-1" /></>}
          </Button>
          <p className="mt-3 text-center text-[12px] text-[var(--t-3)]">
            ¿Ya tienes cuenta? <Link to="/login" className="text-[var(--indigo)] hover:underline">Iniciar sesión</Link>
          </p>
        </form>
      </div>
    </main>
  );
}