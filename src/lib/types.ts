/** Provenance for every record shown in the prototype. */
export type Provenance =
  | { status: "verified"; sources: readonly string[]; checked: string }
  | { status: "demo"; note?: string };

export type Locale = "en" | "ms";

export type Campus = "serdang" | "bintulu";
export type Level = "foundation" | "undergraduate" | "postgraduate";
export type StudyMode = "on-campus" | "distance" | "research";

export interface Faculty {
  slug: string;
  name: string;
  kind: "faculty" | "school";
  campus: Campus;
  officialUrl: string;
  field: string;
  provenance: Provenance;
}

export interface Programme {
  slug: string;
  name: string;
  level: Level;
  facultySlug: string | null;
  campus: Campus;
  mode: StudyMode;
  field: string;
  note?: string;
  provenance: Provenance;
}

export interface ServiceLink {
  id: string;
  name: string;
  description: string;
  audience: ("student-ug" | "student-pg" | "staff" | "public")[];
  category: string;
  url: string;
  requiresLogin: boolean;
  insecureLink?: boolean;
  provenance: Provenance;
}

export interface Contact {
  id: string;
  unit: string;
  topic: string;
  email?: string;
  phone?: string;
  url?: string;
  provenance: Provenance;
}

export interface NewsItem {
  slug: string;
  kind: "news" | "event";
  title: string;
  summary: string;
  body: string[];
  date: string; // ISO
  endDate?: string;
  category: string;
  tags: string[];
  location?: string;
  unit: string;
  provenance: Provenance;
}

export interface Researcher {
  slug: string;
  name: string;
  facultySlug: string;
  themes: string[];
  projects: { title: string; status: "active" | "completed"; year: number }[];
  provenance: Provenance;
}

export interface MapLocation {
  id: string;
  name: string;
  category: "academic" | "library" | "residential" | "services" | "culture" | "health" | "sport";
  x: number; // 0-100 schematic coordinates
  y: number;
  accessibility: string;
  description: string;
  provenance: Provenance;
}
