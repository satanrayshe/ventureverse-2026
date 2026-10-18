import { SectionHeading } from "@/components/SectionHeading"
import { event, highlights, sessionById } from "@/data/event"

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <SectionHeading label="About" title="A day for students who have an idea, or want one.">
          <p>
            {event.name} is organised by the {event.organiser}. It is a student-focused event about turning early
            ideas into ventures, learning from real startup journeys and finding out what entrepreneurship on campus
            can look like. You leave with a rough idea, a team you could build it with and a pitch you have already
            said out loud once.
          </p>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-12">
          <h3 className="label-mono text-muted-foreground lg:col-span-3">What you get out of it</h3>
          <ol className="grid border-t border-l sm:grid-cols-2 lg:col-span-9">
            {highlights.map((item, i) => {
              const session = sessionById(item.sessionId)
              return (
                <li key={item.title} data-stagger className="flex flex-col gap-4 border-r border-b p-6 sm:p-8">
                  <span className="font-display text-5xl leading-none text-primary">{i + 1}</span>
                  <h4 className="font-display text-2xl leading-tight">{item.title}</h4>
                  <p className="leading-relaxed text-muted-foreground">{item.body}</p>
                  {session && (
                    <a
                      href={`#session-${session.id}`}
                      className="label-mono mt-auto pt-2 text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
                    >
                      {session.time}, {session.title}
                    </a>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
