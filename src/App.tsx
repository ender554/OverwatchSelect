// src/App.tsx
import MapSelector from "./components/MapSelector";
import TeamCompSelect from "./components/TeamCompSelect";
import ResultsTable from "./components/ResultsTable";
import { MapScoreProvider } from "./context/MapScoreContext";
import { TeamCompProvider } from "./context/TeamCompContext";

function App() {
  return (
    <div>
      <MapScoreProvider>
        <TeamCompProvider>
          {/* MapSelector and TeamCompSelect side by side */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <MapSelector />
            <TeamCompSelect />
          </div>
          {/* ResultsTable beneath */}
          <ResultsTable />
        </TeamCompProvider>
      </MapScoreProvider>
    </div>
  );
}

export default App;
