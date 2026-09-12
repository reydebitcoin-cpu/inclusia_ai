# Master Prompt — INCLUSIA AI BUSINESS SUITE

Este archivo es el **conjunto maestro común** que aplica a TODOS los módulos del catálogo. Cada `spec/modules/*.md` añade su especificación específica encima de esta base.

```text
Construye un sistema empresarial SaaS FULL, REAL Y FUNCIONAL, NO DEMO, NO MOCKUP Y NO PROTOTIPO.

El sistema debe estar preparado para producción, ser escalable, seguro, responsive y modular.

ARQUITECTURA:
- Frontend moderno y responsive para escritorio, tablet y móvil.
- Backend con API REST.
- Base de datos relacional.
- Autenticación segura.
- Autorización basada en roles y permisos.
- Validación frontend y backend.
- Registro de auditoría.
- Manejo profesional de errores.
- Logs.
- Paginación.
- Búsqueda avanzada.
- Filtros.
- Ordenamiento.
- Importación y exportación CSV/Excel/PDF cuando corresponda.
- Dashboard con KPIs.
- Notificaciones.
- Configuración general.
- Variables de entorno.
- Migraciones de base de datos.
- Seed inicial.
- Documentación técnica.
- API documentada.
- Tests unitarios e integración.
- Preparado para deployment.

ROLES:
1. SUPERADMIN
2. ADMINISTRADOR
3. OPERADOR
4. USUARIO/CLIENTE
5. Otros roles específicos del negocio.

SUPERADMIN:
- Administrar empresas.
- Administrar usuarios.
- Administrar roles.
- Administrar permisos.
- Configuración global.
- Auditoría.
- Métricas globales.
- Gestión de suscripciones.
- Activar/desactivar módulos.

ADMINISTRADOR:
- Dashboard.
- Gestión completa de la operación.
- CRUD de todos los módulos permitidos.
- Reportes.
- Configuración.
- Usuarios.
- Permisos.
- Auditoría.

USUARIO:
- Registro/login.
- Perfil.
- Consultar información propia.
- Realizar operaciones permitidas.
- Historial.
- Notificaciones.
- Documentos.
- Estado de sus solicitudes.
- Soporte.

IA:
Implementar un módulo de Inteligencia Artificial REAL mediante API configurable.

La IA debe ayudar a:
- Analizar datos.
- Generar resúmenes.
- Detectar anomalías.
- Generar recomendaciones.
- Automatizar tareas.
- Clasificar información.
- Realizar búsquedas inteligentes.
- Generar reportes ejecutivos.
- Crear asistentes conversacionales.
- Detectar posibles errores.
- Predecir tendencias cuando existan datos suficientes.

IMPORTANTE:
La IA nunca debe ejecutar operaciones críticas sin autorización.
Las decisiones importantes deben requerir confirmación humana.
Registrar en auditoría las acciones realizadas por IA.

SEGURIDAD:
- Hash seguro de contraseñas.
- JWT/session segura.
- RBAC.
- Protección contra SQL Injection.
- XSS.
- CSRF cuando aplique.
- Rate limiting.
- Validación de entradas.
- Control de acceso por recurso.
- Auditoría.
- Cifrado de información sensible.
- Backups.
- Recuperación ante errores.

ACCESIBILIDAD:
Crear interfaz accesible siguiendo WCAG.
- Navegación por teclado.
- Contraste adecuado.
- Labels.
- ARIA.
- Texto claro.
- Mensajes de error visibles.
- Compatible con lectores de pantalla.
- Subtítulos/transcripciones para contenido audiovisual.
```