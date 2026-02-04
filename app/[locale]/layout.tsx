import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guillaume Jensen — CV",
  description: "Backend engineer CV in English and French.",
};

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
