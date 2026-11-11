import Link from "next/link";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { ButtonLink, Card, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";
import { faculties } from "@/data/faculties";
import { programmes } from "@/data/programmes";
import { newsItems } from "@/data/news";
import { NewsCard } from "@/components/NewsCard";

const audiences = [
  { title: "Prospective undergraduates", path: "/study#pathways", text: "Programmes, entry routes and how to apply through UPUOnline." },
  { title: "Prospective postgraduates", path: "/study/programmes?level=postgraduate", text: "Research and coursework study through the School of Graduate Studies." },
  { title: "International students", path: "/international", text: "Admissions, arrival and support for students from outside Malaysia." },
  { title: "Current students", path: "/services/students", text: "Student portals, learning platforms, calendars, library and support." },
  { title: "Staff", path: "/services/staff", text: "Email, HR, claims, ICT support, policies and research administration." },
  { title: "Researchers", path: "/research", text: "Research centres, commercialisation and research discovery." },
  { title: "Alumni and partners", path: "/alumni-partners", text: "Stay connected, collaborate and support UPM." },
  { title: "Parents and visitors", path: "/campus-life/map", text: "Find your way around the campus and contact the right office." },
];

export default async function Home({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  const ugCount = programmes.filter((p) => p.level === "undergraduate" && p.mode === "on-campus").length;
  const latest = [...newsItems].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white on-dark">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-campus-700/40 blur-3xl" />
        <div className="container-page relative py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/85">Universiti Putra Malaysia · concept</p>
          <h1 id="hero-heading" className="mt-3 max-w-3xl text-4xl font-bold md:text-6xl">One front door to study, research and campus life</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">
            A prototype of a unified UPM website. Find a programme, reach the right office and use university services from one place.
          </p>
          <form role="search" action={href(locale, "/study/programmes")} className="mt-8 flex max-w-xl flex-col gap-2 sm:flex-row">
            <label htmlFor="hero-q" className="sr-only">Search programmes</label>
            <input id="hero-q" name="q" type="search" placeholder="Search programmes, e.g. engineering"
              className="min-h-12 flex-1 rounded-lg border-0 bg-white px-4 text-base text-ink placeholder:text-ink-muted" />
            <button type="submit" className="min-h-12 rounded-lg bg-white px-6 font-semibold text-brand-800 hover:bg-brand-50">Find programmes</button>
          </form>
          <p className="mt-3 text-sm text-white/85">{ugCount} undergraduate programmes from UPM&apos;s public programme list.</p>
        </div>
      </section>

      <Section title="I am…" id="audiences">
        <ul className={grid}>
          {audiences.map((a) => (
            <li key={a.title}><Card title={a.title} href={href(locale, a.path)}>{a.text}</Card></li>
          ))}
        </ul>
      </Section>

      <div className="bg-surface-alt">
        <Section title="Ways to apply" id="admissions" intro="Routes described on UPM's public How to Apply page. Applications are made on official systems.">
          <ul className={grid}>
            <li><Card title="Malaysian undergraduates" href={href(locale, "/study#pathways")}>Main channel through UPUOnline, managed by the Ministry of Higher Education.</Card></li>
            <li><Card title="Postgraduate study" href={href(locale, "/study#pathways")}>Research programmes (M.S., M.A., M.V.Sc., Ph.D., DEng), coursework masters and industry pathways.</Card></li>
            <li><Card title="International applicants" href={href(locale, "/international")}>Online application for international undergraduates and postgraduates.</Card></li>
          </ul>
          <p className="mt-4"><ProvenanceNote p={{ status: "verified", sources: ["S08"], checked: "2026-11-11" }} d={d} /></p>
        </Section>
      </div>

      <Section title="Faculties and schools" id="faculties" intro={`${faculties.length} faculties and schools appear in UPM's public unit directory, across the Serdang and Bintulu campuses.`}>
        <ul className={grid}>
          {faculties.slice(0, 6).map((f) => (
            <li key={f.slug}><Card title={f.name} href={href(locale, `/faculties/${f.slug}`)}>{f.field} · {f.campus === "serdang" ? "Serdang" : "Bintulu, Sarawak"}</Card></li>
          ))}
        </ul>
        <div className="mt-6"><ButtonLink href={href(locale, "/faculties")} variant="secondary">All faculties and schools</ButtonLink></div>
      </Section>

      <div className="bg-campus-50">
        <Section title="Research and innovation" id="research">
          <ul className={grid}>
            <li><Card title="Research Management Centre" href={href(locale, "/research")}>Manages research at UPM and publishes lists of high-impact publications.</Card></li>
            <li><Card title="Putra Science Park" href={href(locale, "/research#innovation")}>Intellectual property, technology disclosure and commercialisation of UPM innovations.</Card></li>
            <li><Card title="UPM AI Hub" href={href(locale, "/research#ai")}>AI projects, high-performance computing, training and guidelines across agriculture, education, health and administration.</Card></li>
          </ul>
          <p className="mt-4"><ProvenanceNote p={{ status: "verified", sources: ["S24", "S25", "S28"], checked: "2026-11-11" }} d={d} /></p>
        </Section>
      </div>

      <Section title="UPM at a glance" id="facts">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1931", "Founded as the School of Agriculture in Serdang"],
            ["1997", "Renamed Universiti Putra Malaysia"],
            [String(faculties.length), "Faculties and schools in the public directory"],
            ["2", "Campuses named in the public directory: Serdang and Bintulu"],
          ].map(([n, l]) => (
            <div key={l} className="flex flex-col rounded-card border border-line p-5">
              <dt className="text-sm text-ink-muted">{l}</dt>
              <dd className="order-first text-4xl font-bold text-brand-700">{n}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4"><ProvenanceNote p={{ status: "verified", sources: ["S05", "S11"], checked: "2026-11-11" }} d={d} /></p>
      </Section>

      <div className="bg-surface-alt">
        <Section title="News and events" id="news">
          <ul className={grid}>{latest.map((n) => <li key={n.slug}><NewsCard item={n} locale={locale} /></li>)}</ul>
          <div className="mt-6"><ButtonLink href={href(locale, "/news")} variant="secondary">All news and events</ButtonLink></div>
        </Section>
      </div>

      <Section title="Campus life" id="campus">
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-ink-muted">Residential colleges, sport, the Sultan Abdul Samad Library, health services and student activities. Explore what is on campus, or find a building on the map.</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={href(locale, "/campus-life")}>Explore campus life</ButtonLink>
            <ButtonLink href={href(locale, "/campus-life/map")} variant="secondary">Open the campus map</ButtonLink>
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-muted">Looking for something else? <Link className="underline" href={href(locale, "/search")}>Search the whole prototype</Link>.</p>
      </Section>
    </>
  );
}
