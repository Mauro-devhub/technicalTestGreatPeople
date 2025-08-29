# 🚀 Sistema de Gestión de Productos

Un sistema completo de gestión de productos desarrollado con **Angular 19** y **NestJS**, que incluye autenticación JWT, gestión de usuarios, categorías y productos con roles de administrador y usuario.

## 📋 Tabla de Contenidos

- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [API Endpoints](#-api-endpoints)
- [Usuarios de Prueba](#-usuarios-de-prueba)
- [Desarrollo](#-desarrollo)
- [Mejoras Futuras](#-mejoras-futuras)
- [Contribución](#-contribución)

## 🛠 Tecnologías Utilizadas

### Backend
- **NestJS** - Framework de Node.js para aplicaciones escalables
- **TypeORM** - ORM para TypeScript y JavaScript
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación basada en tokens
- **Class Validator** - Validación de datos
- **Docker** - Contenedorización de la base de datos

### Frontend
- **Angular 19** - Framework de desarrollo frontend
- **TypeScript** - Lenguaje de programación tipado
- **SCSS** - Preprocesador de CSS
- **RxJS** - Programación reactiva
- **Angular Router** - Navegación entre componentes

### Herramientas de Desarrollo
- **Docker Desktop** - Contenedorización
- **pgAdmin** - Interfaz gráfica para PostgreSQL
- **Node.js** - Runtime de JavaScript

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [pgAdmin](https://www.pgadmin.org/) (opcional, para gestión de BD)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <https://github.com/Mauro-devhub/technicalTestGreatPeople.git>
cd personal
```

### 2. Configurar el Backend

```bash
# Ingresar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Levantar Docker Desktop y ejecutar la base de datos
docker compose up -d

# Verificar que PostgreSQL esté corriendo
docker ps
```

### 3. Levantar el Servidor Backend

```bash
# Ejecutar en modo desarrollo
npm run start:dev
```

El servidor estará disponible en: `http://localhost:3000`

### 4. Cargar Datos Iniciales

Una vez que el servidor esté corriendo, ejecuta el siguiente endpoint para cargar datos semilla:

```bash
curl -X POST http://localhost:3000/auth/load-initial-data
```

O visita directamente en tu navegador: `http://localhost:3000/auth/load-initial-data`

### 5. Configurar el Frontend

```bash
# En una nueva terminal, ingresar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Levantar la aplicación Angular
npm run start
```

La aplicación estará disponible en: `http://localhost:4200`

## 📁 Estructura del Proyecto

```
personal/
├── backend/                 # Servidor NestJS
│   ├── src/
│   │   ├── entities/        # Entidades de TypeORM
│   │   ├── modules/         # Módulos de la aplicación
│   │   │   ├── auth/        # Autenticación y autorización
│   │   │   ├── users/       # Gestión de usuarios
│   │   │   ├── products/    # Gestión de productos
│   │   │   ├── categories/  # Gestión de categorías
│   │   │   └── roles/       # Gestión de roles
│   │   └── shared/          # Utilidades compartidas
│   ├── docker-compose.yml   # Configuración de Docker
│   └── package.json
├── frontend/                # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/     # Módulos de la aplicación
│   │   │   │   ├── home/    # Página principal
│   │   │   │   ├── login/   # Autenticación
│   │   │   │   ├── products/# Gestión de productos
│   │   │   │   └── shared/  # Componentes compartidos
│   │   │   └── models/      # Modelos de datos
│   │   └── theme/           # Estilos globales
│   └── package.json
└── README.md
```

## ✨ Funcionalidades

### 🔐 Autenticación y Autorización
- Login con JWT
- Roles de usuario (admin, user)
- Guards de autenticación
- Interceptores para manejo de tokens

### 👥 Gestión de Usuarios
- Crear, editar y eliminar usuarios
- Asignación de roles
- Validación de datos

### 📦 Gestión de Productos
- CRUD completo de productos
- Paginación

### 🎨 Interfaz de Usuario
- Componentes reutilizables
- Navegación intuitiva

## 🔌 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/load-initial-data` - Cargar datos semilla

## 👤 Usuarios de Prueba

El sistema incluye usuarios predefinidos para testing:

| Usuario | Contraseña | Rol | Permisos |
|---------|------------|-----|----------|
| `admin` | `admin` | Administrador | Acceso completo a todas las funcionalidades |
| `user` | `user` | Usuario | Solo visualización de productos |

## 🛠 Desarrollo

### Comandos Útiles

#### Backend
```bash
# Modo desarrollo con hot reload
npm run start:dev

# Modo producción
npm run start:prod

# Ejecutar tests
npm run test

# Linting
npm run lint

# Formatear código
npm run format
```

#### Frontend
```bash
# Servidor de desarrollo
npm run start

# Build de producción
npm run build

# Ejecutar tests
npm run test

# Build en modo watch
npm run watch
```

### Variables de Entorno

El backend utiliza las siguientes variables de entorno (por defecto):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=personal_db
```

## 🔮 Mejoras Futuras

### Seguridad
- [ ] **Hashear contraseñas**: Implementar bcrypt para encriptar contraseñas en la base de datos
- [ ] **Refresh tokens**: Implementar sistema de refresh tokens para mayor seguridad
- [ ] **Validación de entrada**: Mejorar validaciones de datos de entrada

### Base de Datos
- [ ] **Migraciones**: Implementar sistema de migraciones con TypeORM
- [ ] **Backup automático**: Configurar backups automáticos de la base de datos

### Frontend
- [ ] **Responsive design**: Mejorar la experiencia en dispositivos móviles
- [ ] **PWA**: Convertir la aplicación en Progressive Web App

### Funcionalidades
- [ ] **Búsqueda avanzada**: Implementar filtros y búsqueda en tiempo real

### DevOps
- [ ] **CI/CD**: Configurar pipeline de integración continua
- [ ] **Documentación API**: Generar documentación automática con Swagger