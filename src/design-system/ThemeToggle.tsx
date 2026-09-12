import { create } from "zustand";
import { useTheme } from "../core/theme.store";
import { IconMoon, IconSun } from "./icons";

export function ThemeToggle() {
  const theme = useTheme((s) => s.theme);
  const toggle = useTheme((s) => s.toggle);
  return (
    <button
      aria-label="Cambiar tema claro/oscuro"
      onClick={toggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur transition-all hover:bg-[var(--glass-hover)]"
    >
      {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
    </button>
  );
}