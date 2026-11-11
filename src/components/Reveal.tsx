"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lightweight scroll reveal (IntersectionObserver + CSS transitions, no animation library).
 * Content is visible by default without JavaScript; motion is skipped under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // already on screen: never hide it
    let io: IntersectionObserver | undefined;
    // Hide first, then observe, so an early "visible" callback can never be overwritten by the hide.
    const raf = requestAnimationFrame(() => {
      setState("hidden");
      io = new IntersectionObserver(([e]) => {
        if (e?.isIntersecting) { setState("shown"); io?.disconnect(); }
      }, { rootMargin: "0px 0px -8% 0px" });
      io.observe(el);
    });
    return () => { cancelAnimationFrame(raf); io?.disconnect(); };
  }, []);

  const cls = state === "hidden" ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100";
  return (
    <Tag ref={ref as never} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${cls} ${className}`}>
      {children}
    </Tag>
  );
}
