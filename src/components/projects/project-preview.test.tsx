import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectPreview } from "./project-preview";

describe("ProjectPreview", () => {
  it("renders a constrained, lazy iframe and an external fallback", () => {
    render(
      <ProjectPreview
        title="FINDE"
        previewUrl="https://preview.example.com/preview"
      />,
    );

    expect(screen.getByTitle("FINDE 操作プレビュー")).toHaveAttribute(
      "sandbox",
      "allow-scripts allow-forms allow-same-origin allow-downloads",
    );
    expect(screen.getByTitle("FINDE 操作プレビュー")).toHaveAttribute("loading", "lazy");
    expect(screen.getByRole("link", { name: "別タブで開く" })).toHaveAttribute(
      "rel",
      "noreferrer",
    );
  });
});
