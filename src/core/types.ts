import React, { createContext, useContext } from "react";

// Tipos generales
export type Credentials = { username: string; password: string };
export type AuthResponse = { authToken: string; message: string };
export type Account = { id: string; name: string; balance: number };
export type AccountSelection = {
  accounts: Account[];
  selectedAccountId: string;
};
export type AuthorizationResponse = {
  authorized: boolean;
  authorizationToken: string;
};
export type PaymentDetails = {
  amount: number;
  currency: string;
  accountId: string;
};
export type PaymentResult = {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
};

// Props para componentes comunes
export interface AuthComponentProps {
  onAuthenticate: (credentials: Credentials) => Promise<void>;
}

export interface AccountSelectionComponentProps {
  authToken: string;
  onSelectAccount: (accountId: string) => Promise<void>;
}

export interface AuthorizationComponentProps {
  account: Account;
  onAuthorize: () => Promise<void>;
}

export interface ExecutePaymentComponentProps {
  paymentDetails: PaymentDetails;
  onExecutePayment: () => Promise<void>;
}

export interface CorePlugin {
  name: string; // Nombre del plugin
  initialize(backend: Backend): void; // Inicializa el plugin con un backend
  render(): React.ReactNode; // Método para renderizar el componente raíz del plugin
}
export interface PluginContextType {
  plugins: CorePlugin[];
  registerPlugin: (plugin: CorePlugin) => void;
}

export const PluginContext = createContext<PluginContextType | undefined>(
  undefined
);
export const usePluginManager = () => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error("usePluginManager must be used within a PluginProvider");
  }
  return context;
};

// Interfaz base para todos los plugins de proveedores de pago con componentes
export interface PaymentProviderPlugin {
  // Métodos de lógica de flujo
  authenticate(credentials: Credentials): Promise<AuthResponse>;
  selectAccount(authToken: string): Promise<AccountSelection>;
  authorizeAccount(account: Account): Promise<AuthorizationResponse>;
  executePayment(paymentDetails: PaymentDetails): Promise<PaymentResult>;

  // Componentes UI específicos del plugin
  AuthComponent: React.FC<AuthComponentProps>;
  AccountSelectionComponent: React.FC<AccountSelectionComponentProps>;
  AuthorizationComponent: React.FC<AuthorizationComponentProps>;
  ExecutePaymentComponent: React.FC<ExecutePaymentComponentProps>;
}

export interface Backend {
  authenticate(credentials: {
    username: string;
    password: string;
  }): Promise<{ authToken: string }>;
  selectAccount(): Promise<{ accounts: Array<{ id: string; name: string }> }>;
  authorizeAccount(accountId: string): Promise<{ authorizationToken: string }>;
  executePayment(
    amount: number,
    currency: string,
    authorizationToken: string
  ): Promise<{ success: boolean; transactionId: string }>;
}
