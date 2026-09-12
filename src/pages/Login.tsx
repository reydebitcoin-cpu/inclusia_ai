import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth.store";
import { Button } from "../design-system/Button";
import { TextInput, Field } from "../design-system/Field";
import { BackgroundFX } from "../system/BackgroundFX";
import { IconSparkles, IconShield } from "../design-system/icons";

export function Login({ admin }: { admin?: boolean }) {
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate(admin ? "/admin" : "/app");
    } catch (err: any) {
      setError(
        err.response?.data?.error
          ?? (err.request ? "No se puede conectar con la API. Revisa la configuración del servicio." : "No se pudo iniciar sesión"),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <BackgroundFX />
      <div className="anim-fade-up relative z-10 w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white shadow-[var(--shadow-2)]" style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 6s ease infinite" }}>
            I
          </div>
          <h1 className="h2 font-display">{admin ? "Consola de administración" : "INCLUSIA AI"}</h1>
          <p className="mt-1 text-sm text-[var(--t-2)]">
            {admin
              ? <>Ruta protegida por RBAC <IconShield size={14} className="inline" /></>
              : "Business Suite · Sistema operativo para tu negocio 2030"}
          </p>
        </div>

        <form onSubmit={submit} className="glass glass-strong glass-blur-lg space-y-4 p-7">
          <Field label="Email">
            <TextInput type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="tu@negocio.com" />
          </Field>
          <Field label="Contraseña">
            <TextInput type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="••••••••" />
          </Field>
          {error && <p className="anim-shake text-sm text-[var(--danger)]">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full" variant="primary">
            {busy ? "Verificando credenciales…" : "Entrar al sistema"}
          </Button>
          {!admin && (
            <Link to="/pricing" className="block text-center text-[13px] text-[var(--indigo)] hover:underline">
              ¿Aún no tienes cuenta? Empieza hoy
            </Link>
          )}
        </form>

        {!admin && (
          <p className="mt-4 flex items-center justify-center gap-1 text-center text-[11px] text-[var(--t-3)]">
            <IconSparkles size={12} /> Sello IA ético: cada dato generado por IA requiere revisión humana.
          </p>
        )}
      </div>
    </main>
  );
}