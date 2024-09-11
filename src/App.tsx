import React from "react";
import { PluginProvider } from "./core/context/core.provider";
import Funnel from "./views/Funnel";

const App: React.FC = () => {
  return (
    <PluginProvider>
      <h1>Plataforma de Pagos</h1>
      {/* <PluginRegistrar /> */}
      <Funnel />
    </PluginProvider>
  );
};

export default App;
