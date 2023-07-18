module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "index", "sibling"], "object"],
        pathGroups: [
          {
            pattern: "@{constants,services,slices,interfaces,components,common,hooks,utils,locales}/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@admin/**",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/require-default-props": "off",
  },
  overrides: [
    {
      files: ["*Slice.{ts,tsx,js,jsx}"],
      rules: {
        "no-param-reassign": "off",
      },
    },
    {
      files: ["**/Form/**"],
      rules: {
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
  ignorePatterns: ["node_modules", "build", "*rc.*", "*.config.*"],
};
