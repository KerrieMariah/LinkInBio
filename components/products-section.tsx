import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'
import { SectionTitle } from '@/components/section-title'

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export function ProductsSection() {
  return (
    <section>
      <SectionTitle>My Digital Products</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {PRODUCTS.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border-2 border-foreground/10 bg-card text-card-foreground shadow-[3px_4px_0_0_var(--primary)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_7px_0_0_var(--primary)]"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, 300px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute right-2 top-2 rounded-full bg-accent px-2.5 py-1 text-sm font-bold text-accent-foreground shadow-sm">
                {formatPrice(product.priceInCents)}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
              <h3 className="text-sm font-semibold leading-tight tracking-tight text-balance sm:text-base">
                {product.name}
              </h3>
              <a
                href={product.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 sm:text-sm"
              >
                Shop now
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
