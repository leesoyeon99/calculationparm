import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WorldMapPage } from './pages/WorldMapPage';
import { FarmPage } from './pages/FarmPage';
import { AnimalFarmPage } from './pages/AnimalFarmPage';
import { StagePlayPage } from './pages/StagePlayPage';
import { SomaMasterHubPage } from './pages/SomariterHubPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { DungeonGame } from './pages/DungeonGame';
import { RacingGame } from './pages/RacingGame';
import { PlatformerCookingGame } from './pages/PlatformerCookingGame';
import StudyTimerPage from './pages/StudyTimerPage';
import { RankingPage } from './pages/RankingPage';
import ImageProblemExample from './examples/ImageProblemExample';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/world-map" element={<WorldMapPage />} />
          <Route path="/farm" element={<FarmPage />} />
          <Route path="/animal-farm" element={<AnimalFarmPage />} />
          <Route path="/stage/:id" element={<StagePlayPage />} />
          <Route path="/somariter" element={<SomaMasterHubPage />} />
                  <Route path="/dungeon" element={<DungeonGame />} />
                  <Route path="/platformer-cooking" element={<PlatformerCookingGame />} />
          <Route path="/racing" element={<RacingGame />} />
          <Route path="/study-timer" element={<StudyTimerPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/image-problems" element={<ImageProblemExample />} />
        </Routes>
        <Navigation />
      </div>
    </div>
  );
}

export default App;
