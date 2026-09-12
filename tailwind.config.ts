import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: { 0: "#0A0E1A", 1: "#0F172A" },
        glass: "rgba(255,255,255,0.04)",
        vt: "#8B5CF6",
        lavender: "#A78BFA",
        holocyan: "#22D3EE",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        glass: "16px",
      },
      boxShadow: {
        glow: "0 0 24px rgba(99,102,241,0.16)",
        "glow-strong": "0 8px 28px rgba(139,92,246,0.45)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .4s cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;