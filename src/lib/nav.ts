import type { Dictionary } from "./i18n";

export interface NavItem { key: keyof Dictionary["nav"]; path: string; children: { label: string; labelMs: string; path: string }[] }

/** Primary navigation. Every path here must resolve (checked by tests/unit/routes.test.ts). */
export const primaryNav: NavItem[] = [
  { key: "study", path: "/study", children: [
    { label: "Find a programme", labelMs: "Cari program", path: "/study/programmes" },
    { label: "Faculties and schools", labelMs: "Fakulti dan sekolah", path: "/faculties" },
    { label: "How to apply", labelMs: "Cara memohon", path: "/study#pathways" },
  ] },
  { key: "research", path: "/research", children: [
    { label: "Find researchers and projects", labelMs: "Cari penyelidik dan projek", path: "/research/discover" },
  ] },
  { key: "about", path: "/about", children: [
    { label: "Faculties and schools", labelMs: "Fakulti dan sekolah", path: "/faculties" },
    { label: "Contact and directory", labelMs: "Hubungi dan direktori", path: "/contact" },
  ] },
  { key: "international", path: "/international", children: [] },
  { key: "campus", path: "/campus-life", children: [
    { label: "Campus map", labelMs: "Peta kampus", path: "/campus-life/map" },
  ] },
  { key: "news", path: "/news", children: [] },
  { key: "alumni", path: "/alumni-partners", children: [] },
];

export const staticRoutes = [
  "/", "/about", "/study", "/study/programmes", "/faculties", "/research", "/research/discover",
  "/international", "/campus-life", "/campus-life/map", "/services/students", "/services/staff",
  "/news", "/contact", "/search", "/alumni-partners",
];
