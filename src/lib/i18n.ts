import type { Locale } from "./types";

export const locales: Locale[] = ["en", "ms"];
export const isLocale = (v: string): v is Locale => (locales as string[]).includes(v);

/**
 * Interface strings. Bahasa Malaysia strings were drafted by the prototype team
 * and must be reviewed by a qualified UPM translation editor before any real use.
 */
const en = {
  banner: "Independent Concept Prototype — Not an Official UPM Website",
  bannerDetail: "Built to evaluate a website redesign. Content marked “Demonstration” is not real. Always confirm information on official UPM websites.",
  skip: "Skip to main content",
  siteName: "UPM Digital Campus",
  siteTag: "Concept prototype",
  nav: {
    study: "Study at UPM", research: "Research & Innovation", about: "Our University", international: "International",
    campus: "Campus Life", news: "News & Events", alumni: "Alumni & Partners",
  },
  quick: { students: "Student services", staff: "Staff services", contact: "Contact", search: "Search" },
  quickLabel: "Quick links",
  menu: "Menu", closeMenu: "Close menu", language: "Language", switchTo: "Bahasa Malaysia",
  searchPlaceholder: "Search programmes, faculties, services…", searchLabel: "Search this prototype",
  demo: "Demonstration content", verified: "From public UPM source", source: "Source", checked: "checked",
  officialSite: "Official website", opensExternal: "opens an official UPM or external website",
  loginRequired: "Requires UPM login on the official system", insecure: "Published with an insecure http:// link",
  home: "Home", breadcrumb: "Breadcrumb",
  footer: {
    note: "This is an independent, unofficial prototype. It is not affiliated with, endorsed by, or operated by Universiti Putra Malaysia.",
    official: "Visit the official UPM website", sources: "Sources and methodology",
  },
  untranslated: "This content is available in English only.",
  notFound: { title: "Page not found", body: "The page you asked for does not exist in this prototype.", back: "Go to the homepage" },
  error: { title: "Something went wrong", body: "This page could not be displayed.", retry: "Try again" },
  loading: "Loading…",
};

type Dict = typeof en;

const ms: Dict = {
  banner: "Prototaip Konsep Bebas — Bukan Laman Web Rasmi UPM",
  bannerDetail: "Dibina untuk menilai reka bentuk semula laman web. Kandungan bertanda “Demonstrasi” bukan maklumat sebenar. Sentiasa sahkan maklumat di laman web rasmi UPM.",
  skip: "Langkau ke kandungan utama",
  siteName: "UPM Digital Campus",
  siteTag: "Prototaip konsep",
  nav: {
    study: "Belajar di UPM", research: "Penyelidikan & Inovasi", about: "Universiti Kami", international: "Antarabangsa",
    campus: "Kehidupan Kampus", news: "Berita & Acara", alumni: "Alumni & Rakan Kerjasama",
  },
  quick: { students: "Perkhidmatan pelajar", staff: "Perkhidmatan staf", contact: "Hubungi", search: "Carian" },
  quickLabel: "Pautan pantas",
  menu: "Menu", closeMenu: "Tutup menu", language: "Bahasa", switchTo: "English",
  searchPlaceholder: "Cari program, fakulti, perkhidmatan…", searchLabel: "Cari dalam prototaip ini",
  demo: "Kandungan demonstrasi", verified: "Daripada sumber awam UPM", source: "Sumber", checked: "disemak",
  officialSite: "Laman web rasmi", opensExternal: "membuka laman web rasmi UPM atau luaran",
  loginRequired: "Memerlukan log masuk UPM pada sistem rasmi", insecure: "Diterbitkan dengan pautan http:// yang tidak selamat",
  home: "Utama", breadcrumb: "Serbuk roti",
  footer: {
    note: "Ini ialah prototaip bebas dan tidak rasmi. Ia tidak bergabung dengan, disokong oleh, atau dikendalikan oleh Universiti Putra Malaysia.",
    official: "Lawati laman web rasmi UPM", sources: "Sumber dan metodologi",
  },
  untranslated: "Kandungan halaman dalam prototaip ini hanya tersedia dalam bahasa Inggeris buat masa ini.",
  notFound: { title: "Halaman tidak ditemui", body: "Halaman yang anda minta tidak wujud dalam prototaip ini.", back: "Ke halaman utama" },
  error: { title: "Berlaku ralat", body: "Halaman ini tidak dapat dipaparkan.", retry: "Cuba lagi" },
  loading: "Memuatkan…",
};

export const dictionaries: Record<Locale, Dict> = { en, ms };
export const t = (locale: Locale) => dictionaries[locale];
export type Dictionary = Dict;

/** Prefix an internal path with the locale. */
export const href = (locale: Locale, path = "/") => `/${locale}${path === "/" ? "" : path}`;

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : "en";
}
export type LocaleParams = { params: Promise<{ locale: string }> };
