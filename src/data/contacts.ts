import type { Contact } from "@/lib/types";

const v = (...sources: string[]) => ({ status: "verified" as const, sources, checked: "2026-11-11" });

/** Contacts as published on public UPM pages. Verify before relying on them. */
export const contacts: Contact[] = [
  { id: "main", unit: "Universiti Putra Malaysia (general)", topic: "General enquiries", email: "pspk@upm.edu.my", phone: "+603-9769 1000", url: "https://spel.upm.edu.my/about_us/contact_us-14908", provenance: v("S12") },
  { id: "control", unit: "Control Centre (24 hours)", topic: "Emergencies and security", phone: "03-9769 7990 / 03-9769 7470 / 03-9769 1999", provenance: v("S12") },
  { id: "ug-admission", unit: "Division of Admission and Division of Academic Governance", topic: "Undergraduate admission", email: "akd@upm.edu.my", phone: "+603-9769 6060", url: "https://akademik.upm.edu.my/", provenance: v("S08") },
  { id: "pg-admission", unit: "School of Graduate Studies — Admission Unit", topic: "Postgraduate admission", email: "pg_admission@upm.edu.my", phone: "+603-9769 4218 / 4223 / 4165 / 4169 / 4225", url: "https://sgs.upm.edu.my/", provenance: v("S08", "S15") },
  { id: "sgs-academic", unit: "School of Graduate Studies — Academic Unit", topic: "Current postgraduate students", email: "sgs_academic@upm.edu.my", url: "https://sgs.upm.edu.my/", provenance: v("S15") },
  { id: "ict", unit: "InfoComm Development Centre (iDEC)", topic: "ICT support", email: "idec_ictsupport@upm.edu.my", phone: "03-9769 1990 / 03-9769 3003", url: "https://idec.upm.edu.my/", provenance: v("S26") },
  { id: "library", unit: "Sultan Abdul Samad Library", topic: "Library services", phone: "03-9769 4745 (8.00 am–5.00 pm), 03-9769 4686 (5.00 pm–10.00 pm)", url: "https://lib.upm.edu.my/", provenance: v("S29") },
  { id: "alumni", unit: "Alumni Relations Centre", topic: "Alumni", email: "alumni@upm.edu.my", phone: "03-8947 1017", url: "https://alumni.upm.edu.my/", provenance: v("S15", "S22") },
  { id: "international", unit: "Putra International Centre (i-PUTRA)", topic: "International students", url: "https://intl.upm.edu.my/", provenance: v("S05", "S19") },
  { id: "housing", unit: "Housing and Placement Division", topic: "Student accommodation", url: "https://bpp.upm.edu.my/", provenance: v("S31") },
  { id: "student-affairs", unit: "Student Affairs Division", topic: "Student welfare and activities", url: "https://hep.upm.edu.my/", provenance: v("S30") },
  { id: "research", unit: "Research Management Centre", topic: "Research management", url: "https://rmc.upm.edu.my/", provenance: v("S24") },
  { id: "sciencepark", unit: "Putra Science Park", topic: "Intellectual property and commercialisation", url: "https://sciencepark.upm.edu.my/", provenance: v("S25") },
];

export const enquiryTopics = [
  { value: "admission-ug", label: "Undergraduate admission", routesTo: "ug-admission" },
  { value: "admission-pg", label: "Postgraduate admission", routesTo: "pg-admission" },
  { value: "international", label: "International students", routesTo: "international" },
  { value: "research", label: "Research and industry", routesTo: "research" },
  { value: "alumni", label: "Alumni", routesTo: "alumni" },
  { value: "general", label: "Something else", routesTo: "main" },
] as const;
