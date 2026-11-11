# Source Register

Every fact used in the audit or in the prototype's "verified" data traces to one of the sources below.
All sources were retrieved on **2026-11-11** by an automated, rate-limited fetch tool (one request per host at a time, public pages only, no authentication, robots rules honoured).

## Method and limits of the evidence

- The cloud build environment's network policy **blocks direct connections to `*.upm.edu.my`**. Pages were therefore read through a fetch tool that converts each page to text and summarises it. This means:
  - Raw HTML, `<title>`, `lang`, canonical and meta tags were usually **not** visible. Where a title is recorded it is the visible page heading.
  - Visual rendering, layout, colour contrast and mobile responsiveness were **not** observed in a browser. Accessibility notes are limited to what is visible in page text (link text, missing labels, unrendered template placeholders).
  - Several pages carried `LIVETIMESTAMP` values between Dec 2025 and Mar 2026, which suggests the tool may have served a cached copy. Page content may therefore be older than the verification date.
- Pages blocked by robots rules were **not** accessed by any other route.
- The crawl was **not exhaustive**: 33 pages were requested, of which 25 returned usable content. Around 90 further unit websites were discovered but not fetched.

## Sources

| ID | URL | What it supports | Result |
|----|-----|------------------|--------|
| S01 | https://upm.edu.my/ | Apex domain behaviour | Fragmentary content only |
| S02 | https://www.upm.edu.my/ | Central homepage structure, stale news | Fetched |
| S03 | https://www.upm.edu.my/?LANG=en, https://upm.edu.my/robots.txt | — | Blocked (robots_disallowed) |
| S04 | https://spel.upm.edu.my/sitemap | Central sitemap, online services, quick links, footer | Fetched |
| S05 | https://spel.upm.edu.my/entiti | List of offices, centres, faculties, institutes, colleges | Fetched |
| S06 | https://spel.upm.edu.my/admission/programmes/undergraduate-75800 | Undergraduate programme names by faculty (updated 26/03/2026) | Fetched |
| S07 | https://spel.upm.edu.my/admission/programmes/postgraduate-76276 | Postgraduate qualification types (updated 23/12/2025) | Fetched |
| S08 | https://spel.upm.edu.my/admission/how_to_apply-14945 | Admission channels, contacts (updated 23/12/2025) | Fetched |
| S09 | https://spel.upm.edu.my/about_us/vision_mission-14890 | Vision, mission, core values (updated 19/12/2025) | Fetched |
| S10 | https://spel.upm.edu.my/about_us/history-14905 | History index | Fetched after one rate-limit retry |
| S11 | https://spel.upm.edu.my/about_us/history/the_story_behind_upm-76270 | 1931, 1947, 1973, 1997 milestones (updated 21/11/2023) | Fetched |
| S12 | https://spel.upm.edu.my/about_us/contact_us-14908 | Address, main phone, email, 24h hotline (updated 23/10/2023) | Fetched |
| S13 | https://spel.upm.edu.my/about_us/corporate_information/logo-76265 | Logo rationale; red and grey meanings; **no colour codes** | Fetched |
| S14 | https://spel.upm.edu.my/admission/visa_pass-14947 | Visa page is empty | Fetched |
| S15 | https://sgs.upm.edu.my/ | SGS calendar 2025/2026, contacts | Fetched |
| S16 | https://sgs.upm.edu.my/prospective_students-2964 | — | Failed (client error) |
| S17 | https://akademik.upm.edu.my/ | Admission division homepage | Fetched |
| S18 | https://akademik.upm.edu.my/kemasukan_pelajar_antarabangsa/bacelor/general_entry_requirements-66325 | — | Failed (client error) |
| S19 | https://intl.upm.edu.my/ | i-PUTRA homepage (newest stories 2019) | Fetched |
| S20 | https://eng.upm.edu.my/ | Faculty of Engineering programmes | Fetched |
| S21 | https://fsktm.upm.edu.my/ | FSKTM homepage | Fetched |
| S22 | https://alumni.upm.edu.my/ | Alumni services | Fetched |
| S23 | https://psasir.upm.edu.my/ | — | Blocked (robots_disallowed) |
| S24 | https://rmc.upm.edu.my/ | Research Management Centre homepage | Fetched |
| S25 | https://sciencepark.upm.edu.my/ | IP and commercialisation services | Fetched |
| S26 | https://idec.upm.edu.my/ | ICT services, support contacts | Fetched |
| S27 | https://upmkb.upm.edu.my/ | — | Blocked (robots_disallowed) |
| S28 | https://ai.upm.edu.my/ | AI Hub navigation and initiatives | Fetched |
| S29 | https://lib.upm.edu.my/ | Library systems and branches | Fetched |
| S30 | https://hep.upm.edu.my/ | Student Affairs systems | Fetched |
| S31 | https://bpp.upm.edu.my/ | Housing division, college list | Fetched |
| S32 | https://pspk.upm.edu.my/ | — | Blocked (robots_disallowed) |
| S33 | Web search "Universiti Putra Malaysia corporate identity manual logo colour Pantone red" | No official UPM colour specification found in results | Searched |

## Documents referenced but not opened

These were linked from fetched pages. They were not downloaded, so nothing in them is used as evidence.

- Prospectus 2026-2027 — https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf
- Facts & Figures 2026 — https://pspk.upm.edu.my/upload/dokumen/20260715101043FACT_AND_FIGURES_2026_JULY_UPDATE.pdf
- Annual Report — https://infodigital.upm.edu.my/flip/LTPKUPM2024/
- Undergraduate brochure and special requirement books on akademik.upm.edu.my (linked from S08)

## Rule for the prototype

Data files in `src/data/` mark each record `verified` (with a source ID from this register) or `demo`. Anything `demo` is shown on screen with a "Demonstration content" label.
