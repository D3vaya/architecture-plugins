import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockXYZBankPlugin } from "./XYZBankPlugin.mock";
import { describe, expect, it } from "vitest";
import { PluginManager } from "../../../core/PluginManager";
import { PaymentFlowProvider } from "../../../plugin/BankA/context";
import { PaymentOrchestrator } from "../../../plugin/BankA";

describe("XYZBankPlugin Integration Tests", () => {
  it("should authenticate and proceed to account selection", async () => {
    // Crear instancia de PluginManager y registrar el plugin mockeado
    const pluginManager = new PluginManager();
    pluginManager.registerPlugin("XYZBank", {
      ...MockXYZBankPlugin,
      AuthComponent: () => <button>Authenticate</button>,
      AccountSelectionComponent: () => <div>Select Account</div>,
      AuthorizationComponent: () => null,
      ExecutePaymentComponent: () => null,
    });

    // Renderizar el orquestador con el proveedor "XYZBank"
    render(
      <PaymentFlowProvider>
        <PaymentOrchestrator
          pluginManager={pluginManager}
          selectedProvider="XYZBank"
          credentials={{ username: "user", password: "pass" }}
          paymentDetails={{ amount: 100, currency: "USD", accountId: "1" }}
        />
      </PaymentFlowProvider>
    );

    // Verificar el componente de autenticación
    const authButton = screen.getByText("Authenticate");
    fireEvent.click(authButton);

    // Verificar el resultado de la autenticación
    await waitFor(() => {
      expect(screen.getByText("Select Account")).toBeInTheDocument();
    });

    // Continuar con las pruebas para seleccionar cuenta, autorizar, y ejecutar el pago
  });
});
