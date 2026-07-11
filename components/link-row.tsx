'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Briefcase,
  CalendarCheck,
  Check,
  Code2,
  Copy,
  Mic,
  Plane,
  Ship,
  type LucideIcon,
} from 'lucide-react'

export type LinkIconName =
  | 'plane'
  | 'ship'
  | 'mic'
  | 'briefcase'
  | 'code'
  | 'calendar'

const ICONS: Record<LinkIconName, LucideIcon> = {
  plane: Plane,
  ship: Ship,
  mic: Mic,
  briefcase: Briefcase,
  code: Code2,
  calendar: CalendarCheck,
}

export type LinkItem = {
  title: string
  href: string
  icon: LinkIconName
  /** Optional explicit thumbnail, usually resolved from the linked site's featured image. */
  image?: string
}

function normalizeHref(href: string): string | null {
  try {
    const withProtocol = /^https?:\/\//i.test(href) ? href : `https://${href}`
    return new URL(withProtocol).toString()
  } catch {
    return null
  }
}

export function LinkRow({ item }: { item: LinkItem }) {
  const { title, href } = item
  const Icon = ICONS[item.icon]
  const [copied, setCopied] = useState(false)
  const isRealLink = href && href !== '#'
  const normalizedHref = isRealLink ? normalizeHref(href) : null
  const thumb = item.image
  const [imgOk, setImgOk] = useState(true)

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!normalizedHref) return
    try {
      await navigator.clipboard.writeText(normalizedHref)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Ignore clipboard failures (e.g. permissions)
    }
  }

  return (
    <a
      href={normalizedHref ?? undefined}
      target={isRealLink ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 rounded-2xl border-2 border-foreground/10 bg-card px-3 py-3 text-card-foreground shadow-[3px_4px_0_0_var(--primary)] transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[5px_7px_0_0_var(--primary)] active:translate-x-[3px] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--primary)]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground ring-2 ring-foreground/5 transition-transform duration-150 group-hover:-rotate-3">
        {thumb && imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 object-cover"
            onError={() => setImgOk(false)}
          />
        ) : (
          <Icon className="h-5 w-5" strokeWidth={2} />
        )}
      </span>

      <span className="min-w-0 flex-1 truncate pr-1 font-semibold tracking-tight">
        {title}
      </span>

      {isRealLink && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-primary opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      )}

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : `Copy link to ${title}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
      >
        {copied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </a>
  )
}
