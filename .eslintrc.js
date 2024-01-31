module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:astro/recommended',
    'prettier',
  ],
  globals: {
    astroHTML: true,
  },
  plugins: ['autofix', 'svelte3'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // NOTE: .astroファイルがjsxとして認識されてしまうための考慮。他の解決方法があれば削除する。
        'react/react-in-jsx-scope': 'off',
        'react/no-unknown-property': 'off',
        'react/jsx-key': 'off',
      },
    },
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-use-before-define': 'off',
    'no-console': 'off',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/no-danger': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/require-default-props': 'off',
    'autofix/no-unused-vars': 'error',
  },
}
