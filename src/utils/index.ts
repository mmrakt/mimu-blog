import dayjs from 'dayjs'
import { remark } from 'remark'
import Parser from 'rss-parser'
import strip from 'strip-markdown'

import { NOTE_FEED_URL, QIITA_API_ENDPOINT, ZENN_FEED_URL } from '$/config'

import type {
  Frontmatter,
  MediaType,
  MediaTypeForDisplay,
  QiitaPost,
} from '$/types'
import type { MarkdownInstance, MDXInstance } from 'astro'

dayjs().format()

import path from 'path'
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })

export const getMonthName = (date: Date) => MONTHS[new Date(date).getMonth()]

export const getSlugFromPathname = (pathname: string) =>
  path.basename(pathname, path.extname(pathname))
export const formatPostDate = (date: Date | string) =>
  dayjs(date).format('YYYY-MM-DD')

export const trimString = (str: string, limit: number) =>
  str.length > limit ? `${str.substring(0, limit)}...` : str

export const convertMediaTypeToSlug = (
  mediaType: MediaTypeForDisplay
): MediaType | '' => {
  switch (mediaType) {
    case 'mimu-memo':
      return 'owned'
    case 'Qiita':
      return 'qiita'
    case 'Zenn':
      return 'zenn'
    case 'note':
      return 'note'
  }
  return ''
}

export const extractSlugFromMd = (
  md: MarkdownInstance<Frontmatter> | MDXInstance<Frontmatter>
) => md.file.split('/').reverse()[0].replace('.mdx', '').replace('.md', '')

export const sortPostsByPubDate = (posts: Frontmatter[]): Frontmatter[] =>
  posts.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  )

export const makeQiitaPosts = async (): Promise<Frontmatter[]> => {
  const token = import.meta.env.QIITA_TOKEN || ''
  const posts = await fetchPosts(QIITA_API_ENDPOINT, token)
  return mappingQiitaFeed(posts)
}

export const makeZennPosts = async (): Promise<Frontmatter[]> => {
  const feed = await fetchFeed(ZENN_FEED_URL)
  return mappingFeed(feed.items, 'zenn')
}

export const makeNotePosts = async (): Promise<Frontmatter[]> => {
  const feed = await fetchFeed(NOTE_FEED_URL)
  return mappingFeed(feed.items, 'note')
}

export const fetchFeed = async (url: string) => {
  const feed = await new Parser().parseURL(url)
  return feed
}

export const fetchPosts = async (endpoint: string, token: string) => {
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

const mappingQiitaFeed = (posts: QiitaPost[]): Frontmatter[] => {
  return posts.map((post) => ({
    title: post.title ?? '',
    pubDate: post.created_at ? dayjs(post.created_at).format('YYYY-MM-DD') : '',
    link: post.url ?? '',
    media: 'qiita',
  }))
}

const mappingFeed = (
  items: Parser.Item[],
  media: Exclude<MediaType, 'mimu-memo'>
) =>
  items.map((item) => ({
    title: item.title ?? '',
    pubDate: item.pubDate ? dayjs(item.pubDate).format('YYYY-MM-DD') : '',
    link: item.link ?? '',
    media,
  }))

export const extractExcerptFromBody = async (body: string) => {
  let excerpt = ''
  const processing = await remark().use(strip).process(body)
  excerpt = processing.toString().replace(/\r|\n|\rn/g, '')

  if (excerpt.length > 70) {
    return `${excerpt.slice(0, 70)}...`
  }
  return excerpt
}
