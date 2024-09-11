import { describe, it, expect, vi, beforeEach } from "vitest";
import { BankAPlugin } from "../../plugin/BankA/plugin";
import { PluginContextType } from "../../core/types";
import { BackendService } from "../../core/backend";
import { usePluginManager } from "../../core/types";

vi.mock("../../core/types", () => ({
  usePluginManager: () => ({
    plugins: [],
    registerPlugin: vi.fn(),
  }),
}));

// Mock de BackendService
vi.mock("../../core/backend", () => ({
  BackendService: vi.fn(() => ({
    someMethod: vi.fn(),
    someProperty: "mockValue",
  })),
}));

describe("Sistema Core", () => {
  let pluginManager: PluginContextType;
  let mockBackend: BackendService;

  beforeEach(() => {
    // Usa el mock del hook
    pluginManager = usePluginManager();
    mockBackend = new BackendService();
  });

  it("debería registrar plugins correctamente", () => {
    const plugin = new BankAPlugin();
    pluginManager.registerPlugin(plugin);

    expect(pluginManager.plugins.length).toBe(1);
    expect(pluginManager.plugins[0]).toBe(plugin);
  });

  it("debería inicializar plugins con el backend", () => {
    const plugin = new BankAPlugin();
    plugin.initialize = vi.fn();
    pluginManager.registerPlugin(plugin);

    expect(plugin.initialize).toHaveBeenCalledWith(mockBackend);
  });

  it("no debería registrar el mismo plugin dos veces", () => {
    const plugin = new BankAPlugin();
    pluginManager.registerPlugin(plugin);
    pluginManager.registerPlugin(plugin);

    expect(pluginManager.plugins.length).toBe(1);
  });

  //   it("debería manejar múltiples plugins", () => {
  //     const plugin1 = new XYZBankPlugin();
  //     const plugin2 = new XYZBankPlugin();
  //     pluginManager.registerPlugin(plugin1);
  //     pluginManager.registerPlugin(plugin2);

  //     expect(pluginManager.plugins.length).toBe(2);
  //   });
});
