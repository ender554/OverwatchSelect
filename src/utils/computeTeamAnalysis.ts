// src/utils/computeTeamAnalysis.ts
import type { ITankType, IDamageType, ISupportType } from "../types/HeroTypes";

export interface AggregatedRoleData {
  needs: string[];
  provides: string[];
  hates: string[];
}

export interface TeamAnalysis {
  totalNeeds: string[];
  totalProvides: string[];
  totalHates: string[];
  tank: AggregatedRoleData;
  damage: AggregatedRoleData;
  support: AggregatedRoleData;
  individualSynergy: Record<string, number>;
}

// For simplicity, we treat a hero as one of these types.
export type HeroType = ITankType | IDamageType | ISupportType;

// Helpers to extract properties.
function getHeroNeeds(hero: HeroType): string[] {
  if (hero.role === "Tank") {
    return [...hero.supportNeeds, ...hero.damageNeeds];
  } else if (hero.role === "Damage") {
    return [...hero.tankNeeds, ...hero.supportNeeds, ...hero.damageNeeds];
  } else if (hero.role === "Support") {
    return [...hero.tankNeeds, ...hero.damageNeeds, ...hero.supportNeeds];
  }
  return [];
}

function getHeroProvides(hero: HeroType): string[] {
  return hero.provides || [];
}

function getHeroHates(hero: HeroType): string[] {
  return hero.hates || [];
}

export function computeTeamAnalysis(team: {
  tank: HeroType | null;
  damage: [HeroType | null, HeroType | null];
  support: [HeroType | null, HeroType | null];
}): TeamAnalysis {
  // Gather non-null heroes.
  const heroes: HeroType[] = [
    team.tank,
    team.damage[0],
    team.damage[1],
    team.support[0],
    team.support[1],
  ].filter((h): h is HeroType => h !== null);

  const totalNeeds: string[] = [];
  const totalProvides: string[] = [];
  const totalHates: string[] = [];

  const tankAgg: AggregatedRoleData = { needs: [], provides: [], hates: [] };
  const damageAgg: AggregatedRoleData = { needs: [], provides: [], hates: [] };
  const supportAgg: AggregatedRoleData = { needs: [], provides: [], hates: [] };

  heroes.forEach((hero) => {
    const needs = getHeroNeeds(hero);
    const provides = getHeroProvides(hero);
    const hates = getHeroHates(hero);

    totalNeeds.push(...needs);
    totalProvides.push(...provides);
    totalHates.push(...hates);

    if (hero.role === "Tank") {
      tankAgg.needs.push(...needs);
      tankAgg.provides.push(...provides);
      tankAgg.hates.push(...hates);
    } else if (hero.role === "Damage") {
      damageAgg.needs.push(...needs);
      damageAgg.provides.push(...provides);
      damageAgg.hates.push(...hates);
    } else if (hero.role === "Support") {
      supportAgg.needs.push(...needs);
      supportAgg.provides.push(...provides);
      supportAgg.hates.push(...hates);
    }
  });

  // Compute individual synergy scores.
  const individualSynergy: Record<string, number> = {};
  heroes.forEach((hero) => {
    const heroNeeds = getHeroNeeds(hero);
    const otherHeroes = heroes.filter((h) => h.name !== hero.name);
    const otherProvides = otherHeroes.reduce<string[]>(
      (acc, h) => acc.concat(getHeroProvides(h)),
      []
    );
    let score = 0;
    heroNeeds.forEach((need) => {
      if (otherProvides.includes(need)) {
        score += 10;
      } else {
        score -= 5;
      }
    });
    individualSynergy[hero.name] = otherHeroes.length ? score : 0.0;
  });

  return {
    totalNeeds,
    totalProvides,
    totalHates,
    tank: tankAgg,
    damage: damageAgg,
    support: supportAgg,
    individualSynergy,
  };
}
