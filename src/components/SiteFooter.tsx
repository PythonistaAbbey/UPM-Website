import Link from "next/link";
import type { Locale } from "@/lib/types";
import { href, t } from "@/lib/i18n";
import { primaryNav } from "@/lib/nav";

export function SiteFooter({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <footer className="mt-16 bg-ink text-white on-dark">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{d.siteName}</p>
          <p className="mt-2 text-sm text-gray-300">{d.footer.note}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {primaryNav.map((n) => (
              <li key={n.key}><Link href={href(locale, n.path)} className="hover:underline">{d.nav[n.key]}</Link></li>
            ))}
            <li><Link href={href(locale, "/services/students")} className="hover:underline">{d.quick.students}</Link></li>
            <li><Link href={href(locale, "/services/staff")} className="hover:underline">{d.quick.staff}</Link></li>
            <li><Link href={href(locale, "/contact")} className="hover:underline">{d.quick.contact}</Link></li>
            <li><Link href={href(locale, "/search")} className="hover:underline">{d.quick.search}</Link></li>
          </ul>
        </nav>
        <div className="space-y-2 text-sm">
          <p><a href="https://www.upm.edu.my/" className="underline" rel="noopener noreferrer" target="_blank">{d.footer.official}<span className="sr-only"> (opens in a new tab)</span></a></p>
          <p><a href="https://github.com/PythonistaAbbey/UPM-Website/blob/main/SOURCE_REGISTER.md" className="underline" rel="noopener noreferrer" target="_blank">{d.footer.sources}<span className="sr-only"> (opens in a new tab)</span></a></p>
        </div>
      </div>
      <div className="border-t border-white/20">
        <p className="container-page py-4 text-sm font-semibold">{d.banner}</p>
      </div>
    </footer>
  );
}
