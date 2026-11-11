import type { Metadata } from "next";
import { Suspense } from "react";
import { resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader, Section } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { Directory } from "@/components/Directory";
import { ProvenanceNote } from "@/components/Provenance";

export const metadata: Metadata = { title: "Contact and enquiries" };

export default async function Contact({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.quick.contact }]} />
      <PageHeader title="Contact and enquiries" intro={<>Universiti Putra Malaysia, 43400 UPM Serdang, Selangor Darul Ehsan, Malaysia · +603-9769 1000 · <a className="underline" href="mailto:pspk@upm.edu.my">pspk@upm.edu.my</a>. <ProvenanceNote p={{ status: "verified", sources: ["S12"], checked: "2026-11-11" }} d={d} /></>} />
      <Section title="University directory" id="directory"><Directory /></Section>
      <div className="border-y border-white/70 bg-white/45">
        <Section title="Send an enquiry" id="enquiry">
          <div className="glass max-w-2xl rounded-3xl p-6 md:p-8">
            <Suspense fallback={<p role="status">{d.loading}</p>}><ContactForm /></Suspense>
          </div>
        </Section>
      </div>
    </>
  );
}
