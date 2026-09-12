import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth.store";
import { Button } from "../design-system/Button";
import { TextInput, Field } from "../design-system/Field";
import { BackgroundFX } from "../system/BackgroundFX";
import { IconShield } from "../design-system/icons";

export function ChangePassword() {
  const changePassword = useAuth((s) => s.changePassword);
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (next.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    if (next !== verify) return setError("Las contraseñas no coinciden");
    setBusy(true);
    try {
      await changePassword(current, next);
      navigate("/app");
    } catch (err: any) {
      setError(err.response?.data?.error ?? "No se pudo cambiar la contraseña");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <BackgroundFX />
      <div className="anim-fade-up relative z-10 w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ background: "var(--hologram)" }}>
            <IconShield size={24} />
          </div>
          <h1 className="h2 font-display">Cambiar contraseña</h1>
          <p className="mt-1 text-sm text-[var(--t-2)]">Primer acceso seguro: establece una clave nueva.</p>
        </div>
        <form onSubmit={submit} className="glass glass-strong glass-blur-lg space-y-4 p-7">
          <Field label="Contraseña actual">
            <TextInput type="password" required value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" />
          </Field>
          <Field label="Contraseña nueva" hint="Mínimo 8 caracteres.">
            <TextInput type="password" required value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" minLength={8} />
          </Field>
          <Field label="Confirmar contraseña nueva">
            <TextInput type="password" required value={verify} onChange={(e) => setVerify(e.target.value)} autoComplete="new-password" minLength={8} />
          </Field>
          {error && <p className="anim-shake text-sm text-[var(--danger)]">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? "Guardando…" : "Guardar contraseña"}</Button>
          <button type="button" onClick={() => { logout(); navigate("/login"); }} className="w-full text-sm text-[var(--t-2)] hover:text-[var(--t-1)]">
            Salir sin cambiar
          </button>
        </form>
      </div>
    </main>
  );
}