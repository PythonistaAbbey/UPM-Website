import Link from "next/link";
import type { Locale } from "@/lib/types";
import { href, t } from "@/lib/i18n";

export function Breadcrumbs({ locale, items }: { locale: Locale; items: { label: string; path?: string }[] }) {
  const d = t(locale);
  const all = [{ label: d.home, path: "/" }, ...items];
  return (
    <nav aria-label={d.breadcrumb} lang={locale} className="container-page pt-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-ink-muted">
        {all.map((it, i) => {
          const last = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last || !it.path ? (
                <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-ink" : ""}>{it.label}</span>
              ) : (
                <Link href={href(locale, it.path)} className="underline hover:text-brand-700">{it.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
