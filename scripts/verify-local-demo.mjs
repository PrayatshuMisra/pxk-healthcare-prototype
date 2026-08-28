import { chromium } from "playwright";

const baseUrl = process.env.PXK_URL || "http://localhost:3000";
const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const requireVisible = async (locator, label) => {
  if (!(await locator.isVisible())) throw new Error(`Expected visible: ${label}`);
};

try {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Demo sign in" }).click();
  await requireVisible(page.getByRole("button", { name: "End demo session" }), "End demo session control");

  await page.getByRole("button", { name: /Start a check-in/ }).first().click();
  const approvalGate = page.getByRole("button", { name: /Review approvals before starting/ });
  await approvalGate.scrollIntoViewIfNeeded();
  await approvalGate.click();
  const dialog = page.getByRole("dialog");
  await requireVisible(dialog.getByText("Required approval checklist"), "approval checklist");
  const approvals = dialog.locator('input[type="checkbox"]');
  if (await approvals.count() !== 3) throw new Error("Expected exactly three approval checkboxes");
  for (let index = 0; index < 3; index += 1) await approvals.nth(index).check();
  await dialog.getByRole("button", { name: "Open complaint input" }).click();
  await requireVisible(page.locator("#nlp-concern"), "typed complaint entry after approvals");

  await page.getByRole("button", { name: "End demo session" }).click();
  await requireVisible(page.getByRole("button", { name: "Demo sign in" }), "Demo sign in after ending local session");

  await page.getByRole("button", { name: "Demo sign in" }).click();
  await page.goto(`${baseUrl}/patient`, { waitUntil: "networkidle" });
  const matching = page.locator("#matching");
  await matching.scrollIntoViewIfNeeded();
  await matching.getByRole("button", { name: "View profile" }).first().click();
  await page.getByRole("button", { name: "Choose & book this clinician" }).click();
  await page.getByLabel("Full name").fill("Demo Patient");
  await page.getByRole("spinbutton", { name: "Age" }).fill("29");
  await page.getByLabel(/I agree to use this sample profile/).check();
  await page.getByRole("button", { name: "Confirm demo booking" }).click();
  await requireVisible(page.getByText("Booking preview ready · local demo"), "local booking-preview confirmation");
  await requireVisible(page.getByText(/Nothing was sent to a clinic, provider, or external account/), "non-persistent booking boundary");

  console.log("Verified local demo sign-in/out, approval-gated complaint input, and booking preview boundaries.");
} finally {
  await browser.close();
}
