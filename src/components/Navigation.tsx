import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Sprout, User, Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function Navigation() {
  const location = useLocation();
  const { farm, user } = useGameStore();

  const navItems = [
    { path: '/', icon: Home, label: '홈', color: 'text-blue-600' },
    { path: '/world-map', icon: Map, label: '월드맵', color: 'text-green-600' },
    { path: '/farm', icon: Sprout, label: '농장', color: 'text-orange-600' },
    { path: '/somariter', icon: User, label: '소마 연산 마스터', color: 'text-purple-600' },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="farm-card flex items-center space-x-2 px-6 py-3 shadow-xl">
        {navItems.map(({ path, icon: Icon, label, color }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-farm-green text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : color}`} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
      
      {/* 리소스 표시 */}
      <div className="mt-2 flex items-center space-x-4 text-sm">
        <div className="farm-card px-3 py-1 flex items-center space-x-1">
          <span className="text-yellow-600">☀️</span>
          <span className="font-medium">{farm.resources.sunlight}</span>
        </div>
        <div className="farm-card px-3 py-1 flex items-center space-x-1">
          <span className="text-blue-600">💧</span>
          <span className="font-medium">{farm.resources.water}</span>
        </div>
        <div className="farm-card px-3 py-1 flex items-center space-x-1">
          <span className="text-yellow-500">🪙</span>
          <span className="font-medium">{farm.resources.coins}</span>
        </div>
      </div>
    </nav>
  );
}

