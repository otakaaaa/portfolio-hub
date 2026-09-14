"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProjectSummary } from "@/domain/content";
import { filterProjects } from "@/features/projects/filter-projects";
import { getProjectStatusLabel } from "@/features/projects/project-status";

type ProjectExplorerProps = {
  projects: ProjectSummary[];
  compact?: boolean;
};

export function ProjectExplorer({ projects, compact = false }: ProjectExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))),
    [projects],
  );
  const filtered = useMemo(
    () => filterProjects(projects, query, selectedTags),
    [projects, query, selectedTags],
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  return (
    <div className="project-explorer">
      {!compact ? (
        <div className="explorer-tools">
          <label className="search-field">
            <span>プロジェクトを検索</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="名前・技術・テーマ"
            />
          </label>
          <div className="tag-filters" aria-label="タグで絞り込む">
            {tags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  aria-pressed={active}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <p className="result-count" aria-live="polite">
        {filtered.length} projects
      </p>
      {filtered.length ? (
        <div className="project-list">
          {filtered.map((project) => (
            <article className="project-row" key={project.slug}>
              <div className="project-status">
                <span>{getProjectStatusLabel(project.status)}</span>
                <time dateTime={project.publishedAt}>{project.publishedAt}</time>
              </div>
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul className="inline-tags" aria-label="使用技術">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <Link href={`/projects/${project.slug}`} aria-label={`${project.title}の詳細を見る`}>
                詳細を見る
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>条件に合うプロジェクトはありません。</p>
          <button type="button" onClick={() => { setQuery(""); setSelectedTags([]); }}>
            条件をクリア
          </button>
        </div>
      )}
    </div>
  );
}
