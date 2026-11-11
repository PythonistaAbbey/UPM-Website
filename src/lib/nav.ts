import type { Dictionary } from "./i18n";

export interface NavItem { key: keyof Dictionary["nav"]; path: string; blurb: string; blurbMs: string; children: { label: string; labelMs: string; path: string }[] }

/** Primary navigation. Every path here must resolve (checked by tests/unit/routes.test.ts). */
export const primaryNav: NavItem[] = [
  { key: "study", path: "/study", blurb: "Programmes, ways to apply and faculties.", blurbMs: "Program, cara memohon dan fakulti.", children: [
    { label: "Find a programme", labelMs: "Cari program", path: "/study/programmes" },
    { label: "Faculties and schools", labelMs: "Fakulti dan sekolah", path: "/faculties" },
    { label: "How to apply", labelMs: "Cara memohon", path: "/study#pathways" },
  ] },
  { key: "research", path: "/research", blurb: "Institutes, commercialisation and research discovery.", blurbMs: "Institut, pengkomersialan dan penemuan penyelidikan.", children: [
    { label: "Find researchers and projects", labelMs: "Cari penyelidik dan projek", path: "/research/discover" },
  ] },
  { key: "about", path: "/about", blurb: "History, vision, identity and contacts.", blurbMs: "Sejarah, visi, identiti dan hubungan.", children: [
    { label: "Faculties and schools", labelMs: "Fakulti dan sekolah", path: "/faculties" },
    { label: "Contact and directory", labelMs: "Hubungi dan direktori", path: "/contact" },
  ] },
  { key: "international", path: "/international", blurb: "Applying and living in Malaysia as an international student.", blurbMs: "Memohon dan tinggal di Malaysia sebagai pelajar antarabangsa.", children: [
    { label: "Apply to UPM", labelMs: "Mohon ke UPM", path: "/international#apply" },
    { label: "Visas and passes", labelMs: "Visa dan pas", path: "/international#visa" },
  ] },
  { key: "campus", path: "/campus-life", blurb: "Accommodation, wellbeing, libraries and the campus map.", blurbMs: "Penginapan, kesejahteraan, perpustakaan dan peta kampus.", children: [
    { label: "Accommodation", labelMs: "Penginapan", path: "/campus-life#accommodation" },
    { label: "Campus map", labelMs: "Peta kampus", path: "/campus-life/map" },
  ] },
  { key: "news", path: "/news", blurb: "Stories, announcements and events.", blurbMs: "Berita, pengumuman dan acara.", children: [] },
  { key: "alumni", path: "/alumni-partners", blurb: "Alumni relations, industry and community partners.", blurbMs: "Hubungan alumni, industri dan rakan komuniti.", children: [] },
];

export const staticRoutes = [
  "/", "/about", "/study", "/study/programmes", "/faculties", "/research", "/research/discover",
  "/international", "/campus-life", "/campus-life/map", "/services/students", "/services/staff",
  "/news", "/contact", "/search", "/alumni-partners",
];
