import { expect, test } from "@playwright/test";
import { staticRoutes } from "../../src/lib/nav";

const photoHeaders = ["/study", "/research", "/about", "/international", "/campus-life", "/alumni-partners", "/faculties",
  "/faculties/engineering", "/study/programmes/bachelor-of-civil-engineering", "/news/convocation-49-session-2"];

test.describe("inner pages in the new design", () => {
  for (const route of photoHeaders) {
    test(`${route} has a photographic header with one priority image and the h1 on dark glass`, async ({ page }) => {
      await page.goto(`/en${route}`);
      await expect(page.locator('main img[fetchpriority="high"]')).toHaveCount(1);
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveCSS("color", "rgb(255, 255, 255)");
      await expect(page.getByText("Temporary artwork · awaiting licensed UPM photography").first()).toBeAttached();
    });
  }

  for (const width of [320, 375, 768, 1024]) {
    test(`no inner page overflows horizontally at ${width}px`, async ({ page, isMobile }) => {
      test.skip(isMobile, "widths set explicitly");
      await page.setViewportSize({ width, height: 900 });
      for (const route of [...staticRoutes.filter((r) => r !== "/"), ...photoHeaders.slice(7)]) {
        await page.goto(`/en${route}`);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(over, `${route} at ${width}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});
