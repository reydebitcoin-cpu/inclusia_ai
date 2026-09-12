import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth.store";
import { useApp } from "../core/app.store";
import { systemGroups } from "../core/systems";
import { IconBell, IconLogout, IconChevron, IconMenu, IconSearch, IconCommand } from "../design-system/icons";
import { ThemeToggle } from "../design-system/ThemeToggle";
import { TrialCounter } from "../system/TrialCounter";

export function Shell() {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const setCommandOpen = useApp((s) => s.setCommandOpen);
  const setNotifOpen = useApp((s) => s.setNotifOpen);
  const unread = useApp((s) => s.unread);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const leave = () => {
    void logout();
    navigate("/login");
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`sticky top-0 z-40 h-screen shrink-0 flex-col border-r border-[var(--glass-border)] bg-[var(--bg-1)]/50 backdrop-blur-2xl transition-all duration-300 md:flex ${collapsed ? "w-[76px]" : "w-[256px]"} ${mobileOpen ? "flex" : "hidden"}`}
      >
        <div className="relative flex items-center gap-3 px-4 py-5">
          <div className="relative">
            <button
              aria-label="INCLUSIA"
              onClick={() => navigate("/app")}
              className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold text-white"
              style={{ background: "var(--hologram)", backgroundSize: "180% 180%", animation: "gradientShift 6s ease infinite" }}
            >
              I
            </button>
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--success)] text-[8px] text-white">✓</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate font-display text-[15px] font-bold leading-tight">INCLUSIA</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--indigo)]">Business Suite 2030</div>
            </div>
          )}
          <button
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            onClick={() => setCollapsed((c) => !c)}
            className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--bg-1)] text-[var(--t-2)] hover:text-[var(--t-1)]"
          >
            <IconChevron size={13} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 pb-3">
            <TrialCounter />
          </div>
        )}

        <nav className="mt-2 flex-1 space-y-3 overflow-y-auto px-3 pb-4">
          {systemGroups.map((g) => (
            <div key={g.title}>
              {!collapsed && (
                <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--t-3)]">{g.title}</div>
              )}
              <div className="space-y-0.5">
                {g.items.map((l) => (
                  <NavLink
                    key={`${g.title}-${l.slug}`}
                    to={l.to}
                    end={l.to === "/app"}
                    onClick={closeMobile}
                    title={collapsed ? l.label : undefined}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all ${
                        collapsed ? "justify-center" : ""
                      } ${
                        isActive
                          ? "bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                          : "text-[var(--t-2)] hover:bg-[var(--glass)] hover:text-[var(--t-1)]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <span className="absolute left-0 h-5 w-0.5 rounded-full" style={{ background: "var(--hologram)" }} />}
                        <span className={`flex w-5 shrink-0 items-center justify-center text-[15px] ${isActive ? "" : "grayscale-[0.35] group-hover:grayscale-0"}`}>
                          {l.icon}
                        </span>
                        {!collapsed && <span className="truncate">{l.label}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[var(--glass-border)] p-3">
          <div className={`flex items-center gap-3 rounded-xl p-2 ${collapsed ? "justify-center" : ""}`}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "var(--hologram)" }}>
              {(user?.name ?? user?.email ?? "U").slice(0, 2).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{user?.name ?? user?.email}</div>
                <div className="text-[11px] text-[var(--t-3)]">{user?.role}</div>
              </div>
            )}
            <button
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
              onClick={leave}
              className="text-[var(--t-3)] transition-colors hover:text-[var(--danger)]"
            >
              <IconLogout size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Layout content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--glass-border)] bg-[var(--bg-0)]/60 px-4 backdrop-blur-xl md:px-6">
          <button
            aria-label="Menú"
            title="Abrir menú"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <IconMenu size={20} />
          </button>
          <button
            onClick={() => setCommandOpen(true)}
            className="flex h-11 flex-1 max-w-md items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] px-3.5 text-sm text-[var(--t-3)] transition-colors hover:border-[var(--indigo)]/40 hover:bg-[var(--glass-hover)]"
          >
            <IconSearch size={16} />
            <span className="flex-1 text-left">Buscar o preguntar a la IA…</span>
            <kbd className="flex items-center gap-1 rounded-md border border-[var(--glass-border)] bg-[var(--glass-strong)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--t-2)]">
              <IconCommand size={11} /> K
            </kbd>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <span className="ai-chip hidden sm:inline-flex">⚡ IA</span>
            <ThemeToggle />
            <button
              aria-label="Notificaciones"
              onClick={() => setNotifOpen(true)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--t-1)] transition-colors hover:bg-[var(--glass-hover)]"
            >
              <IconBell size={18} />
              {unread > 0 && (
                <span className="absolute right-2 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--hologram)] px-1 text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
            <button
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
              onClick={leave}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] px-3 text-[var(--t-1)] transition-colors hover:border-[var(--danger)]/60 hover:text-[var(--danger)]"
            >
              <IconLogout size={17} />
              <span className="hidden lg:inline text-[12.5px] font-medium">Salir</span>
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}