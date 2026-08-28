"use client";

import { Turnstile } from "@marsidev/react-turnstile";

// Renders nothing when the site key isn't configured (local dev).
export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  return <Turnstile siteKey={siteKey} onSuccess={onToken} options={{ size: "flexible" }} />;
}
