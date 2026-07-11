export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  image: string
  /** External store URL where the product is sold. */
  shopUrl: string
}

// Source of truth for the digital products shown on the page.
export const PRODUCTS: Product[] = [
  {
    id: 'gatsby-gold-planner',
    name: 'Gatsby Gold Digital Planner',
    description:
      'Organize life-worked life. Boost productivity. Achieve goals. 10+ premium pages of elegant, gold-accented planning.',
    priceInCents: 499,
    image: '/images/gatsby-gold.jpg',
    shopUrl: 'https://example.com/gatsby-gold-planner',
  },
  {
    id: 'forest-cat-planner',
    name: 'Forest Cat Digital Planner',
    description:
      'A cozy daily/weekly/monthly planner for busy entrepreneurs. Instant download.',
    priceInCents: 499,
    image: '/images/forest-cat.jpg',
    shopUrl: 'https://example.com/forest-cat-planner',
  },
]

// Tip jar configuration — one "coffee" costs this amount.
export const COFFEE_PRICE_IN_CENTS = 300
