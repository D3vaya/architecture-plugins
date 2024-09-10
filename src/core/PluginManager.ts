import { XYZBankPlugin } from "../plugin/BankA/plugin";
import { PaymentProviderPlugin } from "./types";

// Sistema de registro de plugins
export class PluginManager {
  private plugins: Map<string, PaymentProviderPlugin> = new Map();

  // Registrar un plugin
  registerPlugin(name: string, plugin: PaymentProviderPlugin): void {
    if (this.plugins.has(name)) {
      throw new Error(`El plugin con nombre ${name} ya está registrado.`);
    }
    this.plugins.set(name, plugin);
  }

  // Obtener un plugin registrado
  getPlugin(name: string): PaymentProviderPlugin | undefined {
    return this.plugins.get(name);
  }

  // Listar todos los plugins registrados
  listPlugins(): string[] {
    return Array.from(this.plugins.keys());
  }
}

// Crear instancia del gestor de plugins
export const pluginManager = new PluginManager();
pluginManager.registerPlugin("XYZBank", new XYZBankPlugin());
