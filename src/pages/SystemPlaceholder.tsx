import { Link, useParams } from "react-router-dom";
import { BackgroundFX } from "../system/BackgroundFX";
import { canned } from "../core/systems";

export function SystemPlaceholder() {
  const { slug } = useParams();
  const sys = canned(slug ?? "");
  return (
    <main className="relative min-h-screen">
      <BackgroundFX dim />
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--glass)] text-5xl shadow-2xl">
          {sys?.icon ?? "🛠️"}
        </div>
        <h1 className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight">{sys?.label ?? "Sistema"}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--t-2)]">
          {sys?.description ?? "Este módulo forma parte del catálogo INCLUSIA AI."}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-4 py-2 text-[12.5px] text-[var(--t-2)]">
          <span className="h-2 w-2 rounded-full bg-[var(--indigo)]" />
          Módulo disponible — activable desde tu plan
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/app"
            className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] px-5 py-2.5 text-[13.5px] font-medium text-[var(--t-1)] transition-colors hover:bg-[var(--glass-strong)]"
          >
            ← Volver al dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}