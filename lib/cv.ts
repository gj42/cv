import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export type CvFrontmatter = {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
};

export type CvContent = {
  frontmatter: CvFrontmatter;
  html: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function loadCvContent(locale: "en" | "fr"): Promise<CvContent> {
  const filePath = path.join(CONTENT_DIR, `cv.${locale}.md`);
  const file = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(file);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return {
    frontmatter: data as CvFrontmatter,
    html: processed.toString(),
  };
}
