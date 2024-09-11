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
