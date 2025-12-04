
# 🌿 EcoShield Web App (Frontend)

[![Angular](https://img.shields.io/badge/Angular-20-red.svg?logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-18-green.svg?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Stable-success.svg)]()
[![UI](https://img.shields.io/badge/UI-Angular%20Material-blue.svg?logo=angular)]()

### Plataforma inteligente para la detección de plagas y enfermedades agrícolas

Frontend oficial del ecosistema **EcoShield**, desarrollado en **Angular 20**, con módulos de autenticación, comunidad, IA, blogs, clima y feedback totalmente integrados con el Web Service.

---

## 🚀 Características principales

### 🔐 Autenticación y Seguridad
- Login / Registro con validaciones reactivas  
- JWT + Interceptors  
- Roles: `USER` y `ADMIN`
- Guards para protección de rutas  
- Recuperación de contraseña (Forgot Password + Verify Code)

### 👤 Gestión de usuarios
- Perfil del usuario  
- Edición de datos + subida de foto  
- Cambio de contraseña  
- Actividad reciente (heartbeat)  
- Panel Admin para gestión de usuarios (ADMIN)

### 🌾 Almanaque agrícola
- Listado de plagas y enfermedades  
- Filtros: severidad, tipo, temporada  
- Ordenamiento dinámico  
- Buscador global  
- Vista detallada completa

### 🧠 Detección IA
- Subida de imágenes  
- Diagnóstico automático con recomendaciones  
- Historial de detecciones por usuario  
- UI moderna con loaders y tarjetas

### 📝 Comunidad (Posts, Comentarios, Likes)
- CRUD de posts con imagen  
- Likes y comentarios  
- Perfiles y posts por usuario  
- Buscador global con tabs: `destacados | recientes | personas`

### 📰 Blogs agrícolas
- Noticias y tips  
- CRUD completo para ADMIN  
- Destacado "Tip del día"

### 💬 Feedback
- Envío de opiniones  
- Gestión por tipo y usuario (ADMIN)

### 🌦️ Clima
- Clima por ciudad  
- Clima por coordenadas  
- Geolocalización del usuario  
- Ciudad por defecto: Lima

---

## 🎨 Tecnologías utilizadas

| Tecnología | Descripción |
|-----------|-------------|
| **Angular 20** | Framework principal |
| **TypeScript 5** | Lenguaje base |
| **Angular Material** | Componentes UI |
| **RxJS** | Programación reactiva |
| **REST API EcoShield** | Conexión con backend |
| **Cloudinary** | Manejo de imágenes |
| **Swagger API** | Referencia de endpoints |
| **JWT Interceptor** | Seguridad en front |

---

## 🧩 Estructura del proyecto

```bash
src/
 ├─ app/
 │   ├─ auth/                   → login, register, forgot-password
 │   ├─ core/                   → guards, interceptors, services base
 │   ├─ shared/                 → componentes reutilizables (tablas, cards, modales)
 │   ├─ pages/
 │   │   ├─ comunidad/          → posts, comentarios, perfiles
 │   │   ├─ deteccion/          → IA y resultados
 │   │   ├─ almanaque/          → plagas y enfermedades
 │   │   ├─ blogs/              → tips, noticias, CRUD
 │   │   ├─ feedback/           → formularios y gestión
 │   │   ├─ clima/              → clima actual y detalles
 │   │   └─ perfil/             → configuración del usuario
 │   ├─ app.config.ts           → configuración general
 │   └─ app.routes.ts           → rutas principales
 ├─ assets/                     → imágenes y recursos estáticos
 ├─ environments/               → variables por entorno
 └─ main.ts / index.html
```

---

## 📡 Comunicación con la API

El frontend consume la API desde:

```
https://ecoshieldwebservice.onrender.com/api/v1
```

Todos los requests usan:

- **Interceptors** (JWT, manejo de errores)
- **Servicios Angular**
- **Tipado estricto con interfaces/DTOs**

---

## 📦 Instalación y ejecución

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/EcoShield-Team/EcoShield-web-app.git
cd EcoShield-web-app
```

---

### 2️⃣ Instalar dependencias

```bash
npm install
```

---

### 3️⃣ Configurar variables de entorno

Editar:

```
src/environments/environment.ts
src/environments/environment.prod.ts
```

Con valores similares a:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://ecoshieldwebservice.onrender.com/api/v1',
  cloudinaryUploadPreset: '<preset>',
  cloudinaryCloudName: '<cloud_name>'
};
```

---

### 4️⃣ Ejecutar en modo desarrollo

```bash
ng serve
```

Abrir:

```
http://localhost:4200/
```

---

### 5️⃣ Build para producción

```bash
ng build --configuration production
```

---

## 🧪 Buenas prácticas implementadas

- Componentes **standalone**
- **Lazy loading** por módulos
- **Formularios reactivos** 100%
- **Guards**, **Interceptors**, **Resolvers**
- Manejo centralizado de errores
- Combinación de **Signals + RxJS**
- DTOs y **tipado estricto**
- Diseño **responsive**
- Código limpio, modular y escalable

---

## 🗂️ Versionado

### **v2.0.0 – Release Final (Arquitectura Web)**

Incluye:

- Comunidad completa (posts/comentarios/likes)
- IA con historial
- Blog + tip del día
- Almanaque con filtros avanzados
- Perfil + foto del usuario
- Panel Admin
- Feedback
- Clima
- Refactors completos de UI/UX

---

## 🧾 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.  
© 2025 – Equipo **EcoShield** 🌱

> “Una web moderna al servicio de la agricultura inteligente.”
