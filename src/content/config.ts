import { defineCollection, z } from 'astro:content'

export const tagList = [
  'other',
  'astro',
  'react',
  'typescript',
  'javascript',
  'nextjs',
  'vite',
  'css',
  'tailwindcss',
  'gatsby',
] as const

const owned = defineCollection({
  schema: z.object({
    title: z.string(),
    tag: z.enum(tagList),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
})

export const collections = { owned }
