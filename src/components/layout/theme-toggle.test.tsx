import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./theme-toggle";

const setTheme = vi.fn();
let resolvedTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme, setTheme }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    resolvedTheme = "light";
    setTheme.mockClear();
  });

  it("announces the current action and switches from light to dark", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "ダークテーマに切り替える" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    await user.click(button);
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("announces the action and switches from dark to light", async () => {
    const user = userEvent.setup();
    resolvedTheme = "dark";
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "ライトテーマに切り替える" });
    expect(button).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(button);
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
