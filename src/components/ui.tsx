import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({ title, intro, eyebrow, children }: { title: string; intro?: ReactNode; eyebrow?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-line bg-surface-alt">
      <div className="container-page py-10 md:py-14">
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">{eyebrow}</p>}
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        {intro && <div className="mt-4 max-w-3xl text-lg text-ink-muted">{intro}</div>}
        {children}
      </div>
    </div>
  );
}

export function Section({ title, id, children, intro }: { title: string; id?: string; children: ReactNode; intro?: ReactNode }) {
  const hid = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={hid} className="container-page scroll-mt-24 py-10 md:py-14">
      <h2 id={hid} className="text-2xl font-bold md:text-3xl">{title}</h2>
      {intro && <div className="mt-2 max-w-3xl text-ink-muted">{intro}</div>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Card({ title, href, children, meta, external }: { title: string; href?: string; children?: ReactNode; meta?: ReactNode; external?: boolean }) {
  const heading = href ? (
    external ? (
      <a href={href} rel="noopener noreferrer" target="_blank" className="after:absolute after:inset-0 hover:underline">
        {title}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span>
      </a>
    ) : (
      <Link href={href} className="after:absolute after:inset-0 hover:underline">{title}</Link>
    )
  ) : title;
  return (
    <article className="relative flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-sm transition-shadow focus-within:shadow-md hover:shadow-md">
      <h3 className="text-lg font-semibold text-ink">{heading}</h3>
      {children && <div className="mt-2 text-sm text-ink-muted">{children}</div>}
      {meta && <div className="relative z-10 mt-auto pt-4">{meta}</div>}
    </article>
  );
}

export function ButtonLink({ href, children, variant = "primary", external }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "inverse"; external?: boolean }) {
  const cls = {
    primary: "bg-brand-700 text-white hover:bg-brand-800",
    secondary: "border border-brand-700 text-brand-700 hover:bg-brand-50",
    inverse: "bg-white text-brand-800 hover:bg-brand-50",
  }[variant];
  const className = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold no-underline transition-colors ${cls}`;
  return external ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export function Notice({ tone = "info", title, children }: { tone?: "info" | "warning" | "success" | "error"; title: string; children?: ReactNode }) {
  const cls = {
    info: "border-sky-700 bg-sky-50",
    warning: "border-[#8a4b00] bg-demo-bg",
    success: "border-campus-700 bg-campus-50",
    error: "border-brand-700 bg-brand-50",
  }[tone];
  return (
    <div className={`rounded-lg border-l-4 p-4 ${cls}`} role={tone === "error" ? "alert" : undefined}>
      <p className="font-semibold">{title}</p>
      {children && <div className="mt-1 text-sm">{children}</div>}
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-line p-8 text-center">
      <p className="text-lg font-semibold">{title}</p>
      {children && <div className="mt-2 text-ink-muted">{children}</div>}
    </div>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline hover:text-brand-900">
      {children}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span>
    </a>
  );
}

export const grid = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";
