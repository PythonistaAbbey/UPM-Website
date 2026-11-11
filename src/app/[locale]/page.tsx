import Link from "next/link";
import { href, resolveLocale, type LocaleParams } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { Icon } from "@/components/ui";
import { ProvenanceNote, DemoBadge } from "@/components/Provenance";
import { MediaImage, TempArtLabel } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FacultyFinder } from "@/components/home/FacultyFinder";
import { media } from "@/data/media";
import { faculties } from "@/data/faculties";
import { programmes } from "@/data/programmes";
import { newsItems } from "@/data/news";
import { mediaForField, mediaForNews } from "@/lib/visuals";
import { formatDate } from "@/components/NewsCard";
import { t } from "@/lib/i18n";

/** Homepage copy. Bahasa Malaysia drafted by the prototype team; needs review by a qualified translator. */
const C = {
  en: {
    eyebrow: "Universiti Putra Malaysia",
    title: "Discover. Innovate. Transform the Future.",
    lead: "Founded in Serdang in 1931 as a School of Agriculture, UPM today brings together 16 faculties and schools across two campuses, with research institutes spanning food security, biosciences, forestry, nanotechnology and more.",
    explore: "Explore Programmes", discover: "Discover UPM",
    stats: [["1931", "Founded in Serdang"], ["16", "Faculties and schools"], ["99", "Programmes listed"], ["2", "Campuses"]],
    iam: "I am a…", iamTitle: "Start with what you need",
    discoverEyebrow: "Discover UPM", discoverTitle: "From a school of agriculture to a research university",
    discoverBody: "UPM began in 1931 as the School of Agriculture on a 22-acre site in Serdang. It became the College of Agriculture Malaya in 1947, Universiti Pertanian Malaysia after merging with the University of Malaya's Faculty of Agriculture, and Universiti Putra Malaysia in 1997, after expanding into science and technology from the early 1980s.",
    vision: "To become a university of international repute", visionLabel: "Our vision", values: "Core values: Ihsan, diversity and sustainability.",
    academicEyebrow: "Academic excellence", academicTitle: "Find your field",
    academicBody: "Programme names come from UPM's public programme list. Choose a field to see every programme in it, or search directly.",
    researchEyebrow: "Research that changes lives", researchTitle: "Science rooted in the tropics, serving the world",
    researchBody: "UPM's research institutes and centres work on challenges from food security and halal science to nanotechnology, ageing and artificial intelligence.",
    facEyebrow: "Faculties and institutes", facTitle: "Sixteen faculties and schools, one university",
    lifeEyebrow: "Life at UPM", lifeTitle: "A green campus with room to grow",
    newsEyebrow: "News, discoveries and events", newsTitle: "What's happening",
    visitEyebrow: "Visit and explore", visitTitle: "Find your way to Serdang",
    visitBody: "UPM's main campus is at Serdang, Selangor. The Bintulu Campus in Sarawak hosts two faculties and the Institut Ekosains Borneo.",
  },
  ms: {
    eyebrow: "Universiti Putra Malaysia",
    title: "Teroka. Berinovasi. Ubah Masa Depan.",
    lead: "Diasaskan di Serdang pada 1931 sebagai Sekolah Pertanian, UPM kini menghimpunkan 16 fakulti dan sekolah di dua kampus, dengan institut penyelidikan dalam keselamatan makanan, biosains, perhutanan, nanoteknologi dan banyak lagi.",
    explore: "Teroka Program", discover: "Kenali UPM",
    stats: [["1931", "Diasaskan di Serdang"], ["16", "Fakulti dan sekolah"], ["99", "Program disenaraikan"], ["2", "Kampus"]],
    iam: "Saya seorang…", iamTitle: "Mulakan dengan keperluan anda",
    discoverEyebrow: "Kenali UPM", discoverTitle: "Daripada sekolah pertanian kepada universiti penyelidikan",
    discoverBody: "UPM bermula pada 1931 sebagai Sekolah Pertanian di tapak seluas 22 ekar di Serdang. Ia menjadi Kolej Pertanian Malaya pada 1947, Universiti Pertanian Malaysia selepas bergabung dengan Fakulti Pertanian Universiti Malaya, dan Universiti Putra Malaysia pada 1997, selepas berkembang ke bidang sains dan teknologi sejak awal 1980-an.",
    vision: "Menjadi universiti bereputasi antarabangsa", visionLabel: "Visi kami", values: "Nilai teras: Ihsan, kepelbagaian dan kelestarian.",
    academicEyebrow: "Kecemerlangan akademik", academicTitle: "Cari bidang anda",
    academicBody: "Nama program diambil daripada senarai program awam UPM. Pilih bidang untuk melihat semua program, atau cari terus.",
    researchEyebrow: "Penyelidikan yang mengubah kehidupan", researchTitle: "Sains berakar di tropika, untuk dunia",
    researchBody: "Institut dan pusat penyelidikan UPM menangani cabaran daripada keselamatan makanan dan sains halal hingga nanoteknologi, penuaan dan kecerdasan buatan.",
    facEyebrow: "Fakulti dan institut", facTitle: "Enam belas fakulti dan sekolah, satu universiti",
    lifeEyebrow: "Kehidupan di UPM", lifeTitle: "Kampus hijau untuk berkembang",
    newsEyebrow: "Berita, penemuan dan acara", newsTitle: "Apa yang berlaku",
    visitEyebrow: "Lawati dan teroka", visitTitle: "Cari jalan ke Serdang",
    visitBody: "Kampus utama UPM terletak di Serdang, Selangor. Kampus Bintulu di Sarawak menempatkan dua fakulti dan Institut Ekosains Borneo.",
  },
} as const;

const audiences = (ms: boolean) => [
  { icon: Icon.cap, t: ms ? "Bakal pelajar" : "Future student", d: ms ? "Program, laluan kemasukan dan cara memohon." : "Programmes, entry routes and how to apply.", p: "/study" },
  { icon: Icon.book, t: ms ? "Pelajar semasa" : "Current student", d: ms ? "Portal, pembelajaran, kalendar dan sokongan." : "Portals, learning, calendars and support.", p: "/services/students" },
  { icon: Icon.globe, t: ms ? "Pelajar antarabangsa" : "International student", d: ms ? "Memohon, tiba dan tinggal di Malaysia." : "Applying, arriving and living in Malaysia.", p: "/international" },
  { icon: Icon.flask, t: ms ? "Penyelidik" : "Researcher", d: ms ? "Institut, pengkomersialan dan kepakaran." : "Institutes, commercialisation and expertise.", p: "/research" },
  { icon: Icon.brief, t: ms ? "Staf akademik atau pentadbiran" : "Academic or administrative staff", d: ms ? "E-mel, HR, tuntutan, ICT dan dasar." : "Email, HR, claims, ICT and policies.", p: "/services/staff" },
  { icon: Icon.user, t: "Alumni", d: ms ? "Kekal berhubung dan menyokong UPM." : "Stay connected and support UPM.", p: "/alumni-partners#alumni" },
  { icon: Icon.hand, t: ms ? "Rakan industri" : "Industry partner", d: ms ? "Pelesenan, latihan dan kerjasama." : "Licensing, training and collaboration.", p: "/alumni-partners#partners" },
  { icon: Icon.pin, t: ms ? "Pelawat kampus" : "Campus visitor", d: ms ? "Peta, hala tuju dan pejabat yang betul." : "Map, directions and the right office.", p: "/campus-life/map" },
];

const strengths = [
  { t: "Tropical agriculture & food security", u: "ITAFoS · Faculty of Agriculture", m: media.agriculture },
  { t: "Biosciences & biotechnology", u: "Institute of Bioscience · Faculty of Biotechnology and Biomolecular Sciences", m: media.lab },
  { t: "Forests, biodiversity & environment", u: "INTROP · Faculty of Forestry and Environment", m: media.canopy },
  { t: "Aquaculture & aquatic sciences", u: "I-AQUAS", m: media.water },
];
const moreStrengths = ["Halal Products Research Institute", "Institute of Nanoscience and Nanotechnology (ION2)", "Malaysian Research Institute on Ageing", "Institute for Mathematical Research (INSPEM)", "UPM AI Hub", "Putra Science Park"];

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-white/90" : "text-brand-600"}`}><span aria-hidden="true" className={`h-px w-8 ${light ? "bg-white/70" : "bg-brand-600"}`} />{children}</p>;
}

export default async function Home({ params }: LocaleParams) {
  const locale: Locale = await resolveLocale(params);
  const ms = locale === "ms";
  const c = C[locale];
  const d = t(locale);
  const fields = Array.from(new Set(programmes.map((p) => p.field)))
    .map((f) => ({ f, n: programmes.filter((p) => p.field === f).length }))
    .sort((a, b) => b.n - a.n).slice(0, 8);
  const news = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = [news.find((n) => n.provenance.status === "verified" && n.kind === "event") ?? news[0]!, ...news.filter((n) => n !== (news.find((x) => x.provenance.status === "verified" && x.kind === "event") ?? news[0])).slice(0, 3)];

  return (
    <div lang={locale}>
      {/* A — Cinematic hero */}
      <section aria-labelledby="hero-title" className="relative isolate -mt-[1px] min-h-[640px] overflow-hidden text-white md:h-[86svh] md:min-h-[680px]">
        <MediaImage asset={media.hero} priority sizes="100vw" className="absolute inset-0 -z-20" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d0f12]/85 via-[#0d0f12]/55 to-[#0d0f12]/10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d0f12]/80 via-transparent to-transparent" />
        <div className="container-page grid h-full items-center gap-10 py-14 md:py-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="on-dark animate-rise">
            <div className="glass-dark rounded-[2rem] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">{c.eyebrow}</p>
              <h1 id="hero-title" className="mt-4 text-[2.5rem] leading-[1.03] sm:text-[3.4rem] xl:text-[4.1rem]">{c.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{c.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={href(locale, "/study/programmes")} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-600 px-7 font-semibold text-white shadow-xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-brand-700 active:translate-y-0">{c.explore} <span aria-hidden="true">→</span></Link>
                <Link href={href(locale, "/about")} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20">{c.discover}</Link>
              </div>
            </div>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <HeroSearch locale={locale} />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 hidden sm:block"><TempArtLabel /></div>
      </section>

      {/* Stats ribbon */}
      <div className="container-page relative z-10 -mt-10">
        <dl className="glass grid grid-cols-2 divide-black/5 rounded-[1.75rem] p-2 md:grid-cols-4 md:divide-x">
          {c.stats.map(([n, l]) => (
            <div key={l} className="flex flex-col px-5 py-4">
              <dt className="text-sm text-ink-muted">{l}</dt>
              <dd className="order-first font-display text-4xl font-semibold text-brand-600">{n}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 px-2"><ProvenanceNote p={{ status: "verified", sources: ["S05", "S06", "S11"], checked: "2026-11-11" }} d={d} /></p>
      </div>

      {/* B — Audience gateway */}
      <section aria-labelledby="iam-title" className="container-page py-14 md:py-28">
        <Reveal><Eyebrow>{c.iam}</Eyebrow><h2 id="iam-title" className="text-4xl text-ink md:text-5xl">{c.iamTitle}</h2></Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-10 lg:grid-cols-4">
          {audiences(ms).map((a, i) => (
            <Reveal as="li" key={a.p} delay={i * 50}>
              <div className="group glass lift relative h-full overflow-hidden rounded-3xl p-4 sm:p-6">
                <div aria-hidden="true" className="absolute inset-0 -z-0 bg-gradient-to-br from-brand-600 to-brand-800 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 sm:h-12 sm:w-12 text-brand-600 transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">{a.icon}</div>
                  <h3 className="mt-3 text-[0.95rem] font-semibold leading-snug text-ink transition-colors sm:mt-5 sm:text-lg duration-500 group-hover:text-white">
                    <Link href={href(locale, a.p)} className="after:absolute after:-inset-6 focus-visible:outline-none">{a.t}</Link>
                  </h3>
                  <p className="mt-1.5 text-xs text-ink-muted transition-colors sm:text-sm duration-500 group-hover:text-white/90">{a.d}</p>
                  <span aria-hidden="true" className="mt-5 hidden text-brand-600 sm:inline-block transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* C — Discover UPM (editorial split) */}
      <section aria-labelledby="discover-title" className="container-page grid items-center gap-12 py-10 md:py-20 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/15 sm:aspect-[5/4] lg:aspect-[4/5]">
            <MediaImage asset={media.canopy} sizes="(min-width:1024px) 50vw, 100vw" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" />
            <span className="absolute left-4 top-4"><TempArtLabel /></span>
          </div>
          <figure className="glass absolute -bottom-8 right-4 max-w-xs rounded-3xl p-6 sm:right-8">
            <figcaption className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{c.visionLabel}</figcaption>
            <blockquote className="mt-2 font-display text-2xl leading-snug text-ink">“{c.vision}”</blockquote>
          </figure>
        </Reveal>
        <Reveal delay={100} className="pt-8 lg:pt-0">
          <Eyebrow>{c.discoverEyebrow}</Eyebrow>
          <h2 id="discover-title" className="text-4xl text-ink md:text-5xl">{c.discoverTitle}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">{c.discoverBody}</p>
          <p className="mt-4 font-semibold text-campus-700">{c.values}</p>
          <ol className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[["1931", ms ? "Sekolah Pertanian" : "School of Agriculture"], ["1947", ms ? "Kolej Pertanian Malaya" : "College of Agriculture Malaya"], ["1973", ms ? "Sesi akademik pertama" : "First academic session"], ["1997", "Universiti Putra Malaysia"]].map(([y, l]) => (
              <li key={y} className="border-l-2 border-brand-600 pl-3"><p className="font-display text-2xl font-semibold text-ink">{y}</p><p className="text-sm text-ink-muted">{l}</p></li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={href(locale, "/about")} className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-semibold text-white transition hover:bg-black">{ms ? "Sejarah dan identiti kami" : "Our history and identity"} →</Link>
            <ProvenanceNote p={{ status: "verified", sources: ["S09", "S11"], checked: "2026-11-11" }} d={d} />
          </div>
        </Reveal>
      </section>

      {/* D — Academic excellence */}
      <section aria-labelledby="academic-title" className="py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_28rem]">
            <Reveal>
              <Eyebrow>{c.academicEyebrow}</Eyebrow>
              <h2 id="academic-title" className="text-4xl text-ink md:text-5xl">{c.academicTitle}</h2>
              <p className="mt-4 max-w-2xl text-lg text-ink-muted">{c.academicBody}</p>
            </Reveal>
            <Reveal delay={100}>
              <form action={href(locale, "/study/programmes")} className="glass grid gap-2 rounded-3xl p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]" aria-label={ms ? "Cari program" : "Programme search"}>
                <label htmlFor="ac-q" className="sr-only">{ms ? "Kata kunci" : "Keyword"}</label>
                <input id="ac-q" name="q" type="search" placeholder={ms ? "Kata kunci" : "Keyword"} className="min-h-12 w-full min-w-0 rounded-2xl border border-line bg-white px-4 outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100" />
                <label htmlFor="ac-level" className="sr-only">{ms ? "Peringkat" : "Level"}</label>
                <select id="ac-level" name="level" className="min-h-12 rounded-2xl border border-line bg-white px-3">
                  <option value="">{ms ? "Semua peringkat" : "All levels"}</option>
                  <option value="foundation">{ms ? "Asasi" : "Foundation"}</option>
                  <option value="undergraduate">{ms ? "Prasiswazah" : "Undergraduate"}</option>
                  <option value="postgraduate">{ms ? "Pascasiswazah" : "Postgraduate"}</option>
                </select>
                <button className="min-h-12 rounded-2xl bg-brand-600 px-5 font-semibold text-white transition hover:bg-brand-700">{ms ? "Cari" : "Search"}</button>
              </form>
            </Reveal>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:mt-12 md:grid-cols-6">
            {fields.map(({ f, n }, i) => (
              <Reveal as="li" key={f} delay={i * 60} className={i < 2 ? "col-span-2 md:col-span-3" : "md:col-span-2"}>
                <div className={`group relative isolate overflow-hidden rounded-[1.75rem] text-white shadow-xl shadow-black/10 ${i < 2 ? "aspect-[16/10]" : "aspect-[4/5] sm:aspect-[4/3]"}`}>
                  <MediaImage asset={mediaForField(f)} sizes="(min-width:768px) 50vw, 100vw" decorative className="absolute inset-0 -z-10" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="on-dark flex h-full flex-col justify-end p-4 sm:p-6">
                    <p className="text-sm font-medium text-white/85">{n} {ms ? "program" : "programmes"}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold leading-tight sm:text-2xl md:text-3xl">
                      <Link href={href(locale, `/study/programmes?field=${encodeURIComponent(f)}`)} className="after:absolute after:inset-0 focus-visible:outline-none">{f}</Link>
                    </h3>
                    <span aria-hidden="true" className="mt-3 hidden w-fit sm:inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur transition group-hover:bg-white group-hover:text-brand-700">{ms ? "Lihat program" : "View programmes"} →</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">{ms ? "Kumpulan bidang ialah klasifikasi prototaip, bukan klasifikasi rasmi UPM." : "Field groupings are a prototype classification, not an official UPM one."}</p>
        </div>
      </section>

      {/* E — Research showcase */}
      <section aria-labelledby="research-title" className="relative isolate overflow-hidden py-20 text-white md:py-28">
        <MediaImage asset={media.lab} sizes="100vw" decorative className="absolute inset-0 -z-20" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0d1216]/92 via-[#0d1216]/80 to-[#0d1216]/55" />
        <div className="container-page on-dark">
          <Reveal className="max-w-3xl">
            <Eyebrow light>{c.researchEyebrow}</Eyebrow>
            <h2 id="research-title" className="text-4xl md:text-6xl">{c.researchTitle}</h2>
            <p className="mt-5 text-lg text-white/85">{c.researchBody}</p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:mt-12 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 80}>
                <div className="group glass-dark lift relative h-full overflow-hidden rounded-3xl">
                  <div className="aspect-[16/10] overflow-hidden"><MediaImage asset={s.m} sizes="(min-width:1024px) 25vw, 50vw" decorative imgClassName="transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display text-base font-semibold leading-snug sm:text-xl"><Link href={href(locale, "/research#institutes")} className="after:absolute after:inset-0 focus-visible:outline-none">{s.t}</Link></h3>
                    <p className="mt-2 text-xs text-white/80 sm:text-sm">{s.u}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-2">
            {moreStrengths.map((m) => <li key={m} className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur">{m}</li>)}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={href(locale, "/research")} className="inline-flex min-h-12 items-center rounded-full bg-white px-6 font-semibold text-ink transition hover:bg-brand-50">{ms ? "Penyelidikan dan inovasi" : "Research and innovation"} →</Link>
            <Link href={href(locale, "/research/discover")} className="inline-flex min-h-12 items-center rounded-full border border-white/40 bg-white/10 px-6 font-semibold text-white backdrop-blur transition hover:bg-white/20">{ms ? "Cari penyelidik (demo)" : "Find researchers (demo)"}</Link>
          </div>
          <p className="mt-6 text-sm text-white/75">{ms ? "Institut daripada direktori unit awam UPM (S05). Kenyataan kekuatan ialah ringkasan prototaip." : "Institutes from UPM's public unit directory (S05). Strength headings are prototype summaries."}</p>
        </div>
      </section>

      {/* F — Faculties and institutes */}
      <section aria-labelledby="fac-title" className="container-page py-20 md:py-28">
        <Reveal className="mb-10"><Eyebrow>{c.facEyebrow}</Eyebrow><h2 id="fac-title" className="text-4xl text-ink md:text-5xl">{c.facTitle}</h2></Reveal>
        <FacultyFinder locale={locale} />
      </section>

      {/* G — Life at UPM (masonry) */}
      <section aria-labelledby="life-title" className="container-page py-10 md:py-16">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><Eyebrow>{c.lifeEyebrow}</Eyebrow><h2 id="life-title" className="text-4xl text-ink md:text-5xl">{c.lifeTitle}</h2></div>
          <Link href={href(locale, "/campus-life")} className="inline-flex min-h-11 items-center font-semibold text-brand-600 hover:underline">{ms ? "Kehidupan kampus" : "Explore campus life"} →</Link>
        </Reveal>
        <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
          {[
            { m: media.graduation, t: ms ? "Konvokesyen" : "Convocation", s: ms ? "Dewan Besar, Pusat Kebudayaan dan Kesenian Sultan Salahuddin Abdul Aziz Shah" : "The Grand Hall, Sultan Salahuddin Abdul Aziz Shah Cultural and Arts Centre", p: "/news/convocation-49-session-2", a: "aspect-[4/5]" },
            { m: media.library, t: ms ? "Perpustakaan" : "Libraries", s: ms ? "Perpustakaan Sultan Abdul Samad dan empat seksyen" : "Sultan Abdul Samad Library and four section libraries", p: "/campus-life#libraries", a: "aspect-[4/3]" },
            { m: media.evening, t: ms ? "Kolej kediaman" : "Residential colleges", s: ms ? "Sepuluh kolej di Serdang dan Bintulu" : "Ten colleges across Serdang and Bintulu", p: "/campus-life#accommodation", a: "aspect-square" },
            { m: media.canopy, t: ms ? "Kampus hijau" : "Green campus", s: ms ? "Akar pertanian, fokus kelestarian" : "Agricultural roots, sustainability focus", p: "/about#history", a: "aspect-[4/3]" },
            { m: media.water, t: ms ? "Sukan dan kesejahteraan" : "Sport and wellbeing", s: ms ? "Akademi Sukan, kaunseling dan kesihatan" : "Sports Academy, counselling and health", p: "/campus-life#support", a: "aspect-[4/5]" },
            { m: media.agriculture, t: ms ? "Seni dan budaya" : "Arts and culture", s: ms ? "Pusat kebudayaan, Radio Putra dan pusat Islam" : "Cultural centre, Radio Putra and the Islamic centre", p: "/campus-life#culture", a: "aspect-[4/3]" },
          ].map((g, i) => (
            <Reveal as="li" key={g.t} delay={i * 50} className="break-inside-avoid">
              <div className={`group relative isolate overflow-hidden rounded-[1.75rem] text-white ${g.a}`}>
                <MediaImage asset={g.m} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" decorative className="absolute inset-0 -z-10" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="on-dark absolute inset-x-3 bottom-3 rounded-2xl p-4 glass-dark">
                  <h3 className="font-display text-xl font-semibold"><Link href={href(locale, g.p)} className="after:absolute after:inset-0 focus-visible:outline-none">{g.t}</Link></h3>
                  <p className="text-sm text-white/85">{g.s}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="text-sm text-ink-muted">{ms ? "Semua imej di laman ini ialah karya seni sementara sehingga fotografi UPM berlesen diluluskan." : "All images on this site are temporary artwork until licensed UPM photography is approved."}</p>
      </section>

      {/* H — News, discoveries and events */}
      <section aria-labelledby="news-title" className="container-page py-20 md:py-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><Eyebrow>{c.newsEyebrow}</Eyebrow><h2 id="news-title" className="text-4xl text-ink md:text-5xl">{c.newsTitle}</h2></div>
          <Link href={href(locale, "/news")} className="inline-flex min-h-11 items-center font-semibold text-brand-600 hover:underline">{ms ? "Semua berita dan acara" : "All news and events"} →</Link>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <article className="group relative isolate flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] text-white" lang="en">
              <MediaImage asset={mediaForNews(lead.category)} sizes="(min-width:1024px) 60vw, 100vw" decorative className="absolute inset-0 -z-10" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="on-dark p-7 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/90">{lead.kind === "event" ? "Event" : "News"} · {lead.category}</p>
                <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl"><Link href={href(locale, `/news/${lead.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none">{lead.title}</Link></h3>
                <p className="mt-3 max-w-xl text-white/90">{lead.summary}</p>
                <p className="mt-4 text-sm text-white/85"><time dateTime={lead.date}>{formatDate(lead.date, locale)}</time>{lead.endDate && <> – <time dateTime={lead.endDate}>{formatDate(lead.endDate, locale)}</time></>} · {lead.provenance.status === "verified" ? `${d.source} ${lead.provenance.sources.join(", ")}` : d.demo}</p>
              </div>
            </article>
          </Reveal>
          <ul className="grid gap-4">
            {rest.map((n, i) => (
              <Reveal as="li" key={n.slug} delay={i * 80}>
                <article className="group glass lift relative flex gap-4 overflow-hidden rounded-3xl p-3" lang="en">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-36"><MediaImage asset={mediaForNews(n.category)} sizes="160px" decorative imgClassName="transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="min-w-0 py-1 pr-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">{n.kind === "event" ? "Event" : "News"} · {n.category}</p>
                    <h3 className="mt-1 font-semibold leading-snug text-ink"><Link href={href(locale, `/news/${n.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none">{n.title}</Link></h3>
                    <p className="mt-1 text-sm text-ink-muted"><time dateTime={n.date}>{formatDate(n.date, locale)}</time></p>
                    {n.provenance.status === "demo" && <p className="relative z-10 mt-2"><DemoBadge label={d.demo} /></p>}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* I — Visit and explore */}
      <section aria-labelledby="visit-title" className="container-page pb-8">
        <div className="relative isolate overflow-hidden rounded-[2.25rem]">
          <MediaImage asset={media.hero} sizes="100vw" decorative className="absolute inset-0 -z-20" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-white/40 to-transparent" />
          <div className="grid gap-8 p-5 sm:p-10 lg:grid-cols-[1fr_1fr] lg:p-14">
            <Reveal className="glass rounded-[1.75rem] p-7 md:p-9">
              <Eyebrow>{c.visitEyebrow}</Eyebrow>
              <h2 id="visit-title" className="text-4xl text-ink">{c.visitTitle}</h2>
              <p className="mt-4 text-ink-muted">{c.visitBody}</p>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div><dt className="font-semibold text-ink">{ms ? "Alamat" : "Address"}</dt><dd className="text-ink-muted">Universiti Putra Malaysia, 43400 UPM Serdang, Selangor Darul Ehsan</dd></div>
                <div><dt className="font-semibold text-ink">{ms ? "Talian umum" : "General line"}</dt><dd className="text-ink-muted">+603-9769 1000</dd></div>
                <div><dt className="font-semibold text-ink">{ms ? "Pusat Kawalan (24 jam)" : "Control Centre (24 hours)"}</dt><dd className="text-ink-muted">03-9769 7990 / 7470 / 1999</dd></div>
                <div><dt className="font-semibold text-ink">{ms ? "E-mel" : "Email"}</dt><dd className="text-ink-muted">pspk@upm.edu.my</dd></div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={href(locale, "/campus-life/map")} className="inline-flex min-h-12 items-center rounded-full bg-brand-600 px-6 font-semibold text-white transition hover:bg-brand-700">{ms ? "Buka peta kampus" : "Open the campus map"} →</Link>
                <Link href={href(locale, "/contact")} className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 font-semibold text-ink transition hover:border-brand-600 hover:text-brand-700">{ms ? "Direktori dan pertanyaan" : "Directory and enquiries"}</Link>
              </div>
              <p className="mt-5"><ProvenanceNote p={{ status: "verified", sources: ["S05", "S12"], checked: "2026-11-11" }} d={d} /></p>
            </Reveal>
            <div className="hidden items-end justify-end lg:flex"><TempArtLabel /></div>
          </div>
        </div>
        <p className="sr-only">{faculties.length}</p>
      </section>
    </div>
  );
}
