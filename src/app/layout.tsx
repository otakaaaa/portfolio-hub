import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Otaka Space", template: "%s — Otaka Space" },
  description: "制作物や記録を残したポートフォリオ。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">本文へ移動</a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
