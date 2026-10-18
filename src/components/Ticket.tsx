import { forwardRef } from "react"

import { Card } from "@/components/ui/card"
import { event } from "@/data/event"
import { useRegistration } from "@/lib/registration"

// The hero's entry pass. Before registration it shows a blank holder line;
// after registration it is filled in with the visitor's name and ticket number.
export const Ticket = forwardRef<HTMLDivElement>(function Ticket(_props, ref) {
  const { registration } = useRegistration()

  const facts = [
    { label: "Date", value: event.dateLabel },
    { label: "Time", value: event.timeLabel },
    { label: "Venue", value: event.venue },
  ]

  return (
    <Card
      ref={ref}
      className="ticket-notches flex-row gap-0 border border-foreground/25 py-0 text-sm [--stub:5.5rem] sm:[--stub:7rem]"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-6 p-5 sm:p-7">
        <div className="label-mono flex items-start justify-between gap-4 text-muted-foreground">
          <span>Admit one</span>
          {registration ? (
            <span data-stamp className="-mt-1 -rotate-[8deg] border-2 border-primary px-2 py-0.5 text-primary">
              Registered
            </span>
          ) : (
            <span>Free entry</span>
          )}
        </div>

        <p className="font-display text-4xl leading-none sm:text-5xl">
          VentureVerse <span className="text-primary">2026</span>
        </p>

        <dl className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-3 border-t border-dashed border-foreground/25 pt-5">
          {facts.map((fact) => (
            <div key={fact.label} className="contents">
              <dt className="label-mono pt-0.5 text-muted-foreground">{fact.label}</dt>
              <dd className="text-base leading-snug sm:text-lg">{fact.value}</dd>
            </div>
          ))}
          <div className="contents">
            <dt className="label-mono pt-0.5 text-muted-foreground">Holder</dt>
            <dd className="min-w-0 truncate text-base leading-snug sm:text-lg">
              {registration ? (
                registration.name
              ) : (
                <span className="text-muted-foreground italic">Your name here</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative flex w-(--stub) shrink-0 flex-col items-center justify-between border-l-2 border-dashed border-foreground/25 py-6">
        <span className="label-mono text-muted-foreground">No.</span>
        <span className="font-mono text-base tracking-wider [writing-mode:vertical-rl] sm:text-lg">
          {registration ? registration.ticket : "VV26-····"}
        </span>
        <span className="label-mono text-muted-foreground">JSSUN</span>
      </div>

    </Card>
  )
})
