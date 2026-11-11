// Packages the static export (out/) into a self-contained bundle that can be emailed or
// dropped onto any static host. Run: STATIC_EXPORT=1 npx next build && node scripts/package-prototype.mjs
import { writeFileSync, readFileSync, readdirSync, existsSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const out = "out";
if (!existsSync(join(out, "en", "index.html"))) throw new Error("Run STATIC_EXPORT=1 npx next build first.");

// Same headers the Next server sends, plus a Content Security Policy and HSTS for real hosts.
// Next's static pages carry inline bootstrap scripts, so script-src needs 'unsafe-inline' here;
// a nonce-based policy needs a server and is listed as production work in SECURITY.md.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");
const headers = {
  "Content-Security-Policy": csp,
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Robots-Tag": "noindex, nofollow",
};

// Netlify and Cloudflare Pages format.
writeFileSync(join(out, "_headers"), `/*\n${Object.entries(headers).map(([k, v]) => `  ${k}: ${v}`).join("\n")}\n`);
// `npx serve` format (local viewing): root redirect only. serve does not reliably attach headers
// to directory URLs, so the policy is also embedded in every page below.
writeFileSync(join(out, "serve.json"), JSON.stringify({ cleanUrls: true, trailingSlash: true, directoryListing: false, redirects: [{ source: "/", destination: "/en/", type: 302 }] }, null, 2));

// Embed the CSP and referrer policy as <meta> tags so they apply on any host, even one that cannot
// set headers. frame-ancestors and upgrade-insecure-requests are header-only and stay in _headers.
const metaCsp = csp.split("; ").filter((d) => !d.startsWith("frame-ancestors") && !d.startsWith("upgrade-insecure")).join("; ");
const meta = `<meta http-equiv="Content-Security-Policy" content="${metaCsp}"><meta name="referrer" content="strict-origin-when-cross-origin">`;
let pages = 0;
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith(".html")) {
      const html = readFileSync(f, "utf8");
      if (!html.includes("Content-Security-Policy")) { writeFileSync(f, html.replace(/<head>/i, `<head>${meta}`)); pages++; }
    }
  }
};
walk(out);
console.log(`Embedded CSP in ${pages} pages`);
writeFileSync(join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(join(out, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0; url=en/"><title>UPM Digital Campus (concept prototype)</title></head><body><p><a href="en/">Open the prototype (English)</a> · <a href="ms/">Bahasa Malaysia</a></p></body></html>\n`);

// Package with viewing instructions.
const dist = "dist";
const name = "UPM-Digital-Campus-Prototype";
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, name), { recursive: true });
cpSync(out, join(dist, name, "site"), { recursive: true });
cpSync("scripts/package-readme.html", join(dist, name, "START-HERE.html"));
execFileSync("zip", ["-qr9", `${name}.zip`, name], { cwd: dist });
console.log(`Wrote ${dist}/${name}.zip`);
