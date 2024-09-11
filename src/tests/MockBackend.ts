import { Backend } from "../core/types";

// backendMock.ts
export class BackendMock implements Backend {
  async authenticate(_credentials: {
    username: string;
    password: string;
  }): Promise<{ authToken: string }> {
    return { authToken: "mockAuthToken" };
  }

  async selectAccount(): Promise<{
    accounts: Array<{ id: string; name: string }>;
  }> {
    return { accounts: [{ id: "mockAccountId", name: "Mock Account" }] };
  }

  async authorizeAccount(
    _accountId: string
  ): Promise<{ authorizationToken: string }> {
    return { authorizationToken: "mockAuthorizationToken" };
  }

  async executePayment(
    _amount: number,
    _currency: string,
    _authorizationToken: string
  ): Promise<{ success: boolean; transactionId: string }> {
    return { success: true, transactionId: "mockTransactionId" };
  }
}
