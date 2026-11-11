# Content Model

The prototype implements a subset as TypeScript types (`src/lib/types.ts`). The full model below is **proposed** for Drupal 11 in Milestone 4.

## Shared fields (every content type)

`title`, `slug`, `langcode` + translations, `owner_unit` (reference), `status` (draft / in review / approved / published / archived), `publish_on`, `unpublish_on`, `revision_log`, `source_reference` (URL + date verified), `content_owner_contact`, `review_due`.

## Content types

| Type | Key fields | Owner | Implemented in prototype |
|---|---|---|---|
| Organisational unit | kind (faculty, school, department, institute, centre, office, division, college), parent unit, campus, official URL, leadership (refs), contact | Unit / CCSR | `Faculty` (faculties only) |
| Campus | name, address, map location | Asset office | `Campus` enum |
| Programme | level, award, faculty, campus, mode, field, duration, intakes, description, learning outcomes, structure (course refs), entry requirements (refs), fees (refs), application route, MQA reference | Division of Admission / SGS | `Programme` (name, level, faculty, campus, mode, field) |
| Course | code, title, credits, synopsis, prerequisite | Faculty | No |
| Admission requirement | programme, applicant category, qualification, minimums, effective dates | Division of Admission | No (linked out) |
| Admission pathway | applicant category, channel, system URL, intakes | Division of Admission / SGS | Static content in Study page |
| Scholarship | sponsor, eligibility, deadline, URL | Bursar / SGS | No |
| Fee schedule / policy | applies to, amount, currency, effective dates, document | Bursar | No (deliberately) |
| Staff profile | name, position, unit, expertise, contact, consent flag | HR + individual | No |
| Research project | title, lead, team, funder, dates, status, themes | RMC | `Researcher.projects` (demo) |
| Publication | harvested from repository; DOI, authors, year | Library | No |
| Research laboratory | name, unit, equipment, contact | Unit | No |
| News | summary, body, image + rights, category, tags, unit | CCSR / units | `NewsItem` |
| Event | start, end, venue (location ref), audience, registration URL | Units | `NewsItem` (kind = event) |
| Announcement | message, severity, expiry | CCSR | No |
| Document | file, document type, version, effective date, owner | Units | No |
| Service-directory entry | audience, category, URL, requires login, owner, status | iDEC / units | `ServiceLink` |
| Contact | unit, topic, email, phone, hours | Units | `Contact` |
| Location / map point | coordinates, category, accessibility details, opening hours | Asset office | `MapLocation` (schematic) |
| Navigation menu | Drupal menus | CCSR | `src/lib/nav.ts` |
| Translation | Drupal content translation | Translation editors | `src/lib/i18n.ts` (UI only) |
| Redirect | source path, destination, status code | Web team | No |

## Editorial roles (proposed)

| Role | Can do |
|---|---|
| System administrator | Configuration, modules, users. No content approval by default. |
| Central content administrator | All content; approves central facts, programmes, fees, policies |
| Faculty content administrator | Approve and publish within own faculty and its departments |
| Department editor | Edit within own department; submit for review |
| Content author | Create drafts in assigned sections |
| Content reviewer | Review and request changes; cannot publish |
| Translation editor | Edit translations; submit for review |
| Read-only auditor | View all revisions and audit logs |

Permissions are enforced by Drupal's access system (Content Moderation + Group or Workbench Access), not by hiding buttons.

## Authoritative records

Programmes, fees, admission requirements, institutional facts and key contacts are **centrally governed**: units may propose changes, but only central administrators publish them. Each record keeps its verification source and date, as the prototype's `provenance` field does now.
