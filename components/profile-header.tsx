import Image from 'next/image'
import { Globe, Mail, MapPin, MessageCircle } from 'lucide-react'
import type { ComponentType, CSSProperties, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

const socials: {
  label: string
  href: string
  icon: ComponentType<IconProps>
}[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/kerrie_mariah',
    icon: InstagramIcon,
  },
  { label: 'Email', href: 'mailto:kerrie@kerriemariah.com', icon: Mail },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=85251211421',
    icon: MessageCircle,
  },
  { label: 'Website', href: 'https://the-traveling-coder.com/', icon: Globe },
  { label: 'GitHub', href: 'https://github.com/KerrieMariah', icon: GithubIcon },
]

export function ProfileHeader() {
  return (
    <header className="relative">
      {/* Full-bleed on mobile, then a rounded photo card on larger screens. */}
      <div
        className="animate-smooth-fade-up relative h-[calc(100svh-56px)] min-h-[560px] w-full overflow-hidden px-0 sm:mt-8 sm:h-[400px] sm:min-h-0 sm:rounded-3xl sm:px-4"
        style={{ '--enter-delay': '120ms' } as CSSProperties}
      >
        <div className="relative h-full w-full overflow-hidden sm:rounded-3xl">
          <Image
            src="/images/banner.jpg"
            alt="Kerrie Mariah sailing on a boat in the harbor"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover object-center"
          />
          {/* Fade the bottom of the photo into the page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-55% to-background" />

          {/* Playful location sticker */}
          <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground shadow-sm">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} />
            Currently: Hong Kong
          </span>
        </div>
      </div>

      {/* Name + socials sit inside the mobile fade, then just under the photo on larger screens. */}
      <div className="relative z-10 -mt-36 flex flex-col items-center gap-3 px-4 sm:-mt-16">
        <h1 className="font-display text-4xl font-semibold uppercase tracking-wide text-foreground">
          @kerriemariah
        </h1>
        <nav aria-label="Social links" className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground/10 bg-card text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </a>
          ))}
        </nav>
      </div>

      {/* Friendly intro blurb with a marker-highlighted word */}
      <p className="relative z-10 mx-auto mt-6 max-w-sm px-4 text-center text-lg leading-relaxed text-foreground text-pretty">
        Traveler &amp; {' '}
        <span className="relative inline-block font-bold">
          <span className="relative z-10">developer</span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0.5 z-0 h-3 -rotate-1 bg-highlight"
          />
        </span>
        . Check out my projects, book a call, or just say hi below.
      </p>
    </header>
  )
}
