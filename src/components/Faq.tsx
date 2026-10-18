import { SectionHeading } from "@/components/SectionHeading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/data/event"

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <SectionHeading label="FAQ" title="Before you register." />

        <Accordion type="single" collapsible className="border-t lg:ml-[25%] lg:w-auto">
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-b">
              <AccordionTrigger className="font-display py-6 text-xl font-normal hover:no-underline hover:text-primary sm:text-2xl **:data-[slot=accordion-trigger-icon]:size-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
