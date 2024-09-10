import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vitest
export default defineConfig({
  plugins: [react()],
});
