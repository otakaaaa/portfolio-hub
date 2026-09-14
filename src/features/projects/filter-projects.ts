import type { ProjectSummary } from "@/domain/content";

function normalize(value: string) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("ja");
}

export function filterProjects(
  projects: readonly ProjectSummary[],
  query: string,
  selectedTags: readonly string[],
): ProjectSummary[] {
  const normalizedQuery = normalize(query);
  const normalizedTags = selectedTags.map(normalize);

  return projects.filter((project) => {
    const searchable = [
      project.title,
      project.summary,
      ...project.tags,
      ...project.tech,
    ]
      .map(normalize)
      .join(" ");
    const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
    const projectTags = project.tags.map(normalize);
    const matchesTags =
      normalizedTags.length === 0 ||
      normalizedTags.some((tag) => projectTags.includes(tag));

    return matchesQuery && matchesTags;
  });
}
