import type { Campus, Level, Programme, StudyMode } from "./types";

export interface ProgrammeFilters {
  q?: string;
  level?: Level | "";
  faculty?: string;
  field?: string;
  campus?: Campus | "";
  mode?: StudyMode | "";
}

export const normalise = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/** Every word in the query must appear in the name, field or faculty. */
export function filterProgrammes(list: Programme[], f: ProgrammeFilters, facultyName: (slug: string | null) => string = () => "") {
  const words = normalise(f.q ?? "").split(" ").filter(Boolean);
  return list.filter((p) => {
    if (f.level && p.level !== f.level) return false;
    if (f.faculty && p.facultySlug !== f.faculty) return false;
    if (f.field && p.field !== f.field) return false;
    if (f.campus && p.campus !== f.campus) return false;
    if (f.mode && p.mode !== f.mode) return false;
    if (!words.length) return true;
    const hay = normalise(`${p.name} ${p.field} ${facultyName(p.facultySlug)}`);
    return words.every((w) => hay.includes(w));
  });
}

export const levelLabel: Record<Level, string> = { foundation: "Foundation", undergraduate: "Undergraduate", postgraduate: "Postgraduate" };
export const modeLabel: Record<StudyMode, string> = { "on-campus": "On campus", distance: "Distance learning", research: "By research" };
export const campusLabel: Record<Campus, string> = { serdang: "Serdang", bintulu: "Bintulu, Sarawak" };
