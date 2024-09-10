import "./App.css";
import { PluginManager } from "./core/PluginManager";
import { PaymentFlowProvider } from "./plugin/BankA/context";
import { PaymentOrchestrator } from "./plugin/BankA/payment-or";
import { XYZBankPlugin } from "./plugin/BankA/plugin";

function App() {
  const pluginManager = new PluginManager();
  pluginManager.registerPlugin("XYZBank", new XYZBankPlugin());

  // Configurar las propiedades requeridas por PaymentOrchestrator
  const selectedProvider = "XYZBank"; // Proveedor seleccionado
  const initialCredentials = { username: "hola", password: "123" }; // Credenciales iniciales vacías
  const paymentDetails = { amount: 100, currency: "USD", accountId: "" }; // Detalles del pago

  return (
    <PaymentFlowProvider>
      {/* Componente de Orquestador de Pagos */}
      <PaymentOrchestrator
        pluginManager={pluginManager}
        selectedProvider={selectedProvider}
        credentials={initialCredentials}
        paymentDetails={paymentDetails}
      />
    </PaymentFlowProvider>
  );
}

export default App;
