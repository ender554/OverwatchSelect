import {
  Tempo,
  PlaystylePrimary,
  PlaystyleSubtype,
  Formation,
  PressureType,
  WinCondition,
  MapTrait,
} from "../constants/identity";

export type HeroIdentity = {
  id: string;
  name: string;
  role: "tank" | "dps" | "support";

  tempo: Tempo;
  playstyle: {
    primary: PlaystylePrimary;
    subtypes: PlaystyleSubtype[];
  };
  formation: Formation;
  pressure: PressureType;
  winCondition: WinCondition;

  provides: string[];
  needs: string[];
  dislikes: string[];

  mapSensitivity?: "high" | "medium" | "low";

  mapPreferences?: {
    favors: MapTrait[];
    avoids: MapTrait[];
  };
};

export type TeamIdentity = {
  tempo: Tempo | null;
  playstyle: {
    primary: PlaystylePrimary | null;
    subtypes: PlaystyleSubtype[];
  };
  formation: Formation | null;
  pressure: PressureType[];
  winCondition: WinCondition | null;

  accumulatedProvides: string[];
  unmetNeeds: string[];
  dislikes: string[];
  redundancies: string[];

  currentHeroes: (HeroIdentity | null)[];
};
