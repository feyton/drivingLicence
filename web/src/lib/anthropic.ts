import { createAnthropic } from "@ai-sdk/anthropic";

export function anthropic() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  return createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// Cheap model for chat/coaching; the extraction pipeline uses the bigger one.
export const COACH_MODEL = process.env.COACH_MODEL || "claude-haiku-4-5-20251001";
