import { LinkRow, type LinkItem } from '@/components/link-row'
import { SectionTitle } from '@/components/section-title'

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
        {items.map((item) => (
          <LinkRow key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}
