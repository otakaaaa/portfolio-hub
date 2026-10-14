import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export const metadata: Metadata = {
  title: "プロジェクト",
  description: "制作中・公開済みのプロジェクトと、その設計過程を紹介します。",
};

export default async function ProjectsPage() {
  const projects = await portfolioRepository.listProjects();

  return (
    <>
      <header className="page-header collection-header">
        <h1>プロジェクト</h1>
        <p>作ったものと、制作中のアイデアをまとめています。</p>
      </header>
      <section className="page-section" aria-label="プロジェクト一覧">
        <ProjectExplorer projects={[...projects]} />
      </section>
    </>
  );
}
