export const TEMPOS = ["fast", "medium", "slow"] as const;
export type Tempo = (typeof TEMPOS)[number];

export const PLAYSTYLE_PRIMARY = ["dive", "brawl", "poke"] as const;
export type PlaystylePrimary = (typeof PLAYSTYLE_PRIMARY)[number];

export const PLAYSTYLE_SUBTYPES = [
  "flank",
  "rush",
  "anchor",
  "disrupt",
  "split",
  "hold",
] as const;
export type PlaystyleSubtype = (typeof PLAYSTYLE_SUBTYPES)[number];

export const FORMATIONS = ["tight", "split", "fluid"] as const;
export type Formation = (typeof FORMATIONS)[number];

export const PRESSURE_TYPES = [
  "burst",
  "sustain",
  "poke",
  "disruption",
] as const;
export type PressureType = (typeof PRESSURE_TYPES)[number];

export const WIN_CONDITIONS = [
  "engage",
  "mid-fight",
  "ult-cycle",
  "attrition",
] as const;
export type WinCondition = (typeof WIN_CONDITIONS)[number];

export type MapTrait =
  | "verticality"
  | "long-sightlines"
  | "flank-heavy"
  | "tight-corridors"
  | "boopable"
  | "open-space"
  | "mobile-objective";
