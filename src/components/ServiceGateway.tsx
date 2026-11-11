import type { Locale, ServiceLink } from "@/lib/types";
import { t } from "@/lib/i18n";
import { ProvenanceNote } from "./Provenance";

export function ServiceGateway({ list, locale }: { list: ServiceLink[]; locale: Locale }) {
  const d = t(locale);
  const cats = Array.from(new Set(list.map((s) => s.category)));
  return (
    <div className="space-y-10">
      <nav aria-label="Service categories">
        <ul className="flex flex-wrap gap-2">{cats.map((c) => <li key={c}><a href={`#${slug(c)}`} className="inline-block rounded-full border border-line px-3 py-1 text-sm font-semibold hover:border-brand-700">{c}</a></li>)}</ul>
      </nav>
      {cats.map((c) => (
        <section key={c} id={slug(c)} aria-labelledby={`${slug(c)}-h`} className="scroll-mt-24">
          <h2 id={`${slug(c)}-h`} className="text-2xl font-bold">{c}</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {list.filter((s) => s.category === c).map((s) => (
              <li key={s.id} className="relative flex flex-col rounded-card border border-line p-5 hover:shadow-md">
                <h3 className="font-semibold">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 hover:underline">
                    {s.name}<span className="sr-only"> ({d.opensExternal}, opens in a new tab)</span> <span aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{s.description}</p>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                  {s.requiresLogin && <li className="rounded-full bg-surface-alt px-2.5 py-0.5 font-semibold">{d.loginRequired}</li>}
                  {s.insecureLink && <li className="rounded-full bg-demo-bg px-2.5 py-0.5 font-semibold text-demo">{d.insecure}</li>}
                </ul>
                <p className="mt-auto pt-3"><ProvenanceNote p={s.provenance} d={d} /></p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
