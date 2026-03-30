🚀 OmniTrace: Roadmap de Implementación
Fase 1: Cimientos del Monorepo (Nx)
[x] T1.1: Inicializar Workspace de Nx (si no existe) con NestJS y React.

[x] T1.2: Crear librería de dominio: libs/domain (TypeScript puro).

[x] T1.3: Crear librería de infraestructura: libs/infrastructure (NestJS/Axios/Zod).

[x] T1.4: Crear librería de UI compartida: libs/ui-shared (React/Tailwind).

Fase 2: Modelado del Dominio (Core)
[x] T2.1: Definir Interfaces de "Puertos" para Proveedores (ITrackingProvider).

[x] T2.2: Crear Value Objects: Coordinates, Timestamp, TrackingPoint.

[x] T2.3: Implementar Agregado de Vehicle con lógica de ordenamiento cronológico.

[x] T2.4: Implementar Agregado de Person (RUT) siguiendo la misma interfaz.

Fase 3: Infraestructura y Adaptadores (Fan-out)
[x] T3.1: Configurar Zod para validación de esquemas externos.

[x] T3.2: Crear un MockProvider (JSON) para pruebas iniciales.

[x] T3.3: Crear un XmlProvider usando fast-xml-parser para validar el flujo XML.

[x] T3.4: Implementar el TrackingOrchestrator (Application Service) con Fan-out (Promise.allSettled).

[x] T3.5: Integrar Redis para caché de resultados por patente/RUT.

Fase 4: Inteligencia Geográfica (Routing)
[x] T4.1: Crear adaptador para Motor de Routing (OSRM o Google Maps).

[x] T4.2: Implementar lógica de transformación: Puntos aislados -> GeoJSON de ruta vial.

[x] T4.3: Crear endpoint en NestJS para retornar la ruta procesada al frontend.

Fase 5: Frontend y Visualización (Mapa)
[x] T5.1: Configurar Zustand para el estado global (puntos, carga, errores).

[x] T5.2: Crear MapWrapper con Leaflet (Abstracción del proveedor de mapas).

[x] T5.3: Implementar renderizado de Polilíneas (Ruta) y Marcadores (Última ubicación).

[x] T5.4: Crear Popups dinámicos con la información del proveedor original.

Fase 6: Refinamiento y UX
[x] T6.1: Añadir animaciones (framer-motion) al cambiar de ubicación.

[x] T6.2: Implementar filtros de búsqueda por Patente y RUT con validación visual.

[x] T6.3: Manejo de estados de error (Proveedor caído, Patente no encontrada).
