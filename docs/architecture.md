# Arquitectura y Diseño

OmniTrace está construido siguiendo principios modernos de ingeniería de software para asegurar que se mantenga fácil de mantener, probar y escalar a medida que crece el número de proveedores de datos.

## 🏗️ Arquitectura Hexagonal (Puertos y Adaptadores)

El núcleo de la lógica de negocio está completamente aislado de las tecnologías externas. Esto se logra mediante el uso de **Puertos** (interfaces) y **Adaptadores** (implementaciones).

-   **Capa de Dominio:** Contiene las entidades principales (`Vehículo`, `Persona`) y Objetos de Valor (`Coordenadas`, `TrackingPoint`). Define los **Puertos** (ej. `ITrackingProvider`).
-   **Capa de Infraestructura:** Implementa los **Adaptadores**. Si necesitamos agregar una nueva fuente de datos (ej. una nueva API de una Autopista), simplemente creamos un nuevo adaptador que implemente el puerto `ITrackingProvider` sin tocar la lógica del dominio.
-   **Capa de Aplicación:** Organiza el flujo de datos entre el dominio y la infraestructura (vía servicios de NestJS).

## 🧩 Patrones Clave

### Domain-Driven Design (DDD)
El sistema está modelado según los conceptos del mundo real del dominio de seguridad. Las entidades como `Vehículo` manejan su propia consistencia interna (ej. asegurar que los puntos de rastreo estén siempre ordenados por tiempo).

### Patrón Fan-out (Multisourcing)
Para asegurar la máxima velocidad, el `TrackingOrchestrator` utiliza un patrón Fan-out. Cuando se inicia una búsqueda, se activan peticiones a TODOS los proveedores registrados en paralelo. Maneja los tiempos de espera (timeouts) de forma elegante y agrega los resultados en una vista unificada.

### Patrón Strategy (Visualización del Mapa)
El frontend utiliza un patrón Strategy para su componente de mapa. La lógica central de la aplicación para manejar datos de rastreo es independiente de la librería de mapas subyacente (Leaflet). Esto hace que reemplazar el proveedor de mapas sea tan sencillo como intercambiar la implementación de la estrategia.

### Patrón Adapter (Integración de Proveedores)
Cada fuente de datos externa (XML, JSON, APIs de terceros) tiene su propio adaptador. Este traduce los variados formatos externos al formato de rastreo interno de OmniTrace.

## 🛣️ Rastreo Vial Real
A diferencia de los rastreadores tradicionales que muestran líneas rectas "a vuelo de pájaro", OmniTrace se integra con **OSRM (Open Source Routing Machine)**. Cuando se encuentran múltiples avistamientos, el sistema calcula la ruta más probable siguiendo la red de calles real y los sentidos de tránsito.
