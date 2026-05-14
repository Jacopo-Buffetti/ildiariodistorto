import { decode } from "he";

export function decodeHtmlEntities(value: string): string {
  return decode(value);
}

export function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, ""));
}
