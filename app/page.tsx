import { TopBanner } from '@/components/top-banner'
import { ProfileHeader } from '@/components/profile-header'
import { LinksSection } from '@/components/links-section'
import { ProductsSection } from '@/components/products-section'
import { TipJar } from '@/components/tip-jar'
import { ContactForm } from '@/components/contact-form'
import type { LinkItem } from '@/components/link-row'

const recentProjects: LinkItem[] = [
  {
    title: 'Travel Blog - Solo Travel, Backpacking & More',
    href: 'https://the-traveling-coder.com/',
    icon: 'plane',
  },
  {
    title: 'Pass Your PVOC | HK Maritime Exam Prep',
    href: 'https://www.passyourpvoc.com/',
    icon: 'ship',
  },
  {
    title: 'BookYourVoice - Podcast Guest & Speaker',
    href: 'bookyourvoicehk.com',
    icon: 'mic',
  },
]

const myWork: LinkItem[] = [
  { title: 'Freelancer Profile', href: '#', icon: 'briefcase' },
  { title: 'KMA Web Agency', href: '#', icon: 'code' },
  { title: 'Book a Website Audit (45 min call)', href: '#', icon: 'calendar' },
]

export default function Page() {
  return (
    <>
      <TopBanner />
      <main className="mx-auto min-h-screen w-full max-w-lg bg-background">
        <ProfileHeader />

      <div className="px-4 pb-12">
        <LinksSection title="My Recent Projects" items={recentProjects} />
        <LinksSection title="My Work" items={myWork} />
        <ProductsSection />
        <TipJar />
        <ContactForm />

        <footer className="mt-12 flex flex-col items-center gap-2 text-center">
          <p className="font-display text-lg uppercase tracking-wide text-primary">
            Thanks for stopping by! ✿
          </p>
          <a
            href="https://start.paa.ge/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </a>
        </footer>
        </div>
      </main>
    </>
  )
}
