import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { CalendarPlusIcon } from "@phosphor-icons/react"

import { SectionHeading } from "@/components/SectionHeading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { event, schedule, speakerById } from "@/data/event"
import { downloadCalendarFile } from "@/lib/calendar"

gsap.registerPlugin(ScrollTrigger)

export function Schedule() {
  const list = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The orange line grows down the timeline as you scroll through the day
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list.current, start: "top 60%", end: "bottom 60%", scrub: 0.4 },
          }
        )
        // Each session's dot fills in once the line reaches it
        gsap.utils.toArray<HTMLElement>("[data-session]").forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            onEnter: () => item.setAttribute("data-past", "true"),
            onLeaveBack: () => item.removeAttribute("data-past"),
          })
        })
      })
    },
    { scope: list }
  )

  return (
    <section id="schedule" className="scroll-mt-16 border-b bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <SectionHeading label="Schedule" title="Five hours, six sessions.">
          <p>
            {event.dateLabel}, {event.timeLabel}, in the {event.venue}. All times are India Standard Time.
          </p>
        </SectionHeading>

        <div className="lg:grid lg:grid-cols-12">
          <ol ref={list} className="relative lg:col-span-9 lg:col-start-4">
            {/* Grey track, with the orange progress line drawn over it */}
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-foreground/15" />
            <span
              aria-hidden="true"
              data-progress
              className="absolute top-2 bottom-2 left-[5px] w-0.5 origin-top scale-y-0 bg-primary"
            />

            {schedule.map((session) => {
              const speaker = speakerById(session.speakerId)
              return (
                <li
                  key={session.id}
                  id={`session-${session.id}`}
                  data-session
                  className="group relative grid scroll-mt-24 gap-x-8 gap-y-3 pb-12 pl-10 last:pb-0 sm:grid-cols-[8.5rem_1fr]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 left-0 size-3 rounded-full border-2 border-foreground/40 bg-background transition-colors duration-300 group-data-[past]:border-primary group-data-[past]:bg-primary"
                  />
                  <div>
                    <p className="font-mono text-xl font-medium tabular-nums">{session.time}</p>
                    <p className="label-mono mt-1 text-muted-foreground">{session.minutes} min</p>
                  </div>
                  <div className="max-w-xl">
                    <Badge variant="outline" className="border-foreground/30 uppercase">
                      {session.kind}
                    </Badge>
                    <h3 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{session.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{session.summary}</p>
                    {speaker && (
                      <p className="mt-4 text-sm">
                        <span className="label-mono text-muted-foreground">With </span>
                        <a
                          href={`#speaker-${speaker.id}`}
                          className="font-medium underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
                        >
                          {speaker.name}
                        </a>
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t pt-8 lg:ml-[25%]">
          <Button variant="outline" size="xl" onClick={downloadCalendarFile}>
            <CalendarPlusIcon data-icon="inline-start" />
            Add the day to your calendar
          </Button>
          <span className="label-mono text-muted-foreground">Works with Google, Outlook and Apple Calendar</span>
        </div>
      </div>
    </section>
  )
}
