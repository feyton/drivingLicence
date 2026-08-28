// Legacy questions store Quill HTML; new questions are plain text.
// We never render stored HTML raw — strip tags server-side and keep text.
export function htmlToText(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

// Legacy question HTML may embed a road-sign image; surface it as a real image URL.
export function extractImage(s: string | null | undefined): string | null {
  const m = String(s ?? "").match(/<img[^>]*src="([^"]+)"/i);
  return m ? m[1] : null;
}
