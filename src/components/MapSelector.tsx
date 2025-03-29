// src/components/MapSelector.tsx
import React from "react";
import { maps } from "../data/newMaps";
import { useMapScoreContext } from "../context/MapScoreContext";

const containerStyle = {
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  color: "white",
};

const headingStyle = {
  color: "#fff",
  marginBottom: "8px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  color: "#000",
};

const selectStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  appearance: "none" as "none",
  backgroundColor: "#fff",
  color: "#000", // Explicit black text
};

const MapSelector: React.FC = () => {
  const {
    selectedMapName,
    setSelectedMapName,
    selectedRole,
    setSelectedRole,
    setSelectedHeroes,
  } = useMapScoreContext();

  const handleMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMapName(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
    // Reset selected heroes when the role changes
    setSelectedHeroes([]);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Select a Map</h2>
      <select
        id="map-selector"
        value={selectedMapName}
        onChange={handleMapChange}
        style={selectStyle}
      >
        <option value="">-- Select a Map --</option>
        {maps.map((map) => (
          <option key={map.name} value={map.name}>
            {map.name}
          </option>
        ))}
      </select>

      <h2 style={{ ...headingStyle, marginTop: "16px" }}>Select Role</h2>
      <select
        id="role-selector"
        value={selectedRole}
        onChange={handleRoleChange}
        style={selectStyle}
      >
        <option value="All">All</option>
        <option value="Tank">Tank</option>
        <option value="Damage">Damage</option>
        <option value="Support">Support</option>
      </select>
    </div>
  );
};

export default MapSelector;
