import type { Researcher } from "@/lib/types";

const demo = { status: "demo" as const, note: "Fictional researcher and projects. UPM researcher data must come from authorised systems." };

/** Entirely fictional records used to demonstrate research discovery. */
export const researchers: Researcher[] = [
  { slug: "demo-researcher-a", name: "Demo Researcher A", facultySlug: "agriculture", themes: ["Food security", "Smart farming"], projects: [{ title: "Sample project: Sensor-based irrigation scheduling", status: "active", year: 2026 }], provenance: demo },
  { slug: "demo-researcher-b", name: "Demo Researcher B", facultySlug: "engineering", themes: ["Renewable energy", "Grid resilience"], projects: [{ title: "Sample project: Battery storage modelling", status: "active", year: 2025 }, { title: "Sample project: Rooftop solar survey", status: "completed", year: 2023 }], provenance: demo },
  { slug: "demo-researcher-c", name: "Demo Researcher C", facultySlug: "computer-science-information-technology", themes: ["Artificial intelligence", "Cybersecurity"], projects: [{ title: "Sample project: Explainable models for crop images", status: "active", year: 2026 }], provenance: demo },
  { slug: "demo-researcher-d", name: "Demo Researcher D", facultySlug: "veterinary-medicine", themes: ["Animal health", "One Health"], projects: [{ title: "Sample project: Poultry vaccine field study", status: "completed", year: 2024 }], provenance: demo },
  { slug: "demo-researcher-e", name: "Demo Researcher E", facultySlug: "forestry-environment", themes: ["Biodiversity", "Climate"], projects: [{ title: "Sample project: Urban tree canopy mapping", status: "active", year: 2026 }], provenance: demo },
  { slug: "demo-researcher-f", name: "Demo Researcher F", facultySlug: "medicine-health-sciences", themes: ["Public health", "Nutrition"], projects: [{ title: "Sample project: Community nutrition survey design", status: "completed", year: 2025 }], provenance: demo },
];

export const researchThemes = Array.from(new Set(researchers.flatMap((r) => r.themes))).sort();
