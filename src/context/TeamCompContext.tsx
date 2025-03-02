// src/context/TeamCompContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface TeamCompContextType {
  selectedTank: string;
  setSelectedTank: (value: string) => void;
  selectedDamage: [string, string];
  setSelectedDamage: (value: [string, string]) => void;
  selectedSupport: [string, string];
  setSelectedSupport: (value: [string, string]) => void;
}

const TeamCompContext = createContext<TeamCompContextType | undefined>(
  undefined
);

export const TeamCompProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTank, setSelectedTank] = useState<string>("");
  const [selectedDamage, setSelectedDamage] = useState<[string, string]>([
    "",
    "",
  ]);
  const [selectedSupport, setSelectedSupport] = useState<[string, string]>([
    "",
    "",
  ]);

  return (
    <TeamCompContext.Provider
      value={{
        selectedTank,
        setSelectedTank,
        selectedDamage,
        setSelectedDamage,
        selectedSupport,
        setSelectedSupport,
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
