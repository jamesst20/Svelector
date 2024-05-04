import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-config-prettier";
import "eslint-plugin-only-warn";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,
  ...svelte.configs["flat/prettier"],
  perfectionistNatural,
  stylistic.configs.customize({
    arrowParens: true,
    blockSpacing: true,
    braceStyle: "1tbs",
    commaDangle: "always-multiline",
    flat: true,
    indent: 2,
    jsx: true,
    quoteProps: "as-needed",
    quotes: "double",
    semi: true,
  }),
  eslintPluginPrettierRecommended, // Must be last
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    rules: {
      "@stylistic/block-spacing": ["warn", "always"],
      "@stylistic/brace-style": ["warn", "1tbs", { allowSingleLine: true }],
      "@stylistic/operator-linebreak": "off", // Conflicts with prettier
      "@stylistic/quotes": ["warn", "double", { avoidEscape: true }],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" /* ignoreRestSiblings: true */ }],

      "no-undef": "off",

      "perfectionist/sort-classes": [
        "warn",
        {
          groups: ["property", "constructor", "method", "private-method", "unknown"],
          type: "natural",
        },
      ],

      "svelte/first-attribute-linebreak": ["warn", { multiline: "below", singleline: "beside" }],
      "svelte/html-closing-bracket-spacing": [
        "error",
        { endTag: "never", selfClosingTag: "always", startTag: "never" },
      ],
      "svelte/html-quotes": ["warn"],
      "svelte/html-self-closing": ["warn", { component: "always", normal: "ignore", svelte: "always", void: "ignore" }],
      "svelte/max-attributes-per-line": ["warn", { multiline: 1, singleline: 10 }],
      "svelte/mustache-spacing": ["warn"],
      "svelte/no-spaces-around-equal-signs-in-attribute": ["warn"],
      "svelte/prefer-class-directive": ["warn", { prefer: "always" }],
      "svelte/prefer-style-directive": ["warn"],
      "svelte/shorthand-attribute": ["warn", { prefer: "always" }],
      "svelte/shorthand-directive": ["warn", { prefer: "always" }],
      "svelte/sort-attributes": ["off"], // Conflicts with perfectionistAlphabetical

      "svelte/spaced-html-comment": ["warn"],
    },
  },
  {
    files: ["**/*.svelte"],
    rules: {
      indent: "off",
      "svelte/indent": [
        "error",
        {
          alignAttributesVertically: false,
          ignoredNodes: [],
          indent: 2,
          switchCase: 1,
        },
      ],
    },
  },
  {
    ignores: ["build/", ".svelte-kit/", "dist/", "node_modules/"],
  },
];
