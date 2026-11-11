# Integration Register

Draft. All systems below were found as public links (sources in `SOURCE_REGISTER.md`). None were accessed. Owners and API availability need formal discovery with iDEC and each system owner.

| System | URL (as published) | Users | Proposed method | Prototype | Notes |
|---|---|---|---|---|---|
| Student Information System (SMP) | smp.upm.edu.my | UG students | Public link; SSO later | Link | Authenticated |
| i-GIMS student | sgsportal.upm.edu.my:8080 | PG students | Public link | Link, flagged http | Non-standard port, http |
| i-GIMS staff | sps.upm.edu.my:8080 | Staff | Public link | Link, flagged http | http |
| Putra Learning Hub | learninghub.upm.edu.my | Students, staff | Public link | Link | |
| Office 365 | portal.office.com | All | Public link | Link | |
| emel@upm | emel.upm.edu.my | All | Public link | Link | |
| UPM-ID | upm-id.upm.edu.my | All | Identity provider for editor SSO (SAML/OIDC) — needs approval | Guide link | The library uses `idp.upm.edu.my` with OpenAthens, so an IdP exists |
| e-Claim | eclaims.upm.edu.my | Staff | Public link | Link | |
| SISMAN | sisman.upm.edu.my | Staff | Public link | Link | |
| e-Latihan | elatihan.upm.edu.my | Staff | Public link | Link | |
| SPICT | spict.upm.edu.my | Staff | Public link | Link | |
| Medical Management System | regmedic.upm.edu.my | All | Public link | Link | Health data: never integrate without DPIA |
| Library OPAC (Koha) | elib.upm.edu.my | All | Public link; possible search API | Link | |
| UPM Institutional Repository | psasir.upm.edu.my | Public | OAI-PMH harvest if permitted | Link | robots rules block automated access today |
| PutraRepo | putrarepo.upm.edu.my | Public | Link | Link | |
| Admissions intake (direct channel) | intake.upm.edu.my/alternatif | Applicants | Public link | Link | http |
| Offer check | edaftarsmp.upm.edu.my | Applicants | Public link | Not linked | |
| UPU | upu.moe.gov.my | Applicants | Public link | Link | Ministry system |
| UPMET | upmet.upmholdings.com.my | Distance learners | Public link | Link | UPM Holdings |
| Flywire | landing-pages.flywire.com/landing/upm | International | Public link | Link | Payments: never embed |
| eJOBS | spj.upm.edu.my | Public | Public link; possible feed | Link | |
| Tenderwizard | tenderwizard.my/UPM | Public | Public link | Link | |
| SISPAA feedback | upm.spab.gov.my | Public | Public link | Link | Government system |
| Programme data | (source unknown) | — | Data sync from authoritative system | Static file | Owner to be identified |
| Unit directory | spel.upm.edu.my/entiti | — | One-time migration, then CMS | Static file | |

Rules: no credentials in code or client bundles; no embedding of login pages; every new integration needs an owner, data classification, logging, error handling, and incident contact recorded here.
