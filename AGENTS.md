# CV Website - Agent Guidelines

Bilingual CV website (EN/FR) built with Next.js 16, TypeScript, Tailwind CSS 4, and Bun.

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `bun run dev` |
| Build | `bun run build` |
| Lint | `bun run lint` |
| Generate PDFs | `bun run pdf` |
| Full build (PDF + Next) | `bun run build:all` |
| Start production | `bun run start` |

**No test framework is configured.** If tests are added, use Vitest.

## Project Structure

```
app/
├── layout.tsx              # Root layout (minimal passthrough)
├── page.tsx                # Redirects / → /en
├── globals.css             # Tailwind + custom CV styles
└── [locale]/
    ├── layout.tsx          # Sets <html lang={locale}>
    └── page.tsx            # CV page component
content/
├── cv.en.md                # English CV content (frontmatter + markdown)
└── cv.fr.md                # French CV content
lib/
└── cv.ts                   # Markdown loader with gray-matter + remark
scripts/
└── generate-pdf.ts         # PDF generation script (md-to-pdf)
styles/
└── pdf.css                 # PDF-specific styles
public/
├── photo.jpg               # Profile photo
└── pdf/                    # Generated PDFs (cv.en.pdf, cv.fr.pdf)
```

## Tech Stack

- **Runtime**: Bun (package manager and script runner)
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **Markdown**: gray-matter + remark + rehype
- **PDF**: md-to-pdf

## Code Style

### TypeScript

- **Strict mode enabled** - no implicit any, strict null checks
- Use `type` over `interface` for object shapes
- Export types explicitly: `export type { CvFrontmatter }`
- Use `as const` for literal objects/arrays

### Imports

Order imports (grouped with blank lines): Node.js built-ins → External packages → Internal (`@/*`)

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `generate-pdf.ts` |
| Components | PascalCase | `CvPage` |
| Functions | camelCase, verb-noun | `loadCvContent`, `generatePdf` |
| Types | PascalCase | `CvFrontmatter` |
| Constants | SCREAMING_SNAKE_CASE | `CONTENT_DIR` |

### Error Handling

Use early returns with guard clauses. Never use `else` after a return.

```typescript
// Good
export default async function CvPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (locale !== "en" && locale !== "fr") {
    notFound();
  }

  const { frontmatter, html } = await loadCvContent(locale);
  // ...
}

// Bad - using else
if (locale === "en" || locale === "fr") {
  // ...
} else {
  notFound();
}
```

### React/Next.js Patterns

- Use async Server Components (default in App Router)
- Await params in dynamic routes: `const { locale } = await params`
- Use `notFound()` for invalid routes
- Use `generateStaticParams()` for static generation

```typescript
type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function CvPage({ params }: { params: Params }) {
  const { locale } = await params;
  // ...
}
```

### Styling

- Use Tailwind utility classes for layout and spacing
- Define CSS custom properties in `globals.css` for theme colors
- Use semantic class names for CV-specific styling (`.cv-content`, `.sidebar-list`)

```css
:root {
  --accent: #2563eb;
  --muted: #4b5563;
}
```

## Content Management

CV content lives in `content/cv.{locale}.md` with YAML frontmatter:

```yaml
---
name: Guillaume Jensen
role: Senior Software Engineer
location: Montreuil, France
phone: +33 6 77 36 10 64
email: guillaumejensen@gmail.com
linkedin: https://www.linkedin.com/in/guillaume-jensen/
portfolio: https://cv.42.fr/gjensen
summary: Senior backend engineer with 8+ years...
---

## Experience

### Senior Software Engineer — AVIV Group (Feb 2025 - Present)
- Leads serverless event-driven platforms...
```

## i18n

- Routes: `/en` and `/fr` via `[locale]` dynamic segment
- Root `/` redirects to `/en`
- `<html lang={locale}>` set in `app/[locale]/layout.tsx`
- UI translations defined in `app/[locale]/page.tsx` translations object

## Git Commits

Use conventional commits, concise and atomic:

```
feat: add language toggle
fix: correct PDF link for French locale
refactor: extract translations to separate file
```

## ESLint

Uses Next.js recommended config with core-web-vitals and TypeScript rules.
Run `bun run lint` before committing.
