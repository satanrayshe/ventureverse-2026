import { createContext, useContext, useState, type ReactNode } from "react"

export type Registration = {
  name: string
  email: string
  year: string
  course: string
  hasIdea: boolean
  ticket: string
}

type RegistrationContextValue = {
  registration: Registration | null
  formOpen: boolean
  setFormOpen: (open: boolean) => void
  register: (details: Omit<Registration, "ticket">) => Registration
  cancel: () => void
}

// The demo form never sends data anywhere. It is kept in this browser only.
const STORAGE_KEY = "ventureverse-registration"

function load(): Registration | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Registration) : null
  } catch {
    return null
  }
}

function makeTicketNumber() {
  const digits = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
  return `VV26-${digits}`
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null)

// Shared so the header, hero ticket, closing section and form all see the same state
export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registration, setRegistration] = useState<Registration | null>(load)
  const [formOpen, setFormOpen] = useState(false)

  function register(details: Omit<Registration, "ticket">) {
    const saved = { ...details, ticket: makeTicketNumber() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    setRegistration(saved)
    return saved
  }

  function cancel() {
    localStorage.removeItem(STORAGE_KEY)
    setRegistration(null)
  }

  return (
    <RegistrationContext.Provider value={{ registration, formOpen, setFormOpen, register, cancel }}>
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration() {
  const value = useContext(RegistrationContext)
  if (!value) throw new Error("useRegistration must be used inside RegistrationProvider")
  return value
}
