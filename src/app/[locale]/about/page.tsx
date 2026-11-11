import type { Metadata } from "next";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { media } from "@/data/media";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, ExternalLink, Notice, PageHeader, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";

export const metadata: Metadata = { title: "About UPM" };
const v = (...s: string[]) => ({ status: "verified" as const, sources: s, checked: "2026-11-11" });

const history = [
  ["1931", "Founded as the School of Agriculture on a 22-acre site in Serdang, offering a three-year diploma and a one-year certificate in agriculture."],
  ["1947", "Named the College of Agriculture Malaya by Sir Edward Gent, then Governor of the Malayan Union."],
  ["Later", "Merged with the Faculty of Agriculture of the University of Malaya to form Universiti Pertanian Malaysia, with Dr. Mohd. Rashdan bin Haji Baba as the first Vice-Chancellor. The source does not give the merger date."],
  ["1973", "First academic session began in July with 1,559 students in three faculties and one foundation division."],
  ["1980s", "Expanded into science and technology."],
  ["1997", "Renamed Universiti Putra Malaysia by Tun Dr. Mahathir Mohamad, then Prime Minister."],
];

export default async function About({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.about }]} />
      <PageHeader image={media.hero} eyebrow={d.nav.about} title="About UPM" intro="History, vision, identity and how the university is organised." />

      <Section title="Vision, mission and values" id="vision">
        <div className="grid gap-5 md:grid-cols-3" lang="en">
          <blockquote className="glass rounded-3xl p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Vision</p><p className="mt-3 font-display text-2xl leading-snug text-ink">To become a university of international repute</p></blockquote>
          <blockquote className="glass rounded-3xl p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Mission</p><p className="mt-3 text-ink">To make meaningful contributions to the creation of prosperity and development of the nation and the well-being of all human beings through the exploration and dissemination of knowledge</p></blockquote>
          <blockquote className="rounded-3xl border border-[#bcdcc6] bg-campus-50/90 p-6 backdrop-blur"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-campus-700">Core values</p><p className="mt-3 font-display text-2xl leading-snug text-ink">Ihsan, diversity and sustainability</p></blockquote>
        </div>
        <p className="mt-3"><ProvenanceNote p={v("S09")} d={d} /></p>
      </Section>

      <Section title="History" id="history">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {history.map(([y, text]) => (
            <li key={y} className="glass relative rounded-3xl p-6">
              <p className="font-display text-3xl font-semibold text-brand-600">{y}</p>
              <p className="mt-2 text-ink-muted">{text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3"><ProvenanceNote p={v("S11")} d={d} /></p>
      </Section>

      <Section title="Corporate identity" id="identity">
        <p className="max-w-3xl text-ink-muted">The UPM logo is based on a shield, representing strong principles and the preservation of knowledge. A water droplet symbolises commitment to the environment, thin lines represent electronic circuits, and three lines on each side refer to UPM&apos;s three founding faculties and its three core functions of teaching, research and services. Red symbolises the quest for knowledge; grey symbolises information technology.</p>
        <p className="mt-3"><ProvenanceNote p={v("S13")} d={d} /></p>
        <div className="mt-4"><Notice tone="warning" title="This prototype does not reproduce the UPM logo">The official logo and colour specifications should be supplied by UPM&apos;s corporate communications office. The red (#CA0026) and grey (#8A9396) used here were supplied by the project owner as UPM&apos;s official colours.</Notice></div>
      </Section>

      <Section title="Leadership and governance" id="leadership">
        <p className="max-w-3xl text-ink-muted">UPM&apos;s public site lists pages for the Chancellor, Pro Chancellor, Board of Directors, University Management, Principal Officers, the Vice-Chancellor and Deputy Vice-Chancellors. Names are not reproduced here because they change and were not verified for this prototype.</p>
        <p className="mt-3"><ExternalLink href="https://spel.upm.edu.my/about_us/leadership-14891">Leadership on the official site</ExternalLink></p>
      </Section>

      <Section title="Facts, figures and publications" id="facts">
        <ul className={grid}>
          <li><Card title="Prospectus 2026–2027 (PDF)" href="https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf" external>Linked from the official sitemap. Not reviewed for this prototype.</Card></li>
          <li><Card title="Facts & Figures 2026 (PDF)" href="https://pspk.upm.edu.my/upload/dokumen/20260715101043FACT_AND_FIGURES_2026_JULY_UPDATE.pdf" external>Linked from the official sitemap. Statistics will be shown here once verified.</Card></li>
          <li><Card title="Campuses and contact" href={href(locale, "/contact")}>UPM, 43400 UPM Serdang, Selangor Darul Ehsan, Malaysia. The Bintulu Sarawak Campus hosts two faculties and the Institut Ekosains Borneo.</Card></li>
        </ul>
        <p className="mt-3"><ProvenanceNote p={v("S04", "S05", "S12")} d={d} /></p>
      </Section>
    </>
  );
}
