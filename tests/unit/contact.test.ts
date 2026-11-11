import { describe, expect, it } from "vitest";
import { routeFor, validateEnquiry } from "@/lib/contact";

const good = { name: "Aminah Test", email: "aminah@example.com", topic: "admission-pg", message: "I would like to ask about research programmes.", consent: true, website: "" };

describe("validateEnquiry", () => {
  it("accepts a complete enquiry", () => {
    expect(validateEnquiry(good).ok).toBe(true);
  });
  it("reports each invalid field once", () => {
    const r = validateEnquiry({ name: "", email: "nope", topic: "", message: "short", consent: false });
    expect(r.ok).toBe(false);
    expect(Object.keys(r.errors).sort()).toEqual(["consent", "email", "message", "name", "topic"]);
  });
  it("trims whitespace before checking length", () => {
    expect(validateEnquiry({ ...good, name: "   a   " }).errors.name).toBeDefined();
  });
  it("rejects over-long messages", () => {
    expect(validateEnquiry({ ...good, message: "x".repeat(2001) }).errors.message).toBeDefined();
  });
  it("flags the honeypot", () => {
    expect(validateEnquiry({ ...good, website: "http://spam" }).errors.website).toBeDefined();
  });
  it("routes topics to the right contact", () => {
    expect(routeFor("admission-pg")).toBe("pg-admission");
    expect(routeFor("unknown")).toBe("main");
  });
});
