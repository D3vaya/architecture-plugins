// src/plugins/XYZBankPlugin/XYZBankPlugin.tsx
import React from "react";
import { Backend, CorePlugin } from "../../core/types";
import { XYZBankPluginComponent } from "./flow";

export class XYZBankPlugin implements CorePlugin {
  name = "XYZ Bank Plugin";
  private backend!: Backend;

  initialize(backend: Backend) {
    this.backend = backend;
  }

  render() {
    return <XYZBankPluginComponent backend={this.backend} />;
  }
}
