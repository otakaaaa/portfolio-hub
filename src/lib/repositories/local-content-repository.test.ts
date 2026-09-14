import { describe, expect, it } from "vitest";
import { portfolioRepository } from "./local-content-repository";

describe("local content repository", () => {
  it("lists projects newest first without exposing their body", async () => {
    const projects = await portfolioRepository.listProjects();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]?.slug).toBe("portfolio-hub");
    expect(projects[0]).not.toHaveProperty("body");
  });

  it("loads a project by slug and returns undefined for an unknown slug", async () => {
    const project = await portfolioRepository.getProject("portfolio-hub");

    expect(project?.body).toContain("このプロジェクトについて");
    await expect(portfolioRepository.getProject("missing-project")).resolves.toBeUndefined();
  });

  it("lists and loads learning logs", async () => {
    const logs = await portfolioRepository.listLogs();
    const log = logs[0]
      ? await portfolioRepository.getLog(logs[0].slug)
      : undefined;

    expect(logs.length).toBeGreaterThan(0);
    expect(log?.body.length).toBeGreaterThan(0);
  });
});
