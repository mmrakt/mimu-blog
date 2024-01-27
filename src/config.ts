import type { NavItems } from './types'

export const NAV_ITEMS: NavItems = {
  home: {
    path: '/',
    title: 'home',
  },
  blog: {
    path: '/blog',
    title: 'blog',
  },
  tags: {
    path: '/tags',
    title: 'tags',
  },
  // about: {
  //   path: '/about',
  //   title: 'about',
  // },
}

export const SITE = {
  name: 'mimu-memo',
  title: 'mimu-memo',
  description: 'personal tech blog',
  url: 'https://mimu-memo.dev',
  githubUrl: 'https://github.com/mmrakt/mimu-blog',
  listDrafts: true,
  image:
    'https://raw.githubusercontent.com/one-aalam/astro-ink/main/public/astro-banner.png',
}

// Ink - Theme configuration
export const PAGE_SIZE = 10
export const USE_POST_IMG_OVERLAY = false
export const USE_MEDIA_THUMBNAIL = true

export const USE_AUTHOR_CARD = true
export const USE_SUBSCRIPTION =
  false /* works only when USE_AUTHOR_CARD is true */

export const USE_VIEW_STATS = true

export const QIITA_URL_PREFIX = 'https://qiita.com'
export const NOTE_URL_PREFIX = 'https://note.com'
export const ZENN_URL_PREFIX = 'https://zenn.dev'
export const MEDIA_TYPE_LIST = ['owned', 'qiita', 'zenn', 'note'] as const
export const MEDIA_TYPE_LIST_FOR_DISPLAY = [
  'mimu-memo',
  'Qiita',
  'Zenn',
  'note',
] as const

export const SNS_ID = 'mmrakt'
export const TWITTER_ID = 'mmrakt0716'
export const ZENN_FEED_URL = `https://zenn.dev/${SNS_ID}/feed?all=1`
export const NOTE_FEED_URL = `https://note.com/${SNS_ID}/rss`
export const QIITA_API_ENDPOINT =
  'https://qiita.com/api/v2/authenticated_user/items'
