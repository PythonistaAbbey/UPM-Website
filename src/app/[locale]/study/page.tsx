import type { Metadata } from "next";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { media } from "@/data/media";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink, Card, ExternalLink, Notice, PageHeader, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";
import { programmes } from "@/data/programmes";

export const metadata: Metadata = { title: "Study at UPM" };

const pathways = [
  { id: "malaysian-ug", title: "Malaysian undergraduates", body: "Apply through the UPUOnline system, managed by the IPTA Student Admission Division (BKPA) of the Ministry of Higher Education. This covers bachelor's degrees, diplomas and the Foundation in Science.", link: { label: "UPU (Ministry of Higher Education)", url: "http://upu.moe.gov.my/" } },
  { id: "direct", title: "Direct application to UPM", body: "A full-fee channel, without subsidies, for candidates with strong results who did not receive an offer for their preferred UPU programme. UPM's page names it both the 'Alternative Channel' and the 'Inclusive Channel' and describes its scope differently in two places, so confirm the current scope before applying.", link: { label: "Direct channel portal", url: "http://intake.upm.edu.my/alternatif/" } },
  { id: "foundation", title: "Foundation studies", body: "The Foundation in Science is offered through the Foundation Studies for Science centre. Malaysian applicants use UPUOnline or the direct channel.", link: { label: "Foundation Studies for Science", url: "http://www.asasi.upm.edu.my" } },
  { id: "distance", title: "Distance learning", body: "Seven bachelor's programmes with intakes in June and December. Applications are accepted year-round online through UPMET, with learning on the PutraODL portal and weekly live sessions.", link: { label: "UPMET applications", url: "https://upmet.upmholdings.com.my/" } },
  { id: "international-ug", title: "International undergraduates", body: "Apply online. UPM publishes general entry requirements, how to apply and the application process for international applicants.", link: { label: "How to apply (international)", url: "https://akademik.upm.edu.my/kemasukan_pelajar_antarabangsa/bacelor/how_to_apply-66344" } },
  { id: "pg-research", title: "Postgraduate by research", body: "Master of Science, Master of Arts, Master of Veterinary Science, Doctor of Philosophy and Doctor of Engineering, through the School of Graduate Studies.", link: { label: "School of Graduate Studies", url: "https://sgs.upm.edu.my/" } },
  { id: "pg-coursework", title: "Postgraduate by coursework", body: "UPM's page lists over 78 coursework masters programmes (minimum 40 credit hours) and the Doctor of Public Health. The individual programme list is not yet in this prototype.", link: { label: "Prospective postgraduate students", url: "https://sgs.upm.edu.my/prospective_students-2964" } },
  { id: "pg-other", title: "Industry and collaborative programmes", body: "Master or PhD by Industry, and International Collaborative Programmes.", link: { label: "School of Graduate Studies", url: "https://sgs.upm.edu.my/" } },
];

export default async function Study({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  const count = (lvl: string) => programmes.filter((p) => p.level === lvl).length;
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.study }]} />
      <PageHeader image={media.library} eyebrow={d.nav.study} title="Study at UPM" intro="Find a programme, choose your route in, and apply through the official system.">
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={href(locale, "/study/programmes")}>Find a programme</ButtonLink>
          <ButtonLink href={href(locale, "/faculties")} variant="secondary">Browse faculties</ButtonLink>
        </div>
      </PageHeader>

      <Section title="Programmes by level" id="levels">
        <ul className={grid}>
          <li><Card title={`Foundation (${count("foundation")})`} href={href(locale, "/study/programmes?level=foundation")}>Pre-university study.</Card></li>
          <li><Card title={`Undergraduate (${count("undergraduate")})`} href={href(locale, "/study/programmes?level=undergraduate")}>Bachelor&apos;s degrees and first professional degrees, on campus and by distance learning.</Card></li>
          <li><Card title={`Postgraduate (${count("postgraduate")} research qualifications)`} href={href(locale, "/study/programmes?level=postgraduate")}>Research degrees. Coursework programmes still to be added.</Card></li>
        </ul>
      </Section>

      <div className="border-y border-white/70 bg-white/45">
        <Section title="Ways to apply" id="pathways" intro="From UPM's How to Apply page. Requirements, deadlines and fees are not reproduced here: always check the official page.">
          <ul className="grid gap-5 md:grid-cols-2">
            {pathways.map((p) => (
              <li key={p.id} id={p.id} className="glass rounded-3xl p-5">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.body}</p>
                <p className="mt-3 text-sm"><ExternalLink href={p.link.url}>{p.link.label}</ExternalLink></p>
              </li>
            ))}
          </ul>
          <p className="mt-4"><ProvenanceNote p={{ status: "verified", sources: ["S07", "S08"], checked: "2026-11-11" }} d={d} /></p>
        </Section>
      </div>

      <Section title="Fees and scholarships" id="fees">
        <Notice tone="warning" title="Fee information is not shown in this prototype">
          Tuition fees were not verified during the audit. See UPM&apos;s Scholarship &amp; Financial Assistance page and the{" "}
          <ExternalLink href="https://sgs.upm.edu.my/financial_assistance_scholarships-1893">SGS financial assistance page</ExternalLink>.
        </Notice>
      </Section>
    </>
  );
}
