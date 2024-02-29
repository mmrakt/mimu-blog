const { fontFamily } = require('tailwindcss/defaultTheme')
const config = require('./tailwind.theme.config.cjs')
/**
 * Find the applicable theme color palette, or use the default one
 */
const themeConfig =
  process.env.THEME_KEY && config[process.env.THEME_KEY]
    ? config[process.env.THEME_KEY]
    : config.default
const { colors } = themeConfig
module.exports = {
  darkMode: 'class',
  content: ['./public/**/*.html', './src/**/*.{astro,js,ts}'],
  safelist: ['dark'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Hiragino Kaku Gothic ProN', ...fontFamily.sans],
      menlo: ['Menlo'],
    },
    extend: {
      colors: {
        theme: {
          ...colors,
          wave: {
            dark: '#32364C',
            light: '#E7DFF3',
          },
        },
      },
      typography: (theme) => ({
        dark: {
          css: {
            a: {
              color: theme('colors.cyan.400'),
              '&:hover': {
                color: theme('colors.cyan.500'),
              },
            },
          },
        },
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.cyan.700'),
              '&:hover': {
                color: theme('colors.cyan.600'),
              },
            },
            blockquote: {
              color: colors.primary,
              fontSize: theme('fontSize.2xl'),
              borderColor: colors.dark.primary,
            },
            'blockquote > p::before, p::after': {
              color: colors.dark.primary,
            },
            ':is(.dark .prose > :not(pre, h2, h3, h4, h5) code)': {
              backgroundColor: '#000',
            },
            h1: {
              color: 'currentColor',
            },
            h2: {
              color: 'currentColor',
            },
            h3: {
              color: 'currentColor',
            },
            h4: {
              color: 'currentColor',
            },
            h5: {
              color: 'currentColor',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: { typography: ['dark'] },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
