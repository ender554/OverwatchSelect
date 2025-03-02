// src/types/HeroMapScore.ts
export interface HeroMapScore {
  hero: string;
  role: string;
  mean: number;
  stdDev: number;
  mapScores: {
    [mapName: string]: {
      score: number;
    };
  };
}
