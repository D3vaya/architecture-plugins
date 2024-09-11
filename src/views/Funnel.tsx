import { useEffect } from "react";

import { BackendService } from "../core/backend";
import { usePluginManager } from "../core/hooks/usePluginManager";

import { BankAPlugin } from "../plugin/BankA/plugin";

const Funnel = () => {
  const { plugins, registerPlugin } = usePluginManager();

  useEffect(() => {
    const bankAPlugin = new BankAPlugin();
    const backendService = new BackendService();
    bankAPlugin.initialize(backendService);
    registerPlugin(bankAPlugin);
  }, []);

  return (
    <div>
      {plugins.map((plugin, idx) => {
        return (
          <div key={"plugin-" + idx + plugin.name} className="plugin-container">
            <h2>{plugin.name}</h2>
            {plugin.render()}
          </div>
        );
      })}
    </div>
  );
};

export default Funnel;
