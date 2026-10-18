import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowDownIcon, CalendarPlusIcon } from "@phosphor-icons/react"

import { Countdown } from "@/components/Countdown"
import { Ticket } from "@/components/Ticket"
import { Button } from "@/components/ui/button"
import { event } from "@/data/event"
import { downloadCalendarFile } from "@/lib/calendar"
import { useRegistration } from "@/lib/registration"

export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const { registration, setFormOpen, cancel } = useRegistration()

  useGSAP(
    () => {
      // Only animate when the visitor hasn't asked for reduced motion
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from("[data-hero-line]", { yPercent: 105, duration: 1.1, stagger: 0.12 })
          .from("[data-hero-fade]", { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.7")
          // The ticket is handed over: it slides in tilted and settles
          .from("[data-ticket]", { y: 60, rotate: 7, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, "-=0.9")
      })
    },
    { scope }
  )

  // A small stamp animation whenever a registration fills the ticket in
  useGSAP(
    () => {
      if (!registration) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stamp]", { scale: 2.2, opacity: 0, duration: 0.45, ease: "power3.in" })
      })
    },
    { scope, dependencies: [registration?.ticket] }
  )

  return (
    <section ref={scope} id="top" className="scroll-mt-16 border-b">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pt-14 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7">
          <p data-hero-fade className="label-mono text-muted-foreground">
            EDC, JSS University Noida presents
          </p>

          <h1 className="font-display mt-6 text-[clamp(3.9rem,10.5vw,8.75rem)] leading-[0.86] font-medium">
            <span className="sr-only">{event.name}</span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                Venture
              </span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="flex items-start gap-3">
                Verse
                <span className="mt-[0.12em] font-mono text-[0.22em] font-medium tracking-normal text-primary">
                  2026
                </span>
              </span>
            </span>
          </h1>

          <p data-hero-fade className="font-display mt-6 text-3xl italic sm:text-4xl">
            Ideas into <span className="text-primary">Action.</span>
          </p>

          <p data-hero-fade className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            One day at JSS University, Noida, for students who want to turn an early idea into a venture. Hear
            founders, build an idea with a team and learn to pitch it.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
            {registration ? (
              <Button size="xl" variant="outline" onClick={downloadCalendarFile}>
                <CalendarPlusIcon data-icon="inline-start" />
                Add to calendar
              </Button>
            ) : (
              <Button size="xl" onClick={() => setFormOpen(true)}>
                Register for free
              </Button>
            )}
            <Button size="xl" variant="ghost" asChild>
              <a href="#schedule">
                See the schedule
                <ArrowDownIcon data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <div data-hero-fade className="mt-12 max-w-lg">
            <Countdown />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 lg:col-span-5">
          <div data-ticket className="lg:rotate-[1.5deg]">
            <Ticket />
          </div>
          <div data-hero-fade className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
            {registration ? (
              <>
                <span className="label-mono">You're on the list, {registration.name.split(" ")[0]}.</span>
                <Button variant="link" size="sm" className="px-0 text-muted-foreground" onClick={cancel}>
                  Cancel registration
                </Button>
              </>
            ) : (
              <>
                <span className="label-mono">Register to fill in your pass</span>
                <Button variant="link" size="sm" className="px-0 text-muted-foreground" onClick={downloadCalendarFile}>
                  <CalendarPlusIcon data-icon="inline-start" />
                  Add to calendar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
