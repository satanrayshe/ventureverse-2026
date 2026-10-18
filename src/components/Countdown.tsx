import { event } from "@/data/event"
import { useCountdown } from "@/hooks/useCountdown"

const pad = (n: number) => n.toString().padStart(2, "0")

export function Countdown() {
  const countdown = useCountdown(event.start, event.end)

  if (countdown.status === "live") {
    return (
      <p className="label-mono flex items-center gap-2 text-primary">
        <span className="size-2 animate-pulse rounded-full bg-primary" aria-hidden="true" />
        Happening now in the {event.venue}
      </p>
    )
  }

  if (countdown.status === "over") {
    return <p className="label-mono text-muted-foreground">VentureVerse 2026 has ended. Thanks for coming.</p>
  }

  const units = [
    { value: countdown.days, label: "days" },
    { value: countdown.hours, label: "hours" },
    { value: countdown.minutes, label: "min" },
    { value: countdown.seconds, label: "sec" },
  ]

  return (
    <div>
      <p className="label-mono mb-3 text-muted-foreground">Doors open in</p>
      {/* The ticking numbers are hidden from screen readers; they get one calm sentence instead */}
      <p className="sr-only">
        {countdown.days} days and {countdown.hours} hours until VentureVerse 2026 starts.
      </p>
      <div aria-hidden="true" className="flex divide-x divide-foreground/20 border-y border-foreground/20">
        {units.map((unit) => (
          <div key={unit.label} className="flex-1 px-3 py-3 first:pl-0 sm:px-5">
            <div className="font-mono text-3xl font-medium tabular-nums sm:text-4xl">{pad(unit.value)}</div>
            <div className="label-mono mt-1 text-[0.65rem] text-muted-foreground">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
