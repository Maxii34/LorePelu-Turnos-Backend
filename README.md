# 💇‍♀️  Peluqueria: Sistema de gestion de turnos

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.5.0-green?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-9.0.3-blue?style=for-the-badge&logo=jsonwebtokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-6.0.0-lightblue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow?style=for-the-badge)

**API REST para gestión de turnos, servicios y comentarios de una peluquería**

[Ver Documentación](#-documentación) • [Instalación](#-instalación) • [Uso](#-uso)

</div>

---

## 📋 Descripción

Esta **API REST** es una solución robusta desarrollada con Node.js y Express que gestiona de forma completa:

- 👤 **Gestión de Administradores**: Registro, login, roles y permisos
- 📅 **Sistema de Turnos**: Crear, actualizar, cancelar y confirmar reservas
- 💆 **Catálogo de Servicios**: ABM de servicios disponibles
- ⭐ **Sistema de Comentarios**: Valoraciones y opiniones de clientes

La API implementa autenticación JWT, validación robusta de datos, control de acceso basado en roles (RBAC) y manejo seguro de contraseñas con bcrypt.

---

## 👤 Autor

**Maximiliano Exequiel Ordoñez**

---

## 🛠️ Tecnologías Utilizadas

### Backend
| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js) | 18+ | Runtime de JavaScript |
| ![Express](https://img.shields.io/badge/Express-5.2.1-000?logo=express) | 5.2.1 | Framework web |
| ![Mongoose](https://img.shields.io/badge/Mongoose-9.5.0-880000?logo=mongodb) | 9.5.0 | ODM para MongoDB |
| ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb) | - | Base de datos NoSQL |

### Autenticación & Seguridad
| Paquete | Versión | Uso |
|---------|---------|-----|
| ![JWT](https://img.shields.io/badge/jsonwebtoken-9.0.3-blue) | 9.0.3 | Tokens JWT |
| ![Bcrypt](https://img.shields.io/badge/bcrypt-6.0.0-lightblue) | 6.0.0 | Hash de contraseñas |

### Validación & Middleware
| Paquete | Versión | Uso |
|---------|---------|-----|
| ![Express-Validator](https://img.shields.io/badge/express--validator-7.3.2-blue) | 7.3.2 | Validación de datos |
| ![CORS](https://img.shields.io/badge/CORS-2.8.6-orange) | 2.8.6 | Cross-Origin |
| ![Morgan](https://img.shields.io/badge/Morgan-1.10.1-gray) | 1.10.1 | HTTP Logger |
| ![Cookie Parser](https://img.shields.io/badge/cookie--parser-1.4.7-brown) | 1.4.7 | Parsear cookies |

### Configuración
| Paquete | Versión | Uso |
|---------|---------|-----|
| ![Dotenv](https://img.shields.io/badge/dotenv-17.4.2-yellow) | 17.4.2 | Variables de entorno |

---

## 📦 Requisitos Previos

- **Node.js** v18 o superior
- **npm** o **yarn**
- **MongoDB** (local o Atlas cloud)
- **Git**

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/peluqueria-backend.git
cd peluqueria-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=3001

# Base de datos MongoDB
MONGODB=mongodb+srv://usuario:contraseña@cluster.mongodb.net/peluqueria

# Autenticación JWT
JWT_SECRET=tu_clave_secreta_super_segura_aqui_12345

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:3000

# Ambiente
NODE_ENV=development
```

### 4. Ejecutar migraciones/seed (si las hay)
```bash
# Opcional: Crear datos iniciales
npm run seed
```

---

## 💻 Uso

### Modo desarrollo
```bash
npm run dev
```
Ejecuta el servidor con **hot-reload**. Accesible en: `http://localhost:3001`

### Modo producción
```bash
npm start
```

---

## 📚 Documentación

### Estructura del Proyecto
```
src/
├── controllers/          # Controladores (lógica de rutas)
├── services/            # Servicios (lógica de negocio)
├── repositories/        # Acceso a datos
├── models/              # Esquemas de Mongoose
├── middlewares/         # Middlewares (autenticación, validación, etc)
├── routes/              # Rutas de la API
├── constants/           # Constantes del proyecto
├── server/
│   ├── config.js        # Configuración del servidor
│   └── dbConfig.js      # Conexión a MongoDB
```

### Endpoints Principales

#### 🔐 Autenticación (Admin)
```bash
POST   /api/admin/registro          # Crear nuevo administrador
POST   /api/admin/login             # Iniciar sesión
GET    /api/admin/                  # Obtener todos (requiere token)
GET    /api/admin/:id               # Obtener por ID (requiere token)
PUT    /api/admin/:id               # Actualizar (requiere token)
DELETE /api/admin/:id               # Eliminar (requiere token, admin)
```

#### 📅 Turnos
```bash
POST   /api/turno/                  # Crear turno
GET    /api/turno/                  # Obtener todos los turnos
GET    /api/turno/:id               # Obtener turno por ID
PUT    /api/turno/:id               # Actualizar turno
DELETE /api/turno/:id               # Cancelar turno
PATCH  /api/turno/:id               # Cambiar estado del turno
```

#### 💆 Servicios
```bash
POST   /api/servicio/               # Crear servicio (requiere admin/moderador)
GET    /api/servicio/               # Obtener todos los servicios
GET    /api/servicio/:id            # Obtener servicio por ID
PUT    /api/servicio/:id            # Actualizar servicio
DELETE /api/servicio/:id            # Eliminar servicio
```

#### ⭐ Comentarios
```bash
POST   /api/comentario/             # Crear comentario
GET    /api/comentario/             # Obtener todos
GET    /api/comentario/:id          # Obtener por ID
PUT    /api/comentario/:id          # Actualizar comentario
PATCH  /api/comentario/:id          # Desactivar comentario
```

---

## 🔒 Autenticación

### Token JWT
La API usa **JSON Web Tokens** para autenticación. El token debe incluirse en el header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Roles disponibles
- **usuario**: Acceso básico
- **moderador**: Gestión de turnos y servicios
- **administrador**: Acceso total


