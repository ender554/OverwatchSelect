// src/components/ControlsPanel.tsx
import React from "react";
import MapSelector from "./MapSelector";
import TeamCompSelect from "./TeamCompSelect";
import TeamCompSix from "./TeamCompSix";

type ControlsPanelProps = {
  mode: "5s" | "6s";
};

const ControlsPanel: React.FC<ControlsPanelProps> = ({ mode }) => {
  const modeValue = mode === "5s" ? "5v5" : "6v6";
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#000",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left Section (25% width) */}
      <div style={{ width: "25%" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="map-selector"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Select Map ({mode.toUpperCase()})
          </label>
          <MapSelector />
        </div>
      </div>

      {/* Right Section (75% width) */}
      <div
        style={{
          width: "75%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {modeValue === "5v5" ? <TeamCompSelect /> : <TeamCompSix />}
      </div>
    </div>
  );
};

export default ControlsPanel;
