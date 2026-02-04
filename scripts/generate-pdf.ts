import fs from "node:fs/promises";
import path from "node:path";
import { mdToPdf } from "md-to-pdf";

const OUTPUT_DIR = path.join(process.cwd(), "public", "pdf");
const CONTENT_DIR = path.join(process.cwd(), "content");

const SOURCES = [
  { locale: "en", filename: "cv.en.md" },
  { locale: "fr", filename: "cv.fr.md" },
] as const;

async function ensureOutputDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function generatePdf(locale: "en" | "fr", filename: string) {
  const inputPath = path.join(CONTENT_DIR, filename);
  const outputPath = path.join(OUTPUT_DIR, `cv.${locale}.pdf`);

  const pdf = await mdToPdf(
    { path: inputPath },
    {
      pdf_options: {
        format: "A4",
        margin: { top: "18mm", right: "18mm", bottom: "18mm", left: "18mm" },
      },
      stylesheet: [path.join(process.cwd(), "styles", "pdf.css")],
    }
  );

  if (!pdf) {
    throw new Error(`Failed to generate PDF for ${locale}`);
  }

  await fs.writeFile(outputPath, pdf.content);
}

async function main() {
  await ensureOutputDir();

  await Promise.all(
    SOURCES.map(({ locale, filename }) => generatePdf(locale, filename))
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
