import { create } from "zustand";

export type Toast = { id: string; kind: "success" | "error" | "info"; text: string };

export type AppNotice = {
  id: string;
  cat: "urgent" | "action" | "info" | "ia";
  title: string;
  body?: string;
  at: string;
  actionLabel?: string;
};

const seedNotices: AppNotice[] = [
  { id: "n1", cat: "urgent", title: "Trial termina en 3 días", body: "Elige un plan para no interrumpir tu negocio.", at: "hace 2 h", actionLabel: "Elegir plan" },
  { id: "n2", cat: "action", title: "3 productos bajo stock mínimo", body: "Café Sello Rojo se agotará en ~2 días según IA.", at: "hace 5 h", actionLabel: "Ver inventario" },
  { id: "n3", cat: "ia", title: "Ingresos +12% vs ayer", body: "Detectado patrón: picos de venta a las 12h.", at: "hace 1 h", actionLabel: "Ver insights" },
  { id: "n4", cat: "info", title: "Base de conocimiento actualizada", body: "3 artículos nuevos de ayuda.", at: "ayer" },
];

export const useApp = create<{
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  notifOpen: boolean;
  setNotifOpen: (v: boolean) => void;
  notices: AppNotice[];
  unread: number;
  markAllRead: () => void;
  toasts: Toast[];
  toast: (kind: Toast["kind"], text: string) => void;
  dismissToast: (id: string) => void;
}>((set) => ({
  commandOpen: false,
  setCommandOpen: (v) => set({ commandOpen: v }),
  notifOpen: false,
  setNotifOpen: (v) => set({ notifOpen: v }),
  notices: seedNotices,
  unread: 3,
  markAllRead: () => set({ unread: 0 }),
  toasts: [],
  toast: (kind, text) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, kind, text }] }));
    setTimeout(() => useApp.getState().dismissToast(id), 4200);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));