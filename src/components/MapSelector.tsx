// src/components/MapSelector.tsx
import React, { useState, useMemo } from "react";
import { maps } from "../data/maps";
import {
  allHeroes,
  computeAllHeroMapScores,
  bellCurveTransform,
} from "../utils/heroScores";

const MapSelector: React.FC = () => {
  const [selectedMapName, setSelectedMapName] = useState<string>("");
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  const heroMapScores = useMemo(() => computeAllHeroMapScores(), []);

  const handleMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMapName(e.target.value);
  };

  const handleHeroToggle = (heroName: string) => {
    setSelectedHeroes((prev) =>
      prev.includes(heroName)
        ? prev.filter((name) => name !== heroName)
        : [...prev, heroName]
    );
  };

  const handleSelectAllToggle = () => {
    if (selectedHeroes.length === allHeroes.length) {
      setSelectedHeroes([]);
    } else {
      setSelectedHeroes(allHeroes.map((hero) => hero.name));
    }
  };

  const currentMap = maps.find((map) => map.name === selectedMapName);

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

  const tanksData = sortedHeroRankings.filter((h) => h.role === "Tank");
  const damageData = sortedHeroRankings.filter((h) => h.role === "Damage");
  const supportData = sortedHeroRankings.filter((h) => h.role === "Support");

  const filterBySelected = (data: typeof tanksData) =>
    selectedHeroes.length > 0
      ? data.filter((hms) => selectedHeroes.includes(hms.hero))
      : data;

  const renderRoleTable = (title: string, data: typeof tanksData) => (
    <div style={{ flex: 1, margin: "0 1rem" }}>
      <h3>{title}</h3>
      <table border={1} cellPadding={4}>
        <thead>
          <tr>
            <th>Hero</th>
            <th>Bell-Curved Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((hms) => {
            const { score } = hms.mapScores[selectedMapName];
            const bcScore = bellCurveTransform(score, hms.mean, hms.stdDev);
            return (
              <tr key={hms.hero}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedHeroes.includes(hms.hero)}
                      onChange={() => handleHeroToggle(hms.hero)}
                    />
                    {hms.hero}
                  </label>
                </td>
                <td>{bcScore.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

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

      <h2>Select Heroes</h2>
      <div>
        <button onClick={handleSelectAllToggle}>
          {selectedHeroes.length === allHeroes.length
            ? "Deselect All"
            : "Select All"}
        </button>
        {allHeroes.map((hero) => (
          <label key={hero.name} style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              checked={selectedHeroes.includes(hero.name)}
              onChange={() => handleHeroToggle(hero.name)}
            />
            {hero.name}
          </label>
        ))}
      </div>

      {selectedMapName && currentMap && (
        <div>
          <h3>
            {currentMap.name} Properties: {currentMap.properties.join(", ")}
          </h3>
          <h2>Hero Map Scores for {selectedMapName}</h2>
          <div style={{ display: "flex" }}>
            {renderRoleTable("Tanks", filterBySelected(tanksData))}
            {renderRoleTable("Damage", filterBySelected(damageData))}
            {renderRoleTable("Supports", filterBySelected(supportData))}
          </div>
          <p style={{ marginTop: "1rem" }}>
            Note: The bell-curved score is computed per hero so that about half
            of that hero's maps fall above 75 and half below, with approximately
            68% in the range [65,85].
          </p>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
