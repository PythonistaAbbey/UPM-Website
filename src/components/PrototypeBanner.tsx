import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

export function PrototypeBanner({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <div role="note" aria-label="Prototype notice" className="relative z-[51] bg-[#fff4e5] text-[#5c3200]">
      <p className="container-page flex flex-wrap items-center gap-x-2 py-2 text-[0.8rem] leading-snug">
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-[#c77700]" />
        <strong className="font-bold">{d.banner}.</strong> <span>{d.bannerDetail}</span>
      </p>
    </div>
  );
}
