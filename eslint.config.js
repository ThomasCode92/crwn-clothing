import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import { fixupPluginRules } from "@eslint/compat";
import vitest from "@vitest/eslint-plugin";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwind from "eslint-plugin-tailwindcss";
import testingLibrary from "eslint-plugin-testing-library";

export default tseslint.config(
  { ignores: ["dist", "tests/coverage"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
      ...tailwind.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "prettier/prettier": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    plugins: {
      vitest,
      "testing-library": fixupPluginRules({ rules: testingLibrary.rules }),
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
    },
    languageOptions: {
      globals: { ...vitest.environments.env.globals },
    },
  },
);
