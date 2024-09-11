import React, { ReactNode, useMemo, useState } from "react";
import { CorePlugin } from "../interfaces/plugin";
import { PluginContext } from "./core.context";

export const PluginProvider: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const [plugins, setPlugins] = useState<CorePlugin[]>([]);

  const registerPlugin = (plugin: CorePlugin) => {
    const existPlugin = plugins.some((p) => p.name === plugin.name);
    if (existPlugin) {
      console.log("Plugin already registered:", plugin.name);
      return;
    }
    setPlugins((prevPlugins) => [...prevPlugins, plugin]);
  };

  return (
    <PluginContext.Provider
      value={useMemo(
        () => ({ plugins, registerPlugin }),
        [plugins, registerPlugin]
      )}
    >
      {children}
    </PluginContext.Provider>
  );
};
