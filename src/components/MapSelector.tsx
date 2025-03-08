// src/components/MapSelector.tsx
import React from "react";
import { maps } from "../data/oldMaps";
import { useMapScoreContext } from "../context/MapScoreContext";

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
    <div>
      <h2>Select a Map</h2>
      <select value={selectedMapName} onChange={handleMapChange}>
        <option value="">-- Select a Map --</option>
        {maps.map((map) => (
          <option key={map.name} value={map.name}>
            {map.name}
          </option>
        ))}
      </select>

      <h2>Select Role</h2>
      <select value={selectedRole} onChange={handleRoleChange}>
        <option value="All">All</option>
        <option value="Tank">Tank</option>
        <option value="Damage">Damage</option>
        <option value="Support">Support</option>
      </select>
    </div>
  );
};

export default MapSelector;
