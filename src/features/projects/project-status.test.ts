import { describe, expect, it } from "vitest";
import { getProjectStatusLabel } from "./project-status";

describe("getProjectStatusLabel", () => {
  it.each([
    ["planned", "構想中"],
    ["building", "制作中"],
    ["released", "公開中"],
  ] as const)("maps %s to %s", (status, label) => {
    expect(getProjectStatusLabel(status)).toBe(label);
  });
});
