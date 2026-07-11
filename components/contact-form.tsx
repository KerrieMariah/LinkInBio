'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { sendContactMessage, type ContactState } from '@/app/actions/contact'
import { SectionTitle } from '@/components/section-title'

const initialState: ContactState = { ok: false, message: '' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Say hello →'}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, initialState)

  return (
    <section>
      <SectionTitle>Get in Contact</SectionTitle>

      <div className="rounded-2xl border-2 border-foreground/10 bg-card p-5 text-card-foreground shadow-[3px_4px_0_0_var(--primary)]">
        <h3 className="text-center text-lg font-bold">Let&apos;s chat</h3>
        <p className="mt-1 text-center text-muted-foreground">
          Got a project or just want to say hi? I read every message.
        </p>

        <form action={formAction} className="mt-5 flex flex-col gap-3">
          <label className="sr-only" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
          />

          <label className="sr-only" htmlFor="email">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Your email"
            className="rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
          />

          <label className="sr-only" htmlFor="message">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Your message..."
            className="resize-none rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
          />

          <SubmitButton />

          {state.message && (
            <p
              role="status"
              className={`text-center text-sm ${
                state.ok ? 'text-foreground' : 'text-destructive'
              }`}
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
