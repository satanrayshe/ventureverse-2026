import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

// Page-wide scroll animations:
//   [data-reveal]  headings whose words slide up one after another
//   [data-stagger] list items that fade up in turn as their list arrives
// Skipped entirely when the visitor prefers reduced motion, so everything is simply visible.
export function useScrollReveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((heading) => {
        gsap.from(heading.querySelectorAll("[data-word]"), {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        })
      })

      const groups = new Set(gsap.utils.toArray<HTMLElement>("[data-stagger]").map((el) => el.parentElement!))
      groups.forEach((group) => {
        gsap.from(group.querySelectorAll(":scope > [data-stagger]"), {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 80%", once: true },
        })
      })

      // Fonts change text height, so re-measure trigger positions once they load
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    })
  })
}
