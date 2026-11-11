import type { Metadata } from "next";
import { href, resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { media } from "@/data/media";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink, Card, ExternalLink, PageHeader, Section, grid } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";

export const metadata: Metadata = { title: "Campus life" };

const colleges = [
  ["Kolej Tun Dr Ismail", "http://www.ktdi.upm.edu.my"], ["Kolej Canselor", "http://www.kc.upm.edu.my"],
  ["Kolej Sultan Alaeddin Suleiman Shah", "http://www.kosass.upm.edu.my"], ["Kolej Pendeta Za'ba", "http://www.kpz.upm.edu.my"],
  ["Kolej Sepuluh", "http://www.k10.upm.edu.my"], ["Kolej Dua Belas", "http://www.k12.upm.edu.my"],
  ["Kolej Tan Sri Aishah Ghani", "https://ktag.upm.edu.my"], ["Kolej Empat Belas", "http://www.k14.upm.edu.my"],
  ["Kolej Tan Sri Mustaffa Babjee", "https://kmb.upm.edu.my"], ["Kolej Sri Rajang (Bintulu)", "https://btu.upm.edu.my/mengenai_upmkb/kolej_sri_rajang-13010"],
];

export default async function CampusLife({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.campus }]} />
      <PageHeader image={media.canopy} eyebrow={d.nav.campus} title="Campus life" intro="Where to live, how to get support, and what to do on campus.">
        <div className="mt-6"><ButtonLink href={href(locale, "/campus-life/map")}>Open the campus map</ButtonLink></div>
      </PageHeader>

      <Section title="Accommodation" id="accommodation">
        <p className="max-w-3xl text-ink-muted">Student housing is managed by the Housing and Placement Division, which also covers off-campus students and the UPM Studio and Guest House. College names differ slightly between UPM&apos;s unit list and the housing site; the list below follows the unit list.</p>
        <ul className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">{colleges.map(([n, u]) => <li key={n}><ExternalLink href={u!}>{n}</ExternalLink></li>)}</ul>
        <p className="mt-4"><ExternalLink href="https://bpp.upm.edu.my/">Housing and Placement Division</ExternalLink></p>
        <p className="mt-3"><ProvenanceNote p={{ status: "verified", sources: ["S05", "S31"], checked: "2026-11-11" }} d={d} /></p>
      </Section>

      <div className="border-y border-white/70 bg-white/45">
        <Section title="Support and wellbeing" id="support">
          <ul className={grid}>
            <li><Card title="Student Affairs Division" href="https://hep.upm.edu.my/" external>Student organisations, activities, FAQs and the student directory.</Card></li>
            <li><Card title="Counselling" href="http://www.bkupm.upm.edu.my/" external>University counselling services.</Card></li>
            <li><Card title="University Health" href="http://www.pku.upm.edu.my" external>Campus health services.</Card></li>
            <li><Card title="Auxiliary Police and Security (APSeC)" href="https://apsec.upm.edu.my/" external>Campus safety. 24-hour lines: 03-9769 4999 / 03-9769 1399 / 03-9769 1999.</Card></li>
            <li><Card title="Co-Curriculum and Student Development" href="https://pkpp.upm.edu.my/" external>Co-curricular courses and student development.</Card></li>
            <li><Card title="Sports Academy" href="http://www.sukan.upm.edu.my" external>Sport and recreation.</Card></li>
          </ul>
          <p className="mt-3"><ProvenanceNote p={{ status: "verified", sources: ["S05", "S29", "S30"], checked: "2026-11-11" }} d={d} /></p>
        </Section>
      </div>

      <Section title="Libraries" id="libraries">
        <p className="max-w-3xl text-ink-muted">The Sultan Abdul Samad Library has section libraries for Engineering and Architecture, Medicine and Health Sciences, Veterinary Medicine and UPM Sarawak. Discussion rooms are booked through LibRooms, and the library says users need the PutraVID app to access its facilities.</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <ExternalLink href="https://lib.upm.edu.my/">Sultan Abdul Samad Library</ExternalLink>
          <ExternalLink href="https://virtualtour.upm.edu.my/librarySAS360tour/">Library virtual tour</ExternalLink>
        </div>
        <p className="mt-3"><ProvenanceNote p={{ status: "verified", sources: ["S29"], checked: "2026-11-11" }} d={d} /></p>
      </Section>

      <Section title="Arts, culture and faith" id="culture">
        <ul className={grid}>
          <li><Card title="Sultan Salahuddin Abdul Aziz Shah Arts and Cultural Centre" href="http://www.pkkssaas.upm.edu.my" external>Home of the Grand Hall, used for convocation.</Card></li>
          <li><Card title="University Islamic Centre" href="http://www.pic.upm.edu.my" external>Religious and community programmes.</Card></li>
          <li><Card title="Radio Putra" href="http://www.putrafm.upm.edu.my" external>Campus radio.</Card></li>
        </ul>
      </Section>
    </>
  );
}
