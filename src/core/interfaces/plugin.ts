import { Backend } from "./backend";

export interface CorePlugin {
  name: string; // Nombre del plugin
  initialize(backend: Backend): void; // Inicializa el plugin con un backend
  render(): React.ReactNode; // Método para renderizar el componente raíz del plugin
}
