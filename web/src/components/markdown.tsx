import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { htmlToText } from "@/lib/sanitize";

// Renders explanation/coach text as markdown. Legacy question explanations are
// stored as simple HTML (<p>…</p>); we strip tags to text first so they don't
// render literally, then let markdown handle any real formatting.
export function Markdown({ children, className }: { children: string; className?: string }) {
  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(children);
  const source = looksHtml ? htmlToText(children) : children;
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          a: ({ children, href }) => (
            <a href={href} className="text-primary underline underline-offset-2" target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
          h1: ({ children }) => <p className="mb-1 font-heading font-semibold">{children}</p>,
          h2: ({ children }) => <p className="mb-1 font-heading font-semibold">{children}</p>,
          h3: ({ children }) => <p className="mb-1 font-heading font-semibold">{children}</p>,
          code: ({ children }) => <code className="rounded bg-muted px-1 py-0.5 text-[0.85em]">{children}</code>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
