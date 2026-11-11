# Test Report

## Design upgrade (0.2.0), Milestones A–C

These checks were run on 11 November 2026 in the project's cloud build environment: Linux, Node 22.23, and Chromium from Playwright 1.63. All figures come from actual runs.

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | Pass, 0 problems |
| Type check | `npm run typecheck` | Pass |
| Unit tests | `npm test` | **30 passed**, 5 files |
| Production build | `npm run build` | Pass; every route statically generated |
| Browser and accessibility tests | `npm run test:e2e` | **136 passed, 10 skipped** of 146 (desktop 1280×720 and Pixel 7). One axe test failed on the first run (see below), was fixed, and passed 4 of 4 reruns |
| Production dependency audit | `npm audit --omit=dev` | 0 vulnerabilities |

The 10 skips are intentional:

- 7 overflow checks set their own widths, so they run on desktop only.
- The desktop mega-menu and skip-link tests do not run on mobile.
- The mobile-menu test does not run on desktop.

### New tests (`tests/e2e/home.spec.ts`)

- **Hero:** one H1, both calls to action, and a single high-priority hero image that loads.
- **Images:** every image has width, height and alt. Every image other than the hero is lazy loaded.
- **Image failure:** with every image request blocked, text and layout survive with no overflow.
- **Hero search:**
  - Programmes scope goes to `/study/programmes?q=` and narrows the results.
  - Everything scope goes to site search.
  - The popular chips work.
- **Audience gateway:** 8 destinations. The International student card opens /international.
- **Field cards:** they open the programme finder filtered by field (Engineering shows 9).
- **Faculty finder:** text filter (forest shows 2), campus filter (Bintulu shows 2) and the empty state.
- **Malay homepage:** Malay heading and Malay call to action.
- **Navigation:**
  - The desktop mega menu opens on keyboard focus and its links are reachable with Tab.
  - The header becomes more opaque after scrolling.
  - The mobile menu opens with no horizontal overflow.
- **Overflow:** no horizontal overflow at 320, 375, 430, 768, 1024, 1440 and 1920 px, in both languages.
- **Axe with motion on:** the homepage passes axe in both languages after every section has revealed.

The route-level axe scans run with reduced motion. Without it, axe can measure contrast mid-fade.

### Defects found and fixed during this round

1. **Programme search overflow (1280 px):** the search form on the homepage overflowed. Fixed with `minmax(0,1fr)` and `min-w-0`.
2. **Header overflow on phones (375 and 412 px):** fixed with a search icon and a logo that can wrap.
3. **Header overflow on Malay pages at 1024 px:** fixed with tighter navigation spacing between 1024 and 1279 px.
4. **Mobile menu overflow:** the "Close menu" label made the header overflow. The button now keeps the label "Menu", and `aria-expanded` conveys its state.
5. **Mega menu legibility:** text over the hero showed through the menu panel. The panel is now 95% opaque.
6. **Layout shift:**
   - **Cause:** a Suspense loading fallback (`loading.tsx`). It made the footer jump on first load (CLS 0.43 in one Lighthouse run).
   - **Fix:** removed the fallback. Every page is static, so it served no purpose. CLS is now 0 in every run.
7. **Slow hero:** a slow "zoom" on the hero image delayed Largest Contentful Paint. It was removed.
8. **Missing favicon:** the 404 for `favicon.ico` logged a console error. Added `icon.svg`.
9. **Invalid hreflang:** the links were relative. They are now absolute via `metadataBase`.
10. **axe `target-size` false positive:** footer links sat under the sticky header in the motion-on axe test. The test now scrolls back to the top before scanning.

### Lighthouse (homepage `/en`, Lighthouse 12.6.1, local production server)

| Profile | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Mobile (simulated slow 4G, 4× CPU) | 88–93 over 4 runs | 100 | 100 | 63 | 0.9 s | 2.8–3.2 s | 180–250 ms | 0 |
| Desktop | 100 (3 runs) | 100 | 100 | 63 | 0.3 s | 0.7 s | 0 ms | 0 |

The SEO score is 63 only because the pages are deliberately set to `noindex, nofollow` (prototype policy).

These are lab figures from a shared container, not field Core Web Vitals; there is no deployed site to measure real users. The main mobile cost is the 1280 px hero image chosen for phone screens; adding a 960 px variant is a known next step.

### Not tested in this round

- Safari and Firefox rendering of `backdrop-filter`. Fallback colours are opaque enough to keep contrast, but this has not been checked in those browsers.
- Real phones and tablets (only emulation was used).
- Manual screen reader passes.
- Bahasa Malaysia copy quality on the homepage (a draft that needs a qualified reviewer).

---

## Milestone 3 (0.1.0)

Run on 11 November 2026 in the project's cloud build environment (Linux, Node 22.23, Chromium from Playwright 1.63). Results below are copied from actual runs.

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | Pass, 0 problems |
| Type check | `npm run typecheck` | Pass |
| Unit tests | `npm test` | **30 passed**, 5 files |
| Production build | `npm run build` | Pass; all routes statically generated (~280 pages) |
| Browser + accessibility tests | `npm run test:e2e` | **104 passed, 2 skipped** of 106 (desktop 1280×720 and Pixel 7 emulation) |
| Production dependency audit | `npm audit --omit=dev` | 0 vulnerabilities |
| Full dependency audit | `npm audit` | 8 moderate, dev-only lint tooling (see `SECURITY.md`) |

The 2 skipped tests are intentional: the mobile-menu test runs only on mobile, and the skip-link keyboard test runs only on desktop.

## What the browser tests cover

- **Every route in both locales** (19 routes × 2 locales × 2 viewports): HTTP 200, correct `<html lang>`, prototype notice visible, exactly one `<h1>`, no horizontal overflow, and **no serious or critical axe-core violations** for WCAG 2.0/2.1 A and AA and WCAG 2.2 AA tags.
- 404 for unknown paths, unknown locale and unknown programme slug; `/` redirects to `/en`.
- Every internal link found on five key pages returns 200.
- Programme filters: faculty, level and keyword narrow results to the expected counts; URL updates; deep links restore state; empty state and "clear all".
- Search: header search, result counts, type facet, no-results state.
- Contact form: error summary receives focus, `aria-invalid` set, successful validation shows routing and states nothing was sent.
- Directory search, campus map selection (deep link and list), news filters, language switch keeps the page, mobile menu closes with Escape and returns focus, skip link.

## Defect found and fixed during testing

axe `target-size` (WCAG 2.2, 2.5.8) failed on the utility bar links (Student services, Staff services, Contact). Fixed by giving them a 24 px minimum height.

## Not tested (unverified)

- Manual screen reader testing (NVDA, VoiceOver, TalkBack) and manual keyboard walk-through of every page.
- Real devices and browsers other than Chromium (Safari, Firefox).
- Core Web Vitals / Lighthouse performance.
- Bahasa Malaysia translation quality (needs a qualified reviewer).
- Anything about the live UPM sites' rendering; see audit limits.
