import { CalendarPlusIcon } from "@phosphor-icons/react"

import { Wordmark } from "@/components/SiteHeader"
import { SplitWords } from "@/components/SplitWords"
import { Button } from "@/components/ui/button"
import { contact, event } from "@/data/event"
import { downloadCalendarFile } from "@/lib/calendar"
import { useRegistration } from "@/lib/registration"

export function SiteFooter() {
  const { registration, setFormOpen } = useRegistration()

  return (
    <footer id="contact" className="scroll-mt-16 bg-ink text-paper">
      {/* Closing call to action */}
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <h2 data-reveal className="font-display max-w-4xl text-5xl leading-[0.95] font-medium sm:text-7xl lg:text-8xl">
          <SplitWords text={registration ? `See you on 12 November, ${registration.name.split(" ")[0]}.` : "Bring an idea, or come and find one."} />
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {!registration && (
            <Button size="xl" onClick={() => setFormOpen(true)}>
              Register for free
            </Button>
          )}
          <Button
            size="xl"
            variant="outline"
            className="border-paper/40 bg-transparent text-paper hover:bg-paper/10 hover:text-paper"
            onClick={downloadCalendarFile}
          >
            <CalendarPlusIcon data-icon="inline-start" />
            Add to calendar
          </Button>
        </div>
        <p className="label-mono mt-6 text-paper/60">
          {event.dateLabel} / {event.timeLabel} / {event.venue}
        </p>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="[&>span:last-child]:text-primary" />
            <p className="mt-4 leading-relaxed text-paper/75">
              Entrepreneurship Development Cell
              <br />
              JSS University, Noida
            </p>
            <p className="font-display mt-4 text-xl italic">Ideate, Innovate, Inspire.</p>
          </div>

          <div className="lg:col-span-4">
            <h3 className="label-mono text-paper/60">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </li>
              <li className="font-mono text-sm">{contact.phone}</li>
              <li>
                <a href={contact.website} className="underline-offset-4 hover:underline">
                  edcjssun.com
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="label-mono text-paper/60">Follow EDC</h3>
            <ul className="mt-4 space-y-2">
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="underline-offset-4 hover:underline">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <p className="label-mono mx-auto max-w-6xl px-5 py-6 leading-relaxed text-paper/55 normal-case tracking-normal">
          VentureVerse 2026 is a fictional event made for the EDC JSSUN technical team task. Speakers, the email
          address, phone number and social links are placeholders. The registration form is a demo and keeps your
          details only in this browser.
        </p>
      </div>
    </footer>
  )
}
