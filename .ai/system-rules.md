# OmniTrace System Rules
## Stack Tecnológico
- **Lenguaje:** TypeScript (Strict Mode)
- **Monorepo:** Nx
- **Backend:** NestJS (Arquitectura Hexagonal)
- **Frontend:** React + Tailwind + Zustand + Leaflet
- **Validación:** Zod (Obligatorio para entradas externas e internas)
- **Mapeo:** AutoMapper (Entidades <-> DTOs)

## Reglas de Arquitectura (DDD)
1. **Domain:** Lógica de negocio pura. Sin dependencias de NestJS o Axios.
2. **Infrastructure:** Adaptadores de proveedores (API, XML, JSON), DB, Redis y Mapas.
3. **Application:** Servicios que orquestan el flujo (Fan-out).
4. **Interfaces:** Los "Puertos" deben vivir en el Dominio.
