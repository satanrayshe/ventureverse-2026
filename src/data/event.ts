// All page content lives here, so sections can be edited without touching layout code.
// Event facts come from the task brief. Speakers, FAQ answers and contacts are fictional.

export const event = {
  name: "VentureVerse 2026",
  tagline: "Ideas into Action",
  organiser: "Entrepreneurship Development Cell, JSS University, Noida",
  dateLabel: "12 November 2026",
  timeLabel: "10:00 AM to 3:00 PM",
  venue: "University Auditorium",
  // India Standard Time is UTC+5:30
  start: new Date("2026-11-12T10:00:00+05:30"),
  end: new Date("2026-11-12T15:00:00+05:30"),
  purpose:
    "A student-focused event about turning early ideas into ventures, learning from startup journeys, and exploring entrepreneurship on campus.",
}

export type SessionKind = "Opening" | "Talk" | "Workshop" | "Networking"

export type Session = {
  id: string
  time: string
  minutes: number
  title: string
  kind: SessionKind
  summary: string
  speakerId?: string
}

export const schedule: Session[] = [
  {
    id: "welcome",
    time: "10:00 AM",
    minutes: 20,
    title: "Welcome",
    kind: "Opening",
    summary: "The EDC team opens the day, introduces the speakers and explains how the idea sprint will work.",
  },
  {
    id: "idea-to-startup",
    time: "10:20 AM",
    minutes: 55,
    title: "From Idea to Startup",
    kind: "Talk",
    summary: "How to tell whether an idea is worth building, and the cheapest ways to test it before you spend money.",
    speakerId: "sneha",
  },
  {
    id: "founder-story",
    time: "11:15 AM",
    minutes: 45,
    title: "Founder Story",
    kind: "Talk",
    summary: "A founder walks through the first year of her company, including the parts that went wrong.",
    speakerId: "ananya",
  },
  {
    id: "idea-sprint",
    time: "12:00 PM",
    minutes: 75,
    title: "Campus Idea Sprint",
    kind: "Workshop",
    summary: "Teams of three or four pick a real problem on campus and shape it into a rough venture idea, with a break at the end.",
  },
  {
    id: "pitching",
    time: "1:15 PM",
    minutes: 60,
    title: "Pitching Basics",
    kind: "Workshop",
    summary: "What to say in the first thirty seconds, what to cut, and how to answer questions. Sprint teams try a two-minute pitch.",
    speakerId: "rohan",
  },
  {
    id: "networking",
    time: "2:15 PM",
    minutes: 45,
    title: "Networking and Closing",
    kind: "Networking",
    summary: "Talk to the speakers and the other teams, swap contacts, and hear what EDC has planned next.",
  },
]

export type Highlight = {
  title: string
  body: string
  sessionId: string
}

// Each highlight points at the session where it happens
export const highlights: Highlight[] = [
  {
    title: "Hear how a startup really began",
    body: "No highlight reel. A founder talks about her first customers, her first mistakes and what she would do again.",
    sessionId: "founder-story",
  },
  {
    title: "Build an idea in seventy-five minutes",
    body: "Work with students from other branches on a problem you can see from your hostel window.",
    sessionId: "idea-sprint",
  },
  {
    title: "Practise a two-minute pitch",
    body: "Learn a simple structure, then try it out loud and get feedback from someone who hears pitches for a living.",
    sessionId: "pitching",
  },
  {
    title: "Meet people to build with",
    body: "Most student startups start with a co-founder met by chance. The last hour is set aside for exactly that.",
    sessionId: "networking",
  },
]

export type Speaker = {
  id: string
  name: string
  initials: string
  role: string
  bio: string
}

export const speakers: Speaker[] = [
  {
    id: "ananya",
    name: "Ananya Mehra",
    initials: "AM",
    role: "Co-founder, FarmLink",
    bio: "Started an app that connects small farmers with local grocery shops during her third year of engineering. She still answers the support phone on Sundays.",
  },
  {
    id: "rohan",
    name: "Rohan Kapoor",
    initials: "RK",
    role: "Angel investor and mentor",
    bio: "Has sat through a few hundred student pitches and backed a handful of them. He will tell you which slide to delete first.",
  },
  {
    id: "sneha",
    name: "Sneha Verma",
    initials: "SV",
    role: "Product lead, BuildRight Labs",
    bio: "Turns rough ideas into first versions that people can try. She prefers paper prototypes to pitch decks.",
  },
]

export const faqs = [
  {
    q: "Who can attend?",
    a: "Any student of JSS University, Noida, from any year or branch. You do not need any business background.",
  },
  {
    q: "Is there a fee?",
    a: "No. Entry is free, but registration helps us plan seating and sprint teams.",
  },
  {
    q: "Do I need an idea before I come?",
    a: "No. The Campus Idea Sprint starts from problems, not ideas. If you do have one, tick the box on the form and we will try to build a team around it.",
  },
  {
    q: "Can I come with friends?",
    a: "Yes. Each of you should register separately. Sprint teams have three or four people, so you can stay together.",
  },
  {
    q: "What should I bring?",
    a: "Your college ID, a notebook and a pen. A laptop helps during the sprint but is not required.",
  },
]

export const contact = {
  email: "edc@example.com",
  phone: "+91 00000 00000",
  website: "https://www.edcjssun.com",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ],
}

export function sessionById(id: string) {
  return schedule.find((s) => s.id === id)
}

export function speakerById(id?: string) {
  return speakers.find((s) => s.id === id)
}

export function sessionForSpeaker(id: string) {
  return schedule.find((s) => s.speakerId === id)
}
