import { vi } from "vitest";

export const mockAuthenticate = vi
  .fn()
  .mockResolvedValue({ authToken: "mockAuthToken" });
export const mockSelectAccount = vi.fn().mockResolvedValue({
  accounts: [{ id: "mockAccountId", name: "Mock Account" }],
});
export const mockAuthorizeAccount = vi
  .fn()
  .mockResolvedValue({ authorizationToken: "mockAuthorizationToken" });
export const mockExecutePayment = vi
  .fn()
  .mockResolvedValue({ success: true, transactionId: "mockTransactionId" });

// Plugin de Mock para XYZBank
export const MockXYZBankPlugin = {
  authenticate: mockAuthenticate,
  selectAccount: mockSelectAccount,
  authorizeAccount: mockAuthorizeAccount,
  executePayment: mockExecutePayment,
};
