import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { staticRoutes } from "../../src/lib/nav";

// @axe-core/playwright pins its own playwright-core types; the runtime object is compatible.
type AxePage = ConstructorParameters<typeof AxeBuilder>[0]["page"];

const deep = ["/study/programmes/bachelor-of-civil-engineering", "/faculties/engineering", "/news/convocation-49-session-2"];
const all = [...staticRoutes, ...deep];

for (const locale of ["en", "ms"] as const) {
  for (const route of all) {
    const url = `/${locale}${route === "/" ? "" : route}`;
    test(`${url} renders, is labelled, has no overflow and no serious axe violations`, async ({ page }) => {
      const res = await page.goto(url);
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("note", { name: "Prototype notice" })).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      const axe = await new AxeBuilder({ page: page as unknown as AxePage }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const serious = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
    });
  }
}

test("unknown URLs return 404", async ({ page }) => {
  expect((await page.goto("/en/no-such-page"))?.status()).toBe(404);
  expect((await page.goto("/fr"))?.status()).toBe(404);
  const res = await page.goto("/en/study/programmes/not-a-programme");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("root redirects to English", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("every internal link on key pages resolves", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const start of ["/en", "/en/study", "/en/faculties", "/ms", "/en/campus-life"]) {
    await page.goto(start);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    for (const h of hrefs) seen.add(h.split("#")[0]!);
  }
  for (const h of seen) {
    const r = await request.get(h);
    expect(r.status(), h).toBe(200);
  }
});
