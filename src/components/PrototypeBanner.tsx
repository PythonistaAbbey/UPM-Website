import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

export function PrototypeBanner({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <div role="note" aria-label="Prototype notice" className="relative z-[51] bg-[#fff4e5] text-[#5c3200]">
      <p className="container-page py-2 text-[0.8rem] leading-snug">
        <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-full bg-[#c77700] align-middle" />
        <strong className="font-bold">{d.banner}.</strong>{" "}
        {/* The detail is repeated in the footer; on phones it is hidden here to keep the notice to one or two lines. */}
        <span className="hidden sm:inline">{d.bannerDetail}</span>
      </p>
    </div>
  );
}
