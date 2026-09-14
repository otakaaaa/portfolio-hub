import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { portfolioRepository } from "@/lib/repositories/local-content-repository";

export const metadata: Metadata = {
  title: "Projects",
  description: "制作中・公開済みのプロジェクトと、その設計過程を紹介します。",
};

export default async function ProjectsPage() {
  const projects = await portfolioRepository.listProjects();

  return (
    <>
      <header className="page-header">
        <p className="section-kicker">
          Projects / thinking in public
        </p>
        <h1>
          完成品だけでなく、
          <br />考えた過程も残す。
        </h1>
        <p>
          公開済みの作品と、これから育てる構想です。名前、技術、テーマから絞り込めます。
        </p>
      </header>

      <section className="page-section" aria-label="プロジェクト一覧">
        <ProjectExplorer projects={[...projects]} />
      </section>
    </>
  );
}
