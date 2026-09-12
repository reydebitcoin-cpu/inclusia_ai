export type SystemItem = {
  slug: string;
  label: string;
  icon: string;
  to: string;
  description: string;
};

export type SystemGroup = {
  title: string;
  items: SystemItem[];
};

const sys = (slug: string, label: string, icon: string, description: string, route?: string): SystemItem => ({
  slug,
  label,
  icon,
  description,
  to: route ?? `/app/system/${slug}`,
});

export const canned = (slug: string): SystemItem | undefined => {
  for (const g of systemGroups) {
    const hit = g.items.find((i) => i.slug === slug);
    if (hit) return hit;
  }
  return undefined;
};

export const systemGroups: SystemGroup[] = [
  {
    title: "General",
    items: [
      sys("dashboard", "Dashboard empresarial", "📊", "KPI en tiempo real y consolidado del negocio.", "/app"),
      sys("ia-asistente", "Automatizaciones con IA", "🤖", "Asistente IA integrado a todos los módulos."),
    ],
  },
  {
    title: "Comercial",
    items: [
      sys("pos", "Sistema POS + Ventas + Inventario", "🛒", "Punto de venta, productos, stock y reportes.", "/app/pos"),
      sys("ecommerce", "E-commerce", "🌐", "Tienda online con catálogo y pagos."),
      sys("ventas-online", "Ventas Online", "💬", "Cotizaciones y ventas por WhatsApp/web."),
      sys("restaurante", "Gestión de Restaurantes", "🍽️", "Menú, mesas y cocina."),
      sys("pedidos-comida", "Pedidos de Comida", "🛵", "App de pedidos y domicilios propios."),
      sys("delivery", "Delivery", "🏍️", "Gestión de repartidores y rutas."),
      sys("facturacion", "Facturación", "📄", "Facturas, notas de crédito y secuencia por punto de venta."),
      sys("inventarios", "Inventarios", "📦", "Stock, lotes y movimientos de inventario."),
      sys("pedidos", "Gestión de Pedidos", "📋", "Seguimiento de pedidos y entregas."),
      sys("almacenes", "Gestión de Almacenes", "🏬", "Múltiples bodegas y transferencias."),
      sys("proveedores", "Gestión de Proveedores", "🚚", "Catálogo de proveedores y órdenes de compra."),
      sys("clientes", "Gestión de Clientes", "👥", "CRM ligero con historial y segmentación."),
    ],
  },
  {
    title: "Finanzas",
    items: [
      sys("prestamos", "Software de Préstamos, Cobros, Ahorros y Empeños", "💰", "Gestión completa de préstamos, cuotas, ahorros y empeños.", "/app/loans"),
      sys("prestamos-cobros", "Préstamos y Cobros", "💵", "Cobranza de cartera y cuotas.", "/app/loans"),
      sys("casa-de-cambio", "Sistema para Casa de Cambio", "💱", "Divisas, tasas de cambio y operaciones.", "/app/exchange"),
      sys("gastos", "Gastos", "🧾", "Control de caja y egresos diarios."),
    ],
  },
  {
    title: "Operaciones",
    items: [
      sys("estacionamiento", "Sistema de Estacionamiento de Vehículos", "🚗", "Entrada/salida y tarifas por tiempo.", "/app/parking"),
      sys("parqueadero-qr", "Parqueadero con Código QR", "🅿️", "Entrada/salida con QR y tarifas automáticas.", "/app/parking"),
      sys("reservas", "Reservas", "📅", "Reservas genéricas por espacio o recurso."),
      sys("reservas-tickets", "Reservas de Tickets", "🎟️", "Venta de boletos y control de capacidad."),
      sys("gasolinera", "Gasolinera", "⛽", "Surtidores, turnos y arqueo."),
      sys("gimnasio", "Gimnasio", "🏋️", "Planes, membresías y asistencia."),
      sys("iglesia", "Iglesia / Parroquia", "⛪", "Miembros, diezmos y eventos."),
      sys("salones", "Salones / Clases", "🎨", "Agenda de clases y alumnos."),
      sys("alquileres-casas", "Alquiler de Casas", "🏠", "Contratos de arrendamiento y cobros."),
      sys("alquileres-motos", "Alquiler de Motos", "🏍️", "Contratos y control de motos arrendadas."),
      sys("viajes", "Agencia de Viajes", "✈️", "Paquetes, vuelos y hoteles."),
      sys("taxis", "Taxis", "🚕", "Flota, carreras y tarifas."),
      sys("hoteles", "Hoteles", "🏨", "Habitaciones, reservas y noches."),
      sys("activos", "Gestión de Activos", "🏗️", "Activos fijos y depreciación."),
    ],
  },
  {
    title: "Educación",
    items: [
      sys("universidad", "Universidad / Colegio Virtual", "🎓", "Cursos, matrículas y aulas virtuales."),
      sys("examenes", "Exámenes Online", "📝", "Exámenes, bancos de preguntas y calificación."),
      sys("votacion", "Votación Online", "🗳️", "Votaciones y asambleas digitales."),
      sys("estudiantes", "Gestión de Estudiantes", "🎒", "Matrícula, asistencia y notas."),
      sys("colegio", "Colegio", "🏫", "Acudientes, notas y boletines."),
      sys("biblioteca", "Biblioteca", "📚", "Catalogación y préstamos de libros."),
    ],
  },
  {
    title: "Salud",
    items: [
      sys("hospital", "Hospital / Clínica", "🏥", "Admisión, urgencias y facturación hospitalaria."),
      sys("citas-medicas", "Citas Médicas", "🩺", "Agenda, recordatorios y expediente."),
      sys("citas-dentales", "Citas de Clínica Dental", "🦷", "Odontología con historia clínica dental."),
      sys("laboratorio", "Laboratorio", "🔬", "Órdenes de examen y resultados."),
      sys("farmacia", "Farmacia", "💊", "Ventas, lotes y vencimientos."),
    ],
  },
  {
    title: "Personas",
    items: [
      sys("rrhh", "Recursos Humanos", "👔", "Empleados, nómina y contratos."),
      sys("control-empleados", "Control de Empleados", "⏰", "Marcaciones y asistencia por turnos."),
      sys("empleos", "Portal de Empleos", "💼", "Ofertas, postulaciones y candidatos."),
    ],
  },
  {
    title: "Core",
    items: [
      sys("animal-law", "Derecho Animal (Abogados)", "🐾", "Casos, clientes, audiencias y seguimiento de causas.", "/app/animal-law"),
      sys("soporte", "Tickets de Soporte", "🎧", "Mesa de ayuda con IA."),
      sys("documentos", "Gestión de Documentos", "🗂️", "Repositorio con versionado."),
      sys("permisos", "Gestión de Permisos", "🔐", "Roles y permisos por usuario y módulo."),
    ],
  },
];