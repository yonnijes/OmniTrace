# Contrato para Nuevos Proveedores (Adaptadores)
## Requisitos de Implementación
1. Implementar la interfaz `ITrackingProvider`.
2. Utilizar **Zod** para parsear la respuesta (XML o JSON).
3. Si la fuente es **XML**, usar `fast-xml-parser`.
4. El adaptador debe normalizar los datos al objeto de dominio `TrackingPoint`.
5. **Anti-Corruption Layer (ACL):** No dejar pasar nombres de campos del proveedor (ej: 'lat_pos') al dominio; transformarlos a 'latitude'.
