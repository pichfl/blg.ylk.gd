module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: "es5",
  useTabs: true,
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
