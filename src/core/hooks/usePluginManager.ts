import { useContext } from "react";
import { PluginContext } from "../context/core.context";

export const usePluginManager = () => {
  const context = useContext(PluginContext);

  if (!context) {
    throw new Error("usePluginManager must be used within a PluginProvider");
  }
  
  return context;
};
