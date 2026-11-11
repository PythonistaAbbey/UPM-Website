# Design System

Target: WCAG 2.2 AA. Tokens are in `src/app/globals.css` (`@theme`). Components are in `src/components/`.

## Brand colour

UPM red **#CA0026** and corporate grey **#8A9396** were supplied by the project owner on 11 November 2026 as UPM's official colours. White, charcoal and a restrained campus green support them. We avoid maroon blocks, saturated gradients and dashboard styling.

## Colour tokens

| Token | Value | Use | Contrast |
|---|---|---|---|
| `brand-600` | #CA0026 | Primary buttons, active nav, accents (official red) | 5.93:1 on white |
| `brand-700` | #A3001F | Hover and pressed states, focus ring | 8.15:1 on white |
| `brand-800` / `900` / `950` | #82001A / #5E0013 / #33000A | Deep gradients | — |
| `brand-50` / `100` / `200` | #FFF1F3 / #FFE0E5 / #FFC2CC | Tints, icon tiles | — |
| `upm-grey` | #8A9396 | Decorative lines and large text only | 3.14:1 on white |
| `ink` | #16191D | Body text, dark buttons | 17.6:1 on white |
| `ink-muted` | #5E676A | Secondary text (derived from the corporate grey) | 5.79:1 on white |
| `campus-700` | #2F6B3F | Green accent | 6.37:1 on white |
| `gold` | #E9B949 | Decorative accent on charcoal only | — |
| `demo` on `demo-bg` | #8A4B00 on #FFF4E5 | "Demonstration content" badge | 6.26:1 |

## Glass surfaces

| Utility | Recipe | Rule |
|---|---|---|
| `glass` | White at 78%, 18 px blur, 160% saturation, translucent white border, layered shadow | Dark text only. The 78% base keeps contrast valid where `backdrop-filter` is unsupported. Menus over photography use 95%. |
| `glass-dark` | Charcoal at 45%, 20 px blur | White text only, always over a darkening gradient |
| `mesh-charcoal` | Charcoal with soft red and green glows | Research band and footer |
| `lift` | 4 px rise and deeper shadow on hover and focus | Cards only |

Glass is used for the header, mega menus, hero panel, search panels, cards and the visit panel. Body sections stay solid so the page does not become a wash of transparency.

## Typography

- **Text:** Plus Jakarta Sans.
- **Display:** Fraunces (variable optical size) for H1 and H2.
- **Loading:** both are self-hosted by `next/font`, with no request to Google at runtime.
- **Body:** 16 px, line-height 1.65.
- **Hero H1:** 40 px on phones, 54 px on tablets, 66 px on desktop.
- **Section H2:** 36 px on phones, 48 px from 768 px.
- **Eyebrows:** 12 px uppercase, tracking 0.16 em, preceded by a red rule.
- One H1 per page, which is tested.

## Motion

- **Reveal:** sections fade and rise once as they scroll into view, using `Reveal.tsx` (IntersectionObserver with no animation library).
- **Without JavaScript or with reduced motion:** content is visible from the start.
- **Hover:** cards lift and images scale gently on hover.
- **No auto-motion:** there is no autoplay, carousel or looping animation. A slow hero zoom was tried and removed because it delayed Largest Contentful Paint.

## Imagery

All images go through `MediaImage.tsx`, which provides:

- AVIF and WebP `srcset` at widths of 640, 1280, 1920 and 2400.
- Intrinsic width and height, so the layout does not shift.
- A blur placeholder.
- Lazy loading for everything except the hero, which loads eagerly with high fetch priority.

Images that are temporary artwork carry a visible label. Sources and rights are recorded in `MEDIA_REGISTER.md`.

## Spacing, layout and breakpoints

`container-page`: max width 82 rem, 16 px side padding on phones, 32 px from 768 px. Section padding 40/56 px. Grids: 1 column → 2 at 640 px → 3 at 1024 px. Primary navigation collapses into a menu button below 1024 px; from 1024 px a second header row shows the seven sections, each with a glass mega menu that opens on hover and on keyboard focus.

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
| Header, mega menus, quick links, mobile menu, language switch | `SiteHeader.tsx` | Sticky frosted glass that firms up on scroll; Escape closes the mobile menu and returns focus |
| Hero search | `home/HeroSearch.tsx` | Programmes or Everything scope; popular chips |
| Faculty finder | `home/FacultyFinder.tsx` | Text and campus filters with a live count |
| Media image, temporary art label | `MediaImage.tsx` | See Imagery |
| Scroll reveal | `Reveal.tsx` | See Motion |
| Footer | `SiteFooter.tsx` | Charcoal mesh with tagline, calls to action, four link columns, disclaimer and source links |
| Breadcrumbs | `Breadcrumbs.tsx` | `aria-current="page"` |
| PageHeader (aurora, or photographic with `image`), Section, Card, ButtonLink, Notice, EmptyState, ExternalLink, `panel`/`field`/`band` classes | `ui.tsx` | Card makes the whole tile clickable from its heading link |
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

Routes `/en/...` and `/ms/...` share templates. Interface strings come from a typed dictionary; a unit test checks both languages have the same keys. The homepage body is written in both languages; the Malay copy is a draft that needs review by a native-speaking editor. Inner page bodies are still English-only and are marked `lang="en"` on `/ms` routes, with a visible notice, so they are not presented as translated. Malaysian Government Design System (MYDS) patterns should be compared in Milestone 4 for form and colour-contrast conventions; this was not done here.
