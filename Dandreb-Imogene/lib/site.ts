/**
 * Canonical site URL — set NEXT_PUBLIC_SITE_URL in production.
 *
 * Normalized so a bare domain (e.g. "www.wtgstudio.co") still yields a valid
 * absolute URL: a missing scheme defaults to https:// and any trailing slash is
 * dropped. Without this, `new URL(siteUrl)` in the metadata throws
 * "Invalid URL" and the build fails.
 */
const rawSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dandreb-and-imoginrose.vercel.app"
).trim();

export const siteUrl = (
  /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`
).replace(/\/+$/, "");
