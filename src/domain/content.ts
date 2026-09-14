import { z } from "zod";

const nonEmptyText = z.string().trim().min(1);
const stringList = z.array(nonEmptyText).min(1);
const webUrl = z.url({ protocol: /^https?$/ });

export const contentSlugSchema = z
  .string()
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case");

export const projectFrontmatterSchema = z.object({
  title: nonEmptyText,
  summary: nonEmptyText,
  publishedAt: z.iso.date(),
  tags: stringList,
  status: z.enum(["planned", "building", "released"]),
  featured: z.boolean().default(false),
  tech: stringList,
  repositoryUrl: webUrl.optional(),
  demoUrl: webUrl.optional(),
});

export const logFrontmatterSchema = z.object({
  title: nonEmptyText,
  summary: nonEmptyText,
  publishedAt: z.iso.date(),
  tags: stringList,
  featured: z.boolean().default(false),
});

export type ProjectStatus = z.infer<typeof projectFrontmatterSchema>["status"];

export type ProjectSummary = Readonly<{
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: readonly string[];
  status: ProjectStatus;
  featured: boolean;
  tech: readonly string[];
  repositoryUrl?: string;
  demoUrl?: string;
}>;

export type ProjectDocument = Readonly<ProjectSummary & { body: string }>;

export type LogSummary = Readonly<{
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: readonly string[];
  featured: boolean;
}>;

export type LogDocument = Readonly<LogSummary & { body: string }>;

export interface PortfolioRepository {
  listProjects(): Promise<readonly ProjectSummary[]>;
  getProject(slug: string): Promise<ProjectDocument | undefined>;
  listLogs(): Promise<readonly LogSummary[]>;
  getLog(slug: string): Promise<LogDocument | undefined>;
}
