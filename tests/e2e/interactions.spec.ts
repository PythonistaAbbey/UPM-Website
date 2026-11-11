import { expect, test } from "@playwright/test";

test("programme filters narrow results and sync to the URL", async ({ page }) => {
  await page.goto("/en/study/programmes");
  const count = page.getByTestId("result-count");
  await expect(count).toContainText("99 programmes");
  await page.getByLabel("Faculty or school").selectOption("engineering");
  await expect(page).toHaveURL(/faculty=engineering/);
  await expect(count).toContainText("9 programmes");
  await page.getByLabel("Level").selectOption("undergraduate");
  await expect(count).toContainText("8 programmes");
  await page.getByLabel("Keyword").fill("aerospace");
  await expect(count).toContainText("1 programme found");
  await page.getByRole("link", { name: "Bachelor of Aerospace Engineering with Honours" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bachelor of Aerospace Engineering with Honours");
});

test("programme filters show an empty state and can be cleared", async ({ page }) => {
  await page.goto("/en/study/programmes?q=zzzz");
  await expect(page.getByText("No programmes match these filters")).toBeVisible();
  await page.getByRole("button", { name: "Clear all filters" }).last().click();
  await expect(page.getByTestId("result-count")).toContainText("99 programmes");
});

test("deep link with filters restores state", async ({ page }) => {
  await page.goto("/en/study/programmes?campus=bintulu");
  await expect(page.getByTestId("result-count")).toContainText("5 programmes");
  await expect(page.getByLabel("Bintulu, Sarawak")).toBeChecked();
});

test("header search reaches the search page with results and type filter", async ({ page, isMobile }) => {
  await page.goto("/en");
  if (isMobile) {
    await page.goto("/en/search?q=library");
  } else {
    await page.getByLabel("Search this prototype").fill("library");
    await page.getByLabel("Search this prototype").press("Enter");
  }
  await expect(page).toHaveURL(/search\?q=library/);
  await expect(page.getByTestId("search-count")).toContainText("results for “library”");
  await page.locator("label", { hasText: /^Place/ }).click();
  const items = page.getByTestId("search-results").locator("li");
  await expect(items).toHaveCount(3); // Library, plus two faculties whose description mentions a library section
  for (const t of await items.locator("p").first().allTextContents()) expect(t).toBe("Place");
  await expect(items.first()).toContainText("Sultan Abdul Samad Library");
});

test("search shows a no-results state", async ({ page }) => {
  await page.goto("/en/search?q=qwertyuiop");
  await expect(page.getByText("No results")).toBeVisible();
});

test("contact form validates, then reports routing without sending", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Check and submit enquiry" }).click();
  const summary = page.getByTestId("error-summary");
  await expect(summary).toBeFocused();
  await expect(summary).toContainText("5 problems");
  await expect(page.getByLabel("Email address")).toHaveAttribute("aria-invalid", "true");
  await page.getByLabel("Full name").fill("Test Applicant");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("What is your enquiry about?").selectOption("admission-pg");
  await page.getByLabel("Your message").fill("Please tell me about research degree intakes.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Check and submit enquiry" }).click();
  await expect(page.getByTestId("form-success")).toContainText("School of Graduate Studies — Admission Unit");
  await expect(page.getByTestId("form-success")).toContainText("nothing was sent");
});

test("directory search filters contacts", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByLabel("Search the directory").fill("library");
  await expect(page.getByTestId("directory-results").locator("li")).toHaveCount(1);
});

test("campus map selects places from list and deep link", async ({ page }) => {
  await page.goto("/en/campus-life/map?place=library");
  await expect(page.getByTestId("place-details")).toContainText("Sultan Abdul Samad Library");
  await page.getByLabel("Category").selectOption("residential");
  await page.getByRole("button", { name: "Kolej Canselor" }).last().click();
  await expect(page.getByTestId("place-details")).toContainText("Kolej Canselor");
});

test("news archive filters by type and source", async ({ page }) => {
  await page.goto("/en/news");
  await expect(page.getByTestId("news-count")).toContainText("8 items");
  await page.getByLabel("Only items from UPM sources").check();
  await expect(page.getByTestId("news-count")).toContainText("3 items");
  await page.getByRole("radio", { name: "Events" }).check();
  await expect(page.getByTestId("news-count")).toContainText("2 items");
});

test("language switch keeps the current page", async ({ page, isMobile }) => {
  await page.goto("/en/campus-life");
  // On phones the language switch lives in the menu.
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("link", { name: /Bahasa Malaysia/ }).click();
  await expect(page).toHaveURL(/\/ms\/campus-life$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ms");
  await expect(page.getByRole("note", { name: "Prototype notice" })).toContainText("Prototaip Konsep Bebas");
});

test("mobile menu opens, closes with Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/en");
  const btn = page.getByRole("button", { name: "Menu" });
  await btn.click();
  await expect(page.getByRole("navigation", { name: "Primary mobile" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Primary mobile" })).toBeHidden();
  await expect(btn).toBeFocused();
});

test("skip link moves focus to main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard test on desktop");
  await page.goto("/en");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
