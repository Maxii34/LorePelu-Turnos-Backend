<div align="center">

# 💇‍♀️ LorePelu — Turnos Backend

### API REST para la gestión integral de turnos, servicios y comentarios de una peluquería

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9.5-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![License](https://img.shields.io/github/license/Maxii34/LorePelu-Turnos-Backend?style=flat-square)](#-licencia)
[![Last Commit](https://img.shields.io/github/last-commit/Maxii34/LorePelu-Turnos-Backend?style=flat-square)](https://github.com/Maxii34/LorePelu-Turnos-Backend/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/Maxii34/LorePelu-Turnos-Backend?style=flat-square)](#)
[![Issues](https://img.shields.io/github/issues/Maxii34/LorePelu-Turnos-Backend?style=flat-square)](https://github.com/Maxii34/LorePelu-Turnos-Backend/issues)
[![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow?style=flat-square)](#)

[Características](#-características) •
[Tecnologías](#️-tecnologías) •
[Instalación](#-instalación-y-puesta-en-marcha) •
[Endpoints](#-documentación-de-la-api) •
[Estructura](#-estructura-del-proyecto) •
[Autor](#-autor)

</div>

---

## 📋 Descripción

**LorePelu Turnos Backend** es una **API REST** desarrollada en Node.js y Express que resuelve la gestión completa de una peluquería: turnos, servicios, comentarios de clientes y administración de usuarios con roles.

Implementa autenticación basada en **JWT + cookies httpOnly**, control de acceso por roles (**RBAC**), validación exhaustiva de datos con `express-validator`, subida de imágenes a **Cloudinary** vía `multer`, y persistencia en **MongoDB** a través de **Mongoose**. Está preparada para desplegarse en **Vercel** como función serverless.

Es el backend consumido por el frontend [**Sistema-TurnosPeluqueria**](https://github.com/Maxii34/Sistema-TurnosPeluqueria) (React + Vite).

---

## ✨ Características

- 🔐 **Autenticación y autorización** — Registro/login de administradores con JWT, cookies seguras y roles (`administrador`, `moderador`, `usuario`).
- 📅 **Gestión de turnos** — Alta, edición, cancelación, cambio de estado y consulta de horarios disponibles, con validación de solapamiento de horarios.
- 💆 **Catálogo de servicios** — ABM completo con carga de imagen (Cloudinary), duración y búsqueda.
- ⭐ **Comentarios y valoraciones** — CRUD de comentarios de clientes con activación/desactivación y control de propietario.
- 👤 **Perfiles de administrador** — Edición de datos y foto de perfil, baja de cuenta.
- 🛡️ **Middlewares robustos** — Validación de esquemas, verificación de token, control de roles, manejo de errores de subida de archivos (Multer) e IDs.
- ☁️ **Listo para producción** — Configuración de CORS por origen permitido y despliegue serverless en Vercel.

---

## 🛠️ Tecnologías

<table>
<tr><td valign="top">

**Core**

| Paquete | Versión |
|---|---|
| Node.js | 18+ |
| Express | ^5.2.1 |
| Mongoose | ^9.5.0 |

</td><td valign="top">

**Auth & Seguridad**

| Paquete | Versión |
|---|---|
| jsonwebtoken | ^9.0.3 |
| bcrypt | ^6.0.0 |
| cookie-parser | ^1.4.7 |

</td><td valign="top">

**Validación & Middleware**

| Paquete | Versión |
|---|---|
| express-validator | ^7.3.2 |
| cors | ^2.8.6 |
| morgan | ^1.10.1 |

</td><td valign="top">

**Archivos & Config**

| Paquete | Versión |
|---|---|
| multer | ^2.2.0 |
| cloudinary | ^2.10.0 |
| dotenv | ^17.4.2 |

</td></tr>
</table>

---

## 📦 Requisitos previos

- **Node.js** v18 o superior
- **npm**
- Instancia de **MongoDB** (local o Atlas)
- Cuenta de **Cloudinary** (para almacenamiento de imágenes)

---

## 🚀 Instalación y puesta en marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/Maxii34/LorePelu-Turnos-Backend.git
cd LorePelu-Turnos-Backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
MONGODB=mongodb+srv://usuario:contraseña@cluster.mongodb.net/lorepelu

# Autenticación
JWT_SECRET=tu_clave_secreta_super_segura

# CORS - Frontend permitido
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 4. Ejecutar el servidor

```bash
# Modo desarrollo (hot-reload con --watch)
npm run dev

# Modo producción
npm start
```

El servidor quedará disponible en `http://localhost:3000` (o el `PORT` configurado).

---

## 📚 Documentación de la API

Todas las rutas están prefijadas con **`/api`**.

### 🔐 Administradores — `/api/admin`

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/registro` | Registrar nuevo administrador | Público |
| `POST` | `/login` | Iniciar sesión | Público |
| `POST` | `/logout` | Cerrar sesión | Público |
| `GET` | `/me` | Obtener perfil propio | Autenticado |
| `PUT` | `/me` | Actualizar perfil (con foto) | Autenticado |
| `DELETE` | `/me` | Eliminar cuenta propia | Autenticado |
| `GET` | `/` | Listar administradores | Autenticado |
| `GET` | `/:id` | Obtener por ID | Admin / Moderador |
| `PUT` | `/:id` | Actualizar por ID | Admin / Usuario |
| `DELETE` | `/:id` | Eliminar por ID | Admin / Usuario |

### 📅 Turnos — `/api/turno`

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/` | Crear turno | Público |
| `GET` | `/` | Listar turnos | Público |
| `GET` | `/horarios-disponibles` | Consultar horarios libres | Público |
| `GET` | `/buscar` | Buscar turnos | Público |
| `GET` | `/:id` | Obtener turno por ID | Autenticado |
| `PUT` | `/:id` | Actualizar turno | Autenticado |
| `DELETE` | `/:id` | Cancelar turno | Usuario / Admin / Moderador |
| `PATCH` | `/:id` | Cambiar estado del turno | Usuario / Admin / Moderador |

### 💆 Servicios — `/api/servicio`

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/` | Crear servicio (con imagen) | Admin / Moderador |
| `GET` | `/` | Listar servicios | Público |
| `GET` | `/buscar` | Buscar servicios | Público |
| `GET` | `/:id` | Obtener servicio por ID | Admin / Moderador |
| `PUT` | `/:id` | Actualizar servicio | Admin / Moderador |
| `DELETE` | `/:id` | Eliminar servicio | Admin / Moderador |

### ⭐ Comentarios — `/api/comentario`

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/` | Crear comentario | Admin / Usuario |
| `GET` | `/` | Listar comentarios | Público |
| `GET` | `/:id` | Obtener comentario por ID | Autenticado |
| `PUT` | `/:id` | Actualizar comentario | Propietario (Admin / Usuario) |
| `PATCH` | `/:id` | Desactivar comentario | Propietario (Admin / Usuario) |

---

## 🔒 Autenticación y roles

La API utiliza **JSON Web Tokens** (enviados vía cookie httpOnly y/o header) para proteger las rutas privadas:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Roles disponibles:**

| Rol | Permisos |
|---|---|
| `usuario` | Acceso básico: gestionar sus propios turnos y comentarios |
| `moderador` | Gestión de turnos y servicios |
| `administrador` | Acceso total a la plataforma |

---

## 🗂️ Estructura del proyecto

```
LorePelu-Turnos-Backend/
├── index.js                  # Punto de entrada
├── vercel.json                # Configuración de despliegue serverless
├── public/                    # Archivos estáticos
└── src/
    ├── server/
    │   ├── config.js           # Configuración de Express (middlewares, CORS, rutas)
    │   └── dbConfig.js         # Conexión a MongoDB
    ├── routes/                 # Definición de endpoints por recurso
    ├── controllers/            # Lógica de entrada/salida HTTP
    ├── services/                # Lógica de negocio
    ├── repositories/            # Acceso a datos (Mongoose)
    ├── model/                   # Esquemas de MongoDB
    ├── middlewares/             # Auth, validaciones, roles, manejo de errores
    ├── helpers/                  # Utilidades (subida de archivos, etc.)
    └── constants/                 # Constantes del proyecto
```

---

## ☁️ Despliegue

El proyecto incluye `vercel.json` listo para desplegarse como función serverless en **Vercel**. Solo es necesario configurar las variables de entorno del apartado anterior en el panel del proyecto.

---

## 🔗 Proyecto relacionado

- **Frontend:** [Sistema-TurnosPeluqueria](https://github.com/Maxii34/Sistema-TurnosPeluqueria) — SPA en React + Vite que consume esta API.

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **ISC**.

---

## 👤 Autor

**Maximiliano Exequiel Ordoñez**

[![GitHub](https://img.shields.io/badge/GitHub-Maxii34-181717?style=flat-square&logo=github)](https://github.com/Maxii34)

<div align="center">

⭐ Si este proyecto te resultó útil, considerá dejarle una estrella en GitHub

</div>