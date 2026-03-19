# 💍 Lj & Lei — Envite-Style Wedding Website

A cinematic, immersive wedding website built with **Next.js 14** + **TypeScript** + **CSS Modules**, inspired by the Envite Studios aesthetic — full-bleed photography, parallax scrolling, dramatic typography, and dark luxury design.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

---

## 📁 Structure

```
envite-wedding/
├── app/
│   ├── layout.tsx              # Metadata + Google Fonts
│   ├── page.tsx                # Root page, scroll tracking
│   ├── globals.css             # Design tokens + global styles
│   └── api/rsvp/route.ts       # RSVP API endpoint
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            # Full-screen cinematic opener
│   │   ├── SaveTheDate.tsx     # Countdown + date reveal
│   │   ├── OurStory.tsx        # Parallax photo + timeline
│   │   ├── EventDetails.tsx    # Ceremony & reception cards
│   │   ├── Programme.tsx       # Day schedule over parallax bg
│   │   ├── Gallery.tsx         # Photo mosaic + lightbox
│   │   └── RSVPSection.tsx     # Full RSVP form
│   └── ui/
│       ├── Nav.tsx             # Fixed navbar w/ mobile drawer
│       ├── Footer.tsx
│       ├── Reveal.tsx          # Scroll-reveal wrapper
│       └── ParallaxImage.tsx   # Reusable parallax photo block
├── lib/
│   ├── constants.ts            # ✏️ ALL wedding content here
│   ├── types.ts
│   └── hooks/
│       ├── useCountdown.ts
│       └── useScrollReveal.ts
├── styles/modules/             # CSS Module per component
└── vercel.json
```

---

## ✏️ Customize (edit `lib/constants.ts`)

```ts
export const WEDDING = {
  bride: "Lei",
  groom: "Lj",
  date: "2025-11-22T17:00:00",   // Countdown target
  ceremony: { venue: "...", address: "..." },
  reception: { venue: "...", address: "..." },
  story: [ ... ],                 // Your love story items
  programme: [ ... ],             // Day schedule
}
```

## 🖼 Replace Photos

Photos use Unsplash URLs. To use your own:
1. Add images to `/public/photos/`
2. Update `src` props in `Gallery.tsx`, `OurStory.tsx`, `Hero.tsx`

---

## 🚀 Deploy to Vercel

```bash
# Via CLI
npx vercel

# Or connect GitHub repo on vercel.com → Import → Deploy
```

### Add Email Notifications (Resend)
```bash
npm install resend
```
Then in `app/api/rsvp/route.ts`, uncomment the Resend block and set:
```
RESEND_API_KEY=re_...
RSVP_EMAIL=you@yourdomain.com
```

---

## 🛠 Tech Stack
| | |
|---|---|
| Next.js 14 App Router | Framework |
| TypeScript | Type safety |
| CSS Modules | Scoped styles |
| Vercel | Hosting |
