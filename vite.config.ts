import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr, { VitePluginSvgrOptions } from "vite-plugin-svgr";
import { configDefaults } from "vitest/config";

import { coverageV8Options } from "./tests/config";

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
    reporters: ["verbose", "json"],
    outputFile: "./tests/reports/results.json",
    exclude: [...configDefaults.exclude, "./firebase", "./config"],
    coverage: { provider: "v8", ...coverageV8Options },
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
