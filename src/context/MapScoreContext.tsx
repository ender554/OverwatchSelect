import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { computeAllHeroMapScores } from "../utils/heroScores";
import type { IHeroType } from "../types/HeroTypes";

interface MapScoreContextType {
  selectedMapName: string;
  setSelectedMapName: (name: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedHeroes: string[];
  setSelectedHeroes: (
    heroes: string[] | ((prev: string[]) => string[])
  ) => void;
  heroMapScores: IHeroType[];
}

const MapScoreContext = createContext<MapScoreContextType | undefined>(
  undefined
);

export const MapScoreProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMapName, setSelectedMapName] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  const heroMapScores = useMemo<IHeroType[]>(
    () => computeAllHeroMapScores(),
    []
  );

  return (
    <MapScoreContext.Provider
      value={{
        selectedMapName,
        setSelectedMapName,
        selectedRole,
        setSelectedRole,
        selectedHeroes,
        setSelectedHeroes,
        heroMapScores,
      }}
    >
      {children}
    </MapScoreContext.Provider>
  );
};

export const useMapScoreContext = (): MapScoreContextType => {
  const context = useContext(MapScoreContext);
  if (!context) {
    throw new Error(
      "useMapScoreContext must be used within a MapScoreProvider"
    );
  }
  return context;
};
