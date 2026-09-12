import { create } from "zustand";
import api from "./api";

const SESSION_KEY = "inclusia_session";

function readSession(): { user: any | null; mustChangePassword: boolean } {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return { user: null, mustChangePassword: false };
    const { user, mustChangePassword } = JSON.parse(raw);
    if (!user?.id) return { user: null, mustChangePassword: false };
    return { user, mustChangePassword: !!mustChangePassword };
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return { user: null, mustChangePassword: false };
  }
}

function persistSession(user: any, mustChangePassword: boolean) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user, mustChangePassword }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

const initial = readSession();

type AuthState = {
  user: any | null;
  mustChangePassword: boolean;
  login: (email: string, password: string) => Promise<void>;
  changePassword: (current: string, next: string) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (user: any, mustChangePassword?: boolean) => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: initial.user,
  mustChangePassword: initial.mustChangePassword,
  setSession: (user, mustChangePassword) => {
    const mcp = mustChangePassword ?? user?.mustChangePassword ?? false;
    persistSession(user, mcp);
    set({ user, mustChangePassword: mcp });
  },
  login: async (email, password) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("access_token", data.accessToken);
    const mcp = data.mustChangePassword ?? false;
    persistSession(data.user, mcp);
    set({ user: data.user, mustChangePassword: mcp });
  },
  changePassword: async (current, next) => {
    await api.post("/api/auth/change-password", { current, nextPassword: next });
    clearSession();
    set({ mustChangePassword: false });
  },
  logout: async () => {
    try { await api.post("/api/auth/logout"); } catch { /* noop */ }
    localStorage.removeItem("access_token");
    clearSession();
    set({ user: null, mustChangePassword: false });
  },
}));