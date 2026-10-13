import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { introFlow } from "@/data/intro-flow";
import { InteractiveIntro } from "./interactive-intro";

describe("InteractiveIntro", () => {
  it("shows an answer and can restart the conversation", async () => {
    const user = userEvent.setup();
    render(<InteractiveIntro />);

    const firstChoice = introFlow.nodes[introFlow.startNodeId].choices[0];
    const answer = introFlow.nodes[firstChoice.nextNodeId];

    await user.click(screen.getByRole("button", { name: firstChoice.label }));
    expect(screen.getByText(answer.message)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "最初から見る" }));
    expect(
      screen.getByText(introFlow.nodes[introFlow.startNodeId].message),
    ).toBeInTheDocument();
  });
});
