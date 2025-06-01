# Smartbell POC - Gestión de Ranchos Lecheros

Una aplicación web moderna para la administración de ranchos lecheros, construida con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características Principales

- **Onboarding simplificado**: Solo 3 pasos para comenzar
- **Dashboard intuitivo**: Vista general de métricas clave
- **Gestión de ganado**: Registro y seguimiento de animales
- **Control de producción**: Registro diario de producción lechera
- **Tareas y recordatorios**: Sistema de gestión de tareas
- **Diseño responsive**: Funciona en dispositivos móviles y desktop

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Estado Global**: Zustand
- **Base de datos**: PostgreSQL + Prisma ORM
- **Formularios**: React Hook Form + Zod
- **Deployment**: Vercel

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- PostgreSQL (local o en la nube)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/smartbell-poc.git
cd smartbell-poc
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tu configuración:
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/smartbell"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-aqui"
```

4. Configura la base de datos:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. (Opcional) Carga datos de prueba:
```bash
npx prisma db seed
```

## 🚀 Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Build para Producción

```bash
npm run build
npm start
```

## 🚢 Deployment en Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

3. Configura las variables de entorno en Vercel Dashboard

## 📱 Estructura del Proyecto

```
smartbell-poc/
├── src/
│   ├── app/              # Páginas y rutas (App Router)
│   ├── components/       # Componentes React
│   │   ├── auth/        # Componentes de autenticación
│   │   ├── cattle/      # Componentes de ganado
│   │   ├── dashboard/   # Componentes del dashboard
│   │   └── ui/          # Componentes UI (shadcn)
│   ├── lib/             # Utilidades y configuración
│   ├── store/           # Estado global (Zustand)
│   └── types/           # Tipos TypeScript
├── prisma/
│   └── schema.prisma    # Esquema de base de datos
├── public/              # Archivos estáticos
└── package.json
```

## 🔄 Flujo de Usuario

1. **Onboarding**:
   - Bienvenida
   - Registro del rancho
   - Registro del primer animal
   - Oferta de membresía

2. **Dashboard**:
   - Vista general de métricas
   - Tareas del día
   - Acciones rápidas
   - Progreso de registro

3. **Gestión de Ganado**:
   - Agregar nuevo animal
   - Información básica y avanzada
   - Historial de producción

## 🎯 Mejoras Implementadas

- **Onboarding simplificado**: De múltiples pasos complejos a solo 3 pasos esenciales
- **Formularios progresivos**: Campos básicos primero, opciones avanzadas colapsadas
- **Dashboard claro**: Métricas importantes visibles de inmediato
- **UX mejorada**: Navegación intuitiva y diseño moderno
- **Responsive**: Funciona perfectamente en móviles

## 🔮 Próximas Características

- [ ] Autenticación completa con NextAuth
- [ ] Gráficos de producción histórica
- [ ] Sistema de notificaciones
- [ ] Exportación de reportes
- [ ] Integración con WhatsApp
- [ ] Modo offline
- [ ] App móvil nativa

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o sugerencias, contacta a: [tu-email@ejemplo.com]

---

Hecho con ❤️ para la comunidad ganadera mexicana 🐄