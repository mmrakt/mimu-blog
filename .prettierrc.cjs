module.exports = {
  semi: false,
  arrowParens: 'always',
  endOfLine: 'auto',
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 2,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
}
