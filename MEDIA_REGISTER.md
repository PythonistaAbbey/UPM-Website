# Media register (image sources and licences)

Last updated: 11 November 2026.

This register records every image the prototype uses and every candidate UPM image we looked at. A public web page showing an image does not mean the image may be reused, so nothing goes on the site until its licence or UPM's written permission is recorded here.

## 1. Images in use

All eight images on the site are **original temporary artwork**. `scripts/generate-temp-media.mjs` draws them from code, so the project owns them and they carry no third-party rights. They do not show real UPM buildings or people. Every placement is labelled "Temporary artwork · awaiting licensed UPM photography".

| ID | Files (`public/media/temp/`) | Shows (alt text) | Where used | Rights | Credit |
|---|---|---|---|---|---|
| campus-golden-hour | `campus-golden-hour-{640,1280,1920,2400}.{avif,webp}` | Modern campus buildings across a lake at sunset, framed by rain trees | Homepage hero, visit panel | Original, temporary | Prototype artwork |
| green-canopy | `green-canopy-…` | Dense tropical tree canopy with sunlight filtering through | Discover UPM, green campus, forestry | Original, temporary | Prototype artwork |
| research-lab | `research-lab-…` | Laboratory flasks and a molecular network diagram | Research, science fields, news | Original, temporary | Prototype artwork |
| library-facade | `library-facade-…` | Library facade with tall vertical fins lit warmly | Libraries, education and humanities fields, lead news item | Original, temporary | Prototype artwork |
| graduation | `graduation-…` | Graduation caps tossed into a blue sky | Convocation | Original, temporary | Prototype artwork |
| agriculture-fields | `agriculture-fields-…` | Crop rows stretching towards a sunrise | Agriculture and food | Original, temporary | Prototype artwork |
| campus-evening | `campus-evening-…` | Warm evening lights above a dark skyline | Residential colleges, student news | Original, temporary | Prototype artwork |
| water-research | `water-research-…` | Layered teal water waves | Aquaculture, sport and wellbeing | Original, temporary | Prototype artwork |

Technical details:

- **Format:** each asset comes in 4 widths × 2 formats (AVIF and WebP), 2400 × 1500 at the largest. 1.6 MB in total.
- **Placeholder:** a 24 px blur placeholder is inlined.
- **Loading:** the hero loads eagerly with `fetchpriority="high"`. Every other image is lazy loaded.
- **Code:** the manifest is in `src/data/media.ts`, and `src/components/MediaImage.tsx` renders the images.

## 2. Candidate UPM photography (not used)

### Wikimedia Commons

These files were found through web search. Commons files usually carry a CC BY-SA or CC BY licence, but **we have not confirmed the licence of any of them**. The build environment's network blocks `commons.wikimedia.org` and `upload.wikimedia.org`, so we could neither open the file pages nor download the files.

| Candidate file (Commons title) | Likely use | Licence | Status |
|---|---|---|---|
| File:Campus_of_Universiti_Putra_Malaysia.jpg | Hero | Unverified | Pending |
| File:Sultan_Abdul_Samad_Library,_UPM_(221110-1047).jpg | Libraries | Unverified | Pending |
| File:Perpustakaan_Sultan_Abdul_Samad_(facade),_UPM.jpg | Libraries | Unverified | Pending |
| File:Masjid_UPM.jpg | Campus life | Unverified | Pending |
| File:Kompleks_Mahasiswa,_UPM.jpg | Student life | Unverified | Pending |
| File:Faculty_of_Engineering,_UPM_(240103-0825).jpg | Engineering field and faculty | Unverified | Pending |
| File:Faculty_of_Design_and_Architecture,_UPM.jpg (also 231216-1230 and 231216-1231) | Design faculty | Unverified | Pending |
| File:Faculty_of_Forestry_and_Environment,_UPM.jpg | Forestry faculty | Unverified | Pending |
| File:PKKSSAAS,_UPM.jpg | Convocation / arts centre | Unverified | Pending |
| File:Bangunan_pentadbiran_UPMKB.jpg | Bintulu campus | Unverified | Pending |
| File:Map_of_northern_side_of_UPM.jpg, File:Map_of_southern_side_of_UPM.jpg | Campus map reference | Unverified | Pending |

How to adopt a Commons image:

1. Open the file page.
2. Record the author, the licence and the exact attribution text in this table.
3. Download the original.
4. Add it to `src/data/media.ts` with `rights: "licensed"` and a visible credit.

CC BY-SA images need the credit and licence shown next to the image or on a credits page.

### UPM's own galleries

These galleries were identified as the best sources of authentic photography: the UPM corporate site (upm.edu.my), the UPMET photo gallery (upmet.upm.edu.my/photo-gallery) and the TNCPI gallery. **They are UPM's copyright and publish no reuse licence.** We have not downloaded any images from them. Using them needs written permission from UPM's Corporate Communication Division (Bahagian Komunikasi Korporat), recorded here with the permission reference.

| Source | Content | Rights | Status |
|---|---|---|---|
| upm.edu.my news and feature images | Campus, events, people | © UPM, no open licence published | Needs UPM permission |
| upmet.upm.edu.my/photo-gallery | Campus and facilities | © UPM, no open licence published | Needs UPM permission |
| TNCPI gallery | Industry and innovation events | © UPM, no open licence published | Needs UPM permission |

## 3. Logo and identity

The official UPM logo is **not used**. The guidance on UPM's logo page (S13) restricts its use, and the project has no permission. The header and footer use a neutral "U" monogram tile in UPM red. It is a placeholder, not an imitation of the logo. Once UPM authorises use, the official SVG can replace `Emblem` in `src/components/SiteHeader.tsx`.

Colours: red `#CA0026` and grey `#8A9396` were supplied by the project owner on 11 November 2026 as UPM's official corporate colours.

## 4. Fonts

The site uses Plus Jakarta Sans and Fraunces, both under the SIL Open Font License 1.1. `next/font` self-hosts them at build time, so visitors' browsers make no request to Google.
