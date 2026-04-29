import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/", ".opencode/", "openspec/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["App.tsx", "tamagui.config.ts", "src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
);
