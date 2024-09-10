import React, { createContext, useContext, useState } from "react";
import { Account } from "../../core/types";

interface PaymentFlowContextProps {
  authToken: string;
  setAuthToken: (token: string) => void;
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account) => void;
  authorizationToken: string;
  setAuthorizationToken: (token: string) => void;
}

export const PaymentFlowContext = createContext<
  PaymentFlowContextProps | undefined
>(undefined);

export const PaymentFlowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [authorizationToken, setAuthorizationToken] = useState("");

  return (
    <PaymentFlowContext.Provider
      value={{
        authToken,
        setAuthToken,
        selectedAccount,
        setSelectedAccount,
        authorizationToken,
        setAuthorizationToken,
      }}
    >
      {children}
    </PaymentFlowContext.Provider>
  );
};

export const usePaymentFlow = (): PaymentFlowContextProps => {
  const context = useContext(PaymentFlowContext);
  if (!context) {
    throw new Error(
      "usePaymentFlow debe ser utilizado dentro de PaymentFlowProvider"
    );
  }
  return context;
};
