/// <reference types="vitest" />

import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr, { VitePluginSvgrOptions } from "vite-plugin-svgr";
import { configDefaults } from "vitest/config";

const svgrOptions: VitePluginSvgrOptions["svgrOptions"] = {
  exportType: "default",
  ref: true,
  svgo: false,
  titleProp: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ svgrOptions, include: "**/*.svg" })],
  envDir: "./env",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    exclude: [...configDefaults.exclude, "./firebase", "./config"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
