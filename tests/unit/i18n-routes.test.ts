import { describe, expect, it } from "vitest";
import { dictionaries } from "@/lib/i18n";
import { primaryNav, staticRoutes } from "@/lib/nav";
import fs from "node:fs";
import path from "node:path";

const keysOf = (o: object, prefix = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? keysOf(v, `${prefix}${k}.`) : [`${prefix}${k}`]));

describe("i18n", () => {
  it("has the same keys in English and Bahasa Malaysia", () => {
    expect(keysOf(dictionaries.ms).sort()).toEqual(keysOf(dictionaries.en).sort());
  });
  it("has no empty strings", () => {
    for (const d of Object.values(dictionaries)) for (const k of keysOf(d)) expect(k.split(".").reduce<unknown>((o, p) => (o as Record<string, unknown>)[p], d)).not.toBe("");
  });
  it("translates every primary nav child", () => {
    for (const n of primaryNav) for (const c of n.children) expect(c.labelMs.length).toBeGreaterThan(0);
  });
});

describe("routes", () => {
  const appDir = path.resolve(__dirname, "../../src/app/[locale]");
  it("has a page file for every static route", () => {
    for (const r of staticRoutes) {
      const file = path.join(appDir, r === "/" ? "" : r, "page.tsx");
      expect(fs.existsSync(file), r).toBe(true);
    }
  });
  it("only links primary nav to known routes", () => {
    for (const n of primaryNav) {
      expect(staticRoutes).toContain(n.path);
      for (const c of n.children) expect(staticRoutes).toContain(c.path.split("#")[0]!.split("?")[0]);
    }
  });
});
