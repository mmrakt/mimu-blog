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
  Tag,
} from '$/types'
import type { MarkdownInstance, MDXInstance } from 'astro'

dayjs().format()

import path from 'path'
import type { CollectionEntry } from 'astro:content'
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

export const sortPostsByPubDate = (posts: Frontmatter[]): Frontmatter[] =>
  posts.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  )

export const makeQiitaPosts = async (): Promise<Frontmatter[]> => {
  const token = import.meta.env.QIITA_TOKEN || ''
  if (!token) return []

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

export const fromCollectionToFrontmatters = (
  collection: CollectionEntry<'owned'>[]
): Frontmatter[] => {
  return collection.map((entry) => {
    return {
      pubDate: entry.data.pubDate,
      title: entry.data.title,
      tagList: entry.data.tagList,
      link: entry.slug,
      media: 'owned',
    }
  })
}

export const calcTagCountByTagList = (tagList: Tag[]) => {
  return tagList
    .map((tag) => ({ name: tag, count: 1 }))
    .reduce((acc, cur) => {
      const found = acc.find((el) => el.name === cur.name)
      if (found) {
        found.count += 1
      } else {
        acc.push(cur)
      }
      return acc
    }, [])
}

export const calcTagCountByCollection = (
  collection: CollectionEntry<'owned'>[]
) => {
  return collection
    .flatMap((post) =>
      post.data.tagList.map((tag) => ({ name: tag, count: 1 }))
    )
    .reduce((acc, cur) => {
      const found = acc.find((el) => el.name === cur.name)
      if (found) {
        found.count += 1
      } else {
        acc.push(cur)
      }
      return acc
    }, [])
}
