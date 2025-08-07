import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "simple-import-sort/exports": "error",
    "react-refresh/only-export-components": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"],
          ["^"],
          ["^@\\w"],
          ["^@ia"],
          ["^@/lib"],
          ["^@/"],
          ["^\\."],
        ],
      },
    ],
  },
});
