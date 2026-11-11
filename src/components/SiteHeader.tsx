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

export function SiteHeader({ locale }: { locale: Locale }) {
  const d = t(locale);
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const other: Locale = locale === "en" ? "ms" : "en";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (path: string) => pathname === href(locale, path) || pathname.startsWith(href(locale, path) + "/");

  return (
    <header className="border-b border-line bg-white">
      <div className="bg-ink text-white on-dark">
        <div className="container-page flex flex-wrap items-center justify-end gap-x-5 gap-y-1 py-1.5 text-sm">
          <Link href={href(locale, "/services/students")} className="inline-flex min-h-6 items-center py-0.5 hover:underline">{d.quick.students}</Link>
          <Link href={href(locale, "/services/staff")} className="inline-flex min-h-6 items-center py-0.5 hover:underline">{d.quick.staff}</Link>
          <Link href={href(locale, "/contact")} className="inline-flex min-h-6 items-center py-0.5 hover:underline">{d.quick.contact}</Link>
          <Link href={switchLocalePath(pathname, other)} hrefLang={other} lang={other} className="rounded border border-white/60 px-2 py-0.5 font-semibold hover:bg-white/10">
            <span className="sr-only">{d.language}: </span>{d.switchTo}
          </Link>
        </div>
      </div>

      <div className="container-page flex items-center gap-4 py-3">
        <Link href={href(locale)} className="flex shrink-0 items-center gap-3 no-underline">
          <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-lg bg-brand-700 text-lg font-black text-white">U</span>
          <span className="leading-tight">
            <span className="block font-bold text-ink">{d.siteName}</span>
            <span className="block text-xs font-medium text-ink-muted">{d.siteTag}</span>
          </span>
        </Link>

        <form role="search" action={href(locale, "/search")} className="ml-auto hidden max-w-md flex-1 md:flex">
          <label htmlFor="header-search" className="sr-only">{d.searchLabel}</label>
          <input id="header-search" name="q" type="search" placeholder={d.searchPlaceholder}
            className="min-h-11 w-full rounded-l-lg border border-line px-3 text-base focus:border-brand-700" />
          <button type="submit" className="min-h-11 rounded-r-lg bg-brand-700 px-4 font-semibold text-white hover:bg-brand-800">{d.quick.search}</button>
        </form>

        <Link href={href(locale, "/search")} className="ml-auto rounded-lg border border-line px-3 py-2 text-sm font-semibold md:hidden">{d.quick.search}</Link>
        <button ref={buttonRef} type="button" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((o) => !o)}
          className="min-h-11 rounded-lg border border-ink px-3 font-semibold lg:hidden">
          {open ? d.closeMenu : d.menu}
        </button>
      </div>

      <nav aria-label="Primary" className="hidden border-t border-line lg:block">
        <ul className="container-page flex flex-wrap gap-1">
          {primaryNav.map((item) => (
            <li key={item.key}>
              <Link href={href(locale, item.path)} aria-current={isActive(item.path) ? "page" : undefined}
                className={`block border-b-[3px] px-3 py-3 text-[0.95rem] font-semibold hover:border-brand-700 hover:text-brand-700 ${isActive(item.path) ? "border-brand-700 text-brand-700" : "border-transparent"}`}>
                {d.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div id={menuId} hidden={!open} className="border-t border-line lg:hidden">
        <nav aria-label="Primary mobile" className="container-page py-4">
          <ul className="divide-y divide-line">
            {primaryNav.map((item) => (
              <li key={item.key} className="py-2">
                <Link href={href(locale, item.path)} onClick={() => setOpen(false)} className="block py-1.5 text-lg font-semibold">{d.nav[item.key]}</Link>
                {item.children.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.children.map((c) => (
                      <li key={c.path}><Link href={href(locale, c.path)} onClick={() => setOpen(false)} className="block py-1 text-ink-muted underline">{locale === "ms" ? c.labelMs : c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
