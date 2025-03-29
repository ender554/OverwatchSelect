// src/components/PlayerSelect.tsx
import React from "react";

interface PlayerSelectProps {
  playerIndex: number;
}

const PlayerSelect = ({ playerIndex }: PlayerSelectProps) => {
  return (
    <select
      style={{
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        appearance: "none",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <option value="">{`Player ${playerIndex}: Select Hero`}</option>
      <option value="hero1">Hero 1</option>
      <option value="hero2">Hero 2</option>
      <option value="hero3">Hero 3</option>
      <option value="hero4">Hero 4</option>
      <option value="hero5">Hero 5</option>
    </select>
  );
};

export default PlayerSelect;
