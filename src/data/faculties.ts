import type { Faculty } from "@/lib/types";

const v = { status: "verified", sources: ["S05"], checked: "2026-11-11" } as const;

/** Faculty and school names and official URLs from the public unit list (S05). */
export const faculties: Faculty[] = [
  { slug: "agriculture", name: "Faculty of Agriculture", kind: "faculty", campus: "serdang", officialUrl: "https://agri.upm.edu.my", field: "Agriculture & Food", provenance: v },
  { slug: "biotechnology-biomolecular-sciences", name: "Faculty of Biotechnology and Biomolecular Sciences", kind: "faculty", campus: "serdang", officialUrl: "https://biotech.upm.edu.my", field: "Life Sciences", provenance: v },
  { slug: "computer-science-information-technology", name: "Faculty of Computer Science and Information Technology", kind: "faculty", campus: "serdang", officialUrl: "https://fsktm.upm.edu.my", field: "Computing", provenance: v },
  { slug: "design-architecture", name: "Faculty of Design and Architecture", kind: "faculty", campus: "serdang", officialUrl: "https://frsb.upm.edu.my", field: "Design & Built Environment", provenance: v },
  { slug: "educational-studies", name: "Faculty of Educational Studies", kind: "faculty", campus: "serdang", officialUrl: "https://educ.upm.edu.my", field: "Education", provenance: v },
  { slug: "engineering", name: "Faculty of Engineering", kind: "faculty", campus: "serdang", officialUrl: "https://eng.upm.edu.my", field: "Engineering", provenance: { status: "verified", sources: ["S05", "S20"], checked: "2026-11-11" } },
  { slug: "food-science-technology", name: "Faculty of Food Science and Technology", kind: "faculty", campus: "serdang", officialUrl: "https://food.upm.edu.my", field: "Agriculture & Food", provenance: v },
  { slug: "forestry-environment", name: "Faculty of Forestry and Environment", kind: "faculty", campus: "serdang", officialUrl: "https://forenv.upm.edu.my", field: "Environment & Forestry", provenance: v },
  { slug: "human-ecology", name: "Faculty of Human Ecology", kind: "faculty", campus: "serdang", officialUrl: "https://eco1.upm.edu.my", field: "Social Sciences & Humanities", provenance: v },
  { slug: "medicine-health-sciences", name: "Faculty of Medicine and Health Sciences", kind: "faculty", campus: "serdang", officialUrl: "https://medic.upm.edu.my", field: "Health Sciences", provenance: v },
  { slug: "modern-languages-communication", name: "Faculty of Modern Languages and Communication", kind: "faculty", campus: "serdang", officialUrl: "https://fbmk.upm.edu.my", field: "Languages & Communication", provenance: v },
  { slug: "science", name: "Faculty of Science", kind: "faculty", campus: "serdang", officialUrl: "https://science.upm.edu.my", field: "Natural Sciences & Mathematics", provenance: v },
  { slug: "veterinary-medicine", name: "Faculty of Veterinary Medicine", kind: "faculty", campus: "serdang", officialUrl: "https://vet.upm.edu.my", field: "Health Sciences", provenance: v },
  { slug: "business-economics", name: "School of Business and Economics", kind: "school", campus: "serdang", officialUrl: "https://econ.upm.edu.my", field: "Business & Economics", provenance: v },
  { slug: "agricultural-forestry-sciences-bintulu", name: "Faculty of Agricultural and Forestry Sciences", kind: "faculty", campus: "bintulu", officialUrl: "https://btu.upm.edu.my/mengenai_upmkb/fakulti_sains_pertanian_dan_perhutanan-13007", field: "Agriculture & Food", provenance: v },
  { slug: "humanities-management-science-bintulu", name: "Faculty of Humanities, Management and Science", kind: "faculty", campus: "bintulu", officialUrl: "https://btu.upm.edu.my/mengenai_upmkb/fakulti_kemanusiaan_pengurusan_dan_sains-13008", field: "Social Sciences & Humanities", provenance: v },
];

export const getFaculty = (slug: string | null) => faculties.find((f) => f.slug === slug);
