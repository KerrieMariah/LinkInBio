import { LinkRow, type LinkItem } from '@/components/link-row'
import { SectionTitle } from '@/components/section-title'
import type { CSSProperties } from 'react'

export function LinksSection({
  title,
  items,
}: {
  title: string
  items: LinkItem[]
}) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="animate-smooth-fade-up"
            style={
              { '--enter-delay': `${650 + index * 110}ms` } as CSSProperties
            }
          >
            <LinkRow item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
