import Link from "next/link";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Otaka portfolio home">
        <span className="brand-dot" aria-hidden="true" />
        Otaka / notes &amp; works
      </Link>
      <nav aria-label="メインナビゲーション">
        <Link href="/projects">Projects</Link>
        <Link href="/logs">Logs</Link>
        <a href={profile.links[0].href} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.links[1].href}>Contact</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
