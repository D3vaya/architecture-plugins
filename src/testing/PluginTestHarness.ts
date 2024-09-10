import { XYZBankPlugin } from "../plugin/BankA/plugin";

export class PluginTestHarness {
  private plugin: XYZBankPlugin;

  constructor(plugin: XYZBankPlugin) {
    this.plugin = plugin;
  }

  async testAuthentication(credentials: {
    username: string;
    password: string;
  }) {
    return this.plugin.authenticate(credentials);
  }

  async testSelectAccount() {
    return this.plugin.selectAccount();
  }

  async testAuthorizeAccount(accountId: string) {
    return this.plugin.authorizeAccount(accountId);
  }

  async testExecutePayment(
    amount: number,
    currency: string,
    authorizationToken: string
  ) {
    return this.plugin.executePayment(amount, currency, authorizationToken);
  }
}
