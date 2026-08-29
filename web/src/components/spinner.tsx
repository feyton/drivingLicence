import { cn } from "@/lib/utils";

/**
 * Inline activity indicator for buttons and small surfaces.
 * Falls back to a static ring when the viewer prefers reduced motion.
 */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 animate-spin motion-reduce:animate-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
