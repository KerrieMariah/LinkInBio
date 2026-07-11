'use server'

import { Resend } from 'resend'

// Where contact form messages are delivered.
const TO_EMAIL = 'kerrie@kerriemariah.com'

export type ContactState = {
  ok: boolean
  message: string
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { ok: false, message: 'Please fill in your name, email, and message.' }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      message:
        'Email is not configured yet. Please add a RESEND_API_KEY to enable message delivery.',
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'Bio Page Contact <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      console.log('[v0] Resend error:', error)
      return { ok: false, message: 'Something went wrong sending your message. Please try again.' }
    }

    return { ok: true, message: 'Thanks! Your message has been sent.' }
  } catch (err) {
    console.log('[v0] Contact send exception:', err)
    return { ok: false, message: 'Something went wrong sending your message. Please try again.' }
  }
}
