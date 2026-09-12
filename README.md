# INCLUSIA AI BUSINESS SUITE

Plataforma SaaS multi-tenant con núcleo compartido (auth, RBAC, RLS, auditoría, IA, billing, CRM, soporte) y módulos de negocio independientes.

## Stack
- Backend: Node + TypeScript + Express + Prisma + PostgreSQL 16
- Frontend: React 18 + Vite + TypeScript + Tailwind
- IA: adaptador OpenAI/Anthropic/local (configurable por `.env`)

## Estructura
- `backend/` — API Express (`src/index.ts`) + Prisma (`prisma/schema.prisma`) + tests Vitest
- raíz (`/`) — Frontend SPA Vite + React Router
- `../INCLUSIA_AI_NEXT_LEGACY/` — app Next.js original (archivada)

## Inicio rápido (desarrollo local)

Requisitos: PostgreSQL 16 local (macOS: Postgres.app), Node 20+.

```bash
# 1) Backend
cd backend
npm install
export DB_URL="postgresql://USER:PASS@127.0.0.1:5432/inclusia_backend"
npx prisma migrate deploy
npx prisma db seed           # o: npx tsx prisma/seed.ts
npx tsx src/index.ts         # API en http://localhost:4000

# 2) Frontend (raíz)
npm install
cp .env.example .env.development   # VITE_API_URL=http://localhost:4000
npm run dev                        # SPA en http://localhost:5173
```

Para el login cross-origin en desarrollo, expón el backend con CORS hacia el frontend:
`export CORS_ORIGIN="http://localhost:5173"` antes de iniciar la API.

## Credenciales demo
- Usuario: `user@demo.inclusia` / `user1234` (obligatorio cambiar en el primer login)
- Admin plataforma: `admin@inclusia.ai` / `Admin1234!` (obligatorio cambiar)
- Login admin: `/admin/login` (ruta oculta, protegida por RBAC + rate limit + auditoría)

## Prueba gratuita
- 7 días desde el registro.
- Al vencer: estado `suspended`. Lectura y exportación habilitadas; escrituras bloqueadas.

## Endpoints principales
- `POST /api/auth/login` · `POST /api/auth/change-password`
- `GET /api/pos/products` · `POST /api/pos/sales`
- `POST /api/parking/entry` · `POST /api/parking/exit`
- `POST /api/loans/simulate` · `POST /api/loans/loans` · `POST /api/loans/:id/pay`
- `GET /api/exchange/rates` · `POST /api/exchange/operations`
- `GET /api/animal-law/cases` · `POST /api/animal-law/cases/:id/documents`
- `POST /api/crm/leads` · `GET /api/crm/leads`
- `POST /api/ai/ask` (RAG sobre base de conocimiento)
- `GET /api/billing/plans` · `POST /api/billing/checkout`
- `GET /api/products` (público) · `POST /api/leads` (público)
- `GET /admin/dashboard` (oculto, requiere SUPER_ADMIN/ADMIN)

## Seguridad (defensa en profundidad)
- Contraseñas: bcrypt 12 rondas, mínimo 8 caracteres.
- JWT corto (15 min) + sesiones en DB.
- RBAC con matriz de permisos por rol.
- RLS en PostgreSQL (`tenantId`) — forzado (FORCE ROW LEVEL SECURITY). En el backend, cada request autenticado ejecuta `SELECT set_config('app.current_tenant', …)` en la misma transacción que las queries del cliente Prisma extendido; las transacciones multi-paso usan `base.$transaction` con GUC manual. Verificado por tests que corren con un rol no-superusuario.
- CSRF doble-submit (`/api/csrf-token` → `x-csrf-token`), rate limit por ruta, bloqueo tras 5 intentos fallidos / 15 min.
- Helmet + CSP + CORS restrictivo.
- Auditoría de acciones críticas.
- No se guardan datos de tarjetas: checkout externalizado.
- IA: siempre marca respuestas como generadas por IA y no ejecuta acciones críticas sin confirmación.

## Tests
```bash
cd backend && npx vitest run     # unit + integración (RLS como rol no-superusuario: DB_URL=postgresql://inclusia_app:...)
cd backend && npx tsc --noEmit   # typecheck
npm run build                    # frontend: tsc + vite build
```

## Extensión
Cada nuevo producto:
1. Añadir modelos en `backend/prisma/schema.prisma` con `tenantId` y migrar.
2. Crear router en `backend/src/modules/<producto>/router.ts` con `requirePermission`.
3. Crear dashboard en `src/modules/<producto>/`.
4. Agregar entrada en `catalog` del landing.

## Licencia
Código propietario. No se entrega a clientes finales.