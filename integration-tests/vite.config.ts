/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vitest/config";
import defaultConfig from "../vite.config";

export default mergeConfig(
  defaultConfig,
  defineConfig({
    test: {
      include: ["./**/*.test.ts"],
      setupFiles: ["./setup.ts"],
    },
  }),
);
