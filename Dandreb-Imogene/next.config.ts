import type { NextConfig } from "next";

/**
 * When hosted as a zone behind wtg-app, this site is served under a subpath
 * (e.g. /dandreb-rose) so its routes and assets don't collide with the shell.
 * Set NEXT_PUBLIC_BASE_PATH="/dandreb-rose". Leave it unset to serve at root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
