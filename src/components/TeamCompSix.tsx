// src/components/TeamCompSixSelect.tsx
import React, { useMemo } from "react";
import { useMapScoreContext } from "../context/MapScoreContext";
import { useTeamCompSixContext } from "../context/TeamSixContext";
import type {
  IHeroType,
  ITankType,
  IDamageType,
  ISupportType,
} from "../types/HeroTypes";

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  appearance: "none",
  backgroundColor: "#fff",
  color: "#000",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  color: "#fff",
};

const containerStyle = {
  display: "flex",
  gap: "20px",
  padding: "20px",
  backgroundColor: "#000",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
};

const selectContainerStyle = {
  flex: 1,
};

const TeamCompSixSelect: React.FC = () => {
  const { heroMapScores } = useMapScoreContext();
  const { selectedTeam, setSelectedTeam } = useTeamCompSixContext();

  const allHeroes = useMemo(() => heroMapScores, [heroMapScores]);
  const nonTanks = useMemo(
    () => heroMapScores.filter((h) => h.role !== "Tank"),
    [heroMapScores]
  );

  const handleSelect = (index: number, hero: IHeroType | null) => {
    const updatedTeam = [...selectedTeam];
    updatedTeam[index] = hero as ITankType | IDamageType | ISupportType | null;
    setSelectedTeam(updatedTeam);
  };

  const renderSelect = (label: string, index: number, options: IHeroType[]) => (
    <div style={selectContainerStyle} key={index}>
      <label style={labelStyle}>{label}</label>
      <select
        style={selectStyle}
        value={selectedTeam[index]?.name || ""}
        onChange={(e) => {
          const hero = options.find((h) => h.name === e.target.value) || null;
          handleSelect(index, hero);
        }}
      >
        <option value="">Select Hero</option>
        {options.map((h) => (
          <option key={h.name} value={h.name}>
            {h.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div style={containerStyle}>
      {Array.from({ length: 6 }).map((_, index) => {
        // For the first 2 slots, allow any hero; for the remaining 4, only non-tanks.
        const options = index < 2 ? allHeroes : nonTanks;
        return renderSelect(`Player ${index + 1}`, index, options);
      })}
    </div>
  );
};

export default TeamCompSixSelect;
