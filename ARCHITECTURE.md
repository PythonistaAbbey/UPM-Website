# Architecture

## Prototype (implemented)

```
Browser ──► Next.js 16 (static pages, App Router)
              ├─ src/app/[locale]/…      17 page routes × 2 locales, prerendered at build
              ├─ src/components/         shared UI; client components only where interaction is needed
              ├─ src/lib/                types, i18n, filters, search, validation (pure, unit-tested)
              └─ src/data/               structured datasets with provenance (verified | demo)
```

- **Rendering:** every page is statically generated (`generateStaticParams`, `dynamicParams = false`). Unknown paths return 404 via `global-not-found.tsx`; unknown programme, faculty or news slugs return 404 inside the site layout.
- **Locales:** `/en` and `/ms`. `/` redirects to `/en`. `<html lang>` follows the locale. Interface strings live in `src/lib/i18n.ts`; page body content is English-only for now and is marked `lang="en"` on `/ms` pages.
- **State in the URL:** programme filters and search queries are written to the query string, so results can be shared and bookmarked.
- **No back end:** the enquiry form validates in the browser and does not transmit. There is no database, authentication, cookies or analytics.
- **Headers:** `next.config.ts` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` and `X-Robots-Tag: noindex, nofollow`.

## Target architecture (proposed)

```
                    ┌──────────── CDN / WAF ────────────┐
Users ─────────────►│  Next.js front end (SSG + ISR)    │◄── Search service (OpenSearch/Meilisearch)
                    └──────────────┬────────────────────┘
                                   │ JSON:API (read-only, cached)
                    ┌──────────────▼────────────────────┐
Editors (SSO+MFA) ─►│  Drupal 11 headless CMS           │──► PostgreSQL / MariaDB, object storage for media
                    │  workflow, roles, translations,   │
                    │  revisions, redirects             │
                    └──────────────┬────────────────────┘
                                   │ approved integrations only
          Public links │ SSO (editors) │ data sync (programmes, units) │ repository harvest (OAI-PMH, if permitted)
```

- Front end and CMS are deployed separately; the CMS is not public-facing.
- Content visibility (draft, scheduled, expired) is enforced in Drupal; the front end only receives published content through a read-only token.
- Incremental Static Regeneration or on-demand revalidation webhooks publish changes within minutes.
- Operational systems (SMP, i-GIMS, e-Claim, etc.) stay where they are and appear as service-directory entries. See `INTEGRATION_REGISTER.md`.

## Key decisions

| Decision | Reason | Revisit when |
|---|---|---|
| Static generation | Fast, cheap, secure, no runtime data access | Personalisation is approved |
| Data files instead of a CMS in the prototype | Speed; keeps the prototype honest about provenance | Milestone 4 |
| Do not reproduce the UPM logo | No licence; avoids impersonation | UPM authorises use |
| Brand red #CA0026 and grey #8A9396 | Supplied by the project owner | Brand manual reviewed |
| Original temporary artwork instead of UPM photos | Photo licences unconfirmed; image hosts blocked from the build network | Licensed photos or UPM permission recorded in MEDIA_REGISTER.md |
| Client-side search | Under 200 records | Content exceeds a few thousand items |
