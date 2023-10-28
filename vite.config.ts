/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, mode === "production" ? "./dist" : "./src"),
      $: path.resolve(__dirname, "./test-helpers"),
    },
  },
  test: {
    include: ["./**/*.test.ts"],
    setupFiles: ["./test-helpers/setup-tests.ts"],
    mockReset: true,
  },
}));
