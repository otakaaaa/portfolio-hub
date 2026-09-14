import { describe, expect, it } from "vitest";
import { isAllowedContentHref } from "./content-link";

describe("isAllowedContentHref", () => {
  it.each(["/projects", "#section", "https://example.com", "mailto:hello@example.com"])(
    "allows %s",
    (href) => expect(isAllowedContentHref(href)).toBe(true),
  );

  it.each(["//evil.example", "http://example.com", "javascript:alert(1)"])(
    "rejects %s",
    (href) => expect(isAllowedContentHref(href)).toBe(false),
  );
});
