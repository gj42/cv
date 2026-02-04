import { loadCvContent } from "@/lib/cv";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PrintButton } from "./PrintButton";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

const translations = {
  en: {
    profile: "Profile",
    skills: "Skills",
    architecture: "Architecture",
    languages: "Languages",
    languagesSpoken: "Languages",
    cloudDevops: "Cloud & DevOps",
    aiTools: "AI Tooling",
    approach: "Approach",
    interests: "Interests",
    switchLang: "Français",
    switchLangHref: "/fr",
    print: "Print",
    skillsData: {
      architecture: ["Distributed Systems", "Event-driven / Serverless", "Microservices"],
      languages: ["TypeScript / Node.js", "SQL / NoSQL", "Rust", "C/C++"],
      cloud: ["AWS (Lambda, DynamoDB, SNS/SQS)", "Terraform / Docker / K8s", "GCP"],
      ai: ["GitHub Copilot", "Claude / OpenAI APIs", "Agentic coding (Claude Code, OpenCode)"],
    },
    languagesSpokenData: ["French: Native", "English: Professional", "Japanese: Elementary"],
    approachData: ["Pragmatic problem-solving", "Clear communication", "Product context matters", "Continuous learning"],
    interestsData: ["Swimming, tennis, table tennis", "Music, cinema, video games", "Board games, chess", "Reading (tech, sci-fi)", "Travel"],
  },
  fr: {
    profile: "Profil",
    skills: "Compétences",
    architecture: "Architecture",
    languages: "Langages",
    languagesSpoken: "Langues",
    cloudDevops: "Cloud & DevOps",
    aiTools: "Outils IA",
    approach: "Approche",
    interests: "Centres d'intérêt",
    switchLang: "English",
    switchLangHref: "/en",
    print: "Imprimer",
    skillsData: {
      architecture: ["Systèmes distribués", "Event-driven / Serverless", "Microservices"],
      languages: ["TypeScript / Node.js", "SQL / NoSQL", "Rust", "C/C++"],
      cloud: ["AWS (Lambda, DynamoDB, SNS/SQS)", "Terraform / Docker / K8s", "GCP"],
      ai: ["GitHub Copilot", "Claude / OpenAI APIs", "Coding agentique (Claude Code, OpenCode)"],
    },
    languagesSpokenData: ["Français : Natif", "Anglais : Professionnel", "Japonais : Notions"],
    approachData: ["Résolution pragmatique", "Communication claire", "Contexte produit important", "Apprentissage continu"],
    interestsData: ["Natation, tennis, tennis de table", "Musique, cinéma, jeux vidéo", "Jeux de société, échecs", "Lecture (tech, sci-fi)", "Voyages"],
  },
} as const;

export default async function CvPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (locale !== "en" && locale !== "fr") {
    notFound();
  }

  const { frontmatter, html } = await loadCvContent(locale);
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top Action Bar */}
      <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--background)]/95 backdrop-blur-sm no-print">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              {frontmatter.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--sidebar-bg)] hover:text-[var(--foreground)]"
              href={t.switchLangHref}
            >
              {t.switchLang}
            </a>
            <PrintButton label={t.print} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full bg-[var(--sidebar-bg)] px-6 py-10 lg:w-[300px] lg:min-h-screen lg:py-12 lg:px-8">
          {/* Photo */}
          <div className="mb-8 flex justify-center lg:justify-start">
            <div className="h-36 w-36 overflow-hidden rounded-2xl shadow-lg ring-4 ring-white dark:ring-gray-800">
              <Image
                src="/photo.jpg"
                alt={frontmatter.name}
                width={144}
                height={144}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Name & Role */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {frontmatter.name}
            </h1>
            <p className="mt-1 text-base font-medium text-[var(--accent)]">
              {frontmatter.role}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8 space-y-1.5 text-sm text-[var(--muted)]">
            <p className="flex items-center gap-2">
              <span className="text-[var(--accent)]">●</span>
              {frontmatter.location}
            </p>
            <a className="sidebar-link block" href={frontmatter.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="sidebar-link block" href={frontmatter.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="sidebar-link hidden print:block">Website</span>
          </div>

          {/* Profile */}
          <div className="mb-8">
            <h2 className="sidebar-section-title">{t.profile}</h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">{frontmatter.summary}</p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="sidebar-section-title">{t.skills}</h2>
            <div className="mb-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{t.architecture}</p>
              <ul className="sidebar-list list-none pl-0">
                {t.skillsData.architecture.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{t.languages}</p>
              <ul className="sidebar-list list-none pl-0">
                {t.skillsData.languages.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{t.cloudDevops}</p>
              <ul className="sidebar-list list-none pl-0">
                {t.skillsData.cloud.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{t.aiTools}</p>
              <ul className="sidebar-list list-none pl-0">
                {t.skillsData.ai.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h2 className="sidebar-section-title">{t.languagesSpoken}</h2>
            <ul className="sidebar-list list-none pl-0">
              {t.languagesSpokenData.map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </div>

          {/* Approach */}
          <div className="mb-8">
            <h2 className="sidebar-section-title">{t.approach}</h2>
            <ul className="sidebar-list list-none pl-0">
              {t.approachData.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <h2 className="sidebar-section-title">{t.interests}</h2>
            <ul className="sidebar-list list-none pl-0">
              {t.interestsData.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-10 lg:px-12 lg:py-12">
          <div className="cv-content" dangerouslySetInnerHTML={{ __html: html }} />
        </main>
      </div>
    </div>
  );
}
