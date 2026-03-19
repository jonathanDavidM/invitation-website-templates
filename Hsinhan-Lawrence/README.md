# 💍 Wedding Invitation — Next.js

A professional, production-ready wedding invitation website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## ✏️ Personalize Your Invitation

**All customization is done in one file:**

```
wedding.config.ts
```

Edit the following:

| Field | Description |
|-------|-------------|
| `bride`, `groom` | First names |
| `brideLastName`, `groomLastName` | Last names |
| `brideParents`, `groomParents` | Parent names |
| `dateISO` | Wedding date/time in ISO format (for countdown) |
| `datePretty` | Formatted date shown on screen |
| `ceremonyTime`, `receptionTime` | Event times |
| `venueName`, `venueCity`, `venueAddress` | Venue details |
| `venueMapUrl` | Google Maps link |
| `quote`, `verse` | Bible verse or personal quote |
| `rsvpDeadline` | RSVP cutoff date |
| `dresscode` | e.g. Black Tie, Cocktail Attire |
| `hashtag` | Your wedding hashtag |
| `heroBg` | Hero background photo URL |
| `photo1`, `photo2`, `photo3` | Gallery photo URLs |
| `schedule` | Day-of timeline events |

---

## 🖼️ Replacing Photos

In `wedding.config.ts`, replace the Unsplash URLs with your own:

```ts
heroBg: "https://your-cdn.com/your-hero-photo.jpg",
photo1: "https://your-cdn.com/photo1.jpg",
photo2: "https://your-cdn.com/photo2.jpg",
photo3: "https://your-cdn.com/photo3.jpg",
```

You can upload photos to:
- [Cloudinary](https://cloudinary.com) (free)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- Google Drive (get public link)
- Any image host

---

## 📬 Connecting the RSVP Form

The form in `components/RSVP.tsx` currently simulates a submission.

To receive real RSVPs, replace the `handleSubmit` function with one of:

**Option A — Formspree (easiest, free):**
```ts
const res = await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  body: JSON.stringify(form),
  headers: { "Content-Type": "application/json" },
});
```

**Option B — Next.js API Route:**
Create `app/api/rsvp/route.ts` and send email via Resend or Nodemailer.

**Option C — EmailJS:**
Use the `emailjs-com` package directly from the client.

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

---

## 📁 Project Structure

```
wedding-invite/
├── app/
│   ├── layout.tsx        # Fonts, metadata
│   ├── page.tsx          # Main page (assembles sections)
│   └── globals.css       # Global styles
├── components/
│   ├── Hero.tsx          # Full-screen hero with photo
│   ├── Countdown.tsx     # Live countdown timer
│   ├── InviteBody.tsx    # Formal invitation text & details
│   ├── Gallery.tsx       # 3-photo strip
│   ├── Schedule.tsx      # Day-of timeline + venue map
│   ├── RSVP.tsx          # RSVP form
│   └── Footer.tsx        # Footer with names & hashtag
├── wedding.config.ts     # ⬅ ALL your customization goes here
└── tailwind.config.ts
```

---

Made with love 💕
