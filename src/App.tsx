import React, { useState, useMemo } from "react";
import { maps } from "./data/maps";
import { tanks, supports, damage } from "./data/heroesUpdated";
import scoreMapForHero from "./utils/scoreMapForHero";

// Combine all hero arrays into one list.
const allHeroes = [...tanks, ...supports, ...damage];

/**
 * We'll create a lookup so we know each hero's role by name.
 */
const heroRoles: Record<string, "Tank" | "Damage" | "Support"> = {};
tanks.forEach((t) => (heroRoles[t.name] = "Tank"));
damage.forEach((d) => (heroRoles[d.name] = "Damage"));
supports.forEach((s) => (heroRoles[s.name] = "Support"));

interface HeroMapScore {
  hero: string;
  role: "Tank" | "Damage" | "Support";
  rawScores: number[]; // We'll store all raw map scores here for computing mean/std
  mapScores: {
    [mapName: string]: {
      score: number; // raw score = 100 - rank
      rank: number; // hero's place on that map
      normalizedScore: number;
    };
  };
  mean: number; // hero's average raw score across all maps
  stdDev: number; // hero's std dev of raw scores across all maps
}

/**
 * 1) For each hero, compute the raw map score for every map.
 * 2) Collect those raw scores in an array so we can compute mean and std dev.
 * 3) Store mean/stdDev so we can transform each raw score to a "bell-curved" scale.
 */
function computeAllHeroMapScores(): HeroMapScore[] {
  return allHeroes.map((heroData) => {
    const heroName = heroData.name;
    const role = heroRoles[heroName];

    // 1) Compute raw scores for each map
    const mapEntries = maps.map((map) => {
      const normalizedScore = scoreMapForHero(map.properties, heroData);
      return { map: map.name, normalizedScore };
    });
    // Sort maps by descending normalized score so rank 1 is best
    mapEntries.sort((a, b) => b.normalizedScore - a.normalizedScore);

    // Build the mapScore dictionary
    const mapScores: {
      [mapName: string]: {
        score: number;
        rank: number;
        normalizedScore: number;
      };
    } = {};

    const rawScoresArray: number[] = [];
    mapEntries.forEach((entry, index) => {
      const rank = index + 1; // 1-based
      const rawScore = 100 - rank; // integer ~ [70..99] if there are 30 heroes
      mapScores[entry.map] = {
        score: rawScore,
        rank,
        normalizedScore: entry.normalizedScore,
      };
      rawScoresArray.push(rawScore);
    });

    // 2) Compute mean & std dev of this hero's raw scores
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

/**
 * Transform a raw score to a bell-curved scale:
 *   1) Convert rawScore to z = (rawScore - heroMean) / heroStd
 *   2) Map z -> 75 + 10*z
 * This ensures 50% of the hero's maps are above 75, 50% below,
 * and ~68% are within [65..85] if the raw scores are ~normal.
 */
function bellCurveTransform(
  rawScore: number,
  heroMean: number,
  heroStd: number
): number {
  if (heroStd === 0) {
    // Edge case: if std dev is 0, all raw scores are the same => just return 75
    return 75;
  }
  const z = (rawScore - heroMean) / heroStd;
  return 75 + 10 * z;
}

const MapSelector: React.FC = () => {
  const [selectedMapName, setSelectedMapName] = useState<string>("");

  // Precompute each hero's raw scores, mean, std dev, etc.
  const heroMapScores = useMemo(() => computeAllHeroMapScores(), []);

  const handleMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMapName(e.target.value);
  };

  // Find the selected map (for showing its properties).
  const currentMap = maps.find((map) => map.name === selectedMapName);

  // For the selected map, we want to display each hero's:
  // - raw score
  // - bell-curved score
  // - rank
  // We'll sort by raw score descending just to keep the same order as "best rank" on top
  const sortedHeroRankings = useMemo(() => {
    if (!selectedMapName) return [];
    // Filter out heroes that do not have a score for this map (unlikely)
    const relevantHeroes = heroMapScores.filter(
      (hms) => hms.mapScores[selectedMapName]
    );
    // Sort them by descending raw score
    relevantHeroes.sort(
      (a, b) =>
        b.mapScores[selectedMapName].score - a.mapScores[selectedMapName].score
    );
    return relevantHeroes;
  }, [selectedMapName, heroMapScores]);

  // Now separate them by role
  const tanksData = sortedHeroRankings.filter((h) => h.role === "Tank");
  const damageData = sortedHeroRankings.filter((h) => h.role === "Damage");
  const supportData = sortedHeroRankings.filter((h) => h.role === "Support");

  // A helper to render a table for a given role array
  const renderRoleTable = (title: string, data: HeroMapScore[]) => {
    return (
      <div style={{ flex: 1, margin: "0 1rem" }}>
        <h3>{title}</h3>
        <table border={1} cellPadding={4}>
          <thead>
            <tr>
              <th>Hero</th>
              <th>Raw Score</th>
              <th>Bell-Curved Score</th>
              <th>Rank</th>
              <th>Calculation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((hms) => {
              const { score, rank } = hms.mapScores[selectedMapName];
              const bcScore = bellCurveTransform(score, hms.mean, hms.stdDev);
              return (
                <tr key={hms.hero}>
                  <td>{hms.hero}</td>
                  <td>{score}</td>
                  <td>{bcScore.toFixed(2)}</td>
                  <td>{rank}</td>
                  <td>
                    100 - {rank} = {score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h2>Select a Map</h2>
      <select value={selectedMapName} onChange={handleMapChange}>
        <option value="">-- Select a Map --</option>
        {maps.map((map) => (
          <option key={map.name} value={map.name}>
            {map.name}
          </option>
        ))}
      </select>

      {selectedMapName && currentMap && (
        <div>
          <h3>{currentMap.name} Properties</h3>
          <ul>
            {currentMap.properties.map((prop, idx) => (
              <li key={idx}>{prop}</li>
            ))}
          </ul>

          <h2>Hero Map Scores for {currentMap.name}</h2>
          <div style={{ display: "flex" }}>
            {renderRoleTable("Tanks", tanksData)}
            {renderRoleTable("Damage", damageData)}
            {renderRoleTable("Supports", supportData)}
          </div>

          <p style={{ marginTop: "1rem" }}>
            Note: The bell-curved score is specific to each hero's distribution
            of raw scores. For each hero, about half their maps will have a
            bell-curved score above 75, half below, with ~68% of their maps in
            the range [65..85].
          </p>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
