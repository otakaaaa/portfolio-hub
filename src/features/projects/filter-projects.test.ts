import { describe, expect, it } from "vitest";
import type { ProjectSummary } from "@/domain/content";
import { filterProjects } from "./filter-projects";

const projects: ProjectSummary[] = [
  {
    slug: "portfolio-hub",
    title: "Portfolio Hub",
    summary: "学びと制作過程をひとつにつなぐポートフォリオ",
    publishedAt: "2026-09-13",
    tags: ["Next.js", "TypeScript"],
    status: "building",
    featured: true,
    tech: ["Next.js", "Vitest"],
  },
  {
    slug: "rubblenomics",
    title: "Rubblenomics",
    summary: "都市を再建するシミュレーションゲーム",
    publishedAt: "2026-08-20",
    tags: ["Godot", "Game Design"],
    status: "released",
    featured: true,
    tech: ["Godot", "GDScript"],
  },
];

describe("filterProjects", () => {
  it("normalizes case and full-width text when searching", () => {
    expect(filterProjects(projects, "ｎｅｘｔ．ｊｓ", [])).toHaveLength(1);
  });

  it("matches title, summary, tags, and technology", () => {
    expect(filterProjects(projects, "シミュレーション", [])[0]?.slug).toBe(
      "rubblenomics",
    );
    expect(filterProjects(projects, "vitest", [])[0]?.slug).toBe(
      "portfolio-hub",
    );
  });

  it("uses OR semantics for selected tags", () => {
    expect(filterProjects(projects, "", ["TypeScript", "Godot"])).toHaveLength(
      2,
    );
  });

  it("does not mutate the input array", () => {
    const snapshot = structuredClone(projects);

    filterProjects(projects, "", ["Godot"]);

    expect(projects).toEqual(snapshot);
  });
});
