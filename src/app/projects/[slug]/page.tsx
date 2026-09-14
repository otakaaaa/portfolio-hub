import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBody } from "@/components/content/content-body";
import { ProjectLinks } from "@/components/projects/project-links";
import { getProjectStatusLabel } from "@/features/projects/project-status";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export async function generateStaticParams() {
  const projects = await portfolioRepository.listProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await portfolioRepository.getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const project = await portfolioRepository.getProject(slug);

  if (!project) notFound();

  return (
    <article className="article-shell">
      <aside className="article-meta">
        <Link className="secondary-link" href="/projects">
          ← Projectsへ戻る
        </Link>
        <p>{getProjectStatusLabel(project.status)}</p>
        <time dateTime={project.publishedAt}>{project.publishedAt}</time>
        <ul className="inline-tags" aria-label="使用技術">
            {project.tech.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
        </ul>
        <ProjectLinks repositoryUrl={project.repositoryUrl} demoUrl={project.demoUrl} />
      </aside>

      <div className="article-body">
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <ContentBody source={project.body} />
      </div>
    </article>
  );
}
