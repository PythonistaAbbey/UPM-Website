import type { MapLocation } from "@/lib/types";

/** Names come from public sources; positions on the schematic map are illustrative only. */
const named = (sources: string[]) => ({ status: "verified" as const, sources, checked: "2026-11-11" });
const pending = "Step-free access, accessible toilets and parking not yet surveyed. Details to be supplied by the facility owner.";

export const locations: MapLocation[] = [
  { id: "library", name: "Sultan Abdul Samad Library", category: "library", x: 48, y: 42, accessibility: pending, description: "Main university library (PSAS).", provenance: named(["S29"]) },
  { id: "grand-hall", name: "Sultan Salahuddin Abdul Aziz Shah Cultural and Arts Centre (Grand Hall)", category: "culture", x: 60, y: 30, accessibility: pending, description: "Venue for convocation and cultural events.", provenance: named(["S05", "S22"]) },
  { id: "eng", name: "Faculty of Engineering", category: "academic", x: 22, y: 62, accessibility: pending, description: "Faculty buildings and the Engineering and Architecture Library Section.", provenance: named(["S05", "S29"]) },
  { id: "fsktm", name: "Faculty of Computer Science and Information Technology", category: "academic", x: 32, y: 55, accessibility: pending, description: "Faculty buildings.", provenance: named(["S05"]) },
  { id: "science", name: "Faculty of Science", category: "academic", x: 40, y: 60, accessibility: pending, description: "Faculty buildings.", provenance: named(["S05"]) },
  { id: "agri", name: "Faculty of Agriculture", category: "academic", x: 70, y: 58, accessibility: pending, description: "Faculty buildings.", provenance: named(["S05"]) },
  { id: "vet", name: "Faculty of Veterinary Medicine", category: "academic", x: 78, y: 45, accessibility: pending, description: "Faculty buildings and the Veterinary Medicine Library Section.", provenance: named(["S05", "S29"]) },
  { id: "idec", name: "InfoComm Development Centre (iDEC)", category: "services", x: 52, y: 52, accessibility: pending, description: "ICT support for staff and students.", provenance: named(["S26"]) },
  { id: "health", name: "University Health Centre", category: "health", x: 58, y: 66, accessibility: pending, description: "University health services (PKU).", provenance: named(["S05"]) },
  { id: "sports", name: "Sports Academy", category: "sport", x: 30, y: 30, accessibility: pending, description: "University sports facilities.", provenance: named(["S05"]) },
  { id: "ktdi", name: "Kolej Tun Dr Ismail", category: "residential", x: 15, y: 40, accessibility: pending, description: "Residential college.", provenance: named(["S05"]) },
  { id: "kc", name: "Kolej Canselor", category: "residential", x: 85, y: 70, accessibility: pending, description: "Residential college.", provenance: named(["S05"]) },
];

export const locationCategories = ["academic", "library", "residential", "services", "culture", "health", "sport"] as const;
