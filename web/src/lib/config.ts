// Rules of the official provisional exam — enforced server-side.
export const EXAM = {
  count: 20,
  minutes: 20,
  passRatio: 0.6, // 12/20
  graceSeconds: 30, // network slack after expiry before answers are refused
} as const;

export const PRACTICE = {
  counts: [10, 20, 40] as const,
  defaultCount: 10,
} as const;

// UI category keys <-> stored category values ("posts" is the legacy value for road signs)
export const CATEGORY_VALUES: Record<string, string> = {
  general: "general",
  signs: "posts",
};

export function passMark(total: number) {
  return Math.ceil(total * EXAM.passRatio);
}
