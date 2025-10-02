import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Target, Star, Award, Sword, ChefHat, Car, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RoadMap } from '../components/RoadMap';
import { useState } from 'react';

export function WorldMapPage() {
  // 게임 체험권 관련 상태
  const [gameTokens, setGameTokens] = useState({
    dungeon: 3,
    cooking: 2,
    racing: 1
  });

  const games = [
    {
      id: 'dungeon',
      name: '수학 던전',
      description: '빠른 계산으로 몬스터를 물리치세요',
      icon: Sword,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      path: '/dungeon'
    },
    {
      id: 'cooking',
      name: '수학 레시피',
      description: '실생활 문제로 요리를 완성하세요',
      icon: ChefHat,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200',
      path: '/platformer-cooking'
    },
    {
      id: 'racing',
      name: '수학 레이싱',
      description: '속도와 거리로 우승을 차지하세요',
      icon: Car,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      path: '/racing'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* 특별한 헤더 */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
            style={{background: 'var(--gradient-primary)', color: 'white'}}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Map className="w-5 h-5 mr-2" />
            🗺️ 수학 학습의 길
            <Star className="w-4 h-4 ml-2" />
          </motion.div>
          
          <motion.h1
            className="text-5xl font-bold mb-4"
            style={{color: 'var(--color-text-primary)'}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            맞춤 학습 경로
          </motion.h1>
          
                  <motion.p
                    className="text-lg max-w-2xl mx-auto mb-8"
                    style={{color: 'var(--color-text-secondary)'}}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>초등학교, 사고력 연산, 중학교</span>의 
                    <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>개인별 최적화된 스테이지</span>를 통해 
                    체계적으로 수학을 학습하고, 완료 시 <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>게임 체험권</span>을 획득하세요!
                  </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
              <Target className="w-4 h-4 mr-1" />
              단계별 학습
            </div>
            <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
              <Award className="w-4 h-4 mr-1" />
              보상 시스템
            </div>
            <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
              <Star className="w-4 h-4 mr-1" />
              성취감
            </div>
          </motion.div>
        </div>


        {/* 길 맵 컴포넌트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <RoadMap />
        </motion.div>

        {/* 플로팅 게임 버튼들 */}
        <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
          {games.map((game) => {
            const IconComponent = game.icon;
            const tokenCount = gameTokens[game.id as keyof typeof gameTokens];
            const hasTokens = tokenCount > 0;
            
            return (
              <motion.button
                key={game.id}
                className={`w-14 h-14 rounded-full shadow-lg border-2 border-white flex items-center justify-center transition-all duration-300 ${
                  hasTokens 
                    ? 'cursor-pointer hover:scale-110 hover:shadow-xl' 
                    : 'opacity-50 cursor-not-allowed'
                } ${game.color}`}
                whileHover={hasTokens ? { scale: 1.1 } : {}}
                whileTap={hasTokens ? { scale: 0.95 } : {}}
                onClick={() => hasTokens && (window.location.href = game.path)}
                title={`${game.name} (${tokenCount}개 체험권)`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}