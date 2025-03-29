// src/context/TeamCompSixContext.tsx
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

interface TeamCompSixContextType {
  allHeroes: IHeroType[]; // IHeroType is ITankType | IDamageType | ISupportType
  selectedTeam: (ITankType | IDamageType | ISupportType | null)[];
  setSelectedTeam: (
    team: (ITankType | IDamageType | ISupportType | null)[]
  ) => void;
  tankNeedsGroup: TankNeeds[];
  supportNeedsGroup: SupportNeeds[];
  damageNeedsGroup: DamageNeeds[];
  drawbacksGroup: Drawbacks[];
  hatesGroup: Drawbacks[];
  friendsGroup: IHeroType[];
}

const TeamCompSixContext = createContext<TeamCompSixContextType | undefined>(
  undefined
);

export const TeamCompSixProvider = ({ children }: { children: ReactNode }) => {
  // Load all heroes (the base heroes are typed as IHeroType,
  // which is defined as ITankType | IDamageType | ISupportType)
  const baseHeroes = useMemo<IHeroType[]>(() => computeAllHeroMapScores(), []);

  // State for a 6v6 team: 6 slots (each is ITankType | IDamageType | ISupportType or null)
  const [selectedTeam, setSelectedTeam] = useState<
    (ITankType | IDamageType | ISupportType | null)[]
  >(Array(6).fill(null));

  // Aggregate team-level properties from the selected heroes.
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

    // Filter out null values
    const team = selectedTeam.filter(
      (hero): hero is ITankType | IDamageType | ISupportType => hero !== null
    );

    team.forEach((hero) => {
      if (hero.drawbacks) drawbacksGroup.push(...hero.drawbacks);
      if (hero.hates) hatesGroup.push(...hero.hates);
      if (hero.friends) friendsGroup.push(...hero.friends);
      if (hero.supportNeeds) supportNeedsGroup.push(...hero.supportNeeds);
      if (hero.damageNeeds) damageNeedsGroup.push(...hero.damageNeeds);
      // For Damage or Support heroes that include tankNeeds, add them.
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

  // Compute raw synergy scores for each hero.
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

  // Find the maximum raw synergy score to avoid division by zero.
  const maxRawScore = useMemo(() => {
    return Math.max(...rawHeroScores.map((entry) => entry.rawScore), 1);
  }, [rawHeroScores]);

  // Normalize the synergy scores.
  const updatedHeroes = useMemo(() => {
    return rawHeroScores.map(({ hero, rawScore }) => ({
      ...hero,
      synergyScore: Math.round((rawScore / maxRawScore) * 100),
    }));
  }, [rawHeroScores, maxRawScore]);

  return (
    <TeamCompSixContext.Provider
      value={{
        allHeroes: updatedHeroes,
        selectedTeam,
        setSelectedTeam,
        tankNeedsGroup,
        supportNeedsGroup,
        damageNeedsGroup,
        drawbacksGroup,
        hatesGroup,
        friendsGroup,
      }}
    >
      {children}
    </TeamCompSixContext.Provider>
  );
};

export const useTeamCompSixContext = (): TeamCompSixContextType => {
  const context = useContext(TeamCompSixContext);
  if (!context) {
    throw new Error(
      "useTeamCompSixContext must be used within a TeamCompSixProvider"
    );
  }
  return context;
};
