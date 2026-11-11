# Test Report — Milestone 3

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
