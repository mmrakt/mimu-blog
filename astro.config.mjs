import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import remarkCodeTitles from 'remark-code-titles'
import rehypeExternalLinks from 'rehype-external-links'

export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */ {
    site: 'https://mimu-memo.com',
    markdown: {
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'css-variables',
      },
      remarkPlugins: [remarkCodeTitles],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
    },
    integrations: [
      mdx(),
      svelte(),
      tailwind({
        applyBaseStyles: false,
      }),
      sitemap(),
    ],
    vite: {
      plugins: [],
      resolve: {
        alias: {
          $: path.resolve(__dirname, './src'),
        },
      },
      optimizeDeps: {
        allowNodeBuiltins: true,
      },
    },
    devToolbar: {
      enabled: false,
    },
  }
)
