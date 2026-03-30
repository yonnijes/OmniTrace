# Guía de Pruebas

OmniTrace mantiene una alta calidad de código mediante una suite de pruebas exhaustiva integrada con el workspace de Nx.

## 🧪 Ejecución de Pruebas

Puedes ejecutar las pruebas para proyectos específicos o para todo el espacio de trabajo.

### Comando Principal de Pruebas
Para ejecutar todas las pruebas en el workspace:
```bash
pnpm nx run-many -t test
```

Para ejecutar las pruebas de una librería específica (ej. domain):
```bash
pnpm nx test domain
```

### Pruebas End-to-End (E2E)
Para ejecutar la suite completa de E2E del backend:
```bash
pnpm nx e2e api-e2e
```

## 🧹 Linting y Formato

Utilizamos ESLint y Prettier para mantener un estilo de código consistente.

```bash
# Revisar todo el workspace
pnpm nx run-many -t lint

# Corregir automáticamente problemas de formato
pnpm nx run-many -t lint --fix
```

## ✅ Integración Continua (CI)
Antes de subir tus cambios, asegúrate de que todas las verificaciones pasen localmente:

```bash
# Este comando ejecuta lint, test y build para todos los proyectos afectados
pnpm nx affected -t lint test build
```

## 📈 Métricas de Calidad
Nuestra estrategia de pruebas se enfoca en:
-   **Pruebas Unitarias:** Lógica de negocio en `libs/domain`.
-   **Pruebas de Integración:** Adaptadores de infraestructura en `libs/infrastructure` (simulando APIs externas).
-   **Pruebas E2E:** Flujo completo de la API desde los controladores de `apps/api` hasta las capas de base de datos/caché.
