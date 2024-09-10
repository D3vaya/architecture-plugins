import React, { Suspense } from "react";
import { PluginManager } from "../../core/PluginManager";
import { Account, Credentials, PaymentDetails } from "../../core/types";

interface PaymentOrchestratorProps {
  pluginManager: PluginManager;
  selectedProvider: string;
  credentials: Credentials;
  paymentDetails: PaymentDetails;
}

export const PaymentOrchestrator: React.FC<PaymentOrchestratorProps> = ({
  pluginManager,
  selectedProvider,
  credentials,
  paymentDetails,
}) => {
  const plugin = pluginManager.getPlugin(selectedProvider);

  if (!plugin) {
    return <div>Proveedor de pagos no registrado.</div>;
  }

  const {
    AuthComponent,
    AccountSelectionComponent,
    AuthorizationComponent,
    ExecutePaymentComponent,
  } = plugin;

  const handleSelectAccount = async (accountId: string) => {
    const authToken = ""; // Supongamos que este valor viene del estado
    const accountSelection = await plugin.selectAccount(authToken);
    console.log("Cuenta seleccionada:", accountSelection.selectedAccountId);
  };
  // Manejadores de flujo de negocio
  const handleAuthenticate = async (credentials: Credentials) => {
    const authResponse = await plugin.authenticate(credentials);
    console.log("Autenticación exitosa:", authResponse);
  };

  const handleAuthorizeAccount = async (account: Account) => {
    const authorizationResponse = await plugin.authorizeAccount(account);
    console.log("Autorización de cuenta:", authorizationResponse.authorized);
  };

  const handleExecutePayment = async () => {
    const result = await plugin.executePayment(paymentDetails);
    if (result.success) {
      console.log("Pago ejecutado con éxito:", result.transactionId);
    } else {
      console.error("Error al ejecutar el pago:", result.errorMessage);
    }
  };

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div>
        <h2>Flujo de Pago - {selectedProvider}</h2>

        {/* Componente de autenticación */}
        <AuthComponent onAuthenticate={handleAuthenticate} />

        {/* Componente de selección de cuenta */}
        <AccountSelectionComponent
          authToken={""}
          onSelectAccount={() => handleSelectAccount("1")}
        />

        {/* Componente de autorización de cuenta */}
        <AuthorizationComponent
          account={{ id: "1", name: "Cuenta Corriente", balance: 5000 }}
          onAuthorize={() =>
            handleAuthorizeAccount({
              id: "1",
              name: "Cuenta Corriente",
              balance: 5000,
            })
          }
        />

        {/* Componente de ejecución de pago */}
        <ExecutePaymentComponent
          paymentDetails={paymentDetails}
          onExecutePayment={handleExecutePayment}
        />
      </div>
    </Suspense>
  );
};
