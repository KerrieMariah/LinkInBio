'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

export function ScrollReveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const mobileQuery = window.matchMedia('(max-width: 639px)')
    if (!mobileQuery.matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.unobserve(entry.target)
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.15,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mobile-scroll-reveal"
      data-visible={visible}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
