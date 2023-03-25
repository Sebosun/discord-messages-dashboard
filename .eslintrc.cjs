module.exports = {
  root: true,
  extends: ["@nuxtjs/eslint-config-typescript", "prettier"],
  rules: {
    "no-use-before-define": "off",
    "vue/no-multiple-template-root": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-use-before-define": "warn",
  },
};
