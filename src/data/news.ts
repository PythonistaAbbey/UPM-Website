import type { NewsItem } from "@/lib/types";

const demo = { status: "demo" as const, note: "Fictional item written to demonstrate the news and events module." };

export const newsItems: NewsItem[] = [
  {
    slug: "convocation-49-session-2", kind: "event", title: "49th UPM Convocation, Session 2",
    summary: "Convocation ceremonies at the Grand Hall, Sultan Salahuddin Abdul Aziz Shah Cultural and Arts Centre, UPM Serdang.",
    body: ["The Alumni Relations Centre reported that the second session of the 49th UPM Convocation was held from 29 November to 5 December 2025 at the Grand Hall, Sultan Salahuddin Abdul Aziz Shah Cultural and Arts Centre, UPM Serdang.", "This record is included to show how a verified past event appears in the archive."],
    date: "2025-11-29", endDate: "2025-12-05", category: "Ceremonies", tags: ["convocation", "alumni"], location: "Grand Hall, UPM Serdang", unit: "Alumni Relations Centre",
    provenance: { status: "verified", sources: ["S22"], checked: "2026-11-11" },
  },
  {
    slug: "sgs-second-semester-2025-2026", kind: "event", title: "SGS Second Semester 2025/2026",
    summary: "Postgraduate second semester dates published by the School of Graduate Studies.",
    body: ["The School of Graduate Studies lists the Second Semester 2025/2026 as running from 23 March 2026 to 4 October 2026.", "Check sgs.upm.edu.my for the current calendar before planning."],
    date: "2026-03-23", endDate: "2026-10-04", category: "Academic calendar", tags: ["postgraduate", "calendar"], unit: "School of Graduate Studies",
    provenance: { status: "verified", sources: ["S15"], checked: "2026-11-11" },
  },
  {
    slug: "sgs-joint-degree-seminar-brawijaya", kind: "news", title: "UPM contributes to seminar on joint and dual degree programmes at Universitas Brawijaya",
    summary: "The School of Graduate Studies reported UPM's contribution to a seminar on graduate education competitiveness through joint, dual and double degree programmes.",
    body: ["According to the School of Graduate Studies website, UPM contributed to the seminar 'Driving Global Competitiveness in Graduate Education through Joint/Dual/Double Degree Programs' at Universitas Brawijaya, Indonesia, on 2–3 February 2026.", "Only the headline and date were captured during the audit. The full story should be imported from the source with the owner's approval."],
    date: "2026-02-02", category: "International", tags: ["postgraduate", "partnerships"], unit: "School of Graduate Studies",
    provenance: { status: "verified", sources: ["S15"], checked: "2026-11-11" },
  },
  {
    slug: "demo-open-day", kind: "event", title: "Demonstration: Campus open day for prospective students",
    summary: "A sample event showing how open days could be listed with registration details and accessibility information.",
    body: ["This is demonstration content. It shows the layout for an open day event, including time, venue, audience and accessibility notes.", "No such event has been announced by UPM in the sources used for this prototype."],
    date: "2026-12-05", category: "Admissions", tags: ["undergraduate", "visit"], location: "UPM Serdang (sample venue)", unit: "Demonstration", provenance: demo,
  },
  {
    slug: "demo-research-week", kind: "event", title: "Demonstration: Research showcase week",
    summary: "A sample event for the research events archive.",
    body: ["This is demonstration content used to test date filters and event cards."],
    date: "2027-01-18", endDate: "2027-01-22", category: "Research", tags: ["research", "industry"], location: "Sample venue", unit: "Demonstration", provenance: demo,
  },
  {
    slug: "demo-new-student-guide", kind: "news", title: "Demonstration: New student guide published",
    summary: "A sample news story showing how a featured story, tags and related content appear.",
    body: ["This is demonstration content. A real story would come from the central newsroom or a faculty, through the CMS review workflow."],
    date: "2026-11-03", category: "Students", tags: ["undergraduate", "campus life"], unit: "Demonstration", provenance: demo,
  },
  {
    slug: "demo-library-hours", kind: "news", title: "Demonstration: Extended library hours during examinations",
    summary: "A sample announcement for the library section.",
    body: ["This is demonstration content. Real opening hours are published by the Sultan Abdul Samad Library."],
    date: "2026-10-20", category: "Campus life", tags: ["library", "examinations"], unit: "Demonstration", provenance: demo,
  },
  {
    slug: "demo-industry-partnership", kind: "news", title: "Demonstration: Faculty signs sample industry partnership",
    summary: "A sample partnership story for the Alumni & Partners section.",
    body: ["This is demonstration content. It does not describe a real agreement."],
    date: "2026-09-14", category: "Partnerships", tags: ["industry", "research"], unit: "Demonstration", provenance: demo,
  },
];

export const getNewsItem = (slug: string) => newsItems.find((n) => n.slug === slug);
