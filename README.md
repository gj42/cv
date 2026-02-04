# CV Website

My personal bilingual CV website (EN/FR) built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4 with custom dark mode
- **Content:** Markdown files with YAML frontmatter
- **Deployment:** Vercel
- **Runtime:** Bun
- **Built with:** AI assistance (Claude)

## Features

- 🌍 Bilingual routing (`/en`, `/fr`) with `[locale]` dynamic routes
- 🎨 Custom design with sidebar layout and professional styling
- 🌓 Dark mode support via CSS custom properties
- 📱 Responsive design (mobile-friendly)
- 🖨️ Print-optimized styles
- 📄 Optional PDF generation from markdown

## Project Structure

```
├── app/[locale]/        # Dynamic locale routes (EN/FR)
├── content/             # Markdown CV content (cv.en.md, cv.fr.md)
├── lib/                 # Content loading utilities
├── styles/              # Global styles and PDF styles
└── public/              # Static assets (photo, etc.)
```

## Development

```bash
bun install              # Install dependencies
bun run dev              # Start dev server (http://localhost:3000)
bun run build            # Production build
bun run lint             # Run ESLint
```

## Privacy

Contact information is displayed as "Available on request" with a LinkedIn link for public viewing.
