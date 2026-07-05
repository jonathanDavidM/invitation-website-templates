# Dandreb & Imogin Rose — Wedding Website

A premium wedding invitation website for **September 10, 2026** · San Antonio
de Padua Parish, Silang · Infinity Tagaytay Events Place.

Emerald green · warm ivory · champagne gold. Built with Next.js 16 (App
Router), TypeScript, Tailwind CSS v4, Framer Motion, Radix UI, and a Google
Sheets–backed RSVP.

## Quick start

```bash
npm install
npm run images   # generates placeholders + blur manifest (re-run after adding photos)
npm run dev      # http://localhost:3000
```

## Adding the real photos

See **[PHOTOS.md](./PHOTOS.md)** — drop the engagement photos into
`public/images/gallery/` with the documented filenames, then run
`npm run images`.

## Editing content (no code required)

All copy lives in `content/`:

| File | What it controls |
| --- | --- |
| `content/couple.ts` | Names, date, welcome message, hero text, RSVP deadline, footer |
| `content/story.ts` | "Our Story" timeline milestones |
| `content/wedding.ts` | Day-of schedule + both venues (addresses, map links) |
| `content/gallery.ts` | Gallery order, captions, alt text, layout emphasis |
| `content/faq.ts` | FAQ questions & answers |
| `content/entourage.ts` | Full entourage — replace placeholder names |
| `content/rsvp-form.ts` | Google Form id + field ids for the RSVP |

## RSVP → Google Form

Guest responses are validated (zod) in `app/api/rsvp/route.ts` and submitted
into a **Google Form** you create — no Google Cloud project, no service
account, no secrets. Responses collect in the form's linked Google Sheet.

Follow **[docs/GOOGLE_FORM_SETUP.md](./docs/GOOGLE_FORM_SETUP.md)**: create the
form, then paste its id and each field's `entry.*` id into
`content/rsvp-form.ts`. The form is captured with: First/Last name, Phone,
Email, Attendance, Guest Count, Meal Preference, Song Request, Message
(Google adds the timestamp automatically).

## Project structure

```
app/                 # App Router: layout (fonts/SEO), page, robots, sitemap
app/api/rsvp/        # RSVP endpoint → Google Sheets
components/          # navigation, section shell, reveal (motion), heading
components/sections/ # one file per page section
components/ui/       # shadcn-style primitives (Radix + cva)
content/             # ALL editable content + generated image manifest
lib/                 # utils, motion language, zod schema, Sheets client
scripts/images.mjs   # placeholder + blur/dimension pipeline
types/               # shared TypeScript types
public/images/       # photos (gallery/, venues/, og.jpg)
docs/                # Google Sheets + deployment guides
```

## Deployment (Vercel)

1. Push this folder to a Git repository.
2. Import it in [vercel.com/new](https://vercel.com/new) — Next.js is
   auto-detected, no build settings needed.
3. Add the four Google Sheets env vars plus `NEXT_PUBLIC_SITE_URL`
   (your production URL) in **Project → Settings → Environment Variables**.
4. Deploy. Verify `/api/rsvp` by submitting the form once and checking the
   sheet.

## Design system

Follows the `jonathan-web-standard` plugin: semantic OKLCH tokens only
(`app/globals.css`), 4 type presets / 2 weights, 4-and-8-point spacing grid,
WCAG 2.2 AA (full-opacity focus rings, ≥24px targets, reduced-motion
support). Fonts: Cormorant Garamond (headings), Inter (body), Great Vibes
(small script accents). Deviation from the standard: light theme only — a
wedding invitation is a single printed-feeling artifact, and every dark
"forest" surface keeps AA contrast.
