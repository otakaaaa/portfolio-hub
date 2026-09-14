import { describe, expect, it } from "vitest";
import { contentSlugSchema, logFrontmatterSchema, projectFrontmatterSchema } from "./content";

describe("content frontmatter schemas", () => {
  it("accepts a complete project frontmatter object", () => {
    const parsed = projectFrontmatterSchema.parse({
      title: "Portfolio Hub",
      summary: "学びと制作過程を伝えるポートフォリオ",
      publishedAt: "2026-09-13",
      tags: ["Next.js"],
      status: "building",
      featured: true,
      tech: ["TypeScript"],
    });

    expect(parsed.title).toBe("Portfolio Hub");
  });

  it("rejects malformed dates and empty tag names", () => {
    expect(() =>
      logFrontmatterSchema.parse({
        title: "学習ログ",
        summary: "テスト",
        publishedAt: "13/09/2026",
        tags: [""],
      }),
    ).toThrow();
  });

  it("allows only HTTP or HTTPS project links", () => {
    const baseProject = {
      title: "Portfolio Hub",
      summary: "学びと制作過程を伝えるポートフォリオ",
      publishedAt: "2026-09-13",
      tags: ["Next.js"],
      status: "building",
      featured: true,
      tech: ["TypeScript"],
    } as const;

    expect(() =>
      projectFrontmatterSchema.parse({
        ...baseProject,
        demoUrl: "javascript:alert(1)",
      }),
    ).toThrow();
    expect(
      projectFrontmatterSchema.parse({
        ...baseProject,
        demoUrl: "https://example.com/demo",
      }).demoUrl,
    ).toBe("https://example.com/demo");
  });

  it("limits slugs to a filesystem-safe length", () => {
    expect(() => contentSlugSchema.parse("a".repeat(101))).toThrow();
  });
});
