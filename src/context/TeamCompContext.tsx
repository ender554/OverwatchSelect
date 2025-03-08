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
  TankNeeds,
  SupportNeeds,
  DamageNeeds,
  Drawbacks,
} from "../types/HeroTypes";
import { computeAllHeroMapScores } from "../utils/heroScores";
import { computeHeroSynergyScore } from "../utils/heroSynergyScore";
import type { SynergyHero } from "../utils/heroSynergyScore";

interface TeamCompContextType {
  allHeroes: IHeroType[];
  selectedTank: ITankType | null;
  setSelectedTank: (value: ITankType | null) => void;
  selectedDamage: [IDamageType | null, IDamageType | null];
  setSelectedDamage: (value: [IDamageType | null, IDamageType | null]) => void;
  selectedSupport: [ISupportType | null, ISupportType | null];
  setSelectedSupport: (
    value: [ISupportType | null, ISupportType | null]
  ) => void;
  selectedTeam: (ITankType | IDamageType | ISupportType)[];
  // Aggregated 1:1 groups matching IHeroType properties.
  tankNeedsGroup: TankNeeds[];
  supportNeedsGroup: SupportNeeds[];
  damageNeedsGroup: DamageNeeds[];
  drawbacksGroup: Drawbacks[];
  hatesGroup: Drawbacks[];
  friendsGroup: IHeroType[];
}

const TeamCompContext = createContext<TeamCompContextType | undefined>(
  undefined
);

export const TeamCompProvider = ({ children }: { children: ReactNode }) => {
  // Load all heroes with computed properties (without synergyScore adjustments yet).
  const baseHeroes = useMemo<IHeroType[]>(() => computeAllHeroMapScores(), []);

  // Role-based selections.
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

  // Aggregate team-level properties matching the hero type definitions.
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
      if (hero.drawbacks) drawbacksGroup.push(...hero.drawbacks);
      if (hero.hates) hatesGroup.push(...hero.hates);
      if (hero.friends) friendsGroup.push(...hero.friends);
      if (hero.supportNeeds) supportNeedsGroup.push(...hero.supportNeeds);
      if (hero.damageNeeds) damageNeedsGroup.push(...hero.damageNeeds);
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

  // Compute raw synergy scores for each hero
  const rawHeroScores = useMemo(() => {
    return baseHeroes.map((hero) => ({
      hero,
      rawScore: computeHeroSynergyScore(hero as SynergyHero, {
        tankNeedsGroup,
        supportNeedsGroup,
        damageNeedsGroup,
        drawbacksGroup,
        hatesGroup,
        friendsGroup: friendsGroup.map((friend) => friend.name),
      }),
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

  // Find the maximum raw synergy score to use for normalization
  const maxRawScore = useMemo(() => {
    return Math.max(...rawHeroScores.map((entry) => entry.rawScore), 1); // Avoid divide by zero
  }, [rawHeroScores]);

  // Normalize the synergy scores to a percentage (0-100)
  const updatedHeroes = useMemo(() => {
    return rawHeroScores.map(({ hero, rawScore }) => ({
      ...hero,
      synergyScore: Math.round((rawScore / maxRawScore) * 100),
    }));
  }, [rawHeroScores, maxRawScore]);

  return (
    <TeamCompContext.Provider
      value={{
        allHeroes: updatedHeroes,
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
