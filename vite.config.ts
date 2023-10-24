/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      $: path.resolve(__dirname, "./tests"),
    },
  },
  test: {
    include: ["./tests/**/*.test.ts"],
    setupFiles: ["./tests/test-helpers/setup-tests.ts"],
    mockReset: true,
  },
});
