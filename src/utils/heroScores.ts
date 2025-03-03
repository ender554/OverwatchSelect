// src/utils/heroScores.ts
import { tanks, supports, damage } from "../data/heroesUpdated";
import { maps } from "../data/maps";
import type { IHeroType } from "../types/HeroTypes";
import scoreMapForHero from "./scoreMapForHero";

export function computeAllHeroMapScores(): IHeroType[] {
  const allHeroes = [...tanks, ...supports, ...damage];
  return allHeroes.map((hero) => {
    const mapScores: {
      [mapName: string]: {
        score: number;
        rank: number;
        normalizedScore: number;
      };
    } = {};
    // Compute a normalized score for each map (replace this with your actual logic)
    const entries = maps.map((map) => {
      const normalizedScore = scoreMapForHero(map.properties, hero);
      return { map: map.name, normalizedScore };
    });
    entries.sort((a, b) => b.normalizedScore - a.normalizedScore);

    const rawScores: number[] = [];
    entries.forEach((entry, i) => {
      const rank = i + 1;
      const score = 100 - rank;
      mapScores[entry.map] = {
        score,
        rank,
        normalizedScore: entry.normalizedScore,
      };
      rawScores.push(score);
    });

    const N = rawScores.length;
    const mean = rawScores.reduce((acc, val) => acc + val, 0) / (N || 1);
    const variance =
      rawScores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      (N || 1);
    const stdDev = Math.sqrt(variance);

    return {
      ...hero,
      synergyScore: 0.0, // Initialize synergyScore to 0.0
      mapScores,
      rawScores,
      mean,
      stdDev,
    } as IHeroType;
  });
}

export function bellCurveTransform(
  rawScore: number,
  heroMean: number,
  heroStd: number
): number {
  if (heroStd === 0) return 75;
  const z = (rawScore - heroMean) / heroStd;
  return 75 + 10 * z;
}
