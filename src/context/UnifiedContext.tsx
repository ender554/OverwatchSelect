// src/context/UnifiedContext.tsx
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
  TankNeeds,
  SupportNeeds,
  DamageNeeds,
  Drawbacks,
} from "../types/HeroTypes";
import { computeAllHeroMapScores } from "../utils/heroScores";
import { computeHeroSynergyScore } from "../utils/heroSynergyScore";
import type { SynergyHero } from "../utils/heroSynergyScore";

// Define the unified context type.
interface UnifiedContextType {
  // Map selection properties:
  selectedMapName: string;
  setSelectedMapName: (name: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedHeroes: string[];
  setSelectedHeroes: (
    heroes: string[] | ((prev: string[]) => string[])
  ) => void;
  // Team composition selections:
  selectedTank: ITankType | null;
  setSelectedTank: (value: ITankType | null) => void;
  selectedDamage: [IDamageType | null, IDamageType | null];
  setSelectedDamage: (value: [IDamageType | null, IDamageType | null]) => void;
  selectedSupport: [ISupportType | null, ISupportType | null];
  setSelectedSupport: (
    value: [ISupportType | null, ISupportType | null]
  ) => void;
  // Derived team array:
  selectedTeam: (ITankType | IDamageType | ISupportType)[];
  // Aggregated properties from team:
  tankNeedsGroup: TankNeeds[];
  supportNeedsGroup: SupportNeeds[];
  damageNeedsGroup: DamageNeeds[];
  drawbacksGroup: Drawbacks[];
  hatesGroup: Drawbacks[];
  friendsGroup: IHeroType[];
  // Unified heroes (each hero now has both map scores and synergy score)
  allHeroes: IHeroType[];
}

const UnifiedContext = createContext<UnifiedContextType | undefined>(undefined);

export const UnifiedProvider = ({ children }: { children: ReactNode }) => {
  // Map selection state.
  const [selectedMapName, setSelectedMapName] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  // Team comp selections.
  const [selectedTank, setSelectedTank] = useState<ITankType | null>(null);
  const [selectedDamage, setSelectedDamage] = useState<
    [IDamageType | null, IDamageType | null]
  >([null, null]);
  const [selectedSupport, setSelectedSupport] = useState<
    [ISupportType | null, ISupportType | null]
  >([null, null]);

  // Build a unified team array.
  const selectedTeam = useMemo(
    () =>
      [selectedTank, ...selectedDamage, ...selectedSupport].filter(
        (hero): hero is ITankType | IDamageType | ISupportType => hero !== null
      ),
    [selectedTank, selectedDamage, selectedSupport]
  );

  // Compute base heroes (each hero already has map scores)
  const baseHeroes = useMemo<IHeroType[]>(() => computeAllHeroMapScores(), []);

  // Aggregate team-level properties from the selected team.
  const {
    tankNeedsGroup,
    supportNeedsGroup,
    damageNeedsGroup,
    drawbacksGroup,
    hatesGroup,
    friendsGroup,
  } = useMemo(() => {
    const tankNeedsGroup: TankNeeds[] = [];
    const supportNeedsGroup: SupportNeeds[] = [];
    const damageNeedsGroup: DamageNeeds[] = [];
    const drawbacksGroup: Drawbacks[] = [];
    const hatesGroup: Drawbacks[] = [];
    const friendsGroup: IHeroType[] = [];

    selectedTeam.forEach((hero) => {
      if (hero.drawbacks) {
        drawbacksGroup.push(...hero.drawbacks);
      }
      if (hero.hates) {
        hatesGroup.push(...hero.hates);
      }
      if (hero.friends) {
        friendsGroup.push(...hero.friends);
      }
      if (hero.supportNeeds) {
        supportNeedsGroup.push(...hero.supportNeeds);
      }
      if (hero.damageNeeds) {
        damageNeedsGroup.push(...hero.damageNeeds);
      }
      if (
        (hero.role === "Damage" || hero.role === "Support") &&
        "tankNeeds" in hero &&
        hero.tankNeeds
      ) {
        tankNeedsGroup.push(...hero.tankNeeds);
      }
    });
    return {
      tankNeedsGroup,
      supportNeedsGroup,
      damageNeedsGroup,
      drawbacksGroup,
      hatesGroup,
      friendsGroup,
    };
  }, [selectedTeam]);

  // Update every hero's synergyScore using the aggregated team data.
  // Each hero in baseHeroes is updated to include a synergyScore.
  const allHeroes = useMemo(() => {
    return baseHeroes.map((hero) => ({
      ...hero,
      synergyScore: computeHeroSynergyScore(
        // Assert hero as a SynergyHero.
        hero as SynergyHero,
        {
          tankNeedsGroup,
          supportNeedsGroup,
          damageNeedsGroup,
          drawbacksGroup,
          hatesGroup,
          // Convert friendsGroup from IHeroType[] to an array of hero names.
          friendsGroup: friendsGroup.map((friend) => friend.name),
        }
      ),
    }));
  }, [
    baseHeroes,
    tankNeedsGroup,
    supportNeedsGroup,
    damageNeedsGroup,
    drawbacksGroup,
    hatesGroup,
    friendsGroup,
  ]);

  const value: UnifiedContextType = {
    selectedMapName,
    setSelectedMapName,
    selectedRole,
    setSelectedRole,
    selectedHeroes,
    setSelectedHeroes,
    selectedTank,
    setSelectedTank,
    selectedDamage,
    setSelectedDamage,
    selectedSupport,
    setSelectedSupport,
    selectedTeam,
    tankNeedsGroup,
    supportNeedsGroup,
    damageNeedsGroup,
    drawbacksGroup,
    hatesGroup,
    friendsGroup,
    allHeroes,
  };

  return (
    <UnifiedContext.Provider value={value}>{children}</UnifiedContext.Provider>
  );
};

export const useUnifiedContext = (): UnifiedContextType => {
  const context = useContext(UnifiedContext);
  if (!context) {
    throw new Error("useUnifiedContext must be used within a UnifiedProvider");
  }
  return context;
};
