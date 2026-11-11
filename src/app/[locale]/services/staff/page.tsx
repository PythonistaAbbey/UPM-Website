import type { Metadata } from "next";
import { resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice, PageHeader } from "@/components/ui";
import { ServiceGateway } from "@/components/ServiceGateway";
import { staffServices } from "@/data/services";

export const metadata: Metadata = { title: "Staff service gateway" };

export default async function Page({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.quick.staff }]} />
      <PageHeader title="Staff service gateway" intro="Links to UPM&apos;s existing systems, grouped by task. Sign-in happens only on the official system, never on this prototype." />
      <div className="container-page space-y-8 py-10">
        <Notice title="This gateway does not collect passwords">Each link opens the university&apos;s own system in a new tab. Links marked as insecure were published by UPM with http:// addresses and are listed for the integration register.</Notice>
        <ServiceGateway list={staffServices} locale={locale} />
      </div>
    </>
  );
}
