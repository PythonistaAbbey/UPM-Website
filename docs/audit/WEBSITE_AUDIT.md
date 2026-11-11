# Website Audit — Milestone 0

Status: **partial, evidence-limited audit** (2026-11-11). Read `SOURCE_REGISTER.md` first for how pages were accessed and what could not be observed.

## 1. Scope

| Requested start point | Result |
|---|---|
| upm.edu.my | Fragmentary content; `www.upm.edu.my` fetched; `?LANG=en` and robots.txt blocked |
| spel.upm.edu.my/sitemap | Fetched — the best structural source found |
| sgs, akademik, intl, idec, eng, fsktm, alumni, rmc, sciencepark, ai | Homepages fetched |
| psasir, upmkb | Blocked by robots rules — not accessed |
| Discovered: lib, hep, bpp | Fetched |
| Discovered: pspk | Blocked |
| ~90 other unit sites from the entity list | Discovered, not fetched (listed in `URL_INVENTORY.csv`) |

Not done, and not claimed: a full crawl, browser rendering, automated accessibility scans of live pages, Core Web Vitals, or any visit to an authenticated system.

## 2. Existing structure and key functional modules

**Site families** (from S04, S05):

1. **Central portal** — `www.upm.edu.my` and `spel.upm.edu.my` share one CMS template. Top menu: About Us · Admission · Academics · Research · Linkages · Campus Life.
2. **~110 unit websites** on their own subdomains, in 11 groups: Offices (8), Centres (22), Divisions (6), Faculties (16, including two at Bintulu), Institutes (11), Schools (1), Academy (1), Residential Colleges (10), Associations (10), Services (5), Bintulu campus (3). Most use the **same CMS template** (`HOME | <UNIT NAME>` page titles, identical tender/job widgets, `LIVETIMESTAMP` footers, EN/BM toggle).
3. **Independently designed sites** — e.g. ai.upm.edu.my (own navigation and design), LibGuides, Google Sites (library bookings, Power BI bootcamp).
4. **Operational applications** — at least 25 found: SMP student portal, i-GIMS (staff and student), Putra Learning Hub, e-Claim, SISMAN, emel, PUTRA Portal, SPICT, OPAC (Koha), PutraRepo, UPM-ID, intake and offer-check systems, eJOBS, tenders, e-iso, and the government SISPAA feedback system.
5. **Third-party and related entities** — UPM Holdings / UPMET (distance learning), Flywire (fees), tenderwizard.my (procurement), UPU (national admission system), PTPTN.

**Functional modules seen:** sitemap, entity directory, news / articles / headlines / activities / gallery / video / "UPM in the news" archives, document downloads, RSS, feedback (external), tender and job widgets, EN/BM switch, links to screen-reader websites, an e-newsletter sign-up (MailerLite).

## 3. Problems, with evidence

| # | Finding | Evidence |
|---|---|---|
| P1 | **Fragmented estate** — ~110 subdomains, each with its own homepage, news and menus; users must know the org chart to find things | S05 |
| P2 | **Outdated content on high-traffic pages** — central homepage news references 2018; i-PUTRA (international) homepage's newest stories are from 2019; "UPM Calendar 2023" still in quick links; "Career Fair 2024" featured on FSKTM | S02, S19, S04, S21 |
| P3 | **Empty critical page** — Visa & Pass page has a heading and no content | S14 |
| P4 | **Contradictory facts** — postgraduate page says both "more than 265" and "296" fields of study; How to Apply calls the direct route the "Alternative Channel" (Foundation only) in one tab and the "Inclusive Channel" (Foundation + 81 bachelor programmes) in another | S07, S08 |
| P5 | **No programme detail pages** — the undergraduate list is ~95 names in plain text, no links, no filters | S06 |
| P6 | **Template defects** — unrendered `[*LIVETIMESTAMP*]` placeholders, stray `;` between items, stray text "99 spel" / "BZCSHAV~" | S07, S20, S26, S29 |
| P7 | **Weak link text and image-only icons** — "click here", social icons as `fb.png` with no visible label | S20, S21 |
| P8 | **Insecure and inconsistent links** — many `http://` links, non-standard ports (`:8080`) for i-GIMS, mixed `www`/no-`www`, `?LANG=en&uri=/` query strings | S04, S05 |
| P9 | **Naming inconsistency** — same campus labelled UPMKB, UPMS, UPM Bintulu Sarawak Campus, btu; college names differ between entity list and housing division ("Seventeen Colleges", "ThirteenTh College") | S05, S06, S31 |
| P10 | **Mixed language without markup** — Malay and English headings mixed on the same page | S17, S20, S21 |
| P11 | **Brand specification not public** — logo page explains red and grey meanings but gives no colour codes or usage rules | S13, S33 |
| P12 | **Personal mailbox on official page** — a Gmail address for alumni is shown on the central homepage | S02 |
| P13 | **Contact page thin** — no map, office hours or campus addresses; last updated 2023 | S12 |
| P14 | **Undated news** across unit sites, so freshness cannot be judged | S20, S21, S28, S30 |

## 4. Opportunities

- One **programme catalogue** built from a single authoritative dataset (the UG list in S06 already exists — it just needs structure).
- A **service gateway** that lists the 25+ operational systems by audience, with HTTPS links and a short description of each.
- A **unit template** that keeps unit editorial control but removes 100+ duplicate homepages.
- **Central news** with unit tagging, replacing many separate archives.
- **Single source of truth** for contested facts (field-of-study counts, admission channels).
- Proper **bilingual architecture** (`/en`, `/ms`) instead of a `?LANG=` toggle.

## 5. Accessibility, from text evidence only

Confirmed in page text: vague link text, icon-only social links, unrendered placeholders, missing language markup for mixed-language content. Not verified: contrast, focus indication, keyboard operation, headings and landmarks. A browser-based audit with axe and manual screen-reader testing on the live site is needed before any claim about these.

## 6. Pages that could not be accessed

`www.upm.edu.my/?LANG=en`, `upm.edu.my/robots.txt`, `psasir.upm.edu.my`, `upmkb.upm.edu.my`, `pspk.upm.edu.my` (robots rules); `sgs.upm.edu.my/prospective_students-2964` and `akademik.upm.edu.my/.../general_entry_requirements-66325` (client error). All authenticated systems were deliberately not visited.

## 7. Content ownership questions for UPM

1. Who owns the authoritative programme list — Division of Admission, SGS, or faculties?
2. Which figure is correct for postgraduate fields of study (265 or 296)?
3. Which name and scope is correct for the direct admission channel?
4. Who owns visa and pass guidance — i-PUTRA or the Division of Admission?
5. Which official name should be used for the Bintulu campus?
6. Where is the current corporate identity manual, with colour codes?
7. Which residential college names are current?
