type Request = { method?: string };
type Response = { status: (code: number) => Response; json: (body: unknown) => void };

export default function handler(req: Request, res: Response) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  return res.status(200).json({ csrfToken: "demo-csrf-token" });
}