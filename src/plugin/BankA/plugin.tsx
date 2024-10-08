import { Backend, CorePlugin } from "../../core/types";
import { XYZBankPluginComponent } from "./component";

export class BankAPlugin implements CorePlugin {
  name = "Plugin Bank A";
  private backend!: Backend;

  initialize(backend: Backend) {
    this.backend = backend;
  }

  render() {
    if (!this.backend) {
      console.error("Backend not initialized");
      return <span>no init backend</span>;
    }
    return <XYZBankPluginComponent backend={this.backend} />;
  }
}
