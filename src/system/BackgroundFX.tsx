import { useMemo } from "react";

export function BackgroundFX({ dim = false }: { dim?: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (i * 37 + 11) % 100,
        top: (i * 53 + 7) % 100,
        size: 2 + ((i * 13) % 5),
        dur: 14 + ((i * 7) % 16),
        delay: (i * 1.3) % 9,
      })),
    [],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* mesh gradient blobs */}
      <div className="anim-mesh absolute -left-[10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.28), transparent 65%)" }} />
      <div className="anim-mesh absolute right-[-12%] top-[20%] h-[50vmax] w-[50vmax] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22), transparent 65%)", animationDelay: "-7s" }} />
      <div className="anim-mesh absolute bottom-[-18%] left-[20%] h-[46vmax] w-[46vmax] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.14), transparent 65%)", animationDelay: "-13s" }} />

      {/* neural particles */}
      <div className={dim ? "opacity-40" : ""}>
        {particles.map((p) => (
          <span
            key={p.id}
            className="anim-mesh absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: "rgba(167,139,250,0.5)",
              boxShadow: "0 0 8px rgba(139,92,246,0.6)",
              animation: `floatP ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}