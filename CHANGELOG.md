# Changelog

## 0.3.0 — 2026-11-12 (Milestone D: inner pages)

### Changed
- **Page headers:** 10 landing and detail pages now have a floating photographic header with the title on dark glass: Study, Research, About, International, Campus life, Alumni, Faculties, faculty, programme and news. Utility pages keep the light aurora header.
- **Components:** all inner-page components now use the glass surfaces, rounded controls and pill buttons of the new design. That covers cards, panels, the programme finder, the service gateways, the directory, the contact form, the campus map, search, news, research discovery, 404 and error.
- **About page:** vision and values are display-type cards, and the history is a card timeline.
- **Logo notice:** it now states that the colours were supplied by the project owner.

### Added
- `tests/e2e/inner.spec.ts`: photographic header checks on 10 pages, and no horizontal overflow on every inner page at 320, 375, 768 and 1024 px.

## 0.2.0 — 2026-11-11 (design upgrade, Milestones A–C)

### Changed
- Palette moved to UPM red #CA0026 and corporate grey #8A9396 with charcoal, white and a campus green; all text pairs meet WCAG AA.
- New type pairing: Plus Jakarta Sans for text, Fraunces for display headings (self-hosted).
- Header rebuilt as sticky frosted glass with quick links, a search pill, glass mega menus for every section and a card-style mobile menu. The prototype notice is slimmer but still on every page.
- Homepage rebuilt with ten sections: full-bleed hero with glass panel and scoped search, "I am a…" gateway (8 audiences), Discover UPM editorial, field cards with programme search, research showcase, searchable faculty directory, Life at UPM mosaic, news feature, visit panel and a premium footer.
- Homepage copy now in both English and Bahasa Malaysia (Malay is a draft for review).

### Added
- Media system: manifest with rights status, AVIF and WebP variants, blur placeholders, lazy loading and a priority hero. Eight original temporary illustrations, each labelled, until licensed UPM photography is approved.
- MEDIA_REGISTER.md recording all images, candidate UPM photos and their licence status.
- Favicon, absolute hreflang links (set `SITE_URL` when deployed).
- 13 new browser tests for the homepage (hero search scopes, chips, audience gateway, field links, faculty finder, mega menu keyboard access, header on scroll, image loading and failure, axe with motion on).

## 0.1.0 — 2026-11-11

### Added
- Milestone 0 audit: URL inventory (122 rows), source register (33 sources), website audit, content inventory, current sitemap, gap analysis.
- Blueprint, user journeys, architecture, design system, content model, integration register, migration plan, security notes, risk register, demo script, deployment guide.
- Next.js 16 prototype with 17 page types in English and Bahasa Malaysia interface: programme catalogue (99 programmes from UPM's public list) with URL-synced filters, central search, faculty template (16 units), research discovery (demo data), schematic campus map, student and staff service gateways (28 real links), news and events archive, contact directory and validated enquiry form, 404, error and loading states.
- Unit tests (30) and Playwright tests (106 across desktop and mobile, including axe WCAG 2.2 AA scans of every route).
