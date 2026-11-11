import Link from "next/link";
import type { ReactNode } from "react";

/** Light aurora page header with a large display title. */
export function PageHeader({ title, intro, eyebrow, children }: { title: string; intro?: ReactNode; eyebrow?: string; children?: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute -left-32 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-200/60 blur-3xl animate-float" />
      <div aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-[#cfe6d6]/70 blur-3xl animate-float-slow" />
      <div className="container-page pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="animate-rise">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 backdrop-blur">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-600" />{eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl text-4xl text-ink md:text-6xl">{title}</h1>
          {intro && <div className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">{intro}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}

export function Section({ title, id, children, intro, eyebrow, tone = "plain" }: { title: string; id?: string; children: ReactNode; intro?: ReactNode; eyebrow?: string; tone?: "plain" | "glass" }) {
  const hid = id ? `${id}-heading` : undefined;
  const body = (
    <>
      <div className="max-w-3xl">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">{eyebrow}</p>}
        <h2 id={hid} className="text-3xl text-ink md:text-4xl">{title}</h2>
        {intro && <div className="mt-3 text-ink-muted">{intro}</div>}
      </div>
      <div className="mt-8">{children}</div>
    </>
  );
  return (
    <section id={id} aria-labelledby={hid} className="container-page scroll-mt-28 py-10 md:py-16">
      {tone === "glass" ? <div className="glass rounded-[1.75rem] p-6 md:p-10">{body}</div> : body}
    </section>
  );
}

export function Card({ title, href, children, meta, external, icon }: { title: string; href?: string; children?: ReactNode; meta?: ReactNode; external?: boolean; icon?: ReactNode }) {
  const heading = href ? (
    external ? (
      <a href={href} rel="noopener noreferrer" target="_blank" className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
        {title}<span className="sr-only"> (opens in a new tab)</span>
      </a>
    ) : (
      <Link href={href} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">{title}</Link>
    )
  ) : title;
  return (
    <article className={`group glass relative flex h-full flex-col rounded-card p-6 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand-700 ${href ? "lift" : ""}`}>
      {icon && <div aria-hidden="true" className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 text-white shadow-md shadow-brand-900/20">{icon}</div>}
      <h3 className="pr-8 text-lg font-semibold leading-snug text-ink">{heading}</h3>
      {href && (
        <span aria-hidden="true" className="absolute right-5 top-6 grid h-8 w-8 place-items-center rounded-full border border-line bg-white text-brand-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-brand-700 group-hover:bg-brand-700 group-hover:text-white">
          {external ? "↗" : "→"}
        </span>
      )}
      {children && <div className="mt-2 text-sm leading-relaxed text-ink-muted">{children}</div>}
      {meta && <div className="relative z-10 mt-auto pt-5">{meta}</div>}
    </article>
  );
}

export function ButtonLink({ href, children, variant = "primary", external }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "inverse" | "ghost-dark"; external?: boolean }) {
  const cls = {
    primary: "bg-gradient-to-b from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-900/25 hover:shadow-xl hover:shadow-brand-900/30 hover:brightness-110",
    secondary: "glass text-brand-800 hover:bg-white",
    inverse: "bg-white text-brand-800 shadow-lg shadow-black/20 hover:bg-brand-50",
    "ghost-dark": "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  }[variant];
  const className = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-semibold no-underline transition-all duration-300 ${cls}`;
  return external ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>
  ) : (
    <Link href={href} className={className}>{children} <span aria-hidden="true">→</span></Link>
  );
}

export function Notice({ tone = "info", title, children }: { tone?: "info" | "warning" | "success" | "error"; title: string; children?: ReactNode }) {
  const cls = {
    info: "border-sky-200 bg-sky-50/85 [--dot:var(--color-sky-700)]",
    warning: "border-[#f0d3a8] bg-demo-bg/90 [--dot:#8a4b00]",
    success: "border-[#bcdcc6] bg-campus-50/90 [--dot:#2f6b3f]",
    error: "border-brand-200 bg-brand-50/90 [--dot:#9a1124]",
  }[tone];
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 backdrop-blur ${cls}`} role={tone === "error" ? "alert" : undefined}>
      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--dot)]" />
      <div>
        <p className="font-semibold text-ink">{title}</p>
        {children && <div className="mt-1 text-sm text-ink">{children}</div>}
      </div>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="glass rounded-card border-dashed p-10 text-center">
      <div aria-hidden="true" className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-xl text-brand-700">∅</div>
      <p className="text-lg font-semibold">{title}</p>
      {children && <div className="mt-2 text-ink-muted">{children}</div>}
    </div>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 transition-colors hover:text-brand-900 hover:decoration-brand-700">
      {children}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span>
    </a>
  );
}

export const grid = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";

/** Simple line icons (decorative). */
export const Icon = {
  cap: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></svg>,
  book: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M4 19V5" /></svg>,
  globe: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>,
  user: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>,
  brief: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>,
  flask: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v6L4 19a1 1 0 001 2h14a1 1 0 001-2l-6-10V3" /></svg>,
  hand: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11l4-4 3 3 3-3 3 3-7 7-6-6z" /><path d="M3 14l4 4" /></svg>,
  pin: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  leaf: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19l7-7" /></svg>,
};
