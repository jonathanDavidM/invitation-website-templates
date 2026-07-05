# Hosting under wtg-app (Multi-Zone)

This invitation site is served at **`wtg.com/dandreb-rose`** while staying its
own independent deployment. wtg-app doesn't contain this code — it simply
**proxies** the `/dandreb-rose` path to this app. This is Next.js "Multi-Zones",
which is why the two apps can run different Next/Tailwind/zod versions without
conflict.

```
visitor → wtg.com/dandreb-rose/*  →  wtg-app rewrite  →  this deployment (basePath: /dandreb-rose)
```

## Why `basePath`

This app sets `basePath = /dandreb-rose` (via `NEXT_PUBLIC_BASE_PATH`), so every
route and asset lives under that prefix (`/dandreb-rose/_next/...`,
`/dandreb-rose/images/...`, `/dandreb-rose/api/rsvp`). That's what lets wtg-app
forward the whole prefix without asset collisions. `next/image`, `next/font`,
and `_next/*` are prefixed automatically; the audio tag and the RSVP `fetch()`
use `lib/base-path.ts` to prefix themselves.

## What's already wired

**This app**
- `next.config.ts` → `basePath` from `NEXT_PUBLIC_BASE_PATH`
- `.env.local` → `NEXT_PUBLIC_BASE_PATH=/dandreb-rose`
- audio + RSVP fetch + OG image paths are base-path aware

**wtg-app** (already edited)
- `next.config.ts` → `rewrites().beforeFiles` proxies `/dandreb-rose` and
  `/dandreb-rose/:path*` to `process.env.INVITE_ZONE_DANDREB_ROSE`
  (no-op until that env var is set, so nothing breaks meanwhile)
- `src/middleware.ts` → `/dandreb-rose*` is treated as public (otherwise the
  admin-cloaking middleware would 404 it)

## Deploy (production)

1. **Deploy this app** to its own Vercel project. Set env:
   - `NEXT_PUBLIC_BASE_PATH=/dandreb-rose`
   - `NEXT_PUBLIC_SITE_URL=https://<your-wtg-domain>` (so OG/share URLs are correct)
   Note the resulting URL, e.g. `https://dandreb-imogene.vercel.app`.
   (Its own root will 404 by design; it's only meant to be reached via wtg.com.)

2. **Point wtg-app at it.** In the wtg-app Vercel project → Settings → Environment
   Variables, add:
   - `INVITE_ZONE_DANDREB_ROSE=https://dandreb-imogene.vercel.app`
   Redeploy wtg-app.

3. Visit **`https://<your-wtg-domain>/dandreb-rose`** — the invitation loads,
   RSVP posts to the Google Form, music and images work.

## Local end-to-end test (optional)

Two servers. Set `PORT` (the `-p` flag gets mangled through `npm run`), and set
the zone URL so wtg-app's rewrite is active:

**Windows PowerShell**
```powershell
# Terminal 1 — this app on :3000 (already has NEXT_PUBLIC_BASE_PATH set)
npm run dev

# Terminal 2 — wtg-app on :3001, pointed at the invite
cd ..\wtg-app        # adjust path
$env:INVITE_ZONE_DANDREB_ROSE="http://localhost:3000"; $env:PORT="3001"; npm run dev
```

**macOS / Linux**
```bash
npm run dev   # terminal 1

cd ../wtg-app # terminal 2
INVITE_ZONE_DANDREB_ROSE=http://localhost:3000 PORT=3001 npm run dev
```

Then open `http://localhost:3001/dandreb-rose` (the invitation served through
wtg-app). Testing this app alone: `http://localhost:3000/dandreb-rose`.

## Adding another couple later

1. Build/deploy their site the same way with `NEXT_PUBLIC_BASE_PATH=/their-slug`.
2. In wtg-app `next.config.ts`, add `{ slug: "their-slug", url: process.env.INVITE_ZONE_THEIR_SLUG }`
   to `WEDDING_ZONES`.
3. In wtg-app `src/middleware.ts`, add `"their-slug"` to `WEDDING_ZONE_SLUGS`.
4. Set `INVITE_ZONE_THEIR_SLUG` in wtg-app's env and redeploy.
