import { describe, expect, it } from "vitest";
import { programmes } from "@/data/programmes";
import { faculties, getFaculty } from "@/data/faculties";
import { filterProgrammes } from "@/lib/programmes";

const name = (s: string | null) => getFaculty(s)?.name ?? "";

describe("programme data", () => {
  it("has unique slugs", () => {
    expect(new Set(programmes.map((p) => p.slug)).size).toBe(programmes.length);
  });
  it("links every programme to a known faculty or to none", () => {
    for (const p of programmes) if (p.facultySlug) expect(getFaculty(p.facultySlug), p.slug).toBeDefined();
  });
  it("marks every programme with a source", () => {
    for (const p of programmes) {
      expect(p.provenance.status).toBe("verified");
      if (p.provenance.status === "verified") expect(p.provenance.sources.length).toBeGreaterThan(0);
    }
  });
  it("lists programmes for every faculty except none-missing", () => {
    for (const f of faculties) expect(programmes.some((p) => p.facultySlug === f.slug), f.slug).toBe(true);
  });
});

describe("filterProgrammes", () => {
  it("returns everything with no filters", () => {
    expect(filterProgrammes(programmes, {}, name)).toHaveLength(programmes.length);
  });
  it("filters by faculty", () => {
    const r = filterProgrammes(programmes, { faculty: "engineering" }, name);
    expect(r.length).toBeGreaterThanOrEqual(8);
    expect(r.every((p) => p.facultySlug === "engineering")).toBe(true);
  });
  it("filters by level and campus together", () => {
    const r = filterProgrammes(programmes, { level: "undergraduate", campus: "bintulu" }, name);
    expect(r).toHaveLength(5);
    expect(r.every((p) => p.campus === "bintulu" && p.level === "undergraduate")).toBe(true);
  });
  it("filters by study mode", () => {
    expect(filterProgrammes(programmes, { mode: "distance" }, name)).toHaveLength(7);
  });
  it("matches all keywords, case- and punctuation-insensitive", () => {
    const r = filterProgrammes(programmes, { q: "COMPUTER, science" }, name);
    expect(r.map((p) => p.slug)).toContain("bachelor-of-computer-science");
    expect(r.every((p) => /computer/i.test(p.name + name(p.facultySlug)) && /science/i.test(p.name + p.field + name(p.facultySlug)))).toBe(true);
  });
  it("matches by faculty name", () => {
    expect(filterProgrammes(programmes, { q: "veterinary" }, name).map((p) => p.slug)).toContain("doctor-of-veterinary-medicine");
  });
  it("returns an empty list when nothing matches", () => {
    expect(filterProgrammes(programmes, { q: "underwater basket weaving" }, name)).toEqual([]);
  });
});
