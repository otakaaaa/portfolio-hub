import { describe, expect, it } from "vitest";
import { listPreviewOrigins, resolvePreviewUrl } from "./preview-registry";

describe("preview registry", () => {
  it("uses local URLs only while developing", () => {
    expect(resolvePreviewUrl("finde", { environment: {}, mode: "development" })).toBe(
      "http://localhost:5173/preview",
    );
    expect(resolvePreviewUrl("finde", { environment: {}, mode: "production" })).toBeUndefined();
  });

  it("accepts only HTTP(S) URLs from the matching allowlisted setting", () => {
    expect(
      resolvePreviewUrl("code-garden", {
        environment: {
          PORTFOLIO_SITE_ORIGIN: "https://portfolio.example.com",
          CODE_GARDEN_PREVIEW_URL: "https://preview.example.com/preview",
        },
        mode: "production",
      }),
    ).toBe("https://preview.example.com/preview");
    expect(() =>
      resolvePreviewUrl("code-garden", {
        environment: {
          PORTFOLIO_SITE_ORIGIN: "https://portfolio.example.com",
          CODE_GARDEN_PREVIEW_URL: "javascript:alert(1)",
        },
        mode: "production",
      }),
    ).toThrow();
  });

  it("deduplicates origins used by Content Security Policy", () => {
    expect(
      listPreviewOrigins({
        environment: {
          PORTFOLIO_SITE_ORIGIN: "https://portfolio.example.com",
          FINDE_PREVIEW_URL: "https://preview.example.com/finde",
          HOUSE_REVIEW_PREVIEW_URL: "https://preview.example.com/house",
        },
        mode: "production",
      }),
    ).toEqual(["https://preview.example.com"]);
  });

  it("rejects preview apps hosted on the portfolio origin", () => {
    expect(() => resolvePreviewUrl("finde", {
      environment: {
        PORTFOLIO_SITE_ORIGIN: "https://portfolio.example.com",
        FINDE_PREVIEW_URL: "https://portfolio.example.com/finde-preview",
      },
      mode: "production",
    })).toThrow(/separate/);
  });

  it("requires the portfolio origin when production previews are enabled", () => {
    expect(() => resolvePreviewUrl("finde", {
      environment: { FINDE_PREVIEW_URL: "https://preview.example.com/finde" },
      mode: "production",
    })).toThrow(/PORTFOLIO_SITE_ORIGIN/);
  });
});
