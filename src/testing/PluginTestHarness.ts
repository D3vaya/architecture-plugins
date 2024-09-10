import { Account, PaymentProviderPlugin } from "../core/types";

export class PluginTestHarness {
  private plugin: PaymentProviderPlugin;

  constructor(plugin: PaymentProviderPlugin) {
    this.plugin = plugin;
  }

  async testAuthentication(credentials: {
    username: string;
    password: string;
  }) {
    return await this.plugin.authenticate(credentials);
  }

  async testSelectAccount() {
    return await this.plugin.selectAccount("authToken");
  }

  async testAuthorizeAccount(accountId: Account) {
    return await this.plugin.authorizeAccount(accountId);
  }

  async testExecutePayment(
    amount: number,
    currency: string,
    authorizationToken: string
  ) {
    return await this.plugin.executePayment({
      amount,
      currency,
      accountId: "accountId",
    });
  }
}
