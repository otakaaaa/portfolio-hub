import Link from "next/link";
import { InteractiveIntro } from "@/components/intro/interactive-intro";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { profile } from "@/data/profile";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export default async function Home() {
  const [projects, logs] = await Promise.all([
    portfolioRepository.listProjects(),
    portfolioRepository.listLogs(),
  ]);

  return (
    <>
      <section className="hero">
        <div className="hero-index" aria-hidden="true">
          <span>PORTFOLIO / 2026</span>
          <span>35.6762° N</span>
        </div>
        <div className="hero-copy">
          <p className="role">{profile.role}</p>
          <h1>{profile.statement}</h1>
          <p className="hero-lead">{profile.introduction}</p>
          <div className="hero-actions">
            <Link className="primary-link" href="/projects">制作物を見る</Link>
            <Link className="secondary-link" href="/logs">学びを読む</Link>
          </div>
        </div>
        <aside className="hero-note">
          <span>Currently</span>
          <p>AIを体験へ自然に組み込む設計と、小さく検証できる開発の形を探っています。</p>
        </aside>
      </section>

      <InteractiveIntro />

      <section className="home-section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected projects</p>
            <h2 id="projects-heading">作ったもの</h2>
          </div>
          <Link href="/projects">すべて見る</Link>
        </div>
        <ProjectExplorer projects={projects.filter((project) => project.featured)} compact />
      </section>

      <section className="home-section logs-section" aria-labelledby="logs-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Learning notes</p>
            <h2 id="logs-heading">途中の記録</h2>
          </div>
          <Link href="/logs">ログ一覧</Link>
        </div>
        <div className="log-list">
          {logs.slice(0, 3).map((log) => (
            <Link className="log-row" href={`/logs/${log.slug}`} key={log.slug}>
              <time dateTime={log.publishedAt}>{log.publishedAt}</time>
              <strong>{log.title}</strong>
              <span>{log.tags.join(" / ")}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
