# Migration Plan (draft for Milestone 7)

Nothing has been migrated. This plan follows the 13 required steps.

1. **Inventory source URLs** — Start from `URL_INVENTORY.csv` (122 rows, partial). With UPM authorisation, export the CMS database and web analytics instead of crawling.
2. **Identify owners** — Map each subdomain to a unit in the entity list (S05); confirm a named editor per unit.
3. **Classify** — Migrate / consolidate / archive / retire. Defaults: tender and job widgets retire; unit news consolidates into central news; empty pages (e.g. Visa & Pass, S14) are rewritten by owners, not migrated.
4. **Preserve metadata** — Keep original URL, publish date, "Updated" date and editor (the current CMS shows these, e.g. "Updated:: 26/03/2026").
5. **Duplicates and invalid links** — Flag pages with the same title across units; run a link checker; record http-only and port-based links.
6. **Translations** — Pair EN/BM versions by CMS ID; flag pages with mixed-language text.
7. **Rights** — Check every image and video for permission before import.
8. **Import** — Scripted import into Drupal via migrate API, into draft state.
9. **URL mapping** — Generate `old URL → new URL` for every migrated page (the `recommended_destination` column is a first pass).
10. **Redirects** — 301s for all mapped pages, including `?LANG=` and `uri=` query variants; test automatically.
11. **Canonical and sitemaps** — One canonical per page, hreflang pairs, XML sitemaps per locale.
12. **Editorial review** — Owners approve every migrated page before publication.
13. **Archive** — Keep migration logs, source snapshots and database restore points.

Legacy content is not removed without owner approval.
