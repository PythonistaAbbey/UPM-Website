import Link from "next/link";
import type { Locale } from "@/lib/types";
import { href, t } from "@/lib/i18n";
import { primaryNav } from "@/lib/nav";
import { Emblem } from "./SiteHeader";

export function SiteFooter({ locale }: { locale: Locale }) {
  const d = t(locale);
  const ms = locale === "ms";
  const col = "text-xs font-semibold uppercase tracking-[0.16em] text-[#c9ced0]";
  const link = "inline-flex min-h-6 items-center text-[0.95rem] text-white/85 transition hover:text-white hover:underline";
  return (
    <footer className="mesh-charcoal on-dark relative mt-24 overflow-hidden text-white">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-page relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-4"><Emblem size="lg" /><p className="font-display text-2xl font-semibold">{d.siteName}</p></div>
            <p className="mt-6 font-display text-3xl leading-tight md:text-4xl">{ms ? "Satu pintu masuk untuk pengajian, penyelidikan dan kehidupan kampus." : "One front door to study, research and campus life."}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href(locale, "/study/programmes")} className="inline-flex min-h-12 items-center rounded-full bg-brand-600 px-6 font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-brand-700">{ms ? "Cari program" : "Find a programme"} →</Link>
            <Link href={href(locale, "/contact")} className="inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 font-semibold text-white backdrop-blur transition hover:bg-white/15">{d.quick.contact}</Link>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer">
            <h2 className={col}>{ms ? "Teroka" : "Explore"}</h2>
            <ul className="mt-4 space-y-2">{primaryNav.map((n) => <li key={n.key}><Link href={href(locale, n.path)} className={link}>{d.nav[n.key]}</Link></li>)}</ul>
          </nav>
          <div>
            <h2 className={col}>{ms ? "Perkhidmatan" : "Services"}</h2>
            <ul className="mt-4 space-y-2">
              <li><Link href={href(locale, "/services/students")} className={link}>{d.quick.students}</Link></li>
              <li><Link href={href(locale, "/services/staff")} className={link}>{d.quick.staff}</Link></li>
              <li><Link href={href(locale, "/campus-life/map")} className={link}>{ms ? "Peta kampus" : "Campus map"}</Link></li>
              <li><Link href={href(locale, "/search")} className={link}>{d.quick.search}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className={col}>{ms ? "Hubungi UPM" : "Contact UPM"}</h2>
            <address className="mt-4 space-y-2 text-[0.95rem] not-italic text-white/85">
              <p>Universiti Putra Malaysia<br />43400 UPM Serdang<br />Selangor Darul Ehsan, Malaysia</p>
              <p><a className={link} href="tel:+60397691000">+603-9769 1000</a></p>
              <p><a className={link} href="mailto:pspk@upm.edu.my">pspk@upm.edu.my</a></p>
              <p className="text-sm text-white/70">{ms ? "Pusat Kawalan 24 jam" : "24-hour Control Centre"}: 03-9769 7990</p>
            </address>
          </div>
          <div>
            <h2 className={col}>{ms ? "Kampus dan saluran rasmi" : "Campuses and official channels"}</h2>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-white/85">
              <li>{ms ? "Kampus Serdang, Selangor" : "Serdang Campus, Selangor"}</li>
              <li>{ms ? "Kampus Bintulu, Sarawak" : "Bintulu Campus, Sarawak"}</li>
              <li className="pt-2"><a href="https://www.upm.edu.my/" className={link} rel="noopener noreferrer" target="_blank">{d.footer.official} ↗<span className="sr-only"> (opens in a new tab)</span></a></li>
              <li className="text-sm text-white/70">{ms ? "Pautan media sosial rasmi UPM belum disahkan untuk prototaip ini." : "UPM's official social media links are not yet verified for this prototype."}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{d.footer.note}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a className="inline-flex min-h-6 items-center hover:text-white hover:underline" href="https://github.com/PythonistaAbbey/UPM-Website/blob/main/SOURCE_REGISTER.md" rel="noopener noreferrer" target="_blank">{d.footer.sources}<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a className="inline-flex min-h-6 items-center hover:text-white hover:underline" href="https://github.com/PythonistaAbbey/UPM-Website/blob/main/MEDIA_REGISTER.md" rel="noopener noreferrer" target="_blank">{ms ? "Daftar imej" : "Image register"}<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a className="inline-flex min-h-6 items-center hover:text-white hover:underline" href="https://spel.upm.edu.my/footnote/privacy_statement-29949" rel="noopener noreferrer" target="_blank">{ms ? "Kenyataan privasi UPM" : "UPM privacy statement"}<span className="sr-only"> (opens in a new tab)</span></a></li>
          </ul>
        </div>
        <p className="pb-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#e9b949]">{d.banner}</p>
      </div>
    </footer>
  );
}
