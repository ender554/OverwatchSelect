// src/components/ResultsTable.tsx
import React, { useMemo, useCallback } from "react";
import { useMapScoreContext } from "../context/MapScoreContext";
import { useTeamCompContext } from "../context/TeamCompContext";
import { useTeamCompSixContext } from "../context/TeamSixContext";
import { bellCurveTransform } from "../utils/heroScores";

// Helper to sanitize hero names for image filenames.
const sanitizeHeroName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

interface ResultsTableProps {
  mode: "5v5" | "6v6";
}

const ResultsTable: React.FC<ResultsTableProps> = ({ mode }) => {
  const { selectedMapName, selectedRole, heroMapScores } = useMapScoreContext();

  // Read from the correct context based on the mode.
  const teamHeroes =
    mode === "5v5"
      ? useTeamCompContext().allHeroes
      : useTeamCompSixContext().allHeroes;

  // Overall score is the weighted average of bell-curved score and synergy score.
  const computeOverallScore = useCallback(
    (bcScore: number, synergyScore: number): number => {
      const MAP_WEIGHT = 0.6;
      const SYNERGY_WEIGHT = 0.4;
      if (synergyScore > 0) {
        return bcScore * MAP_WEIGHT + synergyScore * SYNERGY_WEIGHT;
      }
      return bcScore;
    },
    []
  );

  // Combine heroMapScores with teamHeroes by matching on hero.name.
  // This returns an object containing the computed bell-curved score,
  // synergy score, and overall score.
  const combinedHeroes = useMemo(() => {
    const heroesWithScores = heroMapScores
      .filter((hero) =>
        selectedMapName ? hero.mapScores[selectedMapName] !== undefined : true
      )
      .map((hero) => {
        const teamHero = teamHeroes.find((h) => h.name === hero.name);
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

    // Normalize scores to percentage and sort descending.
    return heroesWithScores
      .map((hero) => ({
        ...hero,
        weightedScore: (hero.overallScore / maxOverallScore) * 100,
      }))
      .sort((a, b) => b.overallScore - a.overallScore);
  }, [selectedMapName, heroMapScores, teamHeroes, computeOverallScore]);

  // Render a table for a given role.
  const renderTableForRole = (role: string) => (
    <div style={{ flex: 1, margin: "0 1rem" }}>
      <h3>{role}s</h3>
      <table border={1} cellPadding={4}>
        <thead>
          <tr>
            <th>Hero</th>
            <th>Real Score</th>
            <th>Bell-Curved Score</th>
            <th>Synergy Score</th>
            <th>Overall Score</th>
          </tr>
        </thead>
        <tbody>
          {combinedHeroes
            .filter((hero) => hero.role === role)
            .map((hero) => (
              <tr key={hero.name}>
                <td>
                  <img
                    src={`/heroThumbs/${sanitizeHeroName(hero.name)}.png`}
                    alt={hero.name}
                    width={75}
                    height={75}
                  />
                  <div>{hero.name}</div>
                </td>
                <td>{hero.weightedScore.toFixed(2)}</td>
                <td>{hero.bcScore.toFixed(2)}</td>
                <td>{hero.synergyScore}</td>
                <td>{hero.overallScore.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {(selectedRole === "All" || selectedRole === "Tank") &&
          renderTableForRole("Tank")}
        {(selectedRole === "All" || selectedRole === "Damage") &&
          renderTableForRole("Damage")}
        {(selectedRole === "All" || selectedRole === "Support") &&
          renderTableForRole("Support")}
      </div>
    </div>
  );
};

export default ResultsTable;
