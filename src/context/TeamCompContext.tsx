// src/context/TeamCompContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import type {
  ITankType,
  IDamageType,
  ISupportType,
  IHeroType,
} from "../types/HeroTypes";
import { computeAllHeroMapScores } from "../utils/heroScores";

interface TeamCompContextType {
  // All heroes loaded with their computed properties.
  allHeroes: IHeroType[];
  // Selected heroes for each role.
  selectedTank: ITankType | null;
  setSelectedTank: (value: ITankType | null) => void;
  selectedDamage: [IDamageType | null, IDamageType | null];
  setSelectedDamage: (value: [IDamageType | null, IDamageType | null]) => void;
  selectedSupport: [ISupportType | null, ISupportType | null];
  setSelectedSupport: (
    value: [ISupportType | null, ISupportType | null]
  ) => void;
  // Unified selected team array.
  selectedTeam: (ITankType | IDamageType | ISupportType)[];
  // Aggregated team properties.
  teamHates: string[];
  teamProvides: string[];
  teamNeeds: string[];
}

const TeamCompContext = createContext<TeamCompContextType | undefined>(
  undefined
);

export const TeamCompProvider = ({ children }: { children: ReactNode }) => {
  // Load all heroes (each already has default computed values: synergyScore, mapScores, etc.)
  const allHeroes = useMemo<IHeroType[]>(() => computeAllHeroMapScores(), []);

  // Start with no hero selected in any role.
  const [selectedTank, setSelectedTank] = useState<ITankType | null>(null);
  const [selectedDamage, setSelectedDamage] = useState<
    [IDamageType | null, IDamageType | null]
  >([null, null]);
  const [selectedSupport, setSelectedSupport] = useState<
    [ISupportType | null, ISupportType | null]
  >([null, null]);

  // Create a unified team array from the selected roles.
  const selectedTeam = useMemo(
    () =>
      [selectedTank, ...selectedDamage, ...selectedSupport].filter(
        (hero): hero is ITankType | IDamageType | ISupportType => hero !== null
      ),
    [selectedTank, selectedDamage, selectedSupport]
  );

  // Aggregate team properties based on the selected team.
  const teamHates = useMemo(() => {
    return selectedTeam.flatMap((hero) => hero.hates);
  }, [selectedTeam]);

  const teamProvides = useMemo(() => {
    return selectedTeam.flatMap((hero) => hero.provides);
  }, [selectedTeam]);

  // For team needs, we assume that each hero's "needs" depends on their role:
  // - Tanks: use their supportNeeds and damageNeeds.
  // - Damage: use tankNeeds, supportNeeds, and damageNeeds.
  // - Support: use tankNeeds, damageNeeds, and supportNeeds.
  const teamNeeds = useMemo(() => {
    return selectedTeam.flatMap((hero) => {
      if (hero.role === "Tank") {
        // Tanks often require help with protection and damage follow-up.
        return [
          ...(hero as ITankType).supportNeeds,
          ...(hero as ITankType).damageNeeds,
        ];
      } else if (hero.role === "Damage") {
        return [
          ...(hero as IDamageType).tankNeeds,
          ...(hero as IDamageType).supportNeeds,
          ...(hero as IDamageType).damageNeeds,
        ];
      } else if (hero.role === "Support") {
        return [
          ...(hero as ISupportType).tankNeeds,
          ...(hero as ISupportType).damageNeeds,
          ...(hero as ISupportType).supportNeeds,
        ];
      }
      return [];
    });
  }, [selectedTeam]);

  return (
    <TeamCompContext.Provider
      value={{
        allHeroes,
        selectedTank,
        setSelectedTank,
        selectedDamage,
        setSelectedDamage,
        selectedSupport,
        setSelectedSupport,
        selectedTeam,
        teamHates,
        teamProvides,
        teamNeeds,
      }}
    >
      {children}
    </TeamCompContext.Provider>
  );
};

export const useTeamCompContext = (): TeamCompContextType => {
  const context = useContext(TeamCompContext);
  if (!context) {
    throw new Error(
      "useTeamCompContext must be used within a TeamCompProvider"
    );
  }
  return context;
};
