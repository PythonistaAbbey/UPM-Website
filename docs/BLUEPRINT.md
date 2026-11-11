# UPM Digital Campus — Rebuild Blueprint (Milestones 0–3)

**Status:** Independent Concept Prototype — Not an Official UPM Website. Prepared 11 November 2026.
Evidence: `SOURCE_REGISTER.md`, `URL_INVENTORY.csv`, `docs/audit/`.

Labels used: **[Verified]** seen on a public UPM page (source ID given) · **[Implemented]** works in this repository · **[Proposed]** design only, not built.

---

## 1. Existing website structure and key functional modules [Verified]

- A central portal (`www.upm.edu.my` / `spel.upm.edu.my`) with six top menus: About Us, Admission, Academics, Research, Linkages, Campus Life (S04).
- About **110 separate unit websites** on subdomains, in 11 groups: 8 offices, 22 centres, 6 divisions, 16 faculties and schools, 11 institutes, 10 residential colleges, 10 associations and others (S05). Most share one CMS template.
- At least **25 operational applications** linked publicly: SMP student portal, i-GIMS, Putra Learning Hub, e-Claim, SISMAN, emel, OPAC, repositories, admissions intake and offer-check systems, eJOBS, tenders, and the government SISPAA feedback system (S04, S26, S29, S30).
- Functional modules: sitemap, entity directory, separate news/article/headline/activity/gallery/video archives, document downloads, RSS, EN/BM toggle.

Full detail: `docs/audit/WEBSITE_AUDIT.md`, `docs/audit/CURRENT_SITEMAP.md`.

## 2. Current problems and opportunities [Verified]

| Problem | Evidence |
|---|---|
| Users must understand the org chart to find anything; ~110 homepages | S05 |
| Stale high-traffic content: central homepage news from 2018, i-PUTRA homepage from 2019, "UPM Calendar 2023" in quick links | S02, S19, S04 |
| Visa & Pass page is empty | S14 |
| Contradictory facts (265 vs 296 PG fields; two names and scopes for the direct admission channel) | S07, S08 |
| ~95 undergraduate programmes listed as plain text, no detail pages or filters | S06 |
| Template defects: unrendered `[*LIVETIMESTAMP*]`, stray text | S07, S20, S26 |
| "Click here" links, icon-only social links, unmarked mixed languages | S20, S21 |
| Many `http://` links and `:8080` ports | S04, S05 |
| No published brand colour codes | S13 |

Opportunities: one programme catalogue, one service gateway, one unit template, one news archive, a single source of truth for contested facts, and proper `/en` and `/ms` routing. See `docs/audit/GAP_ANALYSIS.md`.

Limits: 25 of 33 requested pages were read; robots rules blocked 5; no live-site rendering or accessibility scans were possible from this environment.

## 3. Proposed information architecture [Proposed; navigation Implemented]

```
Home
├── Study at UPM ─ Find a programme (catalogue + detail) · Ways to apply · Faculties and schools · Fees & scholarships
├── Research & Innovation ─ Research management · Innovation & commercialisation · AI · Institutes · Find researchers and projects
├── Our University ─ Vision & mission · History · Identity · Leadership · Facts & publications · Faculties · Contact & directory
├── International ─ Apply · Visas (owner content) · Fees & payment · Living at UPM
├── Campus Life ─ Accommodation · Support & wellbeing · Libraries · Arts & culture · Campus map
├── News & Events ─ Filterable archive · Story / event pages
├── Alumni & Partners ─ Alumni · Industry & community partners · Giving
└── Utility bar ─ Student services · Staff services · Contact · Language · Search (every page)
```

Audience entry points on the homepage map the 12 audiences in the brief onto these sections. User journeys: `USER_JOURNEYS.md`.

URL pattern: `/{en|ms}/{section}/{item}`, for example `/en/study/programmes/bachelor-of-civil-engineering`.

## 4. Technical stack and justification

| Layer | Choice | Why |
|---|---|---|
| Front end | **Next.js 16 (App Router), React 19, TypeScript** [Implemented] | Static generation for speed and SEO, server components, mature i18n routing, large talent pool in Malaysia |
| Styling | **Tailwind CSS 4** with design tokens [Implemented] | Tokens in one file; consistent, small CSS |
| Validation | **Zod 4** [Implemented] | Same schema can run on client and server |
| CMS | **Drupal 11 (headless, JSON:API)** [Proposed] | Brief's recommendation; strong workflow, revisions, roles, translation and multi-site governance; open source; Malaysian public-sector familiarity |
| Search | Local index now [Implemented]; OpenSearch or Meilisearch later [Proposed] | Faceted, multilingual search across all content types |
| Hosting | Container platform behind a CDN, on UPM-approved infrastructure [Proposed] | Subject to UPM ICT policy and data residency |
| Testing | Vitest, Playwright, axe-core, ESLint, `tsc` [Implemented] | Automated checks for every change |

See `ARCHITECTURE.md`.

## 5. Initial database / content model

Implemented as TypeScript types in `src/lib/types.ts`; the full proposed Drupal model is in `CONTENT_MODEL.md`. Core types: Organisational unit (faculty, school, institute, office), Campus, Programme, Admission pathway, Service-directory entry, Contact, News item / Event, Researcher, Project, Location. Every record carries **provenance** (verified + sources, or demo).

## 6. Proposed responsive homepage structure [Implemented]

1. Prototype notice (always first)
2. Utility bar: student services, staff services, contact, language
3. Header: identity, search, primary navigation (collapses to a menu button below 1024 px)
4. Hero with programme search
5. "I am…" audience routes (8 cards)
6. Ways to apply (3 routes, sourced)
7. Faculties and schools (6 featured, link to all)
8. Research and innovation (3 units, sourced)
9. UPM at a glance (4 verified facts)
10. News and events (latest 3, demo items labelled)
11. Campus life call-to-action, search prompt
12. Footer: navigation, disclaimer, official site link, sources

Single column on phones, two columns from 640 px, three from 1024 px.

## 7. Prioritised prototype backlog

| # | Item | Status |
|---|---|---|
| 1 | Layout, banner, navigation, bilingual routing, 404 and error states | Done (route loading skeleton removed in 0.2.0: every page is static, and the Suspense fallback caused a layout shift) |
| 2 | Programme catalogue with filters and deep links | Done |
| 3 | Programme detail template (honest empty sections) | Done |
| 4 | Central search across all local content | Done |
| 5 | Student and staff service gateways | Done |
| 6 | Faculty directory and template | Done |
| 7 | Contact directory and validated enquiry form | Done (does not send) |
| 8 | Study, About, International, Campus life, Research, Alumni pages | Done |
| 9 | News and events archive | Done (mostly demo items) |
| 10 | Campus map (schematic) | Done (positions illustrative) |
| 11 | Research discovery | Done (fictional data) |
| 12 | Full Bahasa Malaysia page content | Not started — needs translator |
| 13 | Postgraduate coursework programme list | Not started — needs SGS data |
| 14 | Server-side enquiry endpoint with rate limiting | Not started — needs authorised recipient |
| 15 | Real campus map data | Not started — needs asset office |
| 16 | Drupal content model and editorial workflow | Milestone 4 |

## 8. Milestone-by-milestone plan

| Milestone | Scope | Output | Status |
|---|---|---|---|
| 0 | Public audit | Audit documents | Done (partial evidence) |
| 1 | Blueprint and IA | This document, `USER_JOURNEYS.md`, `CONTENT_MODEL.md` | Done |
| 2 | Design system | `DESIGN_SYSTEM.md`, tokens, components | Done |
| 3 | First working release | 17 pages, tests | Done; **pause for review** |
| 4 | Drupal CMS, delegated publishing | Content types, roles, workflow | Not started |
| 5 | Integration architecture | `INTEGRATION_REGISTER.md` expanded with owners | Draft only |
| 6 | Search, comparison, service finder, analytics | — | Not started |
| 7 | Migration pipeline and redirects | `MIGRATION_PLAN.md` executed | Plan only |
| 8 | Production readiness | Security, performance, DR | Not started |
| 9 | Rollout and handover | Training, handbooks | Not started |

## 9. Estimated time and cost

**Assumptions:** a blended team of 6–8 (product lead, UX designer, 2–3 front-end, 1–2 Drupal, QA/accessibility, part-time DevOps and content strategist); UPM provides content owners, a translator and infrastructure; phased launch of central site plus 3 pilot faculties first; content entry and translation by UPM staff with project support; no rebuild of authenticated systems. Rates are indicative Malaysian market rates for a mid-sized digital agency (≈ RM 900–1,400 per person-day blended). These are planning estimates, not quotes.

| Phase | Duration | Effort (person-days) | Indicative cost (RM) |
|---|---|---|---|
| Discovery completion (full crawl, stakeholder interviews, analytics review) | 4–6 weeks | 60–90 | 55k–125k |
| Design system and UX validation with users | 6–8 weeks | 90–130 | 80k–180k |
| Drupal CMS build, workflow, roles, translation | 10–14 weeks | 250–350 | 225k–490k |
| Front-end build of central site and templates | 10–14 weeks | 250–350 | 225k–490k |
| Integrations (links, SSO for editors, search) | 6–8 weeks | 80–120 | 70k–170k |
| Migration of central + pilot faculties | 8–12 weeks (overlapping) | 150–250 | 135k–350k |
| Security, accessibility and performance testing | 4–6 weeks | 60–90 | 55k–125k |
| Training, handover, hypercare | 4–6 weeks | 40–70 | 35k–100k |
| **Total (central site + pilots)** | **~9–12 months elapsed** | **980–1,450** | **≈ RM 0.9M–2.0M** |

Not included: hosting and licences, security testing by an accredited third party, professional photography, translation of all content, and rollout to all ~110 units (likely a further 6–12 months).

## 10. Risks and permissions needed for a formal UPM deployment

Permissions: written authorisation from UPM management; a named product owner (likely CCSR and iDEC jointly); access to analytics and the CMS database for a complete inventory; brand manual and logo licence; photography rights; data-protection review (PDPA 2010) for the enquiry form; ICT security approval and a hosting decision; content-owner sign-off for every migrated section; approval before any change to DNS.

Top risks are in `RISK_REGISTER.md`.
