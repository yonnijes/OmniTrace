# Referencia de la API

La API de OmniTrace está construida con NestJS y utiliza Zod para la validación de peticiones y respuestas.

## 📡 Endpoints de Rastreo

### Obtener Ruta de Vehículo
Recupera la ruta histórica y los últimos avistamientos de un vehículo específico mediante su patente.

-   **Endpoint:** `GET /api/tracking/vehicle/:patent`
-   **Método:** `GET`
-   **Parámetros:**
    -   `patent`: El número de patente (placa) del vehículo.
-   **Respuesta:**
    -   `200 OK`: Retorna un objeto `TrackingResult`.
    -   `404 Not Found`: Si el vehículo no tiene historial de rastreo.

### Obtener Ruta de Persona
Recupera la ruta histórica y los últimos avistamientos de una persona específica mediante su RUT.

-   **Endpoint:** `GET /api/tracking/person/:rut`
-   **Método:** `GET`
-   **Parámetros:**
    -   `rut`: El identificador único nacional (RUT).
-   **Respuesta:**
    -   `200 OK`: Retorna un objeto `TrackingResult`.

### Acceso a Ruta Unificado
Un endpoint genérico para recuperar rutas por ID y tipo.

-   **Endpoint:** `GET /api/tracking/route/:id`
-   **Parámetros de Consulta (Query):**
    -   `type`: `'patent'` o `'rut'`
-   **Respuesta:**
    -   `200 OK`: Retorna datos consistentes de trayecto y avistamientos.

## 🛠️ Esquemas de Datos (Zod)

El sistema impone un tipado estricto utilizando esquemas Zod para la transferencia interna de datos y las respuestas externas.

### Tracking Point
```typescript
{
  latitude: number,
  longitude: number,
  timestamp: string (ISO),
  providerId: string,
  rawSource: string,
  accuracy?: number,
  speed?: number
}
```

## 💓 Health Check
-   **Endpoint:** `GET /health`
-   **Respuesta:** `{ status: "ok", timestamp: "..." }`
