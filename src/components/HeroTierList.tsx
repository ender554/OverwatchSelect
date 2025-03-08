// src/components/HeroTierList.tsx
import React, { useMemo, useCallback } from "react";
import { useMapScoreContext } from "../context/MapScoreContext";
import { useTeamCompContext } from "../context/TeamCompContext";
import { bellCurveTransform } from "../utils/heroScores";

// Helper to sanitize hero names for image filenames.
const sanitizeHeroName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const HeroTierList: React.FC = () => {
  const { selectedMapName, heroMapScores } = useMapScoreContext();
  const teamContext = useTeamCompContext();

  // Compute overall score:
  const computeOverallScore = useCallback(
    (bcScore: number, synergyScore: number): number =>
      (bcScore * 1.5 + synergyScore) / (synergyScore > 0 ? 2 : 1),
    []
  );

  // Combine hero scores with team context.
  const combinedHeroes = useMemo(() => {
    const heroesWithScores = heroMapScores
      .filter((hero) =>
        selectedMapName ? hero.mapScores[selectedMapName] !== undefined : true
      )
      .map((hero) => {
        const teamHero = teamContext.allHeroes.find(
          (h) => h.name === hero.name
        );
        const rawScore = selectedMapName
          ? hero.mapScores[selectedMapName].score
          : 0;
        const bcScore = selectedMapName
          ? bellCurveTransform(rawScore, hero.mean, hero.stdDev)
          : 0;
        const synergyScore = teamHero ? teamHero.synergyScore : 0;
        const overallScore = computeOverallScore(bcScore, synergyScore);
        return { ...hero, bcScore, synergyScore, overallScore };
      });

    // Find the highest overallScore
    const maxOverallScore = Math.max(
      ...heroesWithScores.map((h) => h.overallScore),
      1
    );

    // Compute weightedScore (normalized score)
    return heroesWithScores
      .map((hero) => ({
        ...hero,
        weightedScore: (hero.overallScore / maxOverallScore) * 100, // Normalize to percentage
      }))
      .sort((a, b) => b.overallScore - a.overallScore); // Sorting remains the same
  }, [
    selectedMapName,
    heroMapScores,
    teamContext.allHeroes,
    computeOverallScore,
  ]);

  // Determine the tier for a given overall score.
  const getTier = (score: number): string => {
    if (score > 95) return "S";
    if (score > 88) return "A";
    if (score > 80) return "B";
    if (score > 70) return "C";
    if (score > 60) return "D";
    return "F";
  };

  // Group heroes by their tier and sort each group from highest to lowest overall score.
  const tierGroups = useMemo(() => {
    const groups: { [key: string]: any[] } = {
      S: [],
      A: [],
      B: [],
      C: [],
      D: [],
      F: [],
    };

    combinedHeroes.forEach((hero) => {
      const tier = getTier(hero.weightedScore);
      groups[tier].push(hero);
    });

    // Sort heroes in each tier by overall score (desc)
    Object.keys(groups).forEach((tier) => {
      groups[tier].sort((a, b) => b.overallScore - a.overallScore);
    });

    // Repeated promotion logic:
    // While S is empty and promotion is still possible, iterate over the tiers and promote.
    const tierOrder = ["S", "A", "B", "C", "D", "F"];
    let promotionOccurred = true;
    while (promotionOccurred && groups["S"].length === 0) {
      promotionOccurred = false;
      for (let i = 0; i < tierOrder.length - 1; i++) {
        if (
          groups[tierOrder[i]].length === 0 &&
          groups[tierOrder[i + 1]].length > 0
        ) {
          groups[tierOrder[i]] = groups[tierOrder[i + 1]];
          groups[tierOrder[i + 1]] = [];
          promotionOccurred = true;
        }
      }
    }

    return groups;
  }, [combinedHeroes]);

  return (
    <div>
      {["S", "A", "B", "C", "D", "F"].map((tier) => (
        <div
          key={tier}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {/* Tier Label */}
          <div style={{ width: "50px", fontWeight: "bold" }}>{tier}</div>
          {/* Heroes in this tier */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {tierGroups[tier].map((hero) => (
              <div
                key={hero.name}
                style={{ marginRight: "1rem", textAlign: "center" }}
              >
                <img
                  src={`/heroThumbs/${sanitizeHeroName(hero.name)}.png`}
                  alt={hero.name}
                  width={75}
                  height={75}
                />
                <div>{hero.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroTierList;
