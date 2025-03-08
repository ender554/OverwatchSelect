import { NewMapProperty } from "../types/MapTypes";

// Generic synergy properties remain unchanged.
export type GenericSynergy =
  | "Shields"
  | "Zone Control"
  | "Mobility Support"
  | "Poke Playstyle"
  | "Burst Damage"
  | "Sustain Pressure"
  | "Engage Initiation"
  | "Peel & Protection"
  | "Disruption"
  | "Hitscan"
  | "Projectile"
  | "Utility/CC Support";

export type TankProvides = "Damage Mitigation" | "Disruption" | GenericSynergy;

export type TankNeeds = TankProvides;

export type SupportProvides =
  | "Sustained Healing"
  | "Damage Support"
  | "Burst Healing"
  | "Long-Ranged Healing"
  | GenericSynergy;

export type SupportNeeds = SupportProvides;

export type DamageProvides =
  | "Burst Damage"
  | "Follow-Up Damage"
  | GenericSynergy;

export type DamageNeeds = DamageProvides;

export type Drawbacks =
  | "Unstable Frontline"
  | "Passive Play"
  | "Stationary Healing"
  | "Split Engagement"
  | "Forces Fast Engagements"
  | "Peel"
  | "Inconsistent Damage"
  | "High Resource Demand"
  | "Stationary Playstyle"
  | "Set-Up Dependent"
  | "Cooldown Dependent"
  | "Lacks Utility"
  | "Limited Mobility";

export type Hates = Drawbacks;

export interface IHeroType {
  name: string;
  role: "Tank" | "Damage" | "Support";
  // NEW PROPERTIES:
  synergyScore: number; // Should be initialized to 0.0
  mapScores: {
    [mapName: string]: {
      score: number;
      rank: number;
      normalizedScore: number;
    };
  };
  rawScores: number[];
  mean: number;
  stdDev: number;
}

export interface ITankType extends IHeroType {
  role: "Tank";
  provides: TankProvides[];
  supportNeeds: SupportProvides[];
  damageNeeds: DamageProvides[];
  drawbacks: Drawbacks[];
  hates: Drawbacks[];
  friends?: IHeroType[]; // using IHeroType for consistency
  mapLikes: NewMapProperty[];
  mapHates: NewMapProperty[];
}

export interface IDamageType extends IHeroType {
  role: "Damage";
  provides: DamageProvides[];
  tankNeeds: TankProvides[];
  supportNeeds: SupportProvides[];
  damageNeeds: DamageProvides[];
  drawbacks: Drawbacks[];
  hates: Drawbacks[];
  friends?: IHeroType[];
  mapLikes: NewMapProperty[];
  mapHates: NewMapProperty[];
}

export interface ISupportType extends IHeroType {
  role: "Support";
  provides: SupportProvides[];
  tankNeeds: TankProvides[];
  damageNeeds: DamageProvides[];
  supportNeeds: SupportProvides[];
  drawbacks: Drawbacks[];
  hates: Drawbacks[];
  friends?: IHeroType[];
  mapLikes: NewMapProperty[];
  mapHates: NewMapProperty[];
}
