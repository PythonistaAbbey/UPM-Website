# Design System

Target: WCAG 2.2 AA. Tokens are in `src/app/globals.css` (`@theme`). Components are in `src/components/`.

## Brand colour — provisional

UPM's public logo page says red symbolises the quest for knowledge and grey symbolises information technology, but publishes **no colour codes** (S13), and no official specification was found (S33). The reds below were chosen for contrast and must be replaced with the value from UPM's corporate identity manual.

## Colour tokens

| Token | Value | Use | Contrast |
|---|---|---|---|
| `brand-700` | #9a1124 | Primary buttons, links, focus ring | 8.47:1 on white |
| `brand-600` | #b4152b | Accents | 6.81:1 on white |
| `brand-800` / `900` | #7c0e1d / #5c0a15 | Hover, hero gradient | — |
| `brand-50` / `100` | #fdf2f3 / #fbe3e6 | Tints, badges | brand-700 on brand-50: 7.73:1 |
| `ink` | #1f2328 | Body text, dark bars | 15.8:1 on white |
| `ink-muted` | #4b5563 | Secondary text | 7.56:1 on white, 6.93:1 on surface-alt |
| `surface-alt` | #f5f5f4 | Alternate sections | — |
| `campus-700` | #2f6b3f | Green accent (UPM's green campus) | 6.37:1 on white |
| `demo` on `demo-bg` | #8a4b00 on #fff4e5 | "Demonstration content" badge | 6.26:1 |
| Banner text | #5c3200 on #fff4e5 | Prototype notice | 10.11:1 |

## Typography

System font stack led by Inter (not bundled, so no external font request). Base 16 px, line-height 1.6. Headings: H1 30/48 px (mobile/desktop), H2 24/30 px, H3 18 px. One H1 per page (tested).

## Spacing, layout and breakpoints

`container-page`: max width 80 rem, 16 px side padding on phones, 32 px from 768 px. Section padding 40/56 px. Grids: 1 column → 2 at 640 px → 3 at 1024 px. Primary navigation collapses into a menu button below 1024 px.

## Interaction and accessibility rules

- Visible 3 px focus outline on every focusable element (white on dark areas).
- Touch targets at least 44 px for buttons and form controls; at least 24 px for inline links (axe `target-size` is part of the test suite).
- Skip link to `#main`. Landmarks: banner note, header, primary navigation, breadcrumb, main, footer.
- External links open in a new tab and say so to screen readers.
- Forms: visible labels, hints linked with `aria-describedby`, `aria-invalid` on errors, error summary that receives focus, no reliance on colour alone.
- Live regions announce result counts for filters and search.
- `prefers-reduced-motion` turns off transitions and animations.

## Components

| Component | File | Notes |
|---|---|---|
| Prototype banner | `PrototypeBanner.tsx` | On every page; bilingual |
| Header, utility bar, mobile menu, language switch | `SiteHeader.tsx` | Escape closes menu and returns focus |
| Footer | `SiteFooter.tsx` | Disclaimer and links |
| Breadcrumbs | `Breadcrumbs.tsx` | `aria-current="page"` |
| PageHeader, Section, Card, ButtonLink, Notice, EmptyState, ExternalLink | `ui.tsx` | Card makes the whole tile clickable from its heading link |
| Demo badge, provenance note | `Provenance.tsx` | Shows "Demonstration content" or source IDs |
| Programme filters | `ProgrammeFinder.tsx` | URL-synced |
| Faculty cards / template | `app/[locale]/faculties/…` | Data-driven |
| Research profiles | `ResearchDiscovery.tsx` | Demo data |
| News card, news archive | `NewsCard.tsx`, `NewsArchive.tsx` | Filters by type, category, year, source |
| Service gateway | `ServiceGateway.tsx` | Login and insecure-link badges |
| Contact directory, enquiry form | `Directory.tsx`, `ContactForm.tsx` | Validation, honeypot, consent |
| Campus map | `CampusMap.tsx` | Every marker is also a list button |
| Search | `SearchClient.tsx` | Type facets, empty and no-result states |

## Bilingual architecture

Routes `/en/...` and `/ms/...` share templates. Interface strings come from a typed dictionary; a unit test checks both languages have the same keys. Body content is English-only in this release and is marked `lang="en"`. Malaysian Government Design System (MYDS) patterns should be compared in Milestone 4 for form and colour-contrast conventions; this was not done here.
