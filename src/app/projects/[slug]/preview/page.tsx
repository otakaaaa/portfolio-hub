import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/projects/project-preview";
import { resolvePreviewUrl } from "@/features/projects/preview-registry";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export async function generateStaticParams() {
  const projects = await portfolioRepository.listProjects();
  return projects
    .filter((project) => project.previewKey)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await portfolioRepository.getProject(slug);

  return project?.previewKey
    ? { title: `${project.title} 操作プレビュー`, robots: { index: false, follow: false } }
    : {};
}

export default async function ProjectPreviewPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const project = await portfolioRepository.getProject(slug);

  if (!project?.previewKey) notFound();

  const previewUrl = resolvePreviewUrl(project.previewKey);

  if (!previewUrl) {
    return (
      <section className="preview-unavailable">
        <p className="section-kicker">INTERACTIVE PREVIEW</p>
        <h1>{project.title}</h1>
        <p>プレビューは公開準備中です。ローカル開発では各アプリのプレビューサーバーを起動してください。</p>
        <div className="project-actions">
          <Link href={`/projects/${project.slug}`}>作品詳細へ戻る</Link>
          {project.repositoryUrl ? (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">ソースを見る</a>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <div className="preview-page">
      <Link className="secondary-link" href={`/projects/${project.slug}`}>
        ← 作品詳細へ戻る
      </Link>
      <ProjectPreview title={project.title} previewUrl={previewUrl} />
    </div>
  );
}
