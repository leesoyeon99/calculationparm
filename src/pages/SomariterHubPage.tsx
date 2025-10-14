import { ArrowLeft, Star, Trophy, Gift, MessageCircle, Sword, ChefHat, Car, Gamepad2, TrendingUp, Award, Target } from 'lucide-react';
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
    <div className="min-h-screen pb-20" style={{background: 'var(--gradient-secondary)'}}>
      {/* 최대 너비 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">소마리터 허브</h1>
              <p className="text-sm md:text-base text-gray-600">소마리터와 함께 성장해보세요!</p>
            </div>
          </div>
        </div>

        {/* 소마리터 프로필 카드 - 전체 너비 */}
        <motion.div
          className="farm-card p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <motion.div
              className="flex flex-col items-center"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                <div className="text-5xl">
                  {getMoodEmoji(somariter.mood)}
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-lg font-bold text-gray-800">
                  {somariter.name}
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  Lv.{somariter.level}
                </div>
              </div>
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                안녕! 나는 {somariter.name}이야! 🌱
              </h3>
              <p className="text-gray-700 mb-4">{somariter.currentMessage}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1 bg-white/50 px-3 py-1 rounded-full">
                  <span>😊</span>
                  <span>{getMoodText(somariter.mood)}</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Lv.{somariter.level}</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/50 px-3 py-1 rounded-full">
                  <Trophy className="w-4 h-4 text-green-500" />
                  <span>{completedAchievements.length}개 업적</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 메인 그리드 레이아웃 - PC: 2열, 모바일: 1열 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 왼쪽 열 */}
          <div className="space-y-6">
            {/* 레벨 및 경험치 */}
            <motion.div 
              className="farm-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-800">레벨 정보</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>현재 레벨</span>
                    <span className="font-bold">Lv.{user.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
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
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{user.totalStagesCompleted}</div>
                    <div className="text-xs text-gray-600 mt-1">완료 스테이지</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-600">{user.totalCropsHarvested}</div>
                    <div className="text-xs text-gray-600 mt-1">수확 작물</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{user.currentStreak}</div>
                    <div className="text-xs text-gray-600 mt-1">연속 학습</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 업적 시스템 */}
            <motion.div 
              className="farm-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-800">업적</h3>
                </div>
                <div className="text-sm text-gray-600 bg-purple-50 px-3 py-1 rounded-full font-medium">
                  {completedAchievements.length}/{totalAchievements} ({completionRate}%)
                </div>
              </div>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
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
                    transition={{ delay: 0.2 + index * 0.05 }}
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
                                achievement.isCompleted ? 'bg-green-500' : 'bg-purple-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${Math.min((achievement.requirements.current / achievement.requirements.target) * 100, 100)}%` 
                              }}
                              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
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
            </motion.div>
          </div>

          {/* 오른쪽 열 */}
          <div className="space-y-6">
            {/* 농장 통계 */}
            <motion.div 
              className="farm-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-800">농장 통계</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600">{farm.animals.length}</div>
                  <div className="text-sm text-gray-600 mt-1">현재 동물</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">{user.totalCropsHarvested}</div>
                  <div className="text-sm text-gray-600 mt-1">수확한 작물</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">{user.currentStreak}</div>
                  <div className="text-sm text-gray-600 mt-1">연속 학습</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">{user.totalStagesCompleted}</div>
                  <div className="text-sm text-gray-600 mt-1">완료 스테이지</div>
                </div>
              </div>
            </motion.div>

            {/* 게임 체험권 */}
            <motion.div 
              className="farm-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Gamepad2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">게임 체험권</h3>
              </div>
              
              <div className="space-y-3">
                {games.map((game, index) => {
                  const IconComponent = game.icon;
                  const tokenCount = gameTokens[game.id as keyof typeof gameTokens];
                  
                  return (
                    <motion.div
                      key={game.id}
                      className={`p-4 rounded-lg border-2 ${game.borderColor} bg-gradient-to-r ${game.bgColor} cursor-pointer hover:shadow-lg transition-all`}
                      onClick={() => navigate(game.path)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{game.name}</h4>
                            <p className="text-xs text-gray-600">{game.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 bg-white/80 px-3 py-1 rounded-full">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-gray-800">{tokenCount}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 text-center">
                  💡 수학 월드맵에서 스테이지를 완료하고 게임 체험권을 획득하세요!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
