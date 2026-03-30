# OmniTrace 🛰️

**OmniTrace** es una plataforma de seguridad avanzada diseñada para rastrear y localizar vehículos y personas en tiempo real dentro de la ciudad. Actúa como un "cerebro central" que conecta diversas fuentes de información que hoy están aisladas, proporcionando una visión unificada y en tiempo real de los movimientos para una respuesta de seguridad rápida.

## 🌟 Descripción General

En las ciudades modernas, los datos de vigilancia suelen estar fragmentados. Las cámaras de autopistas (TAG), los lectores de patentes en centros comerciales, los estacionamientos privados y las cámaras municipales operan de forma aislada. OmniTrace cierra esta brecha consultando simultáneamente a todos estos puntos. Ante el robo de un vehículo o la búsqueda de una persona, el sistema reconstruye su ruta exacta basándose en avistamientos reales, permitiendo que la policía o empresas de seguridad actúen con rapidez y precisión.

## 🛠️ Excelencia Técnica

Construido con un enfoque en mantenibilidad, escalabilidad y rendimiento:

-   **Arquitectura Hexagonal (Puertos y Adaptadores):** Separación total de las reglas de negocio de la tecnología externa y APIs de terceros.
-   **Domain-Driven Design (DDD):** Lógica central enfocada en las entidades de `Vehículo` y `Persona`.
-   **Patrón Fan-out:** Consultas en paralelo a alta velocidad a múltiples proveedores de datos mediante un orquestador dedicado.
-   **Principios SOLID:** Código limpio y robusto siguiendo las mejores prácticas de la industria.
-   **Patrón Strategy para Mapas:** Abstracción de librerías de mapas (Leaflet) que permite cambiar fácilmente de proveedor (ej. a Google Maps o Mapbox).
-   **Rastreo Vial Real:** Las rutas siguen el trazado real de las calles (vía OSRM) en lugar de simples líneas rectas de punto a punto.

## 🚀 Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Monorepo** | [Nx](https://nx.dev/) |
| **Backend** | [NestJS](https://nestjs.com/) |
| **Validación** | [Zod](https://zod.dev/) |
| **Frontend** | [React](https://reactjs.org/) |
| **Estado** | [Zustand](https://github.com/pmndrs/zustand) |
| **Estilizado** | [Tailwind CSS](https://tailwindcss.com/) |
| **Infraestructura** | [Redis](https://redis.io/) y [Docker](https://www.docker.com/) |

## 📁 Estructura del Proyecto

-   `apps/api`: API Backend con NestJS.
-   `apps/map-web`: Frontend React con visualización de mapas en tiempo real.
-   `libs/domain`: Lógica de negocio central, entidades y puertos.
-   `libs/infrastructure`: Adaptadores de proveedores, caché y servicios de ruta.
-   `libs/ui-shared`: Componentes React reutilizables.

## 🚦 Inicio Rápido

### Requisitos Previos
-   Node.js y pnpm
-   Docker y Docker Compose

### Ejecución con Docker (Recomendado)
```bash
docker-compose up -d
```

### Desarrollo Local
1. Instalar dependencias: `pnpm install`
2. Configurar `.env` (usar `.env.example` como referencia)
3. Iniciar el proyecto: `pnpm nx run-many -t serve`

## 📚 Documentación

Documentación detallada disponible en la carpeta [`docs/`](./docs):
- [Arquitectura y Diseño](./docs/architecture.md)
- [Configuración e Instalación](./docs/setup.md)
- [Referencia de la API](./docs/api-reference.md)
- [Guía de Pruebas](./docs/testing.md)

---
*OmniTrace - Redefiniendo la Seguridad Urbana mediante la Integración en Tiempo Real.*
