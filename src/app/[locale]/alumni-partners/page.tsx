import type { Metadata } from "next";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { media } from "@/data/media";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, PageHeader, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";

export const metadata: Metadata = { title: "Alumni and partners" };

export default async function Alumni({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.alumni }]} />
      <PageHeader image={media.graduation} eyebrow={d.nav.alumni} title="Alumni and partners" intro="Stay connected with UPM, and work with the university on research, teaching and community projects." />
      <Section title="For alumni" id="alumni">
        <ul className={grid}>
          <li><Card title="Alumni Relations Centre" href="https://alumni.upm.edu.my/" external>Runs the Alumni Information System, where alumni update their profiles, and connects alumni with UPM activities.</Card></li>
          <li><Card title="Awards and support for students" href="https://alumni.upm.edu.my/" external>The centre lists the YPR Gold Medal Award, YPR student loans and the Soh Kim Mee Scholarship.</Card></li>
          <li><Card title="Persatuan Alumni UPM" href="https://www.paupmnetwork.my/" external>The UPM alumni association.</Card></li>
        </ul>
        <p className="mt-3"><ProvenanceNote p={{ status: "verified", sources: ["S05", "S22"], checked: "2026-11-11" }} d={d} /></p>
      </Section>
      <div className="border-y border-white/70 bg-white/45">
        <Section title="For industry and community partners" id="partners">
          <ul className={grid}>
            <li><Card title="Centre for Industry Relations & Networking" href="http://www.cirnet.upm.edu.my/" external>Industry relations and networking.</Card></li>
            <li><Card title="Putra Science Park" href={href(locale, "/research#innovation")}>Licensing, technology transfer and training offers.</Card></li>
            <li><Card title="University Community Transformation Centre" href="http://www.uctc.upm.edu.my" external>Community engagement.</Card></li>
            <li><Card title="Endowment, waqf and zakat (WAZAN)" href="http://www.wazan.upm.edu.my/" external>Giving to UPM.</Card></li>
          </ul>
          <p className="mt-3"><ProvenanceNote p={{ status: "verified", sources: ["S04", "S05", "S25"], checked: "2026-11-11" }} d={d} /></p>
        </Section>
      </div>
    </>
  );
}
