import { useState, type FormEvent } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRegistration } from "@/lib/registration"

const years = ["1st year", "2nd year", "3rd year", "4th year", "Postgraduate"]

type Errors = Partial<Record<"name" | "email" | "year" | "course", string>>

const emptyForm = { name: "", email: "", year: "", course: "", hasIdea: false }

function validate(form: typeof emptyForm): Errors {
  const errors: Errors = {}
  if (form.name.trim().length < 2) errors.name = "Please enter your full name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email address."
  if (!form.year) errors.year = "Please choose your year."
  if (!form.course.trim()) errors.course = "Please enter your course or branch."
  return errors
}

export function RegisterDialog() {
  const { formOpen, setFormOpen, register } = useRegistration()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Errors>({})

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    // Clear a field's error as soon as the visitor starts fixing it
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem
      const first = Object.keys(found)[0]
      document.getElementById(`reg-${first}`)?.focus()
      return
    }

    const saved = register({ ...form, name: form.name.trim(), email: form.email.trim(), course: form.course.trim() })
    setFormOpen(false)
    setForm(emptyForm)
    toast.success(`You're registered. Your pass number is ${saved.ticket}.`)
    document.getElementById("top")?.scrollIntoView()
  }

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogContent className="gap-6 bg-background p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-medium">Register for VentureVerse</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Free entry, 12 November 2026. This is a demo form: nothing is sent anywhere, and your details stay in this
            browser.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup className="gap-5">
            <Field data-invalid={!!errors.name || undefined}>
              <FieldLabel htmlFor="reg-name">Full name</FieldLabel>
              <Input
                id="reg-name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                className="h-10 text-sm"
              />
              <FieldError>{errors.name}</FieldError>
            </Field>

            <Field data-invalid={!!errors.email || undefined}>
              <FieldLabel htmlFor="reg-email">Email</FieldLabel>
              <Input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                className="h-10 text-sm"
              />
              <FieldError>{errors.email}</FieldError>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field data-invalid={!!errors.year || undefined}>
                <FieldLabel htmlFor="reg-year">Year</FieldLabel>
                <Select value={form.year} onValueChange={(value) => update("year", value)}>
                  <SelectTrigger id="reg-year" aria-invalid={!!errors.year} className="h-10! w-full text-sm">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.year}</FieldError>
              </Field>

              <Field data-invalid={!!errors.course || undefined}>
                <FieldLabel htmlFor="reg-course">Course or branch</FieldLabel>
                <Input
                  id="reg-course"
                  placeholder="e.g. B.Tech CSE"
                  value={form.course}
                  onChange={(e) => update("course", e.target.value)}
                  aria-invalid={!!errors.course}
                  className="h-10 text-sm"
                />
                <FieldError>{errors.course}</FieldError>
              </Field>
            </div>

            <Field orientation="horizontal">
              <Checkbox
                id="reg-idea"
                checked={form.hasIdea}
                onCheckedChange={(checked) => update("hasIdea", checked === true)}
              />
              <FieldLabel htmlFor="reg-idea" className="font-normal leading-snug">
                I already have an idea I'd like to work on in the sprint
              </FieldLabel>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-8">
            <Button type="button" variant="ghost" size="xl" onClick={() => setFormOpen(false)}>
              Not now
            </Button>
            <Button type="submit" size="xl">
              Get my pass
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
