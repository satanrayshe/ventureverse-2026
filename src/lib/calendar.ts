import { event, schedule } from "@/data/event"

// Calendar files want UTC times in the form 20261112T043000Z
function toIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
}

// Builds a standard .ics file and hands it to the browser as a download.
// Google Calendar, Outlook and Apple Calendar all open this format.
export function downloadCalendarFile() {
  const agenda = schedule.map((s) => `${s.time}  ${s.title}`).join("\\n")

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EDC JSSUN//VentureVerse 2026//EN",
    "BEGIN:VEVENT",
    "UID:ventureverse-2026@edcjssun",
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(event.start)}`,
    `DTEND:${toIcsDate(event.end)}`,
    `SUMMARY:${event.name}: ${event.tagline}`,
    `LOCATION:${event.venue}\\, JSS University\\, Noida`,
    `DESCRIPTION:Organised by EDC JSSUN.\\n\\n${agenda}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]

  const file = new Blob([lines.join("\r\n")], { type: "text/calendar" })
  const url = URL.createObjectURL(file)
  const link = document.createElement("a")
  link.href = url
  link.download = "ventureverse-2026.ics"
  link.click()
  URL.revokeObjectURL(url)
}
