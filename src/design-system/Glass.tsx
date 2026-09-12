import type { HTMLAttributes } from "react";

export function GlassCard({ hover = false, className = "", children, ...props }: HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div className={`glass ${hover ? "glass-hover" : ""} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}