'use server'

import { stripe } from '../../lib/stripe'
import { COFFEE_PRICE_IN_CENTS } from '../../lib/products'

/**
 * Start an embedded Checkout session for the "Cheeky Tip Jar".
 * The client only sends how many coffees to buy — the price is computed and
 * validated entirely on the server so it can't be tampered with.
 */
export async function startTipCheckoutSession(coffeeCount: number) {
  const count = Math.floor(Number(coffeeCount))
  if (!Number.isFinite(count) || count < 1 || count > 99) {
    throw new Error('Please choose between 1 and 99 coffees.')
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded_page',
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Coffee for Kerrie',
            description: `A cheeky tip — ${count} coffee${count > 1 ? 's' : ''}. Thank you!`,
          },
          unit_amount: COFFEE_PRICE_IN_CENTS,
        },
        quantity: count,
      },
    ],
    mode: 'payment',
  })

  return session.client_secret
}
