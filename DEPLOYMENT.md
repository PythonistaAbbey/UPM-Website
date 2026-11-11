# Deployment

**Status: not deployed.** No preview URL exists. This session had no authorised hosting environment, and the brief allows publication only to an authorised demonstration environment.

## Build

```bash
npm ci
npm run check
npm run build
npm start -- -p 3000
```

All pages are statically generated. The output can also run on any Node.js host or container. Keep the security headers in `next.config.ts` and serve over HTTPS.

## Recommended demo hosting

A private preview on a platform such as Vercel, Netlify or Cloudflare, protected by password or SSO, with the prototype banner left in place and `noindex` retained. The repository owner must choose and authorise the host. Do not use any `upm.edu.my` domain or UPM infrastructure without UPM approval.

## Environments (proposed for production)

| Environment | Purpose | Data |
|---|---|---|
| Development | Developer machines, preview builds | Demo data |
| Staging | UAT and content review, access-restricted | Copy of CMS content, no personal data |
| Production | Public site, after UPM authorisation | Live CMS |

Rollback: redeploy the previous build artefact; static output makes this immediate.

## Site URL

Set `SITE_URL` (for example `https://upm-prototype.example.org`) at build time, so the `hreflang` alternate links use the real host. It defaults to `http://localhost:3000`.
