# Configuración e Instalación

OmniTrace está diseñado para ser fácil de desplegar y configurar utilizando variables de entorno y contenedores.

## 🛠️ Configuración de Entorno

El sistema utiliza **Zod** para una validación estricta de las variables de entorno. Si falta una variable requerida o tiene un formato incorrecto, el sistema fallará al iniciar con un mensaje de error claro.

### Variables Principales
Crea un archivo `.env` en el directorio raíz (revisa `.env.example` como referencia).

| Variable | Descripción | Valor por Defecto |
| :--- | :--- | :--- |
| `NODE_ENV` | Entorno (development/production/test) | `development` |
| `PORT` | Puerto del servidor backend | `3000` |
| `API_URL` | URL base para la API | `http://localhost:3000` |
| `REDIS_HOST` | Nombre de host del servidor Redis | `localhost` |
| `REDIS_PORT` | Puerto del servidor Redis | `6379` |
| `OSRM_URL` | URL del servidor de rutas OSRM | `https://router.project-osrm.org` |
| `PROVIDER_TIMEOUT` | Tiempo máximo de espera para proveedores (ms) | `5000` |

## 📦 Ejecución con Docker

La forma más sencilla de ejecutar todo el stack (Backend, Frontend, Redis) es mediante Docker Compose.

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## 💻 Desarrollo Local

Si prefieres ejecutar los servicios individualmente:

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Iniciar Infraestructura
Necesitas al menos una instancia de Redis corriendo:
```bash
docker run -d -p 6379:6379 redis:alpine
```

### 3. Iniciar Frontend y Backend
```bash
# Iniciar ambos en modo desarrollo
pnpm nx run-many -t serve
```

El frontend estará disponible en `http://localhost:4200` y la API en `http://localhost:3000`.
