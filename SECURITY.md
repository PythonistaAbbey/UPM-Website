# Security

## Prototype posture (implemented)

- Static pages only; no server-side data access, database, cookies, sessions or authentication.
- No login pages. Service gateways link to official systems in a new tab and state that this site never collects passwords.
- Enquiry form validates in the browser with Zod, uses a honeypot field, and **does not transmit or store** anything.
- Response headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera, microphone, geolocation off), `X-Robots-Tag: noindex, nofollow`. `X-Powered-By` removed.
- External links use `rel="noopener noreferrer"`.
- No secrets in the repository; `.env*` is git-ignored.

## Dependency audit (11 November 2026)

- `npm audit --omit=dev`: **0 vulnerabilities** in production dependencies.
- `npm audit` (all): 8 moderate findings, all in development-only lint tooling (`minimatch` via `@typescript-eslint` inside `eslint-config-next@16.4.6`). The only offered fix downgrades to `eslint-config-next@15`. Accepted for now; recheck when a patched release ships.

## Not yet done (required before any production use)

Content Security Policy with nonces, HSTS (set at the CDN), server-side form endpoint with rate limiting and CAPTCHA or equivalent, PDPA 2010 privacy notice and retention rules, secret scanning in CI, SAST, penetration testing by authorised personnel, logging and alerting, backup and restore tests.

## Reporting

This is an unofficial prototype. Report issues in the repository's issue tracker. Do not report vulnerabilities in UPM systems here; contact UPM directly.
