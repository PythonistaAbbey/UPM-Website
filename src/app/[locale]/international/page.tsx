import type { Metadata } from "next";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, ExternalLink, Notice, PageHeader, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";

export const metadata: Metadata = { title: "International student hub" };

export default async function International({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.international }]} />
      <PageHeader eyebrow={d.nav.international} title="International student hub" intro="Admissions, arrival and support for students coming to UPM from outside Malaysia." />

      <Section title="Apply to UPM" id="apply">
        <ul className={grid}>
          <li><Card title="Undergraduate entry requirements" href="https://akademik.upm.edu.my/kemasukan_pelajar_antarabangsa/bacelor/general_entry_requirements-66325" external>Published by the Division of Admission. This page could not be read during the audit.</Card></li>
          <li><Card title="Undergraduate application process" href="https://akademik.upm.edu.my/kemasukan_pelajar_antarabangsa/bacelor/application_process-66304" external>Step-by-step process for international undergraduate applicants.</Card></li>
          <li><Card title="Postgraduate study" href="https://sgs.upm.edu.my/" external>Research and coursework programmes through the School of Graduate Studies.</Card></li>
          <li><Card title="Find a programme" href={href(locale, "/study/programmes")}>Search UPM&apos;s programme list.</Card></li>
        </ul>
        <p className="mt-3"><ProvenanceNote p={{ status: "verified", sources: ["S08", "S15"], checked: "2026-11-11" }} d={d} /></p>
      </Section>

      <div className="bg-surface-alt">
        <Section title="Visas and student passes" id="visa">
          <Notice tone="warning" title="No verified visa guidance is available yet">
            UPM&apos;s Visa &amp; Pass page had a heading but no content when it was checked on 11 November 2026 (source S14). This prototype will not give visa or immigration advice. Contact Putra International Centre (i-PUTRA) and check official Malaysian government sources.
          </Notice>
          <p className="mt-4"><ExternalLink href="https://intl.upm.edu.my/">Putra International Centre (i-PUTRA)</ExternalLink></p>
        </Section>
      </div>

      <Section title="Fees and payment" id="fees">
        <p className="text-ink-muted">UPM links to Flywire for international fee payments. Fee amounts were not verified for this prototype.</p>
        <p className="mt-3"><ExternalLink href="https://landing-pages.flywire.com/landing/upm">UPM Flywire</ExternalLink></p>
        <p className="mt-3"><ProvenanceNote p={{ status: "verified", sources: ["S04"], checked: "2026-11-11" }} d={d} /></p>
      </Section>

      <Section title="Living at UPM" id="living">
        <ul className={grid}>
          <li><Card title="Accommodation" href={href(locale, "/campus-life#accommodation")}>Residential colleges and the Housing and Placement Division.</Card></li>
          <li><Card title="Campus map" href={href(locale, "/campus-life/map")}>Find buildings and services before you arrive.</Card></li>
          <li><Card title="Contact i-PUTRA" href={href(locale, "/contact?topic=international")}>Send an enquiry routed to the international office.</Card></li>
        </ul>
      </Section>

      <Section title="Content still needed from the owner" id="gaps">
        <ul className="list-disc space-y-1 pl-5 text-ink-muted">
          <li>Arrival and orientation guidance, with dates</li>
          <li>Student pass process and responsible agencies, with dated sources</li>
          <li>Scholarships open to international students</li>
          <li>Mobility and exchange programmes, and international partnerships</li>
        </ul>
      </Section>
    </>
  );
}
