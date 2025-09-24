import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WorldMapPage } from './pages/WorldMapPage';
import { FarmPage } from './pages/FarmPage';
import { AnimalFarmPage } from './pages/AnimalFarmPage';
import { StagePlayPage } from './pages/StagePlayPage';
import { SomariterHubPage } from './pages/SomariterHubPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { PlatformerGame } from './pages/PlatformerGame';
import { DungeonGame } from './pages/DungeonGame';
import { CookingGame } from './pages/CookingGame';
import { RacingGame } from './pages/RacingGame';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-sky to-green-200">
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/world-map" element={<WorldMapPage />} />
          <Route path="/farm" element={<FarmPage />} />
          <Route path="/animal-farm" element={<AnimalFarmPage />} />
          <Route path="/stage/:id" element={<StagePlayPage />} />
          <Route path="/somariter" element={<SomariterHubPage />} />
          <Route path="/platformer" element={<PlatformerGame />} />
          <Route path="/dungeon" element={<DungeonGame />} />
          <Route path="/cooking" element={<CookingGame />} />
          <Route path="/racing" element={<RacingGame />} />
        </Routes>
        <Navigation />
      </div>
    </div>
  );
}

export default App;
