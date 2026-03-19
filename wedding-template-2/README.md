# 💍 Wedding Website — Dandreb & Rose Imogin

A professional Next.js 14 wedding invitation website with an elegant emerald green theme.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion + CSS animations
- **Fonts**: Cormorant Garamond (display) · Cinzel (headings) · Quicksand (body)
- **Icons**: Lucide React

---

## Project Architecture

```
wedding-site/
├── app/
│   ├── layout.tsx          # Root layout, metadata, font loading
│   └── page.tsx            # Main page — assembles all sections
│
├── components/
│   ├── ui/                 # Reusable UI primitives
│   │   ├── Navigation.tsx      # Sticky nav with mobile hamburger
│   │   ├── SectionWrapper.tsx  # Section layout + SectionHeader
│   │   └── FloatingPetals.tsx  # Ambient leaf animation
│   │
│   └── sections/           # Page sections (one per visual block)
│       ├── HeroSection.tsx      # Full-screen hero with names
│       ├── CountdownSection.tsx # Live countdown timer
│       ├── EventsSection.tsx    # Ceremony & reception cards
│       ├── ScheduleSection.tsx  # Timeline of the day
│       ├── EntourageSection.tsx # Wedding party listing
│       ├── RsvpSection.tsx      # RSVP form with state
│       └── FooterSection.tsx    # Footer with hashtag
│
├── lib/
│   ├── wedding-data.ts     # ✅ All wedding details in one place
│   └── utils.ts            # cn(), getCountdownValues(), formatOrdinal()
│
├── styles/
│   └── globals.css         # Tailwind base + custom utilities
│
├── tailwind.config.ts      # Extended color palette & animations
├── next.config.js
└── tsconfig.json
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## Customization

### ✏️ Update wedding details
All wedding information is centralized in **`lib/wedding-data.ts`**. Edit that single file to update names, date, venue, schedule, entourage, and RSVP details.

### 🎨 Change colors
Modify the `forest`, `gold`, and `cream` color tokens in **`tailwind.config.ts`**.

### 📝 Connect RSVP form
In `components/sections/RsvpSection.tsx`, replace the `console.log` in `handleSubmit` with your preferred form backend:
- [Formspree](https://formspree.io) — easiest
- [EmailJS](https://emailjs.com) — no backend needed
- Custom Next.js API route at `app/api/rsvp/route.ts`

### 📸 Add photos
Place images in the `/public` folder and reference them using Next.js `<Image>` component.

---

## Sections

| Section | Description |
|---------|-------------|
| Hero | Full-screen landing with animated couple names |
| Countdown | Live real-time countdown to the wedding day |
| Events | Ceremony + Reception details with map links |
| Schedule | Day-of timeline from arrival to dancing |
| Entourage | Parents, best man/maid of honor, court |
| RSVP | Interactive form with attendance + guest count |
| Footer | Closing with hashtag and venue summary |

---

## Production Build

```bash
npm run build
npm start
```

Or deploy to [Vercel](https://vercel.com) for free:
```bash
npx vercel
```

---

*Made with ❤️ for Dandreb Potante & Rose Imogin Agustin — September 10, 2026*
