type Request = { method?: string; body?: { email?: string; password?: string } };
type Response = { status: (code: number) => Response; json: (body: unknown) => void };

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
const demoEmail = env.DEMO_EMAIL ?? "user@demo.inclusia";
const demoPassword = env.DEMO_PASSWORD ?? "user1234";

export default function handler(req: Request, res: Response) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;
  if (email !== demoEmail || password !== demoPassword) {
    return res.status(401).json({ error: "Email o contraseña incorrectos" });
  }
  return res.status(200).json({
    accessToken: `demo-${Date.now()}`,
    mustChangePassword: false,
    user: { id: "demo-user", email: demoEmail, name: "Usuario Demo", role: "ADMIN", tenantId: "demo" },
  });
}