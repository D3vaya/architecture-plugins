import { describe, it, expect, beforeEach } from "vitest";
import { XYZBankPlugin } from "../../../plugin/BankA/plugin";
import { MockBackend } from "../../../testing/MockBackend";
import { PluginTestHarness } from "../../../testing/PluginTestHarness";

describe("XYZBankPlugin with PluginTestHarness", () => {
  let harness: PluginTestHarness;

  beforeEach(() => {
    const plugin = new XYZBankPlugin(new MockBackend()); // Inicializa el plugin con MockBackend
    harness = new PluginTestHarness(plugin);
  });

  it("should authenticate successfully with valid credentials", async () => {
    const result = await harness.testAuthentication({
      username: "test",
      password: "password",
    });
    expect(result).toEqual({ authToken: "mockAuthToken" });
  });

  it("should fail to authenticate with invalid credentials", async () => {
    await expect(
      harness.testAuthentication({ username: "invalid", password: "wrong" })
    ).rejects.toThrow("Invalid credentials");
  });

  it("should return a list of accounts after selecting account", async () => {
    const accounts = await harness.testSelectAccount();
    expect(accounts).toEqual({
      accounts: [{ id: "mockAccountId", name: "Mock Account" }],
    });
  });

  it("should authorize account successfully", async () => {
    const authorization = await harness.testAuthorizeAccount("mockAccountId");
    expect(authorization).toEqual({
      authorizationToken: "mockAuthorizationToken",
    });
  });

  it("should execute payment successfully", async () => {
    const result = await harness.testExecutePayment(
      100,
      "USD",
      "mockAuthorizationToken"
    );
    expect(result).toEqual({
      success: true,
      transactionId: "mockTransactionId",
    });
  });
});
