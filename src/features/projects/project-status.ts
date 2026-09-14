import type { ProjectStatus } from "@/domain/content";

const STATUS_LABELS: Readonly<Record<ProjectStatus, string>> = {
  planned: "構想中",
  building: "制作中",
  released: "公開中",
};

export function getProjectStatusLabel(status: ProjectStatus): string {
  return STATUS_LABELS[status];
}
