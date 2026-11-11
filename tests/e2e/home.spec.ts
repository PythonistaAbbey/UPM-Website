import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

type AxePage = ConstructorParameters<typeof AxeBuilder>[0]["page"];

test.describe("redesigned homepage", () => {
  test("hero has one h1, both calls to action and a preloaded hero image", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Discover. Innovate. Transform the Future.");
    await expect(page.getByRole("link", { name: /Explore Programmes/ })).toHaveAttribute("href", "/en/study/programmes");
    await expect(page.getByRole("link", { name: /Discover UPM/ })).toHaveAttribute("href", "/en/about");
    const hero = page.locator('main img[fetchpriority="high"]');
    await expect(hero).toHaveCount(1);
    await expect(hero).toHaveAttribute("loading", "eager");
    await expect.poll(() => hero.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  });

  test("below-the-fold images are lazy and every image has width, height and alt", async ({ page }) => {
    await page.goto("/en");
    const imgs = page.locator("main img");
    await expect(imgs.first()).toBeAttached();
    const n = await imgs.count();
    expect(n).toBeGreaterThan(20);
    for (let i = 0; i < n; i++) {
      const img = imgs.nth(i);
      expect(await img.getAttribute("width")).toBeTruthy();
      expect(await img.getAttribute("height")).toBeTruthy();
      expect(await img.getAttribute("alt")).not.toBeNull();
      if ((await img.getAttribute("fetchpriority")) !== "high") expect(await img.getAttribute("loading")).toBe("lazy");
    }
  });

  test("a missing image file leaves the layout and text intact", async ({ page }) => {
    await page.route(/\/media\/temp\//, (r) => r.abort());
    await page.goto("/en");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Find your field" })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("hero search sends a programme query to the programme finder", async ({ page }) => {
    await page.goto("/en");
    const form = page.getByTestId("hero-search");
    await form.getByLabel("What would you like to find?").fill("engineering");
    await form.getByRole("button", { name: "Search" }).click();
    await expect(page).toHaveURL(/\/en\/study\/programmes\?q=engineering/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("result-count")).not.toContainText(/^99\b/);
  });

  test("hero search in Everything scope goes to site search", async ({ page }) => {
    await page.goto("/en");
    const form = page.getByTestId("hero-search");
    await form.getByText("Everything").click();
    await form.getByLabel("What would you like to find?").fill("library");
    await form.getByLabel("What would you like to find?").press("Enter");
    await expect(page).toHaveURL(/\/en\/search\?q=library/);
    await expect(page.getByTestId("search-count")).toContainText("library");
  });

  test("popular chip runs a programme search", async ({ page }) => {
    await page.goto("/en");
    await page.getByTestId("hero-search").getByRole("button", { name: "computer science" }).click();
    await expect(page).toHaveURL(/study\/programmes\?q=computer(\+|%20)science/);
  });

  test("audience gateway has eight destinations", async ({ page }) => {
    await page.goto("/en");
    const list = page.getByRole("region", { name: "Start with what you need" }).getByRole("listitem");
    await expect(list).toHaveCount(8);
    await page.getByRole("link", { name: "International student" }).click();
    await expect(page).toHaveURL(/\/en\/international$/);
  });

  test("field card opens the programme finder filtered by field", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Engineering", exact: true }).click();
    await expect(page).toHaveURL(/field=Engineering/);
    await expect(page.getByTestId("result-count")).toContainText("9");
  });

  test("faculty finder filters by text and campus", async ({ page }) => {
    await page.goto("/en");
    const count = page.getByTestId("faculty-count");
    await expect(count).toHaveText("16 faculties and schools");
    await page.getByLabel("Search faculties").fill("forest");
    await expect(count).toHaveText("2 faculties and schools");
    await page.getByLabel("Search faculties").fill("");
    await page.getByRole("radio", { name: "Bintulu" }).check({ force: true });
    await expect(count).toHaveText("2 faculties and schools");
    await page.getByLabel("Search faculties").fill("zzzz");
    await expect(page.getByText("No matches. Try another word.")).toBeVisible();
  });

  test("Malay homepage uses Malay headings, not English with Malay buttons", async ({ page }) => {
    await page.goto("/ms");
    await expect(page.locator("html")).toHaveAttribute("lang", "ms");
    await expect(page.locator("h1")).toHaveText("Teroka. Berinovasi. Ubah Masa Depan.");
    await expect(page.getByRole("link", { name: /Teroka Program/ })).toBeVisible();
  });
});

test("desktop mega menu opens on keyboard focus", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop navigation");
  await page.goto("/en");
  const study = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Study at UPM" });
  await study.focus();
  const panel = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Find a programme" });
  await expect(panel).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(panel).toBeFocused();
});

test("header becomes more opaque after scrolling", async ({ page }) => {
  await page.goto("/en");
  const header = page.locator("header").first();
  const before = await header.evaluate((h) => getComputedStyle(h).backgroundColor);
  await page.mouse.wheel(0, 800);
  await expect.poll(() => header.evaluate((h) => getComputedStyle(h).backgroundColor)).not.toBe(before);
});

test("homepage passes axe with motion on, after every section has revealed", async ({ page }) => {
  for (const locale of ["en", "ms"]) {
    await page.goto(`/${locale}`);
    for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 600); await page.waitForTimeout(40); }
    await page.waitForTimeout(1000); // let the last fade finish
    const axe = await new AxeBuilder({ page: page as unknown as AxePage }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const serious = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
  }
});
