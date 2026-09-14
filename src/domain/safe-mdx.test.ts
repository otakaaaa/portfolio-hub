import { describe, expect, it } from "vitest";
import { assertSafeMdx } from "./safe-mdx";

describe("assertSafeMdx", () => {
  it.each([
    '<script src="https://evil.example/x.js"></script>',
    '<iframe src="https://evil.example"></iframe>',
    "{globalThis.fetch('https://evil.example')}",
    "export const value = 1",
    '\\`<script>alert(document.domain)</script>`',
  ])("rejects executable MDX: %s", async (source) => {
    await expect(assertSafeMdx(source)).rejects.toThrow("使用できません");
  });

  it("allows code examples without interpreting them", async () => {
    await expect(
      assertSafeMdx("```tsx\nconst view = <p>{message}</p>\n```")
    ).resolves.toBeUndefined();
  });
});
