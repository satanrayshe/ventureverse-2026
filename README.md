# VentureVerse 2026: event landing page

EDC JSSUN Technical Team recruitment, Task 01 (first-year applicants).

A single-page site for VentureVerse 2026, a fictional EDC event: 12 November 2026, 10:00 AM to 3:00 PM, University Auditorium, JSS University, Noida.

Live site: https://satanrayshe.github.io/ventureverse-2026/

## How to run it

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

To make a production build, run `npm run build`. The finished site is written to `dist/`, and `npm run preview` serves it locally. Opening `dist/index.html` straight from the file system won't work, because browsers block the scripts. Use `npm run preview` or the live link instead.

## What's on the page

| Required section | Where it is |
|---|---|
| Header with navigation | `SiteHeader.tsx`: links to each section, which underline as you scroll past them. On phones they move into a slide-out menu. |
| Hero | `Hero.tsx`: event name, tagline, date, time and venue (printed on an entry pass), and a "Register for free" button. |
| About and highlights | `About.tsx`: a short description and four highlights, each linking to the session where it happens. |
| Schedule | `Schedule.tsx`: all six sessions from the brief as a timeline, with length, type and speaker. |
| Speakers | `Speakers.tsx`: three fictional speaker profiles, using initials instead of photos. |
| Footer | `SiteFooter.tsx`: EDC branding, motto, contact and social placeholders. |

## Extra features

- **Registration form** (`RegisterDialog.tsx`). It checks each field and shows an error under any field that's wrong. When you submit, the pass in the hero fills in with your name and a pass number and gets a "Registered" stamp. It's a demo, so nothing is sent anywhere. Your details are saved in your own browser (`localStorage`), so the pass is still there after a reload, and "Cancel registration" clears it.
- **Countdown** to the start of the event (`Countdown.tsx`, `useCountdown.ts`). On the day it says the event is happening now, and after 3:00 PM it says the event has ended.
- **Add to calendar** (`lib/calendar.ts`). Downloads a standard `.ics` file with the date, venue and agenda, which Google Calendar, Outlook and Apple Calendar can open.
- **FAQ** as an accordion (`Faq.tsx`).
- **Animations** with GSAP. The title rises in, the pass slides into place, headings appear word by word, and an orange line fills the schedule as you scroll through the day. They're all turned off if your device has "reduce motion" on.

## How the code is organised

```
src/
  data/event.ts         all the text: event facts, schedule, highlights, speakers, FAQ, contacts
  components/           one file per page section, plus Ticket, Countdown, SplitWords
  components/ui/        shadcn/ui components (button, card, dialog, sheet, accordion, select...)
  hooks/                useCountdown, useScrollReveals
  lib/                  calendar file, registration state, class-name helper
  index.css             colours, fonts and the ticket notch shape
```

Every section is built from the data in `data/event.ts`, so you can change a session time or a speaker's bio there and the page updates everywhere, including the calendar file.

## Design choices

- **The pass.** The hero shows an entry pass with the date, time and venue printed on it. That's the information people come to the page for, and registering fills in your own pass, so the main button has a visible result.
- **Colours from the EDC logo.** Navy for text, the orange of the logo's rocket flame as the only accent, on a warm off-white background.
- **Two fonts.** Fraunces, a serif, for headings and reading text. JetBrains Mono for times, labels and buttons, so the schedule reads like a printed run sheet.
- **Square corners and thin rules** instead of shadows and rounded cards.
- **Mobile.** Everything stacks into one column, the navigation moves into a menu, and the timeline keeps times next to sessions. Tested at 390px and 1440px wide.
- **Accessibility.** Headings split into words for the animation are still read as whole sentences by screen readers. Form errors are announced and focus moves to the first problem. There's a "Skip to content" link, and everything works with a keyboard.

## Tools, credits and AI use

- [React](https://react.dev), [Vite](https://vite.dev), [TypeScript](https://www.typescriptlang.org) and [Tailwind CSS](https://tailwindcss.com).
- [shadcn/ui](https://ui.shadcn.com) components (Lyra style) built on [Radix UI](https://www.radix-ui.com).
- [GSAP](https://gsap.com) for animation, [Sonner](https://sonner.emilkowal.ski) for the confirmation message.
- [Phosphor Icons](https://phosphoricons.com).
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/), self-hosted through Fontsource.
- Event details come from the task brief. Speakers, their companies, the FAQ answers, the email address, phone number and social links are made up or placeholders.
- No images are used. The EDC name is set in type; the official logo from the EDC Drive folder can replace the wordmark in `SiteHeader.tsx`.
- I used Claude (an AI assistant) to help plan, write and review the code. I've read through all of it and can explain how each part works.
