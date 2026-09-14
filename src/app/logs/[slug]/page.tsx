import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBody } from "@/components/content/content-body";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export async function generateStaticParams() {
  const logs = await portfolioRepository.listLogs();
  return logs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const log = await portfolioRepository.getLog(slug);

  if (!log) return {};

  return {
    title: log.title,
    description: log.summary,
  };
}

export default async function LogDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const log = await portfolioRepository.getLog(slug);

  if (!log) notFound();

  return (
    <article className="article-shell">
      <aside className="article-meta">
        <Link className="secondary-link" href="/logs">
          ← Logsへ戻る
        </Link>
        <time dateTime={log.publishedAt}>{log.publishedAt}</time>
        <ul className="inline-tags" aria-label="タグ">
            {log.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
        </ul>
      </aside>

      <div className="article-body">
        <h1>{log.title}</h1>
        <p>{log.summary}</p>
        <ContentBody source={log.body} />
      </div>
    </article>
  );
}
