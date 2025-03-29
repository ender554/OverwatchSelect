// src/App.tsx
import React, { useState } from "react";
import ControlsPanel from "./components/ControlsPanel";
import ResultsTable from "./components/ResultsTable";
import HeroTierList from "./components/HeroTierList";
import { MapScoreProvider } from "./context/MapScoreContext";
import { TeamCompProvider } from "./context/TeamCompContext";
import { TeamCompSixProvider } from "./context/TeamSixContext";

function App() {
  const [activeMode, setActiveMode] = useState<"5v5" | "6v6">("5v5");
  const [activeTab, setActiveTab] = useState<"results" | "heroTierList">(
    "results"
  );

  return (
    <div style={{ padding: "20px" }}>
      <MapScoreProvider>
        <TeamCompProvider>
          {/* Top-level Mode Tabs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={() => setActiveMode("5v5")}
              style={{
                fontWeight: activeMode === "5v5" ? "bold" : "normal",
                padding: "8px 16px",
              }}
            >
              5v5
            </button>
            <button
              onClick={() => setActiveMode("6v6")}
              style={{
                fontWeight: activeMode === "6v6" ? "bold" : "normal",
                padding: "8px 16px",
              }}
            >
              6v6
            </button>
          </div>

          {/* Content based on activeMode */}
          {activeMode === "5v5" ? (
            <>
              <ControlsPanel mode="5s" />

              {/* Inner Tabs */}
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <button
                    onClick={() => setActiveTab("results")}
                    style={{
                      fontWeight: activeTab === "results" ? "bold" : "normal",
                      padding: "8px 16px",
                    }}
                  >
                    Results Table
                  </button>
                  <button
                    onClick={() => setActiveTab("heroTierList")}
                    style={{
                      fontWeight:
                        activeTab === "heroTierList" ? "bold" : "normal",
                      padding: "8px 16px",
                    }}
                  >
                    Hero Tier List
                  </button>
                </div>

                {activeTab === "results" && <ResultsTable mode="5v5" />}
                {activeTab === "heroTierList" && <HeroTierList />}
              </div>
            </>
          ) : (
            <TeamCompSixProvider>
              <ControlsPanel mode="6s" />
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <button
                    onClick={() => setActiveTab("results")}
                    style={{
                      fontWeight: activeTab === "results" ? "bold" : "normal",
                      padding: "8px 16px",
                    }}
                  >
                    Results Table
                  </button>
                  <button
                    onClick={() => setActiveTab("heroTierList")}
                    style={{
                      fontWeight:
                        activeTab === "heroTierList" ? "bold" : "normal",
                      padding: "8px 16px",
                    }}
                  >
                    Hero Tier List
                  </button>
                </div>

                {activeTab === "results" && <ResultsTable mode="6v6" />}
                {activeTab === "heroTierList" && <HeroTierList />}
              </div>
            </TeamCompSixProvider>
          )}
        </TeamCompProvider>
      </MapScoreProvider>
    </div>
  );
}

export default App;
