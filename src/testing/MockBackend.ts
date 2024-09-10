export class MockBackend {
  async authenticate(credentials: {
    username: string;
    password: string;
  }): Promise<{ authToken: string }> {
    if (
      credentials.username === "test" &&
      credentials.password === "password"
    ) {
      return { authToken: "mockAuthToken" };
    }
    throw new Error("Invalid credentials");
  }

  async selectAccount(): Promise<{
    accounts: Array<{ id: string; name: string }>;
  }> {
    return { accounts: [{ id: "mockAccountId", name: "Mock Account" }] };
  }

  async authorizeAccount(
    accountId: string
  ): Promise<{ authorizationToken: string }> {
    return { authorizationToken: "mockAuthorizationToken" };
  }

  async executePayment(
    amount: number,
    currency: string,
    authorizationToken: string
  ): Promise<{ success: boolean; transactionId: string }> {
    return { success: true, transactionId: "mockTransactionId" };
  }
}
