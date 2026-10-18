import { useEffect, useState } from "react"

export type Countdown =
  | { status: "upcoming"; days: number; hours: number; minutes: number; seconds: number }
  | { status: "live" }
  | { status: "over" }

function measure(start: Date, end: Date): Countdown {
  const now = Date.now()
  if (now >= end.getTime()) return { status: "over" }
  if (now >= start.getTime()) return { status: "live" }

  const total = Math.floor((start.getTime() - now) / 1000)
  return {
    status: "upcoming",
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

// Re-measures once a second and cleans up the timer when the component unmounts
export function useCountdown(start: Date, end: Date) {
  const [value, setValue] = useState(() => measure(start, end))

  useEffect(() => {
    const timer = setInterval(() => setValue(measure(start, end)), 1000)
    return () => clearInterval(timer)
  }, [start, end])

  return value
}
