export function isAllowedContentHref(href: string): boolean {
  return (
    (href.startsWith("/") && !href.startsWith("//")) ||
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}
