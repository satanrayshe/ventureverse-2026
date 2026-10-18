import { About } from "@/components/About"
import { Faq } from "@/components/Faq"
import { Hero } from "@/components/Hero"
import { RegisterDialog } from "@/components/RegisterDialog"
import { Schedule } from "@/components/Schedule"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { Speakers } from "@/components/Speakers"
import { Toaster } from "@/components/ui/sonner"
import { useScrollReveals } from "@/hooks/useScrollReveals"
import { RegistrationProvider } from "@/lib/registration"

function Page() {
  useScrollReveals()

  return (
    <>
      <a
        href="#about"
        className="sr-only z-50 bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Schedule />
        <Speakers />
        <Faq />
      </main>
      <SiteFooter />
      <RegisterDialog />
      <Toaster theme="light" position="bottom-center" />
    </>
  )
}

export default function App() {
  return (
    <RegistrationProvider>
      <Page />
    </RegistrationProvider>
  )
}
