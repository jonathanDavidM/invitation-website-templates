# 💍 Eleanor & Oliver — Wedding Website

A professional, production-ready wedding website built with **Next.js 14**, **TypeScript**, and **CSS Modules**, featuring an emerald & gold design theme.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
wedding-website/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Home page (assembles all sections)
│   ├── globals.css             # Global base styles
│   └── api/
│       └── rsvp/
│           └── route.ts        # RSVP API endpoint
│
├── components/
│   ├── sections/               # Full-page sections
│   │   ├── Hero.tsx
│   │   ├── Story.tsx
│   │   ├── Countdown.tsx
│   │   ├── Details.tsx
│   │   ├── Gallery.tsx
│   │   └── RSVPSection.tsx
│   │
│   └── ui/                     # Reusable UI primitives
│       ├── Nav.tsx
│       ├── Footer.tsx
│       ├── Reveal.tsx          # Scroll-reveal wrapper
│       ├── GoldDivider.tsx
│       └── SectionHeader.tsx
│
├── lib/
│   ├── constants.ts            # Wedding config (names, date, venue)
│   ├── tokens.ts               # Design tokens (colors, fonts)
│   └── hooks/
│       ├── useCountdown.ts
│       └── useReveal.ts
│
├── styles/
│   └── modules/                # CSS Modules per component
│       ├── hero.module.css
│       ├── story.module.css
│       ├── countdown.module.css
│       ├── details.module.css
│       ├── gallery.module.css
│       ├── rsvp.module.css
│       ├── nav.module.css
│       └── footer.module.css
│
├── public/                     # Static assets (add your photos here)
│   └── favicon.ico
│
├── next.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🎨 Customization

Edit **`lib/constants.ts`** to update all wedding details in one place:

```ts
export const WEDDING = {
  bride: "Eleanor",
  groom: "Oliver",
  date: "2025-06-14T16:00:00",
  displayDate: "Saturday, June 14, 2025",
  venue: "St. Margaret's Church",
  reception: "The Grand Pavilion",
  rsvpDeadline: "May 1st, 2025",
};
```

---

## 🌍 Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2 — GitHub Integration
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**

### Environment Variables (optional)
If you connect a real form backend, add in Vercel dashboard:
```
RSVP_EMAIL=your@email.com
```

---

## ✉️ RSVP Form

The RSVP form at `/api/rsvp` currently logs submissions to the console.  
To receive real emails, integrate one of:
- **Resend** (`npm install resend`) — recommended
- **SendGrid**
- **Formspree** (no backend needed)

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| CSS Modules | Scoped, performant styles |
| Vercel | Hosting & CI/CD |
