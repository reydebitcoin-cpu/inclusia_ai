import { useEffect, useState, createElement, type ReactNode } from "react";
import api from "./api";
import {
  IconChart, IconCar, IconWallet, IconCoins, IconPaw, IconCart,
  IconUsers, IconGrid, IconShield, IconBuilding, IconClock, IconBolt,
} from "../design-system/icons";

export type Mod = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  priceMonth: number;
  priceYear: number;
  bundled: boolean;
  priority: number;
};

export const CATEGORIES: { id: string; label: string; gradient: string }[] = [
  { id: "core", label: "Core", gradient: "linear-gradient(135deg,#6366F1,#22D3EE)" },
  { id: "finance", label: "Finanzas", gradient: "linear-gradient(135deg,#2563EB,#F59E0B)" },
  { id: "commerce", label: "Comercio", gradient: "linear-gradient(135deg,#F97316,#FACC15)" },
  { id: "ops", label: "Operaciones", gradient: "linear-gradient(135deg,#F97316,#3B82F6)" },
  { id: "education", label: "Educación", gradient: "linear-gradient(135deg,#3B82F6,#8B5CF6)" },
  { id: "health", label: "Salud", gradient: "linear-gradient(135deg,#14B8A6,#0EA5E9)" },
  { id: "people", label: "Personas", gradient: "linear-gradient(135deg,#A855F7,#EC4899)" },
];

const CAT_ICON: Record<string, (p: any) => ReactNode> = {
  core: IconChart, finance: IconWallet, commerce: IconCart, ops: IconBolt,
  education: IconGrid, health: IconShield, people: IconUsers,
};

const FALLBACK: Mod[] = [
  { id: "f1", slug: "dashboard", name: "Dashboard Inteligente", category: "core", description: "Cuadro de mando con KPI en vivo, forecast IA y alertas.", icon: "dashboard", priceMonth: 0, priceYear: 0, bundled: true, priority: 1 },
  { id: "f2", slug: "pos", name: "POS & Punto de Venta", category: "commerce", description: "Facturación exprés con escáner, impresora y arqueo de caja.", icon: "cart", priceMonth: 15, priceYear: 150, bundled: true, priority: 2 },
  { id: "f3", slug: "prestamos", name: "Préstamos e Intereses", category: "finance", description: "Créditos, cuotas, mora e intereses con recordatorios IA.", icon: "wallet", priceMonth: 15, priceYear: 150, bundled: false, priority: 3 },
  { id: "f4", slug: "parqueadero", name: "Parqueadero", category: "ops", description: "Celdas, tarifas por hora y cierre de caja diario.", icon: "car", priceMonth: 12, priceYear: 120, bundled: false, priority: 4 },
  { id: "f5", slug: "casa-de-cambio", name: "Casa de Cambio", category: "finance", description: "Divisas en tiempo real, transacciones y respaldo legal.", icon: "coins", priceMonth: 12, priceYear: 120, bundled: false, priority: 5 },
  { id: "f6", slug: "juristas-animales", name: "Juristas de Animales", category: "people", description: "Expedientes, peritajes y documentación legal animal.", icon: "paw", priceMonth: 14, priceYear: 140, bundled: false, priority: 6 },
];

export function modIcon(m: Mod) {
  const Fallback = CAT_ICON[m.category] ?? IconGrid;
  return createElement(Fallback, { size: 22 });
}

export function useModules() {
  const [mods, setMods] = useState<Mod[]>(FALLBACK);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/api/public/modules").then(({ data }) => data?.length ? setMods(data) : null)
      .catch(() => { /* offline */ })
      .finally(() => setLoading(false));
  }, []);
  const categories = [...new Set(mods.map((m) => m.category))];
  return { mods, loading, categories };
}