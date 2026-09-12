export function Field({
  label,
  hint,
  children,
}: {
  label?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      {label && <span className="field-label">{label}</span>}
      {children}
      {hint && <span className="mt-1 block text-xs text-[var(--t-3)]">{hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="field-input" {...props} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className="field-input appearance-none" {...props}>
      {props.children}
    </select>
  );
}