## Pruebas de Plugins en el Core del Proyecto

### 1. Configurar el Entorno de Pruebas

1. Clona el repositorio del core.
2. Instala las dependencias usando `npm install`.

### 2. Crear un Nuevo Plugin

1. Implementa la interfaz `PaymentPlugin`.
2. Registra el plugin en el `PluginManager`.

### 3. Ejecutar Pruebas para el Plugin

Utiliza el `PluginTestHarness` para ejecutar pruebas de integración.

```typescript
import { PluginTestHarness } from "./src/testing/PluginTestHarness";
import { MockBackend } from "./src/testing/MockBackend";

const myPlugin = new MyPlugin(MockBackend); // Tu plugin implementando la interfaz PaymentPlugin
const harness = new PluginTestHarness(myPlugin);

harness
  .testAuthentication({ username: "test", password: "password" })
  .then(console.log)
  .catch(console.error);
```
