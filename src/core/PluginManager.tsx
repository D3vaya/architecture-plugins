// src/core/PluginManager.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Backend, CorePlugin } from "./types";
import { RealBackend } from "../plugin/BankA/backend";

interface PluginContextType {
  plugins: CorePlugin[];
  registerPlugin: (plugin: CorePlugin) => void;
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export const usePluginManager = () => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error("usePluginManager must be used within a PluginProvider");
  }
  return context;
};

export const PluginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plugins, setPlugins] = useState<CorePlugin[]>([]);

  const registerPlugin = (plugin: CorePlugin) => {
    setPlugins((prevPlugins) => [...prevPlugins, plugin]);
  };

  useEffect(() => {
    const backend = new RealBackend();
    plugins.forEach((plugin) => plugin.initialize(backend));
  }, [plugins]);

  return (
    <PluginContext.Provider value={{ plugins, registerPlugin }}>
      {children}
    </PluginContext.Provider>
  );
};

export const PluginManager: React.FC = () => {
  const { plugins } = usePluginManager();

  return (
    <div>
      {plugins.map((plugin) => (
        <div key={plugin.name} className="plugin-container">
          <h2>{plugin.name}</h2>
          {plugin.render()}
        </div>
      ))}
    </div>
  );
};
