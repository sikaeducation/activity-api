/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      $: path.resolve(__dirname, "./test-helpers"),
    },
  },
  test: {
    include: ["./**/*.test.ts"],
    setupFiles: ["./test-helpers/setup-tests.ts"],
    mockReset: true,
  },
});
