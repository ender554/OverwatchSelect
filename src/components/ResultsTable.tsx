// src/components/ResultsTable.tsx
import React, { useMemo, useEffect } from "react";
import { useMapScoreContext } from "../context/MapScoreContext";
import { useTeamCompContext } from "../context/TeamCompContext";
import { bellCurveTransform } from "../utils/heroScores";

// Helper to sanitize hero names for image filenames.
const sanitizeHeroName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const ResultsTable: React.FC = () => {
  const { selectedMapName, selectedRole, heroMapScores } = useMapScoreContext();
  const teamContext = useTeamCompContext();

  useEffect(() => {
    console.log("Full Team Context:", teamContext);
  }, [teamContext]);

  // If no map is selected, we'll show all heroes (using defaults).
  const sortedHeroRankings = useMemo(() => {
    if (!selectedMapName) return heroMapScores;
    const relevantHeroes = heroMapScores.filter(
      (hero) => hero.mapScores[selectedMapName] !== undefined
    );
    relevantHeroes.sort(
      (a, b) =>
        b.mapScores[selectedMapName].score - a.mapScores[selectedMapName].score
    );
    return relevantHeroes;
  }, [selectedMapName, heroMapScores]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        {(selectedRole === "All" || selectedRole === "Tank") && (
          <div style={{ flex: 1, margin: "0 1rem" }}>
            <h3>Tanks</h3>
            <table border={1} cellPadding={4}>
              <thead>
                <tr>
                  <th>Hero</th>
                  <th>Bell-Curved Score</th>
                  <th>Synergy Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedHeroRankings
                  .filter((hero) => hero.role === "Tank")
                  .map((hero) => {
                    const rawScore = selectedMapName
                      ? hero.mapScores[selectedMapName].score
                      : 0;
                    const bcScore = selectedMapName
                      ? bellCurveTransform(rawScore, hero.mean, hero.stdDev)
                      : 0;
                    return (
                      <tr key={hero.name}>
                        <td>
                          <img
                            src={`/heroThumbs/${sanitizeHeroName(
                              hero.name
                            )}.png`}
                            alt={hero.name}
                            width={75}
                            height={75}
                          />
                          <div>{hero.name}</div>
                        </td>
                        <td>{bcScore.toFixed(2)}</td>
                        <td>{hero.synergyScore}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {(selectedRole === "All" || selectedRole === "Damage") && (
          <div style={{ flex: 1, margin: "0 1rem" }}>
            <h3>Damage</h3>
            <table border={1} cellPadding={4}>
              <thead>
                <tr>
                  <th>Hero</th>
                  <th>Bell-Curved Score</th>
                  <th>Synergy Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedHeroRankings
                  .filter((hero) => hero.role === "Damage")
                  .map((hero) => {
                    const rawScore = selectedMapName
                      ? hero.mapScores[selectedMapName].score
                      : 0;
                    const bcScore = selectedMapName
                      ? bellCurveTransform(rawScore, hero.mean, hero.stdDev)
                      : 0;
                    return (
                      <tr key={hero.name}>
                        <td>
                          <img
                            src={`/heroThumbs/${sanitizeHeroName(
                              hero.name
                            )}.png`}
                            alt={hero.name}
                            width={75}
                            height={75}
                          />
                          <div>{hero.name}</div>
                        </td>
                        <td>{bcScore.toFixed(2)}</td>
                        <td>{hero.synergyScore}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {(selectedRole === "All" || selectedRole === "Support") && (
          <div style={{ flex: 1, margin: "0 1rem" }}>
            <h3>Supports</h3>
            <table border={1} cellPadding={4}>
              <thead>
                <tr>
                  <th>Hero</th>
                  <th>Bell-Curved Score</th>
                  <th>Synergy Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedHeroRankings
                  .filter((hero) => hero.role === "Support")
                  .map((hero) => {
                    const rawScore = selectedMapName
                      ? hero.mapScores[selectedMapName].score
                      : 0;
                    const bcScore = selectedMapName
                      ? bellCurveTransform(rawScore, hero.mean, hero.stdDev)
                      : 0;
                    return (
                      <tr key={hero.name}>
                        <td>
                          <img
                            src={`/heroThumbs/${sanitizeHeroName(
                              hero.name
                            )}.png`}
                            alt={hero.name}
                            width={75}
                            height={75}
                          />
                          <div>{hero.name}</div>
                        </td>
                        <td>{bcScore.toFixed(2)}</td>
                        <td>{hero.synergyScore}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTable;
