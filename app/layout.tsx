import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arnold.ai — Build The Beast",
  description:
    "Your AI partner for heavy lifting, meal plans, and relentless progress. Custom iron, anabolic meals, and strength data tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-base text-text-primary">
        {children}
      </body>
    </html>
  );
}
