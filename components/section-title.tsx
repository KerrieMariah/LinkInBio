export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 mb-5 flex items-center justify-center gap-2 text-center">
      <span className="relative inline-block font-display text-2xl font-semibold uppercase tracking-wide text-foreground text-balance">
        {children}
        {/* Playful hand-drawn style marker underline in sage */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-2 w-full -rotate-1 rounded-full bg-primary/25"
        />
      </span>
    </h2>
  )
}
