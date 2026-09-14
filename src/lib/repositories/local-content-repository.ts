import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  LogDocument,
  LogSummary,
  PortfolioRepository,
  ProjectDocument,
  ProjectSummary,
} from "@/domain/content";
import {
  contentSlugSchema,
  logFrontmatterSchema,
  projectFrontmatterSchema,
} from "@/domain/content";
import { assertSafeMdx } from "@/domain/safe-mdx";

const CONTENT_ROOT = path.join(process.cwd(), "content");
// The detail resolver uses one canonical extension so every listed entry is loadable
// and duplicate slugs cannot be introduced through .md/.mdx pairs.
const CONTENT_EXTENSION = ".mdx";

function newestFirst<T extends { readonly publishedAt: string }>(
  entries: readonly T[],
): T[] {
  return [...entries].sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}

async function listContentFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  return entries
    .filter(
      (entry) =>
        entry.isFile() && path.extname(entry.name) === CONTENT_EXTENSION,
    )
    .map((entry) => path.join(directory, entry.name));
}

async function readSource(filePath: string) {
  const source = await fs.readFile(filePath, "utf8");
  return matter(source);
}

function slugFromPath(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

function toProjectSummary(document: ProjectDocument): ProjectSummary {
  return {
    slug: document.slug,
    title: document.title,
    summary: document.summary,
    publishedAt: document.publishedAt,
    tags: [...document.tags],
    status: document.status,
    featured: document.featured,
    tech: [...document.tech],
    ...(document.repositoryUrl
      ? { repositoryUrl: document.repositoryUrl }
      : {}),
    ...(document.demoUrl ? { demoUrl: document.demoUrl } : {}),
  };
}

function toLogSummary(document: LogDocument): LogSummary {
  return {
    slug: document.slug,
    title: document.title,
    summary: document.summary,
    publishedAt: document.publishedAt,
    tags: [...document.tags],
    featured: document.featured,
  };
}

async function readProject(filePath: string): Promise<ProjectDocument> {
  const { data, content } = await readSource(filePath);
  const frontmatter = projectFrontmatterSchema.parse(data);
  await assertSafeMdx(content);

  return {
    slug: contentSlugSchema.parse(slugFromPath(filePath)),
    ...frontmatter,
    tags: [...frontmatter.tags],
    tech: [...frontmatter.tech],
    body: content.trim(),
  };
}

async function readLog(filePath: string): Promise<LogDocument> {
  const { data, content } = await readSource(filePath);
  const frontmatter = logFrontmatterSchema.parse(data);
  await assertSafeMdx(content);

  return {
    slug: contentSlugSchema.parse(slugFromPath(filePath)),
    ...frontmatter,
    tags: [...frontmatter.tags],
    body: content.trim(),
  };
}

function resolveContentPath(
  collection: "projects" | "logs",
  slug: string,
): string | undefined {
  const parsedSlug = contentSlugSchema.safeParse(slug);
  if (!parsedSlug.success) return undefined;

  return path.join(
    CONTENT_ROOT,
    collection,
    `${parsedSlug.data}${CONTENT_EXTENSION}`,
  );
}

async function readOptional<T>(
  filePath: string | undefined,
  read: (path: string) => Promise<T>,
): Promise<T | undefined> {
  if (!filePath) return undefined;

  try {
    return await read(filePath);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error.code === "ENOENT" || error.code === "ENAMETOOLONG")
    ) {
      return undefined;
    }
    throw error;
  }
}

export const portfolioRepository: PortfolioRepository = {
  async listProjects() {
    const paths = await listContentFiles(path.join(CONTENT_ROOT, "projects"));
    const documents = await Promise.all(paths.map(readProject));
    return newestFirst(documents.map(toProjectSummary));
  },

  async getProject(slug) {
    return readOptional(resolveContentPath("projects", slug), readProject);
  },

  async listLogs() {
    const paths = await listContentFiles(path.join(CONTENT_ROOT, "logs"));
    const documents = await Promise.all(paths.map(readLog));
    return newestFirst(documents.map(toLogSummary));
  },

  async getLog(slug) {
    return readOptional(resolveContentPath("logs", slug), readLog);
  },
};
