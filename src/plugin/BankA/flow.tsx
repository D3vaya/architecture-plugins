// src/plugins/XYZBankPlugin/XYZBankPluginComponent.tsx
import React from "react";
import { Backend } from "../../core/types";

interface XYZBankPluginComponentProps {
  backend: Backend;
}

export const XYZBankPluginComponent: React.FC<XYZBankPluginComponentProps> = ({
  backend,
}) => {
  const handleAuthenticate = async () => {
    try {
      const authToken = await backend.authenticate({
        username: "test",
        password: "password",
      });
      console.log("Authenticated:", authToken);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div>
      <h3>XYZ Bank Plugin Flow</h3>
      <button onClick={handleAuthenticate}>Authenticate</button>
    </div>
  );
};
