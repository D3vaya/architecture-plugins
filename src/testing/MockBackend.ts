export class MockBackend {
  static authenticate(credentials: { username: string; password: string }) {
    if (
      credentials.username === "test" &&
      credentials.password === "password"
    ) {
      return { authToken: "mockAuthToken" };
    }
    throw new Error("Invalid credentials");
  }

  static selectAccount() {
    return { accounts: [{ id: "mockAccountId", name: "Mock Account" }] };
  }

  static authorizeAccount(accountId: string) {
    if (accountId === "mockAccountId") {
      return { authorizationToken: "mockAuthorizationToken" };
    }
    throw new Error("Invalid account ID");
  }

  static executePayment(
    amount: number,
    currency: string,
    authorizationToken: string
  ) {
    if (authorizationToken === "mockAuthorizationToken") {
      return { success: true, transactionId: "mockTransactionId" };
    }
    throw new Error("Invalid authorization token");
  }
}
