import puppeteer from "puppeteer";
import { resolve } from "path";
import { env } from "./env";

async function exportToPdf() {
  const rootDir = resolve(import.meta.dir, "..");
  const htmlPath = resolve(import.meta.dir, "cv.html");
  const pdfPath = resolve(rootDir, env.CV_OUTPUT_PATH);

  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(`Loading ${htmlPath}...`);
  await page.setViewport({ width: 595, height: 842 });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

  console.log("Generating PDF...");
  await page.pdf({
    path: pdfPath,
    width: "595px",
    height: "842px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`PDF saved to ${pdfPath}`);
}

exportToPdf().catch(console.error);
