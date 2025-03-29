import { HeroIdentity, TeamIdentity } from "../types";
import {
  TEMPOS,
  PLAYSTYLE_PRIMARY,
  FORMATIONS,
  WIN_CONDITIONS,
} from "../constants/identity";

export const initializeTeam = (): TeamIdentity => ({
  tempo: null,
  playstyle: { primary: null, subtypes: [] },
  formation: null,
  pressure: [],
  winCondition: null,
  accumulatedProvides: [],
  unmetNeeds: [],
  dislikes: [],
  redundancies: [],
  currentHeroes: [] as (HeroIdentity | null)[],
});

export const addHeroToTeam = (
  team: TeamIdentity,
  hero: HeroIdentity
): TeamIdentity => {
  const updatedHeroes = [...team.currentHeroes, hero];

  const updatedTempo = getMostCommon(
    updatedHeroes
      .filter((h): h is HeroIdentity => h !== null)
      .map((h) => h.tempo)
  );
  const updatedPlaystyle = getMostCommon(
    updatedHeroes
      .filter((h): h is HeroIdentity => h !== null)
      .map((h) => h.playstyle.primary)
  );
  const updatedFormation = getMostCommon(
    updatedHeroes
      .filter((h): h is HeroIdentity => h !== null)
      .map((h) => h.formation)
  );
  const updatedPressure = Array.from(
    new Set(
      updatedHeroes
        .filter((h): h is HeroIdentity => h !== null)
        .map((h) => h.pressure)
    )
  );
  const updatedWinCondition = getMostCommon(
    updatedHeroes
      .filter((h): h is HeroIdentity => h !== null)
      .map((h) => h.winCondition)
  );

  const accumulatedProvides = Array.from(
    new Set(
      updatedHeroes
        .filter((h): h is HeroIdentity => h !== null)
        .flatMap((h) => h.provides)
    )
  );
  const allNeeds = updatedHeroes
    .filter((h): h is HeroIdentity => h !== null)
    .flatMap((h) => h.needs);
  const unmetNeeds = allNeeds.filter((n) => !accumulatedProvides.includes(n));
  const allDislikes = Array.from(
    new Set(
      updatedHeroes
        .filter((h): h is HeroIdentity => h !== null)
        .flatMap((h) => h.dislikes)
    )
  );

  return {
    tempo: updatedTempo,
    playstyle: {
      primary: updatedPlaystyle,
      subtypes: Array.from(
        new Set(
          updatedHeroes
            .filter((h): h is HeroIdentity => h !== null)
            .flatMap((h) => h.playstyle.subtypes)
        )
      ),
    },

    formation: updatedFormation,
    pressure: updatedPressure,
    winCondition: updatedWinCondition,
    accumulatedProvides,
    unmetNeeds,
    dislikes: allDislikes,
    redundancies: [], // to be implemented
    currentHeroes: updatedHeroes,
  };
};

// Simple helper to find most common value
const getMostCommon = <T>(arr: T[]): T | null => {
  if (arr.length === 0) return null;
  const freq: Record<string, number> = {};
  arr.forEach((val) => {
    const key = String(val);
    freq[key] = (freq[key] || 0) + 1;
  });
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0] as T;
};

export const scoreHeroFit = (
  team: TeamIdentity,
  hero: HeroIdentity
): { score: number; reasons: string[] } => {
  let score = 0;
  const reasons: string[] = [];

  // Tempo match
  if (team.tempo && hero.tempo === team.tempo) {
    score += 20;
    reasons.push("Matches tempo");
  } else if (team.tempo) {
    reasons.push("Tempo mismatch");
  }

  // Playstyle match
  if (
    team.playstyle.primary &&
    hero.playstyle.primary === team.playstyle.primary
  ) {
    score += 20;
    reasons.push("Matches playstyle");
  } else if (team.playstyle.primary) {
    reasons.push("Playstyle mismatch");
  }

  // Subtype match (bonus)
  const subtypeMatches = hero.playstyle.subtypes.filter((sub) =>
    team.playstyle.subtypes.includes(sub)
  );
  if (subtypeMatches.length > 0) {
    score += 5;
    reasons.push("Matches playstyle subtype");
  }

  // Formation
  if (team.formation && hero.formation === team.formation) {
    score += 10;
    reasons.push("Matches formation");
  } else if (team.formation) {
    reasons.push("Formation conflict");
  }

  // Pressure
  if (team.pressure.includes(hero.pressure)) {
    score += 10;
    reasons.push("Matches pressure type");
  }

  // Fulfills needs
  const needMatches = hero.provides.filter((p) => team.unmetNeeds.includes(p));
  if (needMatches.length > 0) {
    const points = 10 + needMatches.length * 5;
    score += points; // ✅ Apply it here
    needMatches.forEach((match) =>
      reasons.push(`Fulfills team need: ${match}`)
    );
  }

  // Conflicts with dislikes
  const conflicts = hero.dislikes.filter((d) =>
    [team.tempo, team.playstyle.primary, team.formation].includes(d as any)
  );
  if (conflicts.length > 0) {
    score -= 10;
    reasons.push("Conflicts with team identity");
  }

  return { score, reasons };
};
export const getHeroFits = (
  team: TeamIdentity,
  candidates: HeroIdentity[]
): { hero: HeroIdentity; score: number; reasons: string[] }[] => {
  return candidates.map((hero) => ({
    hero,
    ...scoreHeroFit(team, hero),
  }));
};

export const filterAvailableHeroes = (
  team: TeamIdentity,
  allHeroes: HeroIdentity[]
): HeroIdentity[] => {
  const existingIds = new Set(
    team.currentHeroes.filter((h) => h !== null).map((h) => h!.id)
  );
  return allHeroes.filter((h) => !existingIds.has(h.id));
};
export type HeroFitEvaluation = {
  hero: HeroIdentity;
  addScore: number | null;
  replaceScores: {
    slotIndex: number;
    replacing: HeroIdentity | null; // ← allow null for empty slots
    score: number;
    reasons: string[];
  }[];
};

export const generateFitEvaluations = (
  team: TeamIdentity,
  candidates: HeroIdentity[]
): HeroFitEvaluation[] => {
  const existingIds = new Set(
    team.currentHeroes
      .filter((h): h is HeroIdentity => h !== null)
      .map((h) => h.id)
  );

  return candidates
    .filter((candidate) => !existingIds.has(candidate.id))
    .map((candidate) => {
      const hasEmptySlot = team.currentHeroes.some((slot) => slot === null);

      // Compute addScore by simulating full team identity
      let addScore: number | null = null;
      if (hasEmptySlot) {
        const newHeroes = [...team.currentHeroes];
        const slotIndex = newHeroes.findIndex((h) => h === null);
        newHeroes[slotIndex] = candidate;

        const simulatedTeam = {
          ...initializeTeam(),
          currentHeroes: newHeroes,
        };
        const fullTeam = newHeroes
          .filter((h): h is HeroIdentity => h !== null)
          .reduce((acc, hero) => addHeroToTeam(acc, hero), simulatedTeam);

        addScore = scoreHeroFit(fullTeam, candidate).score;
      }

      const replaceScores = Array.from({ length: 6 }, (_, i) => {
        const currentHero = team.currentHeroes[i] ?? null;

        const newHeroes = [...team.currentHeroes];
        newHeroes[i] = candidate;

        const simulatedTeam = {
          ...initializeTeam(),
          currentHeroes: newHeroes,
        };
        const fullTeam = newHeroes
          .filter((h): h is HeroIdentity => h !== null)
          .reduce((acc, hero) => addHeroToTeam(acc, hero), simulatedTeam);

        const { score, reasons } = scoreHeroFit(fullTeam, candidate);

        return {
          slotIndex: i,
          replacing: currentHero,
          score,
          reasons,
        };
      });

      return {
        hero: candidate,
        addScore,
        replaceScores,
      };
    });
};
