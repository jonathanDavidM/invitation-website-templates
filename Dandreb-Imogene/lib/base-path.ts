/**
 * The subpath this site is served under when running as a zone behind wtg-app
 * (e.g. "/dandreb-rose"), or "" at the root.
 *
 * next/image, next/font and _next/* are prefixed automatically by Next's
 * `basePath`. This constant is for the few places Next does NOT auto-prefix:
 * plain-string asset URLs (the audio tag) and client-side fetch() calls.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
