/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr, { VitePluginSvgrOptions } from "vite-plugin-svgr";

const svgrOptions: VitePluginSvgrOptions["svgrOptions"] = {
  exportType: "default",
  ref: true,
  svgo: false,
  titleProp: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ svgrOptions, include: "**/*.svg" })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});
