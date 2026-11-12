import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";
import { importX } from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: {
      "import-x": importX,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      "import-x/resolver-next": [createTypeScriptImportResolver()],
    },
    rules: {
      "import-x/no-unresolved": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"], // побочные импорты: import "./index.css"
            ["^react", "^@?\\w"], // react, затем остальные пакеты
            ["^@/"], // алиас
            ["^\\."], // относительные импорты
            ["^.+\\.s?css$"], // стили в самом конце
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
