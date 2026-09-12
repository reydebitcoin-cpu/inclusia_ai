import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 650) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, target]);

  return value;
}

export function fmt(value: number, currency = true) {
  const formatted = new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
  return currency ? `$${formatted}` : formatted;
}