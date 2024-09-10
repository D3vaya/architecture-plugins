import { ReactNode, useEffect, useState } from "react";
import { CorePlugin, PluginContext } from "../../core/types";
import { RealBackend } from "../../core/backend";

export const PluginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plugins, setPlugins] = useState<CorePlugin[]>([]);

  const registerPlugin = (plugin: CorePlugin) => {
    setPlugins((prevPlugins) => [...prevPlugins, plugin]);
  };

  // Inicia los plugins registrados
  useEffect(() => {
    const backend = new RealBackend(); // Crea una instancia del backend real o mock
    plugins.forEach((plugin) => plugin.initialize(backend));
  }, [plugins]);

  return (
    <PluginContext.Provider value={{ plugins, registerPlugin }}>
      {children}
    </PluginContext.Provider>
  );
};
