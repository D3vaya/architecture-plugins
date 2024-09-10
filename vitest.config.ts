import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.ts",
    coverage: {
      provider: "istanbul", // o 'c8'
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
