// src/components/TeamCompSelect.tsx
import React, { useMemo } from "react";
import { useMapScoreContext } from "../context/MapScoreContext";
import { useTeamCompContext } from "../context/TeamCompContext";
import type { ITankType, IDamageType, ISupportType } from "../types/HeroTypes";

const TeamCompSelect: React.FC = () => {
  const { heroMapScores } = useMapScoreContext();
  const {
    selectedTank,
    setSelectedTank,
    selectedDamage,
    setSelectedDamage,
    selectedSupport,
    setSelectedSupport,
  } = useTeamCompContext();

  // Filter heroes by role.
  const tanks = useMemo(
    () => heroMapScores.filter((hero) => hero.role === "Tank") as ITankType[],
    [heroMapScores]
  );
  const damage = useMemo(
    () =>
      heroMapScores.filter((hero) => hero.role === "Damage") as IDamageType[],
    [heroMapScores]
  );
  const supports = useMemo(
    () =>
      heroMapScores.filter((hero) => hero.role === "Support") as ISupportType[],
    [heroMapScores]
  );

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {/* Tank Select */}
      <div>
        <label>Tank:</label>
        <select
          value={selectedTank ? selectedTank.name : ""}
          onChange={(e) => {
            const hero = tanks.find((t) => t.name === e.target.value) || null;
            setSelectedTank(hero);
          }}
        >
          <option value="">Select Tank</option>
          {tanks.map((tank) => (
            <option key={tank.name} value={tank.name}>
              {tank.name}
            </option>
          ))}
        </select>
      </div>
      {/* Damage 1 Select */}
      <div>
        <label>Damage 1:</label>
        <select
          value={selectedDamage[0] ? selectedDamage[0]!.name : ""}
          onChange={(e) => {
            const hero = damage.find((d) => d.name === e.target.value) || null;
            setSelectedDamage([hero, selectedDamage[1]]);
          }}
        >
          <option value="">Select Damage</option>
          {damage.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      {/* Damage 2 Select */}
      <div>
        <label>Damage 2:</label>
        <select
          value={selectedDamage[1] ? selectedDamage[1]!.name : ""}
          onChange={(e) => {
            const hero = damage.find((d) => d.name === e.target.value) || null;
            setSelectedDamage([selectedDamage[0], hero]);
          }}
        >
          <option value="">Select Damage</option>
          {damage.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      {/* Support 1 Select */}
      <div>
        <label>Support 1:</label>
        <select
          value={selectedSupport[0] ? selectedSupport[0]!.name : ""}
          onChange={(e) => {
            const hero =
              supports.find((s) => s.name === e.target.value) || null;
            setSelectedSupport([hero, selectedSupport[1]]);
          }}
        >
          <option value="">Select Support</option>
          {supports.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      {/* Support 2 Select */}
      <div>
        <label>Support 2:</label>
        <select
          value={selectedSupport[1] ? selectedSupport[1]!.name : ""}
          onChange={(e) => {
            const hero =
              supports.find((s) => s.name === e.target.value) || null;
            setSelectedSupport([selectedSupport[0], hero]);
          }}
        >
          <option value="">Select Support</option>
          {supports.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeamCompSelect;
