import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    }
  },
  test: {
    globals: true,
    environment: "node",
    include: ["src/tests/**/*.spec.ts"],
    coverage: {
      provider: "v8",
    },
  },
});
