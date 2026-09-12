import { create } from "zustand";

type Theme = "dark" | "light";

const storageKey = "inclusia-theme";

function initial(): Theme {
  try {
    const saved = localStorage.getItem(storageKey) as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* no-op */ }
  return "dark";
}

export const useTheme = create<{ theme: Theme; toggle: () => void; set: (t: Theme) => void }>((set) => ({
  theme: initial(),
  set: (theme) => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(storageKey, theme); } catch { /* no-op */ }
    set({ theme });
  },
  toggle: () => {
    const cur = useTheme.getState().theme;
    useTheme.getState().set(cur === "dark" ? "light" : "dark");
  },
}));

export function applyThemeInit() {
  const t = useTheme.getState().theme;
  document.documentElement.dataset.theme = t;
}