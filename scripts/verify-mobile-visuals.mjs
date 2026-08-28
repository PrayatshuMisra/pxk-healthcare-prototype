import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.PXK_URL || "http://localhost:3000";
const outputDir = "/home/ubuntu/pxk-visual-verification";
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium" });
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await desktop.goto(baseUrl, { waitUntil: "networkidle" });
  const trustHeading = desktop.locator(".trust-section .display-title");
  const ctaHeading = desktop.locator(".cta-panel .display-title");
  const trustColor = await trustHeading.evaluate(element => getComputedStyle(element).color);
  const ctaColor = await ctaHeading.evaluate(element => getComputedStyle(element).color);
  if (trustColor !== "rgb(255, 253, 248)" || ctaColor !== "rgb(255, 253, 248)") throw new Error(`Unexpected dark-panel heading colours: ${trustColor}, ${ctaColor}`);
  await trustHeading.scrollIntoViewIfNeeded();
  await desktop.locator(".trust-section").screenshot({ path: `${outputDir}/trust-section.png` });
  await ctaHeading.scrollIntoViewIfNeeded();
  await desktop.locator(".cta-panel").screenshot({ path: `${outputDir}/cta-panel.png` });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  const heroImage = mobile.locator(".hero-phone");
  const heroBox = await heroImage.boundingBox();
  if (!heroBox || heroBox.width < 120 || heroBox.height < 200) throw new Error("Supplied hero phone illustration is not visibly rendered on mobile");
  const imageSource = await heroImage.getAttribute("src");
  if (imageSource !== "/manus-storage/pxk-user-supplied-phone-illustration_a1d560a6.png") throw new Error(`Unexpected mobile hero illustration source: ${imageSource}`);
  const controlBoxes = await mobile.locator(".pill-nav-logo, .language-select--pill, .account-button, .pill-nav-menu").evaluateAll(elements => elements.map(element => {
    const box = element.getBoundingClientRect();
    return { left: box.left, right: box.right, width: box.width };
  }));
  if (controlBoxes.some(box => box.width === 0 || box.left < -1 || box.right > 391)) throw new Error(`A visible mobile header control is outside the viewport: ${JSON.stringify(controlBoxes)}`);
  await mobile.screenshot({ path: `${outputDir}/mobile-hero-and-header.png` });
  console.log("Verified light contrast on dark trust/CTA panels plus visible, managed hero art and non-overflowing mobile header.");
} finally {
  await browser.close();
}
