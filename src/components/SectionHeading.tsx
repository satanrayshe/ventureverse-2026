import type { ReactNode } from "react"

import { SplitWords } from "@/components/SplitWords"

// Every section opens the same way: a short mono label in the margin, then the headline.
// data-reveal is picked up by the scroll animation in useScrollReveals.
export function SectionHeading({ label, title, children }: {
  label: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
      <p className="label-mono text-primary lg:col-span-3 lg:pt-4">{label}</p>
      <div className="lg:col-span-9">
        <h2 data-reveal className="font-display text-5xl leading-[0.95] font-medium sm:text-6xl lg:text-7xl">
          <SplitWords text={title} />
        </h2>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </div>
  )
}
