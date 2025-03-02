// src/components/ResultsTable.tsx
import React, { useMemo } from "react";
import { useMapScoreContext } from "../context/MapScoreContext";
import { maps } from "../data/maps";
import { bellCurveTransform } from "../utils/heroScores";

// Helper function to sanitize hero names for image file names
const sanitizeHeroName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const ResultsTable: React.FC = () => {
  const { selectedMapName, selectedRole, heroMapScores } = useMapScoreContext();

  // Sort heroes for the selected map.
  const sortedHeroRankings = useMemo(() => {
    if (!selectedMapName) return [];
    const relevantHeroes = heroMapScores.filter(
      (hms) => hms.mapScores[selectedMapName]
    );
    relevantHeroes.sort(
      (a, b) =>
        b.mapScores[selectedMapName].score - a.mapScores[selectedMapName].score
    );
    return relevantHeroes;
  }, [selectedMapName, heroMapScores]);

  const currentMap = useMemo(
    () => maps.find((map) => map.name === selectedMapName),
    [selectedMapName]
  );

  if (!selectedMapName || !currentMap) {
    return null;
  }

  const tanksData = sortedHeroRankings.filter((hms) => hms.role === "Tank");
  const damageData = sortedHeroRankings.filter((hms) => hms.role === "Damage");
  const supportData = sortedHeroRankings.filter(
    (hms) => hms.role === "Support"
  );

  return (
    <div>
      <h2>Hero Map Scores for {selectedMapName}</h2>
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
                </tr>
              </thead>
              <tbody>
                {tanksData.map((hms) => {
                  const { score } = hms.mapScores[selectedMapName];
                  const bcScore = bellCurveTransform(
                    score,
                    hms.mean,
                    hms.stdDev
                  );
                  return (
                    <tr key={hms.hero}>
                      <td>
                        <img
                          src={`/heroThumbs/${sanitizeHeroName(hms.hero)}.png`}
                          alt={hms.hero}
                          width={75}
                          height={75}
                        />
                      </td>
                      <td>{bcScore.toFixed(2)}</td>
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
                </tr>
              </thead>
              <tbody>
                {damageData.map((hms) => {
                  const { score } = hms.mapScores[selectedMapName];
                  const bcScore = bellCurveTransform(
                    score,
                    hms.mean,
                    hms.stdDev
                  );
                  return (
                    <tr key={hms.hero}>
                      <td>
                        <img
                          src={`/heroThumbs/${sanitizeHeroName(hms.hero)}.png`}
                          alt={hms.hero}
                          width={75}
                          height={75}
                        />
                      </td>
                      <td>{bcScore.toFixed(2)}</td>
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
                </tr>
              </thead>
              <tbody>
                {supportData.map((hms) => {
                  const { score } = hms.mapScores[selectedMapName];
                  const bcScore = bellCurveTransform(
                    score,
                    hms.mean,
                    hms.stdDev
                  );
                  return (
                    <tr key={hms.hero}>
                      <td>
                        <img
                          src={`/heroThumbs/${sanitizeHeroName(hms.hero)}.png`}
                          alt={hms.hero}
                          width={75}
                          height={75}
                        />
                      </td>
                      <td>{bcScore.toFixed(2)}</td>
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
