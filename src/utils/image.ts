/**
 * Appends Contentful's Images API transform params (on-the-fly resize +
 * format conversion) to a Contentful asset URL. No-ops for any other URL,
 * so it's safe to call on all image sources.
 */
export function ctfImg(url: string, width: number, quality = 75): string {
  if (!url.includes("images.ctfassets.net")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&fm=webp&q=${quality}`;
}
