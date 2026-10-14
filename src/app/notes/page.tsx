import type { Metadata } from "next";
import Link from "next/link";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export const metadata: Metadata = {
  title: "ノート",
  description: "制作中に考えたこと、学んだこと、次に試すことの記録。",
};

export default async function NotesPage() {
  const logs = await portfolioRepository.listLogs();

  return (
    <>
      <header className="page-header collection-header">
        <h1>ノート</h1>
        <p>制作の途中で考えたこと、学んだことを残しています。</p>
      </header>
      <section className="page-section" aria-label="ノート一覧">
        <div className="log-list">
          {logs.map((log) => (
          <Link
            className="log-row"
            href={`/notes/${log.slug}`}
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
