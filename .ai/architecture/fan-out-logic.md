# Especificación de Fan-out y Concurrencia
## Flujo de Consulta
1. El `TrackingOrchestrator` recibe un ID (Patente o RUT).
2. Consulta en **Redis** si existe caché válida.
3. Si no hay caché, dispara `Promise.allSettled()` a todos los adaptadores de proveedores registrados.
4. **Timeout:** Máximo 5 segundos por proveedor.
5. **Resiliencia:** Si un proveedor falla, el sistema continúa con los demás.
6. Los resultados se unifican, se ordenan por timestamp y se guardan en caché.
