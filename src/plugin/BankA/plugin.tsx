import { useState } from "react";
import { pluginManager } from "../../core/PluginManager";
import {
  Account,
  AccountSelection,
  AccountSelectionComponentProps,
  AuthComponentProps,
  AuthorizationComponentProps,
  AuthorizationResponse,
  AuthResponse,
  Credentials,
  ExecutePaymentComponentProps,
  PaymentDetails,
  PaymentProviderPlugin,
  PaymentResult,
} from "../../core/types";

// const AuthComponent = React.lazy(
//   () => import("./")
// );
// const AccountSelectionComponent = React.lazy(
//   () => import("./components/XYZBank/AccountSelectionComponent")
// );
// const AuthorizationComponent = React.lazy(
//   () => import("./components/XYZBank/AuthorizationComponent")
// );
// const ExecutePaymentComponent = React.lazy(
//   () => import("./components/XYZBank/ExecutePaymentComponent")
// );

// Plugin para Banco XYZ
export class XYZBankPlugin implements PaymentProviderPlugin {
  // Métodos de lógica de flujo
  async authenticate(credentials: Credentials): Promise<AuthResponse> {
    console.log("Autenticando con XYZ Bank...");
    console.log({ credentials });
    if (credentials.username === "hola" && credentials.password === "123") {
      return { authToken: "xyzAuthToken123", message: "Autenticación exitosa" };
    } else {
      throw new Error("Credenciales incorrectas");
    }
  }

  async selectAccount(authToken: string): Promise<AccountSelection> {
    console.log("Seleccionando cuenta en XYZ Bank...");
    const accounts: Account[] = [
      { id: "1", name: "Cuenta Corriente", balance: 5000 },
      { id: "2", name: "Cuenta Ahorro", balance: 15000 },
    ];
    return { accounts, selectedAccountId: "1" };
  }

  async authorizeAccount(account: Account): Promise<AuthorizationResponse> {
    console.log(`Autorizando cuenta ${account.name} en XYZ Bank...`);
    return { authorized: true, authorizationToken: "xyzAuthToken123" };
  }

  async executePayment(paymentDetails: PaymentDetails): Promise<PaymentResult> {
    console.log("Ejecutando pago en XYZ Bank...");
    if (paymentDetails.amount > 0) {
      return { success: true, transactionId: "xyzTxn12345" };
    } else {
      return { success: false, errorMessage: "Monto inválido" };
    }
  }

  getComponents() {
    const AuthComponent = this.AuthComponent;
    const AccountSelectionComponent = this.AccountSelectionComponent;
    const AuthorizationComponent = this.AuthorizationComponent;
    const ExecutePaymentComponent = this.ExecutePaymentComponent;
    return {
      AuthComponent,
      AccountSelectionComponent,
      AuthorizationComponent,
      ExecutePaymentComponent,
    };
  }

  // Componentes UI específicos del plugin
  AuthComponent: React.FC<AuthComponentProps> = ({ onAuthenticate }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div>
        <h3>Autenticación - XYZ Bank</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => onAuthenticate({ username, password })}>
          Autenticar
        </button>
      </div>
    );
  };

  AccountSelectionComponent: React.FC<AccountSelectionComponentProps> = ({
    authToken,
    onSelectAccount,
  }) => {
    const [selectedAccountId, setSelectedAccountId] = useState("");

    return (
      <div>
        <h3>Seleccionar Cuenta - XYZ Bank</h3>
        {/* Suponiendo que esta lista de cuentas venga de algún hook o contexto */}
        <button onClick={() => onSelectAccount(selectedAccountId)}>
          Seleccionar
        </button>
      </div>
    );
  };

  AuthorizationComponent: React.FC<AuthorizationComponentProps> = ({
    account,
    onAuthorize,
  }) => {
    return (
      <div>
        <h3>Autorizar Cuenta - {account.name}</h3>
        <button onClick={onAuthorize}>Autorizar</button>
      </div>
    );
  };

  ExecutePaymentComponent: React.FC<ExecutePaymentComponentProps> = ({
    paymentDetails,
    onExecutePayment,
  }) => {
    return (
      <div>
        <h3>
          Ejecutar Pago - {paymentDetails.amount} {paymentDetails.currency}
        </h3>
        <button onClick={onExecutePayment}>Pagar</button>
      </div>
    );
  };
}

// Registrar el plugin del Banco XYZ
// pluginManager.registerPlugin("BankA", new XYZBankPlugin());
