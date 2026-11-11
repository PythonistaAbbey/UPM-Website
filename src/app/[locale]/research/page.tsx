import type { Metadata } from "next";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink, Card, ExternalLink, PageHeader, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";

export const metadata: Metadata = { title: "Research and innovation" };
const v = (...s: string[]) => ({ status: "verified" as const, sources: s, checked: "2026-11-11" });

const institutes = [
  ["Institute of Bioscience", "http://www.ibs.upm.edu.my"], ["Institute of Plantation Studies", "http://www.ikp.upm.edu.my"],
  ["Institute of Tropical Agriculture and Food Security (ITAFoS)", "http://www.itafos.upm.edu.my"], ["Institute for Social Science Studies (IPSAS)", "http://www.ipsas.upm.edu.my"],
  ["Institute of Tropical Forestry and Forest Products (INTROP)", "http://www.introp.upm.edu.my"], ["Halal Products Research Institute", "http://www.halal.upm.edu.my"],
  ["Institute for Mathematical Research (INSPEM)", "http://www.inspem.upm.edu.my"], ["Malaysian Research Institute on Ageing (MyAgeing)", "http://www.myageing.upm.edu.my/"],
  ["International Institute of Aquaculture and Aquatic Sciences (I-AQUAS)", "https://i-aquas.upm.edu.my/"], ["Institute of Nanoscience and Nanotechnology (ION2)", "https://ion2.upm.edu.my/"],
  ["Institut Ekosains Borneo (Bintulu)", "https://btu.upm.edu.my/mengenai_upmkb/institut_ekosains_borneo-13009"],
];

export default async function Research({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.research }]} />
      <PageHeader eyebrow={d.nav.research} title="Research and innovation" intro="Research centres, institutes and routes to commercialisation, gathered in one place.">
        <div className="mt-6"><ButtonLink href={href(locale, "/research/discover")}>Find researchers and projects</ButtonLink></div>
      </PageHeader>

      <Section title="Research management" id="management">
        <ul className={grid}>
          <li><Card title="Research Management Centre (RMC)" href="https://rmc.upm.edu.my/" external>Organises research programmes for the university and lecturers. Recent items include a National Audit Department audit of R&amp;D&amp;C&amp;I programmes (11 September 2025) and monthly lists of high-impact publications.</Card></li>
          <li><Card title="UPM Institutional Repository" href="http://www.psasir.upm.edu.my/" external>Open repository of UPM research outputs, run with the library. Not audited: automated access is disallowed.</Card></li>
          <li><Card title="PutraRepo research data" href="http://putrarepo.upm.edu.my/index.php" external>UPM research data repository.</Card></li>
        </ul>
        <p className="mt-3"><ProvenanceNote p={v("S24", "S29")} d={d} /></p>
      </Section>

      <div className="bg-campus-50">
        <Section title="Innovation and commercialisation" id="innovation">
          <p className="max-w-3xl text-ink-muted">Putra Science Park handles intellectual property (patents, copyright, trademarks, industrial designs, trade secrets and new plant varieties), reviews applications for filing with MyIPO or international bodies, and promotes technology transfer, licensing and industry collaboration.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <ExternalLink href="https://sciencepark.upm.edu.my/produk_upm-3525">UPM innovations in the market</ExternalLink>
            <ExternalLink href="https://sciencepark.upm.edu.my/industry/training_offer-6337">Training offers for industry</ExternalLink>
          </div>
          <p className="mt-3"><ProvenanceNote p={v("S25")} d={d} /></p>
        </Section>
      </div>

      <Section title="Artificial intelligence at UPM" id="ai">
        <p className="max-w-3xl text-ink-muted">The UPM AI Hub presents AI projects across agriculture, education, health and administration, with high-performance computing facilities, training, guidelines and tools. Initiatives listed include a 5G-based AI drone sandbox developed with DNB and an AI for Research module in the graduate research methods course.</p>
        <p className="mt-3"><ExternalLink href="https://ai.upm.edu.my">UPM AI Hub</ExternalLink></p>
        <p className="mt-3"><ProvenanceNote p={v("S28")} d={d} /></p>
      </Section>

      <Section title="Research institutes" id="institutes">
        <ul className="grid gap-3 md:grid-cols-2">{institutes.map(([n, u]) => <li key={n}><ExternalLink href={u!}>{n}</ExternalLink></li>)}</ul>
        <p className="mt-3"><ProvenanceNote p={v("S05")} d={d} /></p>
      </Section>
    </>
  );
}
