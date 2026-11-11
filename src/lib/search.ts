import { programmes } from "@/data/programmes";
import { faculties, getFaculty } from "@/data/faculties";
import { services } from "@/data/services";
import { contacts } from "@/data/contacts";
import { newsItems } from "@/data/news";
import { researchers } from "@/data/researchers";
import { locations } from "@/data/locations";
import { normalise } from "./programmes";

export type ResultType = "Programme" | "Faculty" | "Service" | "Contact" | "News" | "Event" | "Researcher" | "Place" | "Page";

export interface SearchDoc {
  id: string;
  type: ResultType;
  title: string;
  text: string;
  /** Path without locale prefix, or an absolute external URL. */
  href: string;
  demo: boolean;
}

const pages: SearchDoc[] = [
  { id: "p-about", type: "Page", title: "About UPM", text: "history vision mission values leadership corporate identity logo facts figures campuses", href: "/about", demo: false },
  { id: "p-study", type: "Page", title: "Study at UPM", text: "admissions how to apply undergraduate postgraduate foundation distance learning UPU pathways", href: "/study", demo: false },
  { id: "p-intl", type: "Page", title: "International student hub", text: "international students visa pass i-PUTRA scholarships arrival accommodation", href: "/international", demo: false },
  { id: "p-campus", type: "Page", title: "Campus life", text: "accommodation residential colleges sports counselling health library clubs", href: "/campus-life", demo: false },
  { id: "p-map", type: "Page", title: "Campus map", text: "map directions buildings locations", href: "/campus-life/map", demo: false },
  { id: "p-students", type: "Page", title: "Student service gateway", text: "student portal registration learning calendar finance", href: "/services/students", demo: false },
  { id: "p-staff", type: "Page", title: "Staff service gateway", text: "staff email HR claims leave payroll ICT policies", href: "/services/staff", demo: false },
  { id: "p-research", type: "Page", title: "Research and innovation", text: "research institutes commercialisation intellectual property science park AI hub", href: "/research", demo: false },
  { id: "p-contact", type: "Page", title: "Contact and enquiries", text: "contact phone email directory enquiry form", href: "/contact", demo: false },
  { id: "p-alumni", type: "Page", title: "Alumni and partners", text: "alumni industry partners giving mentoring", href: "/alumni-partners", demo: false },
];

export const searchIndex: SearchDoc[] = [
  ...pages,
  ...programmes.map((p) => ({ id: `prog-${p.slug}`, type: "Programme" as const, title: p.name, text: `${p.field} ${p.level} ${getFaculty(p.facultySlug)?.name ?? ""} ${p.campus}`, href: `/study/programmes/${p.slug}`, demo: false })),
  ...faculties.map((f) => ({ id: `fac-${f.slug}`, type: "Faculty" as const, title: f.name, text: `${f.field} ${f.campus}`, href: `/faculties/${f.slug}`, demo: false })),
  ...services.map((s) => ({ id: `svc-${s.id}`, type: "Service" as const, title: s.name, text: `${s.description} ${s.category}`, href: s.audience.includes("staff") && !s.audience.some((a) => a.startsWith("student")) ? "/services/staff" : "/services/students", demo: false })),
  ...contacts.map((c) => ({ id: `con-${c.id}`, type: "Contact" as const, title: c.unit, text: `${c.topic} ${c.email ?? ""} ${c.phone ?? ""}`, href: "/contact", demo: false })),
  ...newsItems.map((n) => ({ id: `news-${n.slug}`, type: (n.kind === "event" ? "Event" : "News") as ResultType, title: n.title, text: `${n.summary} ${n.tags.join(" ")} ${n.category}`, href: `/news/${n.slug}`, demo: n.provenance.status === "demo" })),
  ...researchers.map((r) => ({ id: `res-${r.slug}`, type: "Researcher" as const, title: r.name, text: `${r.themes.join(" ")} ${r.projects.map((p) => p.title).join(" ")}`, href: `/research/discover?q=${encodeURIComponent(r.name)}`, demo: true })),
  ...locations.map((l) => ({ id: `loc-${l.id}`, type: "Place" as const, title: l.name, text: `${l.category} ${l.description}`, href: `/campus-life/map?place=${l.id}`, demo: false })),
];

/** Ranked search: all words must match; title matches score higher. */
export function search(query: string, index: SearchDoc[] = searchIndex, type?: ResultType | ""): SearchDoc[] {
  const words = normalise(query).split(" ").filter(Boolean);
  if (!words.length) return [];
  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of index) {
    if (type && doc.type !== type) continue;
    const title = normalise(doc.title);
    const hay = `${title} ${normalise(doc.text)}`;
    if (!words.every((w) => hay.includes(w))) continue;
    let score = 0;
    for (const w of words) score += title.includes(w) ? 3 : 1;
    if (title.startsWith(words.join(" "))) score += 5;
    scored.push({ doc, score });
  }
  return scored.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title)).map((s) => s.doc);
}
