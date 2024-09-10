// src/App.tsx
import React, { useEffect } from "react";
import {
  PluginProvider,
  PluginManager,
  usePluginManager,
} from "./core/PluginManager";
import { XYZBankPlugin } from "./plugin/BankA/plugin";

const PluginRegistrar: React.FC = () => {
  const { registerPlugin } = usePluginManager();

  useEffect(() => {
    const xyzBankPlugin = new XYZBankPlugin();
    registerPlugin(xyzBankPlugin);
  }, []);

  return null;
};

const App: React.FC = () => {
  return (
    <PluginProvider>
      <>
        <h1>Plataforma de Pagos</h1>
        <PluginRegistrar /> {/* Registrar plugins dinámicamente */}
        <PluginManager /> {/* Renderizar plugins registrados */}
      </>
    </PluginProvider>
  );
};

export default App;
