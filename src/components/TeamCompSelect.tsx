// src/components/TeamCompSelect.tsx
import React, { useEffect, useMemo } from "react";
import { useMapScoreContext } from "../context/MapScoreContext";
import { useTeamCompContext } from "../context/TeamCompContext";
import type { HeroMapScore } from "../types/HeroMapScore";

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

  useEffect(() => {
    console.log(selectedDamage);
  }, [selectedDamage]);

  // Filter heroes by role
  const tanks = useMemo(
    () => heroMapScores.filter((h: HeroMapScore) => h.role === "Tank"),
    [heroMapScores]
  );
  const damage = useMemo(
    () => heroMapScores.filter((h: HeroMapScore) => h.role === "Damage"),
    [heroMapScores]
  );
  const supports = useMemo(
    () => heroMapScores.filter((h: HeroMapScore) => h.role === "Support"),
    [heroMapScores]
  );

  // Filter available options so that a hero already selected in one slot isn’t shown in the other slot.
  const damageOptions1 = useMemo(
    () => damage.filter((d) => d.hero !== selectedDamage[1]),
    [damage, selectedDamage]
  );
  const damageOptions2 = useMemo(
    () => damage.filter((d) => d.hero !== selectedDamage[0]),
    [damage, selectedDamage]
  );
  const supportOptions1 = useMemo(
    () => supports.filter((s) => s.hero !== selectedSupport[1]),
    [supports, selectedSupport]
  );
  const supportOptions2 = useMemo(
    () => supports.filter((s) => s.hero !== selectedSupport[0]),
    [supports, selectedSupport]
  );

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <div>
        <label>Tank:</label>
        <select
          value={selectedTank}
          onChange={(e) => setSelectedTank(e.target.value)}
        >
          <option value="">Select Tank</option>
          {tanks.map((tank) => (
            <option key={tank.hero} value={tank.hero}>
              {tank.hero}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Damage 1:</label>
        <select
          value={selectedDamage[0]}
          onChange={(e) =>
            setSelectedDamage([e.target.value, selectedDamage[1]])
          }
        >
          <option value="">Select Damage</option>
          {damageOptions1.map((d) => (
            <option key={d.hero} value={d.hero}>
              {d.hero}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Damage 2:</label>
        <select
          value={selectedDamage[1]}
          onChange={(e) =>
            setSelectedDamage([selectedDamage[0], e.target.value])
          }
        >
          <option value="">Select Damage</option>
          {damageOptions2.map((d) => (
            <option key={d.hero} value={d.hero}>
              {d.hero}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Support 1:</label>
        <select
          value={selectedSupport[0]}
          onChange={(e) =>
            setSelectedSupport([e.target.value, selectedSupport[1]])
          }
        >
          <option value="">Select Support</option>
          {supportOptions1.map((s) => (
            <option key={s.hero} value={s.hero}>
              {s.hero}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Support 2:</label>
        <select
          value={selectedSupport[1]}
          onChange={(e) =>
            setSelectedSupport([selectedSupport[0], e.target.value])
          }
        >
          <option value="">Select Support</option>
          {supportOptions2.map((s) => (
            <option key={s.hero} value={s.hero}>
              {s.hero}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeamCompSelect;
