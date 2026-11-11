import { describe, expect, it } from "vitest";
import { search, searchIndex } from "@/lib/search";

describe("search", () => {
  it("returns nothing for an empty query", () => {
    expect(search("   ")).toEqual([]);
  });
  it("finds the library across types and ranks title matches first", () => {
    const r = search("library");
    expect(r.length).toBeGreaterThan(1);
    expect(r[0]!.title.toLowerCase()).toContain("library");
    expect(new Set(r.map((x) => x.type)).size).toBeGreaterThan(1);
  });
  it("filters by type", () => {
    const r = search("engineering", undefined, "Programme");
    expect(r.length).toBeGreaterThan(5);
    expect(r.every((x) => x.type === "Programme")).toBe(true);
  });
  it("requires every word to match", () => {
    expect(search("aerospace engineering").map((x) => x.id)).toEqual(["prog-bachelor-of-aerospace-engineering"]);
  });
  it("flags demonstration content", () => {
    const r = search("demo researcher");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((x) => x.demo)).toBe(true);
  });
  it("has unique ids and internal hrefs", () => {
    expect(new Set(searchIndex.map((d) => d.id)).size).toBe(searchIndex.length);
    for (const d of searchIndex) expect(d.href.startsWith("/")).toBe(true);
  });
});
