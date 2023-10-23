/// <reference types="vitest" />
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["./tests/**/*.test.ts"],
    setupFiles: ["./tests/setup-tests.ts"],
    mockReset: true,
  },
});
