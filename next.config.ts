import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // The prototype must never be indexed or mistaken for the official site.
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

// STATIC_EXPORT=1 builds a plain HTML/CSS/JS bundle (out/) that any static host can serve.
// Redirects and headers are then supplied by the host: see scripts/package-prototype.mjs.
const isExport = process.env.STATIC_EXPORT === "1";
// Set NEXT_PUBLIC_BASE_PATH (e.g. "/UPM-Website") when the export is served from a sub-folder,
// as GitHub Pages does for project sites.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = isExport
  ? { output: "export", trailingSlash: true, basePath, poweredByHeader: false, experimental: { globalNotFound: true } }
  : {
      poweredByHeader: false,
      experimental: { globalNotFound: true },
      async redirects() {
        return [{ source: "/", destination: "/en", permanent: false }];
      },
      async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
      },
    };

export { securityHeaders };

export default nextConfig;
