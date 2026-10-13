import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectLinks } from "./project-links";

describe("ProjectLinks", () => {
  it("renders safe external project actions when supplied", () => {
    render(<ProjectLinks demoUrl="https://example.com/demo" repositoryUrl="https://github.com/example/project" />);

    expect(screen.getByRole("link", { name: "デモを見る" })).toHaveAttribute("rel", "noreferrer");
    expect(screen.getByRole("link", { name: "ソースを見る" })).toHaveAttribute("target", "_blank");
  });

  it("renders nothing when no URL is supplied", () => {
    const { container } = render(<ProjectLinks />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each optional action independently", () => {
    const { rerender } = render(<ProjectLinks demoUrl="https://example.com/demo" />);
    expect(screen.getByRole("link", { name: "デモを見る" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "ソースを見る" })).not.toBeInTheDocument();

    rerender(<ProjectLinks repositoryUrl="https://github.com/example/project" />);
    expect(screen.getByRole("link", { name: "ソースを見る" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "デモを見る" })).not.toBeInTheDocument();
  });

  it("renders the internal interactive preview separately from external links", () => {
    render(
      <ProjectLinks
        previewHref="/projects/finde/preview"
        repositoryUrl="https://github.com/otakaaaa/finde"
      />,
    );

    expect(screen.getByRole("link", { name: "操作プレビュー" })).toHaveAttribute(
      "href",
      "/projects/finde/preview",
    );
    expect(screen.getByRole("link", { name: "操作プレビュー" })).not.toHaveAttribute(
      "target",
    );
  });
});
