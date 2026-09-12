import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "soft" | "ghost" | "danger" | "success";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const variantClass = variant === "secondary" ? "btn-soft" : `btn-${variant}`;
  return (
    <button className={`btn ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}