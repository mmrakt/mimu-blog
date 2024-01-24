import { defineCollection, z } from 'astro:content'

const tagList = [
  'other',
  'astro',
  'react',
  'typescript',
  'nextjs',
  'vite',
  'css',
] as const
export type Tag = (typeof tagList)[number]

const owned = defineCollection({
  schema: z.object({
    title: z.string(),
    tagList: z.array(z.enum(tagList)),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
})

export const collections = { owned }
