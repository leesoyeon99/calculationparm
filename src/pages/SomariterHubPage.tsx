import { ArrowLeft, Star, Trophy, Gift, MessageCircle, Sword, ChefHat, Car, Gamepad2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function SomaMasterHubPage() {
  const { user, somariter, achievements, farm } = useGameStore();
  const navigate = useNavigate();
  
  const completedAchievements = achievements.filter(a => a.isCompleted);
  const totalAchievements = achievements.length;
  const completionRate = Math.round((completedAchievements.length / totalAchievements) * 100);

  // 게임 체험권 관련 상태
  const [gameTokens, setGameTokens] = useState({
    dungeon: 3,
    cooking: 2,
    racing: 1
  });

  // 게임 데이터
  const games = [
    {
      id: 'dungeon',
      name: '수학 던전',
      description: '빠른 계산으로 몬스터를 물리치세요',
      icon: Sword,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      path: '/dungeon-game'
    },
    {
      id: 'cooking',
      name: '수학 레시피',
      description: '실생활 문제로 요리를 완성하세요',
      icon: ChefHat,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200',
      path: '/platformer-cooking-game'
    },
    {
      id: 'racing',
      name: '수학 레이싱',
      description: '속도와 거리로 우승을 차지하세요',
      icon: Car,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      path: '/racing-game'
    }
  ];

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'encouraging': return '💪';
      case 'thinking': return '🤔';
      default: return '😊';
    }
  };

  const getMoodText = (mood: string) => {
    switch (mood) {
      case 'happy': return '기쁨';
      case 'excited': return '흥분';
      case 'encouraging': return '격려';
      case 'thinking': return '생각';
      default: return '기쁨';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 헤더 */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">소마리터 허브</h1>
          <p className="text-gray-600">소마리터와 함께 성장해보세요!</p>
        </div>
      </div>

      {/* 소마리터 프로필 */}
      <motion.div
        className="farm-card p-6 bg-gradient-to-r from-blue-50 to-green-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-6">
          <motion.div
            className="somariter-character"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-4xl mb-2">
              {getMoodEmoji(somariter.mood)}
            </div>
            <div className="text-sm font-bold text-white">
              {somariter.name}
            </div>
            <div className="text-xs text-blue-100">
              Lv.{somariter.level}
            </div>
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              안녕! 나는 {somariter.name}이야! 🌱
            </h3>
            <p className="text-gray-700 mb-4">{somariter.currentMessage}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>😊</span>
                <span>{getMoodText(somariter.mood)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span>Lv.{somariter.level}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🏆</span>
                <span>{completedAchievements.length}개 업적</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 레벨 및 경험치 */}
      <div className="farm-card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">레벨 정보</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>현재 레벨</span>
              <span>Lv.{user.level}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-farm-green to-farm-darkGreen h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(user.experience % 100)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {user.experience % 100}/100 EXP
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-farm-green">{user.totalStagesCompleted}</div>
              <div className="text-sm text-gray-600">완료 스테이지</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-farm-green">{user.totalCropsHarvested}</div>
              <div className="text-sm text-gray-600">수확 작물</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-farm-green">{user.currentStreak}</div>
              <div className="text-sm text-gray-600">연속 학습</div>
            </div>
          </div>
        </div>
      </div>

      {/* 업적 시스템 */}
      <div className="farm-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">업적</h3>
          <div className="text-sm text-gray-600">
            {completedAchievements.length}/{totalAchievements} ({completionRate}%)
          </div>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.isCompleted
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>진행률</span>
                      <span>{achievement.requirements.current}/{achievement.requirements.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          achievement.isCompleted ? 'bg-green-500' : 'bg-farm-green'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.min((achievement.requirements.current / achievement.requirements.target) * 100, 100)}%` 
                        }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
                {achievement.isCompleted && (
                  <div className="text-green-500">
                    <Trophy className="w-6 h-6" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 농장 통계 */}
      <div className="farm-card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">농장 통계</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">{farm.animals.length}</div>
            <div className="text-sm text-gray-600">현재 동물</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">{farm.resources.coins}</div>
            <div className="text-sm text-gray-600">보유 코인</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">{farm.resources.food}</div>
            <div className="text-sm text-gray-600">먹이 포인트</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">{farm.level}</div>
            <div className="text-sm text-gray-600">농장 레벨</div>
          </div>
        </div>
      </div>

      {/* 소마리터 메시지 */}
      <div className="farm-card p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            소
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-2">소마리터의 조언</h4>
            <p className="text-gray-700 mb-4">
              {user.currentStreak > 0 
                ? `와! ${user.currentStreak}일 연속으로 학습하고 있어! 정말 대단해! 계속 이렇게 하면 더 많은 작물을 키울 수 있을 거야! 🌱`
                : '매일 조금씩이라도 학습하면 작물이 더 잘 자라요! 오늘도 함께 해보자! 💪'
              }
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>조언</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gift className="w-4 h-4" />
                <span>보상</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* 액션 버튼들 */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/world-map"
          className="farm-card p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Star className="w-8 h-8 text-farm-green mx-auto mb-2" />
          <h4 className="font-bold text-gray-800">학습하기</h4>
          <p className="text-sm text-gray-600">스테이지를 시작해보세요</p>
        </Link>
        
        <Link
          to="/farm"
          className="farm-card p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="w-8 h-8 text-farm-brown mx-auto mb-2">🌱</div>
          <h4 className="font-bold text-gray-800">농장 가기</h4>
          <p className="text-sm text-gray-600">작물을 확인해보세요</p>
        </Link>
      </div>

      {/* 플로팅 게임 버튼들 - 눈에 띄게 개선 */}
      <div className="fixed top-20 right-4 z-50 flex flex-col space-y-3">
        {games.map((game, index) => {
          const IconComponent = game.icon;
          const tokenCount = gameTokens[game.id as keyof typeof gameTokens];
          const hasTokens = tokenCount > 0;
          
          const gameColors = {
            dungeon: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)', border: '#ff5252' },
            cooking: { bg: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)', border: '#ff9800' },
            racing: { bg: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)', border: '#2196f3' }
          };
          
          const gameColor = gameColors[game.id as keyof typeof gameColors];
          
          return (
            <motion.div
              key={game.id}
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.button
                className={`relative w-16 h-16 rounded-2xl shadow-2xl border-4 flex items-center justify-center transition-all duration-300 overflow-hidden ${
                  hasTokens 
                    ? 'cursor-pointer hover:shadow-3xl' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{
                  background: gameColor.bg,
                  borderColor: gameColor.border
                }}
                whileHover={hasTokens ? { scale: 1.15, rotate: 5 } : {}}
                whileTap={hasTokens ? { scale: 0.9 } : {}}
                onClick={() => hasTokens && navigate(game.path)}
                title={`${game.name} (${tokenCount}개 체험권)`}
              >
                {/* 애니메이션 배경 */}
                {hasTokens && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                <IconComponent className="w-8 h-8 text-white relative z-10" strokeWidth={2.5} />
                
                {/* 체험권 개수 뱃지 */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 shadow-lg border-2 border-white"
                  animate={hasTokens ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {tokenCount}
                </motion.div>
              </motion.button>
              
              {/* 게임 이름 툴팁 */}
              <motion.div
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/90 text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {game.name}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-gray-900/90" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

