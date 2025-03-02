// src/utils/heroScores.ts
import { maps } from "../data/maps";
import { tanks, supports, damage } from "../data/heroesUpdated";
import scoreMapForHero from "./scoreMapForHero";

// Combine heroes and create a role lookup.
export const allHeroes = [...tanks, ...supports, ...damage];
export const heroRoles: Record<string, "Tank" | "Damage" | "Support"> = {};
tanks.forEach((t) => (heroRoles[t.name] = "Tank"));
damage.forEach((d) => (heroRoles[d.name] = "Damage"));
supports.forEach((s) => (heroRoles[s.name] = "Support"));

export interface HeroMapScore {
  hero: string;
  role: "Tank" | "Damage" | "Support";
  rawScores: number[]; // All raw map scores for this hero
  mapScores: {
    [mapName: string]: {
      score: number; // Raw score = 100 - rank
      rank: number; // Hero's place on that map
      normalizedScore: number;
    };
  };
  mean: number;
  stdDev: number;
}

export function computeAllHeroMapScores(): HeroMapScore[] {
  return allHeroes.map((heroData) => {
    const heroName = heroData.name;
    const role = heroRoles[heroName];

    const mapEntries = maps.map((map) => {
      const normalizedScore = scoreMapForHero(map.properties, heroData);
      return { map: map.name, normalizedScore };
    });
    mapEntries.sort((a, b) => b.normalizedScore - a.normalizedScore);

    const mapScores: {
      [mapName: string]: {
        score: number;
        rank: number;
        normalizedScore: number;
      };
    } = {};
    const rawScoresArray: number[] = [];
    mapEntries.forEach((entry, index) => {
      const rank = index + 1;
      const rawScore = 100 - rank;
      mapScores[entry.map] = {
        score: rawScore,
        rank,
        normalizedScore: entry.normalizedScore,
      };
      rawScoresArray.push(rawScore);
    });

    const N = rawScoresArray.length;
    const mean = rawScoresArray.reduce((acc, val) => acc + val, 0) / (N || 1);
    const variance =
      rawScoresArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      (N || 1);
    const stdDev = Math.sqrt(variance);

    return {
      hero: heroName,
      role,
      rawScores: rawScoresArray,
      mapScores,
      mean,
      stdDev,
    };
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
