import { stripHtml } from "@/utils/html-text";

export function htmlToKoboText(html: string): string {
  return stripHtml(
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
      .replace(/<\s*br\b[^>]*>/gi, "\n")
      .replace(/<\/p\s*>/gi, "\n\n")
      .replace(/<\/(div|li|h[1-6]|blockquote|pre)\s*>/gi, "\n")
      .replace(/<li\b[^>]*>/gi, "• ")
  )
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/\u200b/g, "")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
