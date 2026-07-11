import type { LinkItem } from '@/components/link-row'

const IMAGE_META_NAMES = new Set(['og:image', 'twitter:image'])

function normalizeHref(href: string): string | null {
  try {
    const withProtocol = /^https?:\/\//i.test(href) ? href : `https://${href}`
    return new URL(withProtocol).toString()
  } catch {
    return null
  }
}

function decodeHtml(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function attrsFor(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {}

  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)) {
    attrs[match[1].toLowerCase()] = decodeHtml(match[2])
  }

  return attrs
}

function absoluteImageUrl(imageUrl: string, pageUrl: string): string | null {
  try {
    return new URL(imageUrl, pageUrl).toString()
  } catch {
    return null
  }
}

function firstMetaImage(html: string, pageUrl: string): string | null {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attrsFor(match[0])
    const name = attrs.property ?? attrs.name

    if (name && IMAGE_META_NAMES.has(name.toLowerCase()) && attrs.content) {
      return absoluteImageUrl(attrs.content, pageUrl)
    }
  }

  return null
}

function firstContentImage(html: string, pageUrl: string): string | null {
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = attrsFor(match[0])
    const src = attrs.src ?? attrs['data-src'] ?? attrs['data-lazy-src']

    if (!src || src.startsWith('data:') || /\.svg($|\?)/i.test(src)) {
      continue
    }

    return absoluteImageUrl(src, pageUrl)
  }

  return null
}

async function featuredImageFor(href: string): Promise<string | null> {
  const pageUrl = normalizeHref(href)
  if (!pageUrl) return null

  try {
    const response = await fetch(pageUrl, {
      next: { revalidate: 60 * 60 * 24 },
    })

    if (!response.ok) return null

    const html = await response.text()
    return firstMetaImage(html, pageUrl) ?? firstContentImage(html, pageUrl)
  } catch {
    return null
  }
}

export async function withFeaturedImages(items: LinkItem[]): Promise<LinkItem[]> {
  return Promise.all(
    items.map(async (item) => {
      if (item.image || !item.href || item.href === '#') {
        return item
      }

      return {
        ...item,
        image: (await featuredImageFor(item.href)) ?? undefined,
      }
    }),
  )
}
