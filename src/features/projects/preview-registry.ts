import type { PreviewKey } from "../../domain/content";

type PreviewEnvironment = Readonly<Record<string, string | undefined>>;
type PreviewMode = "development" | "production" | "test";

type ResolveOptions = Readonly<{
  environment?: PreviewEnvironment;
  mode?: PreviewMode;
}>;

const registry: Readonly<
  Record<PreviewKey, Readonly<{ environmentKey: string; developmentUrl: string }>>
> = {
  finde: {
    environmentKey: "FINDE_PREVIEW_URL",
    developmentUrl: "http://localhost:5173/preview",
  },
  "house-review": {
    environmentKey: "HOUSE_REVIEW_PREVIEW_URL",
    developmentUrl: "http://localhost:5174/preview",
  },
  "invoice-generator": {
    environmentKey: "INVOICE_GENERATOR_PREVIEW_URL",
    developmentUrl: "http://localhost:3001/create?demo=1",
  },
  "code-garden": {
    environmentKey: "CODE_GARDEN_PREVIEW_URL",
    developmentUrl: "http://localhost:3002/preview",
  },
};

const previewKeys = Object.keys(registry) as PreviewKey[];

function normalizePreviewUrl(value: string, mode: PreviewMode): string {
  const url = new URL(value);
  const isHttp = url.protocol === "http:" || url.protocol === "https:";
  const isLocalDevelopment = mode === "development" && url.hostname === "localhost";

  if (!isHttp || url.username || url.password) {
    throw new Error("Preview URLs must be credential-free HTTP(S) URLs");
  }
  if (url.protocol !== "https:" && !isLocalDevelopment) {
    throw new Error("Production preview URLs must use HTTPS");
  }

  return url.toString();
}

function assertSeparatePreviewOrigin(
  previewUrl: string,
  environment: PreviewEnvironment,
  mode: PreviewMode,
) {
  const siteOrigin = environment.PORTFOLIO_SITE_ORIGIN?.trim();
  if (!siteOrigin) {
    if (mode === "production") {
      throw new Error("PORTFOLIO_SITE_ORIGIN is required when production previews are enabled");
    }
    return;
  }
  const normalizedSiteOrigin = normalizePreviewUrl(siteOrigin, mode);
  if (new URL(previewUrl).origin === new URL(normalizedSiteOrigin).origin) {
    throw new Error("Preview apps must use an origin separate from portfolio-hub");
  }
}

function getOptions(options: ResolveOptions = {}) {
  return {
    environment: options.environment ?? process.env,
    mode: options.mode ?? (process.env.NODE_ENV as PreviewMode),
  };
}

export function resolvePreviewUrl(
  previewKey: PreviewKey,
  options: ResolveOptions = {},
): string | undefined {
  const { environment, mode } = getOptions(options);
  const entry = registry[previewKey];
  const configured = environment[entry.environmentKey]?.trim();
  const candidate = configured || (mode === "development" ? entry.developmentUrl : undefined);

  if (!candidate) return undefined;
  const previewUrl = normalizePreviewUrl(candidate, mode);
  assertSeparatePreviewOrigin(previewUrl, environment, mode);
  return previewUrl;
}

export function listPreviewOrigins(options: ResolveOptions = {}): string[] {
  const origins = previewKeys.flatMap((key) => {
    const previewUrl = resolvePreviewUrl(key, options);
    return previewUrl ? [new URL(previewUrl).origin] : [];
  });

  return [...new Set(origins)];
}
