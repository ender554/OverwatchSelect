// src/utils/computeHeroSynergyScore.ts

import type {
  ITankType,
  IDamageType,
  ISupportType,
  IHeroType,
  TankNeeds,
  SupportNeeds,
  DamageNeeds,
  Drawbacks,
} from "../types/HeroTypes";

// Define a type alias for heroes that include synergy-related properties.
export type SynergyHero = ITankType | IDamageType | ISupportType;

// Aggregated team data (using strings for attributes).
export interface AggregatedTeamData {
  tankNeedsGroup: TankNeeds[];
  supportNeedsGroup: SupportNeeds[];
  damageNeedsGroup: DamageNeeds[];
  drawbacksGroup: Drawbacks[];
  hatesGroup: string[];
  // Array of hero names (unique) that are considered friends on the team.
  friendsGroup: string[];
}

// Scoring weight constants (adjust these as needed)
const TEAM_NEED_POINTS = 4; // Points for each team need fulfilled by hero's provides.
const HERO_NEED_POINTS = 3; // Points for each of the hero's own needs met by the team.
const HATE_PENALTY_POINTS = -2; // Penalty per hated hero present.
const DRAWBACK_PENALTY_POINTS = -3; // Penalty per drawback conflict.
// const FRIEND_BONUS_POINTS = 10; // Bonus per friend present on the team.

// Helper: Return the hero's "provides" array (if any), or an empty array.
function getHeroProvides(hero: SynergyHero): string[] {
  return hero.provides || [];
}

// Helper: Return the hero's "needs" as a combination of role‐specific needs.
// For Tanks, use supportNeeds and damageNeeds.
// For Damage and Support, use tankNeeds, supportNeeds, and damageNeeds.
function getHeroNeeds(hero: SynergyHero): string[] {
  if (hero.role === "Tank") {
    return [...(hero.supportNeeds || []), ...(hero.damageNeeds || [])];
  } else if (hero.role === "Damage") {
    return [
      ...(hero.tankNeeds || []),
      ...(hero.supportNeeds || []),
      ...(hero.damageNeeds || []),
    ];
  } else if (hero.role === "Support") {
    return [
      ...(hero.tankNeeds || []),
      ...(hero.damageNeeds || []),
      ...(hero.supportNeeds || []),
    ];
  }
  return [];
}

/**
 * Computes the synergy score for a given hero based on aggregated team data.
 *
 * This function is role‐aware and works for any team composition (including 6v6)
 * as long as the aggregated team data is built from the full team selection.
 *
 * @param hero - The hero (of type SynergyHero) for which to compute the synergy score.
 * @param aggregated - The aggregated team data.
 * @returns A synergy score (which may be clamped as needed).
 */
export function computeHeroSynergyScore(
  hero: SynergyHero,
  aggregated: AggregatedTeamData
): number {
  let score = 0;

  // 1. Team Needs Fulfillment:
  // Combine all team needs into one set.
  const teamNeedsSet = new Set<string>([
    ...aggregated.tankNeedsGroup,
    ...aggregated.supportNeedsGroup,
    ...aggregated.damageNeedsGroup,
  ]);
  const heroProvides = getHeroProvides(hero);
  const matches = heroProvides.filter((attr) => teamNeedsSet.has(attr));
  score += matches.length * TEAM_NEED_POINTS;

  // 2. Hero's Own Needs Fulfillment:
  const heroNeeds = getHeroNeeds(hero);
  // We assume that if a need is in the team's needs, it is being met.
  const needMatches = heroNeeds.filter((need) => teamNeedsSet.has(need));
  score += needMatches.length * HERO_NEED_POINTS;

  // 3. Friend Bonus:
  // (Uncomment and adjust if you wish to award bonus points for friends.)
  // if (hero.friends) {
  //   const friendMatches = hero.friends.filter((friend) =>
  //     aggregated.friendsGroup.includes(friend.name)
  //   );
  //   score += friendMatches.length * FRIEND_BONUS_POINTS;
  // }

  // 4. Hate Penalty:
  if (hero.hates) {
    const hateMatches = hero.hates.filter((hate) =>
      aggregated.hatesGroup.includes(hate)
    );
    score += hateMatches.length * HATE_PENALTY_POINTS;
  }

  // 5. Drawback Penalty:
  if (hero.drawbacks) {
    const drawbackMatches = hero.drawbacks.filter((db) =>
      aggregated.drawbacksGroup.includes(db)
    );
    score += drawbackMatches.length * DRAWBACK_PENALTY_POINTS;
  }

  return Math.round(score);
}
