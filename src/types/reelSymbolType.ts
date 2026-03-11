export const REEL_SYMBOLS = [
  "bar",
  "bell",
  "cherry",
  "diamond",
  "lemon",
  "plum",
  "seven",
  "wild",
] as const;

export type ReelSymbolType = (typeof REEL_SYMBOLS)[number];
