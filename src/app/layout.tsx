import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Otaka — Notes & Works", template: "%s — Otaka" },
  description: "作ったものと、その途中で得た学びを記録するポートフォリオ。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">本文へ移動</a>
          <div className="site-shell">
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
