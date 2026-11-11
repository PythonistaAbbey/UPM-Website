import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { isLocale, locales, t } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PrototypeBanner } from "@/components/PrototypeBanner";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = t(isLocale(locale) ? locale : "en");
  return {
    title: { default: `${d.siteName} — ${d.banner}`, template: `%s · ${d.siteName} (prototype)` },
    description: d.bannerDetail,
    robots: { index: false, follow: false },
    alternates: { languages: { en: "/en", ms: "/ms" } },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-white">
        <a href="#main" className="sr-only z-50 bg-brand-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-2 focus:top-2">{d.skip}</a>
        <PrototypeBanner locale={locale} />
        <SiteHeader locale={locale} />
        {locale === "ms" && (
          <p className="container-page pt-4 text-sm text-ink-muted">{d.untranslated} <span lang="en">(Page content is in English only in this prototype; navigation and interface are bilingual.)</span></p>
        )}
        {/* Page body content is English-only in this release, so it is marked lang="en" on /ms routes. */}
        <main id="main" tabIndex={-1} lang={locale === "ms" ? "en" : undefined} className="outline-none">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
