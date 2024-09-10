import { Suspense } from "react";
import { usePaymentFlow } from "./context";
import { Credentials } from "../../core/types";

export const PaymentOrchestrator: React.FC<any> = ({
  pluginManager,
  selectedProvider,
  credentials,
  paymentDetails,
}) => {
  const {
    authToken,
    setAuthToken,
    selectedAccount,
    setSelectedAccount,
    authorizationToken,
    setAuthorizationToken,
  } = usePaymentFlow();
  const plugin = pluginManager.getPlugin(selectedProvider);

  if (!plugin) {
    return <div>Proveedor de pagos no registrado.</div>;
  }

  const {
    AuthComponent,
    AccountSelectionComponent,
    AuthorizationComponent,
    ExecutePaymentComponent,
  } = plugin.getComponents();

  // Manejadores de flujo de negocio
  const handleAuthenticate = async (credentials: Credentials) => {
    const authResponse = await plugin.authenticate(credentials);
    setAuthToken(authResponse.authToken);
  };

  const handleSelectAccount = async (accountId: string) => {
    if (!authToken) return;
    console.log({ accountId });
    const accountSelection = await plugin.selectAccount(authToken);
    console.log({ accountSelection });
    const selectedAccount = accountSelection.accounts.find(
      (acc: any) => acc.id === accountId
    );
    if (selectedAccount) setSelectedAccount(selectedAccount);
  };

  const handleAuthorizeAccount = async () => {
    if (!selectedAccount) return;
    const authorizationResponse = await plugin.authorizeAccount(
      selectedAccount
    );
    setAuthorizationToken(authorizationResponse.authorizationToken);
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
    <Suspense fallback={<div>Cargando flujo de pago...</div>}>
      <div>
        <h2>Flujo de Pago - {selectedProvider}</h2>

        {/* Componente de autenticación */}
        <Suspense fallback={<div>Cargando autenticación...</div>}>
          <AuthComponent onAuthenticate={handleAuthenticate} />
        </Suspense>

        {/* Componente de selección de cuenta */}
        {authToken && (
          <Suspense fallback={<div>Cargando selección de cuenta...</div>}>
            <AccountSelectionComponent
              authToken={authToken}
              onSelectAccount={handleSelectAccount}
            />
          </Suspense>
        )}

        {/* Componente de autorización de cuenta */}
        {selectedAccount && (
          <Suspense fallback={<div>Cargando autorización...</div>}>
            <AuthorizationComponent
              account={selectedAccount}
              onAuthorize={handleAuthorizeAccount}
            />
          </Suspense>
        )}

        {/* Componente de ejecución de pago */}
        {authorizationToken && (
          <Suspense fallback={<div>Cargando ejecución de pago...</div>}>
            <ExecutePaymentComponent
              paymentDetails={paymentDetails}
              onExecutePayment={handleExecutePayment}
            />
          </Suspense>
        )}
      </div>
    </Suspense>
  );
};
