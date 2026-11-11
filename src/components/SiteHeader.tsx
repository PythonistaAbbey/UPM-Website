"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/types";
import { href, t } from "@/lib/i18n";
import { primaryNav } from "@/lib/nav";

function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  parts[1] = to;
  return parts.join("/") || `/${to}`;
}

export function Emblem({ size = "md" }: { size?: "md" | "lg" }) {
  const s = size === "lg" ? "h-14 w-14 text-2xl" : "h-11 w-11 text-xl";
  return (
    <span aria-hidden="true" className={`relative grid ${s} shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-display font-semibold text-white shadow-lg shadow-brand-900/30 ring-1 ring-white/30`}>
      <span className="absolute inset-x-0 top-0 h-1/2 bg-white/15" />
      <span className="relative">U</span>
    </span>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const d = t(locale);
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const other: Locale = locale === "en" ? "ms" : "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (path: string) => pathname === href(locale, path) || pathname.startsWith(href(locale, path) + "/");
  const quick = [
    { label: d.quick.students, path: "/services/students" },
    { label: d.quick.staff, path: "/services/staff" },
    { label: d.quick.contact, path: "/contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-white/60 bg-white/80 shadow-[0_8px_30px_-12px_rgb(51_5_12/0.18)] backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-white/55 backdrop-blur-md"}`}>
      <div className="container-page flex items-center gap-2 py-3 sm:gap-4">
        <Link href={href(locale)} className="flex shrink-0 items-center gap-3 rounded-2xl no-underline">
          <Emblem />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight text-ink">{d.siteName}</span>
            <span className="block text-xs font-medium text-ink-muted">{d.siteTag}</span>
          </span>
        </Link>

        <form role="search" action={href(locale, "/search")} className="ml-auto hidden w-full max-w-sm md:block">
          <label htmlFor="header-search" className="sr-only">{d.searchLabel}</label>
          <div className="flex items-center rounded-full border border-line bg-white/90 pl-4 shadow-inner shadow-black/[0.03] transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-100">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" /></svg>
            <input id="header-search" name="q" type="search" placeholder={d.searchPlaceholder}
              className="min-h-11 w-full bg-transparent px-3 text-[0.95rem] outline-none placeholder:text-ink-muted" />
            <button type="submit" className="m-1 min-h-9 rounded-full bg-brand-700 px-4 text-sm font-semibold text-white transition hover:bg-brand-800">{d.quick.search}</button>
          </div>
        </form>
        <nav aria-label={d.quickLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold">
            {quick.map((q) => (
              <li key={q.path}><Link href={href(locale, q.path)} className={`inline-flex min-h-10 items-center rounded-full px-3 transition hover:bg-brand-50 hover:text-brand-700 ${isActive(q.path) ? "text-brand-700" : "text-ink-muted"}`}>{q.label}</Link></li>
            ))}
          </ul>
        </nav>

        <Link href={switchLocalePath(pathname, other)} hrefLang={other} lang={other}
          className="ml-auto hidden min-h-10 items-center whitespace-nowrap rounded-full border border-line bg-white/80 px-4 text-sm font-semibold text-ink transition hover:border-brand-700 hover:text-brand-700 sm:inline-flex md:ml-0">
          <span className="sr-only">{d.language}: </span>{d.switchTo}
        </Link>
        <Link href={href(locale, "/search")} className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line bg-white/80 text-sm font-semibold sm:ml-0 sm:px-4 md:hidden"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" /></svg><span className="sr-only sm:not-sr-only">{d.quick.search}</span></Link>
        <button ref={buttonRef} type="button" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((o) => !o)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white lg:hidden">
          <span aria-hidden="true" className="flex w-4 flex-col gap-1">
            <span className={`h-0.5 rounded bg-white transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 rounded bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 rounded bg-white transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
          {open ? d.closeMenu : d.menu}
        </button>
      </div>

      <div className="hidden border-t border-black/5 lg:block">
        <div className="container-page flex items-center gap-6">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-0.5 py-2 xl:gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.key} className="group relative">
                    <Link href={href(locale, item.path)} aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[0.875rem] font-semibold transition-colors xl:px-4 xl:text-[0.93rem] ${active ? "bg-brand-600 text-white shadow-md shadow-brand-900/20" : "text-ink hover:bg-brand-50 hover:text-brand-700"}`}>
                      {d.nav[item.key]}
                      {item.children.length > 0 && <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>}
                    </Link>
                    {item.children.length > 0 && (
                      <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 translate-y-1 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <div className="glass w-80 rounded-3xl p-5">
                          <p className="font-display text-lg font-semibold text-ink">{d.nav[item.key]}</p>
                          <p className="mt-1 text-sm text-ink-muted">{locale === "ms" ? item.blurbMs : item.blurb}</p>
                          <ul className="mt-4 space-y-1">
                            {item.children.map((c) => (
                              <li key={c.path}>
                                <Link href={href(locale, c.path)} className="flex min-h-10 items-center justify-between rounded-xl px-3 text-sm font-semibold text-ink transition hover:bg-brand-50 hover:text-brand-700">
                                  {locale === "ms" ? c.labelMs : c.label}<span aria-hidden="true">→</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div id={menuId} hidden={!open} className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-black/5 lg:hidden">
        <nav aria-label="Primary mobile" className="container-page py-4">
          <ul className="space-y-2">
            {primaryNav.map((item) => (
              <li key={item.key} className="glass rounded-2xl p-3">
                <Link href={href(locale, item.path)} onClick={() => setOpen(false)} className="block py-1 font-display text-xl font-semibold">{d.nav[item.key]}</Link>
                {item.children.length > 0 && (
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {item.children.map((c) => (
                      <li key={c.path}><Link href={href(locale, c.path)} onClick={() => setOpen(false)} className="inline-flex min-h-9 items-center rounded-full bg-white px-3 text-sm text-ink-muted ring-1 ring-line">{locale === "ms" ? c.labelMs : c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2">
            {quick.map((q) => (
              <li key={q.path}><Link href={href(locale, q.path)} onClick={() => setOpen(false)} className="inline-flex min-h-10 items-center rounded-full bg-brand-50 px-4 text-sm font-semibold text-brand-800">{q.label}</Link></li>
            ))}
            <li className="sm:hidden"><Link href={switchLocalePath(pathname, other)} hrefLang={other} lang={other} className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-sm font-semibold text-white"><span className="sr-only">{d.language}: </span>{d.switchTo}</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
