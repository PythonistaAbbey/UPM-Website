import type { Metadata } from "next";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { media } from "@/data/media";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, PageHeader, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";
import { faculties } from "@/data/faculties";
import { programmes } from "@/data/programmes";

export const metadata: Metadata = { title: "Faculties and schools" };

export default async function Faculties({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  const count = (slug: string) => programmes.filter((p) => p.facultySlug === slug && p.level !== "postgraduate").length;
  const groups = [
    { title: "Serdang campus", list: faculties.filter((f) => f.campus === "serdang") },
    { title: "Bintulu Sarawak campus", list: faculties.filter((f) => f.campus === "bintulu") },
  ];
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.about, path: "/about" }, { label: "Faculties and schools" }]} />
      <PageHeader image={media.agriculture} title="Faculties and schools" intro={<>Every faculty uses the same page template, with its own editors. <ProvenanceNote p={{ status: "verified", sources: ["S05", "S06"], checked: "2026-11-11" }} d={d} /></>} />
      {groups.map((g) => (
        <Section key={g.title} title={g.title}>
          <ul className={grid}>
            {g.list.map((f) => (
              <li key={f.slug}><Card title={f.name} href={href(locale, `/faculties/${f.slug}`)} meta={<span className="text-xs font-semibold text-ink-muted">{count(f.slug)} undergraduate programmes listed</span>}>{f.field}</Card></li>
            ))}
          </ul>
        </Section>
      ))}
    </>
  );
}
