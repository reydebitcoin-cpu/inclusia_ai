# Especificaciones de Módulos — INCLUSIA AI

Catálogo de 50 especificaciones de sistemas empresariales. Todas aplican sobre el
**Master Prompt** (`00-MASTER.md`): arquitectura `frontend + backend + BD | RBAC | IA
con confirmación humana | auditoría | seguridad | accesibilidad`.

## Cómo usar
Al construir un módulo: leer `00-MASTER.md` (base común) + el `.md` del módulo + la
arquitectura real ya existente en el repo (backend `backend/src/modules/*`, frontend
`src/modules/*`, `src/core/systems.ts`, rutas en `src/App.tsx`, RBAC en
`backend/src/core/rbac`, tenant por BD en `backend/src/db`).

## Índice

| # | Módulo | Slug | Spec |
|---|--------|------|------|
| 1  | Software de Préstamos + Cobros + Ahorros + Empeños | `prestamos` | [01](modules/01-prestamos-cobros-ahorros-empenos.md) |
| 2  | Sistema de Estacionamiento de Vehículos | `estacionamiento` | [02](modules/02-estacionamiento.md) |
| 3  | Juristas de Animales | `animal-law` | [03](modules/03-juristas-animales.md) |
| 4  | Sistema para Casa de Cambio | `exchange` | [04](modules/04-casa-de-cambio.md) |
| 5  | POS + Ventas + Inventario | `pos` | [05](modules/05-pos-ventas-inventario.md) |
| 6  | Parqueadero con Código QR | `parqueadero-qr` | [06](modules/06-parqueadero-qr.md) |
| 7  | E-commerce | `ecommerce` | [07](modules/07-ecommerce.md) |
| 8  | Biblioteca | `biblioteca` | [08](modules/08-biblioteca.md) |
| 9  | Universidad/Colegio Virtual | `universidad` | [09](modules/09-universidad-colegio-virtual.md) |
| 10 | Exámenes Online | `examenes` | [10](modules/10-examenes-online.md) |
| 11 | Préstamos y Cobros | `prestamos-cobros` | [11](modules/11-prestamos-y-cobros.md) |
| 12 | Votación Online | `votacion` | [12](modules/12-votacion-online.md) |
| 13 | Reservas de Tickets | `reservas-tickets` | [13](modules/13-reservas-tickets.md) |
| 14 | Pedidos de Comida | `pedidos-comida` | [14](modules/14-pedidos-comida.md) |
| 15 | Gestión de Restaurantes | `restaurante` | [15](modules/15-restaurantes.md) |
| 16 | Ventas Online | `ventas-online` | [16](modules/16-ventas-online.md) |
| 17 | Hospital/Clínica | `hospital` | [17](modules/17-hospital-clinica.md) |
| 18 | Gestión de Estudiantes | `estudiantes` | [18](modules/18-estudiantes.md) |
| 19 | Laboratorio | `laboratorio` | [19](modules/19-laboratorio.md) |
| 20 | Colegio | `colegio` | [20](modules/20-colegio.md) |
| 21 | Gastos | `gastos` | [21](modules/21-gastos.md) |
| 22 | Delivery | `delivery` | [22](modules/22-delivery.md) |
| 23 | Farmacia | `farmacia` | [23](modules/23-farmacia.md) |
| 24 | Citas Médicas | `citas-medicas` | [24](modules/24-citas-medicas.md) |
| 25 | Citas de Clínica Dental | `citas-dentales` | [25](modules/25-citas-dentales.md) |
| 26 | Recursos Humanos | `rrhh` | [26](modules/26-rrhh.md) |
| 27 | Hoteles | `hoteles` | [27](modules/27-hoteles.md) |
| 28 | Taxis | `taxis` | [28](modules/28-taxis.md) |
| 29 | Inventarios | `inventarios` | [29](modules/29-inventarios.md) |
| 30 | Facturación | `facturacion` | [30](modules/30-facturacion.md) |
| 31 | Tickets de soporte | `soporte` | [31](modules/31-tickets-soporte.md) |
| 32 | Gestión de documentos | `documentos` | [32](modules/32-gestion-documentos.md) |
| 33 | Alquiler de casas | `alquiler-casas` | [33](modules/33-alquiler-casas.md) |
| 34 | Alquiler de motos | `alquiler-motos` | [34](modules/34-alquiler-motos.md) |
| 35 | Portal de empleos | `empleos` | [35](modules/35-portal-empleos.md) |
| 36 | Agencia de viajes | `viajes` | [36](modules/36-agencia-viajes.md) |
| 37 | Gasolinera | `gasolinera` | [37](modules/37-gasolinera.md) |
| 38 | Gimnasio | `gimnasio` | [38](modules/38-gimnasio.md) |
| 39 | Iglesia/Parroquia | `iglesia` | [39](modules/39-iglesia.md) |
| 40 | Gestión de permisos | `permisos` | [40](modules/40-gestion-permisos.md) |
| 41 | Control de empleados | `control-empleados` | [41](modules/41-control-empleados.md) |
| 42 | Reservas | `reservas` | [42](modules/42-reservas.md) |
| 43 | Gestión de almacenes | `almacenes` | [43](modules/43-almacenes.md) |
| 44 | Gestión de pedidos | `pedidos` | [44](modules/44-gestion-pedidos.md) |
| 45 | Gestión de salones/clases | `salones` | [45](modules/45-salon-clases.md) |
| 46 | Gestión de activos | `activos` | [46](modules/46-gestion-activos.md) |
| 47 | Gestión de proveedores | `proveedores` | [47](modules/47-proveedores.md) |
| 48 | Gestión de clientes | `clientes` | [48](modules/48-gestion-clientes.md) |
| 49 | Dashboard empresarial | `dashboard` | [49](modules/49-dashboard-empresarial.md) |
| 50 | Automatizaciones con IA | `automatizaciones-ia` | [50](modules/50-automatizaciones-ia.md) |

## Prioridad recomendada (plataforma modular, no 50 apps aisladas)
1. #50 Automatizaciones con IA (corazón transversal / workflows + agentes + RAG)
2. #49 Dashboard empresarial + IA (BI)
3. #32 Gestión de documentos + RAG + IA
4. #48 CRM + IA
5. #05 POS + Ventas + Inventario + IA
6. #31 Help Desk + IA
7. #35 Portal de empleos + IA
8. #01 Préstamos + Cobros + Ahorros + IA

_Módulos ya implementados como dashboards reales: POS/Parking/Loans/Exchange/Animal-Law
(`src/modules/*`, `backend/src/modules/*`). Los demás aparecen hoy como placeholders en
`src/core/systems.ts` + `src/pages/SystemPlaceholder.tsx`._