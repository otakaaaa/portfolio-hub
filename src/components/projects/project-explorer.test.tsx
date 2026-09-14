import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectExplorer } from "./project-explorer";
import type { ProjectSummary } from "@/domain/content";

const projects: ProjectSummary[] = [
  {
    slug: "portfolio-hub",
    title: "Portfolio Hub",
    summary: "学びと制作過程を伝える",
    publishedAt: "2026-09-13",
    tags: ["Next.js"],
    status: "building",
    featured: true,
    tech: ["TypeScript"],
  },
  {
    slug: "rubblenomics",
    title: "Rubblenomics",
    summary: "都市再建ゲーム",
    publishedAt: "2026-08-20",
    tags: ["Godot"],
    status: "released",
    featured: true,
    tech: ["GDScript"],
  },
  {
    slug: "future-tool",
    title: "Future Tool",
    summary: "次に作るツール",
    publishedAt: "2026-07-20",
    tags: ["Research"],
    status: "planned",
    featured: false,
    tech: ["TypeScript"],
  },
];

describe("ProjectExplorer", () => {
  it("filters projects and exposes an empty state", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={projects} />);

    await user.type(screen.getByRole("searchbox"), "Godot");
    expect(screen.getByRole("link", { name: /Rubblenomics/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Portfolio Hub/ })).not.toBeInTheDocument();

    await user.clear(screen.getByRole("searchbox"));
    await user.type(screen.getByRole("searchbox"), "存在しない");
    expect(screen.getByText("条件に合うプロジェクトはありません。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "条件をクリア" }));
    expect(screen.getByText("3 projects")).toBeInTheDocument();
  });

  it("toggles tag filters without losing other projects", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={projects} />);

    const tag = screen.getByRole("button", { name: "Next.js" });
    await user.click(tag);
    expect(tag).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("1 projects")).toBeInTheDocument();

    await user.click(tag);
    expect(screen.getByText("3 projects")).toBeInTheDocument();
  });

  it("renders the planned status and supports compact presentation", () => {
    render(<ProjectExplorer projects={projects} compact />);

    expect(screen.getByText("構想中")).toBeInTheDocument();
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });
});
