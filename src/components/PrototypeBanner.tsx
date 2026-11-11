import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

export function PrototypeBanner({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <div role="note" aria-label="Prototype notice" className="bg-[#fff4e5] text-[#5c3200]">
      <p className="container-page py-2 text-sm">
        <strong className="font-bold">{d.banner}.</strong> <span>{d.bannerDetail}</span>
      </p>
    </div>
  );
}
