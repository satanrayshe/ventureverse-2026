import { useEffect, useRef, useState } from "react"
import { ListIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRegistration } from "@/lib/registration"
import { cn } from "@/lib/utils"

const links = [
  { id: "about", label: "About" },
  { id: "schedule", label: "Schedule" },
  { id: "speakers", label: "Speakers" },
  { id: "faq", label: "FAQ" },
]

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline gap-1.5", className)}>
      <span className="font-display text-2xl font-semibold leading-none">EDC</span>
      <span className="label-mono text-[0.65rem] text-primary">JSSUN</span>
    </span>
  )
}

// Underlines the nav link for whichever section is currently on screen
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    // Sections crossing the middle of the screen right now; empty in the hero
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(links.find((link) => visible.has(link.id))?.id ?? null)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const { id } of links) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  return active
}

export function SiteHeader() {
  const active = useActiveSection()
  const { registration, setFormOpen } = useRegistration()
  const [menuOpen, setMenuOpen] = useState(false)
  // The sheet locks page scroll while open, so we wait for it to close before scrolling
  const pendingTarget = useRef<string | null>(null)

  function goFromMenu(id: string) {
    pendingTarget.current = id
    setMenuOpen(false)
  }

  const registerButton = registration ? (
    <Button asChild variant="outline" size="lg">
      <a href="#top">Your ticket</a>
    </Button>
  ) : (
    <Button size="lg" onClick={() => setFormOpen(true)}>
      Register
    </Button>
  )

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <a href="#top" aria-label="VentureVerse 2026, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className="label-mono text-muted-foreground underline-offset-[6px] transition-colors hover:text-foreground aria-[current]:text-foreground aria-[current]:underline aria-[current]:decoration-primary aria-[current]:decoration-2"
            >
              {link.label}
            </a>
          ))}
          {registerButton}
        </nav>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg" className="md:hidden">
              <ListIcon data-icon="inline-start" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full gap-0 bg-background sm:max-w-sm"
            onCloseAutoFocus={(e) => {
              const id = pendingTarget.current
              if (!id) return
              e.preventDefault()
              pendingTarget.current = null
              if (id === "register") {
                setFormOpen(true)
                return
              }
              document.getElementById(id)?.scrollIntoView()
              history.replaceState(null, "", `#${id}`)
            }}
          >
            <SheetHeader className="border-b p-5">
              <SheetTitle>
                <Wordmark />
              </SheetTitle>
              <SheetDescription className="label-mono">VentureVerse 2026</SheetDescription>
            </SheetHeader>
            <nav aria-label="Sections" className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    goFromMenu(link.id)
                  }}
                  className="font-display border-b px-5 py-4 text-3xl hover:bg-muted"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="p-5">
              {registration ? (
                <Button variant="outline" size="xl" className="w-full" onClick={() => goFromMenu("top")}>
                  Your ticket
                </Button>
              ) : (
                <Button
                  size="xl"
                  className="w-full"
                  onClick={() => goFromMenu("register")}
                >
                  Register for free
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
