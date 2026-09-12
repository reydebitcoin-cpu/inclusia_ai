type Request = { method?: string };
type Response = { status: (code: number) => Response; json: (body: unknown) => void };

const modules = [
  { id: "dashboard", slug: "dashboard", name: "Dashboard Inteligente", category: "core", description: "Cuadro de mando con KPI en vivo.", icon: "dashboard", priceMonth: 0, priceYear: 0, bundled: true, priority: 1 },
  { id: "pos", slug: "pos", name: "POS & Punto de Venta", category: "commerce", description: "Facturación y control de inventario.", icon: "cart", priceMonth: 15, priceYear: 150, bundled: true, priority: 2 },
  { id: "crm", slug: "clientes", name: "Gestión de Clientes", category: "commerce", description: "CRM ligero con historial y segmentación.", icon: "users", priceMonth: 12, priceYear: 120, bundled: false, priority: 3 },
];

export default function handler(req: Request, res: Response) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  return res.status(200).json(modules);
}