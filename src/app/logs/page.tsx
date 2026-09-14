import type { Metadata } from "next";
import Link from "next/link";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export const metadata: Metadata = {
  title: "Learning logs",
  description: "制作中に考えたこと、学んだこと、次に試すことの記録。",
};

export default async function LogsPage() {
  const logs = await portfolioRepository.listLogs();

  return (
    <>
      <header className="page-header">
        <p className="section-kicker">
          Learning logs / work in progress
        </p>
        <h1>学びを、次の制作につなぐ。</h1>
        <p>
          正解だけではなく、迷った点や判断の理由も短い記録として残しています。
        </p>
      </header>

      <section className="page-section" aria-label="学習ログ一覧">
        <div className="log-list">
          {logs.map((log) => (
          <Link
            className="log-row"
            href={`/logs/${log.slug}`}
            key={log.slug}
          >
            <time dateTime={log.publishedAt}>
              {log.publishedAt}
            </time>
            <strong>{log.title}</strong>
            <span>{log.tags.join(" / ")}</span>
          </Link>
          ))}
        </div>
      </section>
    </>
  );
}
