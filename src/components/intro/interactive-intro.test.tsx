import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { InteractiveIntro } from "./interactive-intro";

describe("InteractiveIntro", () => {
  it("shows an answer and can restart the conversation", async () => {
    const user = userEvent.setup();
    render(<InteractiveIntro />);

    await user.click(screen.getByRole("button", { name: "何を作る人？" }));
    expect(screen.getByText(/課題を観察して/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "最初から見る" }));
    expect(screen.getByText("どこから話しましょう？")).toBeInTheDocument();
  });
});
