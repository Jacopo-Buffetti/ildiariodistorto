import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const config = [
  ...nextVitals,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      /* ... invariato ... */
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin, // 👈 aggiunto
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      // ... regole invariate ...
      "prettier/prettier": "error", // 👈 aggiunto
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: true,
          multiline: "first",
          ignoreCase: true,
          noSortAlphabetically: true,
          reservedFirst: true,
          locale: "auto", // or e.g. "en", "it", "pt"
        },
      ],
    },
  },

  prettier, // deve restare ULTIMO per disabilitare regole in conflitto
];

export default config;
