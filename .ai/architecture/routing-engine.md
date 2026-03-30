# Especificación de Motor de Rutas (Street Tracking)
## Reglas de Trazado
1. Dados N puntos de ubicación, se deben ordenar cronológicamente.
2. Se enviará la secuencia de coordenadas a un `RoutingProvider` (OSRM / Google).
3. El motor debe retornar un trazado que respete el sentido de las calles.
4. Si dos puntos están muy distantes, se trazará la ruta vehicular más directa.
