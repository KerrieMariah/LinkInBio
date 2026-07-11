'use client'

import { useState } from 'react'
import { Coffee } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkout } from '@/components/checkout'
import { SectionTitle } from '@/components/section-title'

const PRESET_COUNTS = [1, 3, 5]
const COFFEE_PRICE = 3

export function TipJar() {
  const [count, setCount] = useState(1)
  const [open, setOpen] = useState(false)
  const [checkoutCount, setCheckoutCount] = useState(1)

  const total = (count * COFFEE_PRICE).toFixed(2)

  function openCheckout() {
    if (count < 1) return
    setCheckoutCount(count)
    setOpen(true)
  }

  return (
    <section>
      <SectionTitle>Cheeky Tip Jar</SectionTitle>

      <div className="rounded-2xl border-2 border-foreground/10 bg-card p-5 text-card-foreground shadow-[3px_4px_0_0_var(--primary)]">
        <h3 className="mb-1 text-lg font-bold">Buy me a coffee?</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Fuel for the next adventure (and blog post).
        </p>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 p-3">
          <span className="flex items-center gap-2 text-lg" aria-hidden="true">
            <Coffee className="h-6 w-6 text-primary" strokeWidth={2} />
            <span className="text-muted-foreground">×</span>
          </span>

          {PRESET_COUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setCount(preset)}
              aria-pressed={count === preset}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                count === preset
                  ? 'scale-110 bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card text-secondary-foreground ring-1 ring-border hover:bg-secondary'
              }`}
            >
              {preset}
            </button>
          ))}

          <label className="sr-only" htmlFor="coffee-count">
            Number of coffees
          </label>
          <input
            id="coffee-count"
            type="number"
            min={1}
            max={99}
            value={count}
            onChange={(e) => {
              const next = Number.parseInt(e.target.value, 10)
              setCount(Number.isNaN(next) ? 1 : Math.min(99, Math.max(1, next)))
            }}
            className="ml-auto w-20 rounded-lg border-2 border-border bg-background px-3 py-2 text-center font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="button"
          onClick={openCheckout}
          className="mt-4 w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
        >
          Support ${total}
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Buy {checkoutCount} coffee{checkoutCount > 1 ? 's' : ''} · $
              {(checkoutCount * COFFEE_PRICE).toFixed(2)}
            </DialogTitle>
          </DialogHeader>
          {open && <Checkout coffeeCount={checkoutCount} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}
