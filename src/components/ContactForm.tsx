"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { enquiryTopics, contacts } from "@/data/contacts";
import { routeFor, validateEnquiry } from "@/lib/contact";

type Errors = Record<string, string>;

export function ContactForm() {
  const sp = useSearchParams();
  const pre = sp.get("topic");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const input = {
      name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), topic: String(fd.get("topic") ?? ""),
      message: String(fd.get("message") ?? ""), consent: fd.get("consent") === "on", website: String(fd.get("website") ?? ""),
    };
    const r = validateEnquiry(input);
    if (!r.ok) {
      if (r.errors.website) { setErrors({}); setDone("main"); return; } // honeypot: pretend success, discard
      setErrors(r.errors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setDone(routeFor(r.data.topic));
  };

  if (done) {
    const unit = contacts.find((c) => c.id === done)?.unit ?? "the central enquiries office";
    return (
      <div role="status" className="rounded-card border-l-4 border-campus-700 bg-campus-50 p-5" data-testid="form-success">
        <p className="text-lg font-semibold">Your enquiry passed validation</p>
        <p className="mt-2 text-sm">This is a demonstration, so <strong>nothing was sent and nothing was stored</strong>. In a live service, this enquiry would be routed to: <strong>{unit}</strong>.</p>
        <button type="button" onClick={() => setDone(null)} className="mt-4 rounded-lg border border-campus-700 px-4 py-2 font-semibold text-campus-700">Write another enquiry</button>
      </div>
    );
  }

  const field = "min-h-11 w-full rounded-lg border px-3 text-base";
  const err = (k: string) => (errors[k] ? `${k}-error` : undefined);
  const border = (k: string) => (errors[k] ? "border-brand-700 border-2" : "border-line");
  const keys = Object.keys(errors);

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby="form-note">
      <p id="form-note" className="text-sm text-ink-muted">All fields are required. Demonstration only: submissions are validated in your browser and never sent.</p>
      {keys.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border-l-4 border-brand-700 bg-brand-50 p-4" data-testid="error-summary">
          <p className="font-semibold">There {keys.length === 1 ? "is 1 problem" : `are ${keys.length} problems`} with your enquiry</p>
          <ul className="mt-2 list-disc pl-5 text-sm">{keys.map((k) => <li key={k}><a href={`#cf-${k}`} className="underline">{errors[k]}</a></li>)}</ul>
        </div>
      )}
      <div>
        <label htmlFor="cf-name" className="mb-1 block font-semibold">Full name</label>
        <input id="cf-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={err("name")} className={`${field} ${border("name")}`} />
        {errors.name && <p id="name-error" className="mt-1 text-sm font-semibold text-brand-700">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1 block font-semibold">Email address</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={err("email")} className={`${field} ${border("email")}`} />
        {errors.email && <p id="email-error" className="mt-1 text-sm font-semibold text-brand-700">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="cf-topic" className="mb-1 block font-semibold">What is your enquiry about?</label>
        <select id="cf-topic" name="topic" defaultValue={enquiryTopics.some((tp) => tp.value === pre) ? pre! : ""} aria-invalid={!!errors.topic} aria-describedby={err("topic")} className={`${field} bg-white ${border("topic")}`}>
          <option value="">Choose a topic</option>
          {enquiryTopics.map((tp) => <option key={tp.value} value={tp.value}>{tp.label}</option>)}
        </select>
        {errors.topic && <p id="topic-error" className="mt-1 text-sm font-semibold text-brand-700">{errors.topic}</p>}
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1 block font-semibold">Your message</label>
        <textarea id="cf-message" name="message" rows={6} maxLength={2000} aria-invalid={!!errors.message} aria-describedby={`message-hint ${err("message") ?? ""}`.trim()} className={`w-full rounded-lg border px-3 py-2 text-base ${border("message")}`} />
        <p id="message-hint" className="mt-1 text-sm text-ink-muted">Between 20 and 2,000 characters. Do not include passwords, IC numbers or other sensitive details.</p>
        {errors.message && <p id="message-error" className="mt-1 text-sm font-semibold text-brand-700">{errors.message}</p>}
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className="flex items-start gap-3">
          <input id="cf-consent" name="consent" type="checkbox" aria-invalid={!!errors.consent} aria-describedby={err("consent")} className="mt-1 h-5 w-5 accent-brand-700" />
          <span>I agree that, in a live service, UPM would use these details only to answer this enquiry, as described in a privacy notice approved by UPM.</span>
        </label>
        {errors.consent && <p id="consent-error" className="mt-1 text-sm font-semibold text-brand-700">{errors.consent}</p>}
      </div>
      <button type="submit" className="min-h-11 rounded-lg bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800">Check and submit enquiry</button>
    </form>
  );
}
