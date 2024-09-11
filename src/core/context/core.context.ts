import { createContext } from "react";
import { CorePlugin } from "../interfaces/plugin";

export interface PluginContext {
  plugins: CorePlugin[];
  registerPlugin: (plugin: CorePlugin) => void;
}

export const PluginContext = createContext<PluginContext | undefined>(
  undefined
);
