import { pluginManager, PluginManager } from "./PluginManager";
import { Credentials, PaymentDetails } from "./types";

class PaymentOrchestrator {
  constructor(private pluginManager: PluginManager) {}

  async processPayment(
    providerName: string,
    credentials: Credentials,
    paymentDetails: PaymentDetails
  ): Promise<void> {
    const plugin = this.pluginManager.getPlugin(providerName);
    if (!plugin) {
      throw new Error(
        `El proveedor de pagos ${providerName} no está registrado.`
      );
    }

    try {
      // Paso 1: Autenticación
      const authResponse = await plugin.authenticate(credentials);
      console.log("Autenticación exitosa:", authResponse.message);

      // Paso 2: Selección de cuenta
      const accountSelection = await plugin.selectAccount(
        authResponse.authToken
      );
      const selectedAccount = accountSelection.accounts.find(
        (account) => account.id === accountSelection.selectedAccountId
      );
      if (!selectedAccount) {
        throw new Error("Cuenta seleccionada no encontrada.");
      }
      console.log("Cuenta seleccionada:", selectedAccount.name);

      // Paso 3: Autorización
      const authorizationResponse = await plugin.authorizeAccount(
        selectedAccount
      );
      if (!authorizationResponse.authorized) {
        throw new Error("Autorización fallida.");
      }
      console.log("Autorización exitosa.");

      // Paso 4: Ejecución del pago
      const paymentResult = await plugin.executePayment(paymentDetails);
      if (!paymentResult.success) {
        throw new Error(`Pago fallido: ${paymentResult.errorMessage}`);
      }
      console.log(
        "Pago ejecutado con éxito. ID de Transacción:",
        paymentResult.transactionId
      );
    } catch (error: any) {
      console.error("Error en el proceso de pago:", error.message);
    }
  }
}

// Crear instancia del orquestador de pagos

export const paymentOrchestrator = new PaymentOrchestrator(pluginManager);
