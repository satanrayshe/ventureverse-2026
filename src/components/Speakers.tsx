import { SectionHeading } from "@/components/SectionHeading"
import { sessionForSpeaker, speakers } from "@/data/event"

export function Speakers() {
  return (
    <section id="speakers" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <SectionHeading label="Speakers" title="People who have done it once already.">
          <p>
            These speakers are fictional, written for this task brief. Initials stand in for photos so no real
            person is shown as a guest.
          </p>
        </SectionHeading>

        <ul className="border-t lg:ml-[25%]">
          {speakers.map((speaker) => {
            const session = sessionForSpeaker(speaker.id)
            return (
              <li
                key={speaker.id}
                id={`speaker-${speaker.id}`}
                data-stagger
                className="grid scroll-mt-24 grid-cols-[4.5rem_1fr] gap-x-6 gap-y-4 border-b py-8 sm:grid-cols-[6.5rem_1fr_auto] sm:gap-x-8"
              >
                <div
                  aria-hidden="true"
                  className="font-display flex aspect-square items-center justify-center bg-foreground text-3xl text-background sm:text-4xl"
                >
                  {speaker.initials}
                </div>
                <div className="max-w-lg">
                  <h3 className="font-display text-3xl leading-tight">{speaker.name}</h3>
                  <p className="label-mono mt-1 text-primary">{speaker.role}</p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{speaker.bio}</p>
                </div>
                {session && (
                  <a
                    href={`#session-${session.id}`}
                    className="col-start-2 self-start border border-foreground/25 px-3 py-2 text-sm transition-colors hover:border-primary hover:text-primary sm:col-start-3"
                  >
                    <span className="block font-mono font-medium tabular-nums">{session.time}</span>
                    <span className="block">{session.title}</span>
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
