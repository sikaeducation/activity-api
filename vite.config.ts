/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["./tests/**/*.test.ts"],
    setupFiles: ["./tests/setup-tests.ts"],
    mockReset: true,
  },
});
