import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import markdoc from '@astrojs/markdoc'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import remarkCodeTitles from 'remark-code-titles'
import decapCmsOauth from 'astro-decap-cms-oauth'
import rehypeExternalLinks from 'rehype-external-links'

export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */ {
    output: 'server',
    site: 'https://astro-ink.vercel.app',
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
      markdoc(),
      svelte(),
      tailwind({
        applyBaseStyles: false,
      }),
      sitemap(),
      decapCmsOauth(),
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
    adapter: vercel(),
    devToolbar: {
      enabled: false,
    },
  }
)
