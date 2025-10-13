import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sword, 
  ChefHat, 
  Car, 
  Gamepad2, 
  Trophy, 
  Coins, 
  Star,
  Zap,
  Target,
  Clock
} from 'lucide-react';
import { useState } from 'react';

export function GameHubPage() {
  const navigate = useNavigate();
  
  // 게임 체험권 (포인트)
  const [gameTokens, setGameTokens] = useState({
    dungeon: 3,
    cooking: 2,
    racing: 1
  });

  const games = [
    {
      id: 'dungeon',
      name: '수학 던전',
      description: '빠른 계산으로 몬스터를 물리치고 던전을 정복하세요!',
      longDescription: '다양한 난이도의 몬스터들과 전투를 벌이며 수학 실력을 향상시키세요. 빠른 계산으로 적을 물리치고 레벨업하며 더 강한 보스에 도전하세요.',
      icon: Sword,
      bgGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      borderColor: '#ff5252',
      emoji: '⚔️',
      path: '/dungeon',
      features: ['⚡ 빠른 계산 훈련', '👾 다양한 몬스터', '🏆 레벨업 시스템']
    },
    {
      id: 'cooking',
      name: '수학 레시피',
      description: '실생활 문제를 풀고 맛있는 요리를 완성하세요!',
      longDescription: '재료를 모으고 수학 문제를 풀어 요리를 완성하는 플랫포머 게임입니다. 실생활과 연결된 수학 문제로 즐겁게 학습하세요.',
      icon: ChefHat,
      bgGradient: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)',
      borderColor: '#ff9800',
      emoji: '👨‍🍳',
      path: '/platformer-cooking',
      features: ['🍳 요리 레시피 완성', '🎮 플랫포머 액션', '📊 실생활 수학']
    },
    {
      id: 'racing',
      name: '수학 레이싱',
      description: '속도와 거리 문제를 풀고 레이싱 우승을 차지하세요!',
      longDescription: '자동차를 타고 달리며 속도, 거리, 시간 문제를 풀어 스피드를 올리고 우승을 차지하세요. 연산 우선순위도 함께 학습합니다.',
      icon: Car,
      bgGradient: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
      borderColor: '#2196f3',
      emoji: '🏎️',
      path: '/racing',
      features: ['🏁 레이싱 경주', '⚡ 속도 부스트', '🎯 연산 우선순위']
    }
  ];

  return (
    <div className="min-h-screen pb-20" style={{background: 'var(--gradient-secondary)'}}>
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-8 px-4 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => navigate('/')}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            
            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full">
              <Coins className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="text-xs opacity-90">내 게임 체험권</p>
                <p className="text-xl font-bold">{gameTokens.dungeon + gameTokens.cooking + gameTokens.racing}개</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <motion.div
              className="inline-flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Gamepad2 className="w-8 h-8" />
              <h1 className="font-dnf-display text-4xl">게임 체험존</h1>
              <Trophy className="w-8 h-8" />
            </motion.div>
            
            <motion.p
              className="font-dnf-body-large text-white/90 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              수학을 재미있게 배우는 3가지 게임을 즐겨보세요!
            </motion.p>

            {/* 게임 체험권 안내 */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-yellow-300" />
              <span>수학 월드맵에서 스테이지를 완료하면 게임 체험권을 획득할 수 있어요!</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 게임 카드들 */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {games.map((game, index) => {
            const IconComponent = game.icon;
            const tokenCount = gameTokens[game.id as keyof typeof gameTokens];
            const hasTokens = tokenCount > 0;

            return (
              <motion.div
                key={game.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className={`relative rounded-3xl p-8 shadow-2xl transition-all duration-300 border-4 overflow-hidden ${
                    hasTokens ? 'cursor-pointer' : 'opacity-70'
                  }`}
                  style={{
                    background: game.bgGradient,
                    borderColor: game.borderColor
                  }}
                  whileHover={hasTokens ? { scale: 1.05, y: -10 } : {}}
                  whileTap={hasTokens ? { scale: 0.95 } : {}}
                  onClick={() => {
                    if (hasTokens) {
                      navigate(game.path);
                    }
                  }}
                >
                  {/* 배경 애니메이션 */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-white rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* 콘텐츠 */}
                  <div className="relative z-10">
                    {/* 체험권 뱃지 */}
                    <div className="absolute -top-4 -right-4">
                      <motion.div
                        className="bg-yellow-400 text-gray-900 rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-xl border-4 border-white"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Coins className="w-5 h-5 mb-1" />
                        <span className="font-bold text-lg">{tokenCount}</span>
                      </motion.div>
                    </div>

                    {/* 아이콘과 이모지 */}
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl"
                        animate={{
                          rotate: index === 0 ? [0, 5, -5, 0] : index === 1 ? [0, -5, 5, 0] : [0, 0, 0, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="relative">
                          <IconComponent className="w-16 h-16 text-white" strokeWidth={2.5} />
                          <div className="absolute -bottom-2 -right-2 text-4xl">{game.emoji}</div>
                        </div>
                      </motion.div>
                    </div>

                    {/* 게임 정보 */}
                    <h3 className="font-dnf-heading-1 text-white text-center mb-3">{game.name}</h3>
                    <p className="font-dnf-body text-white/90 text-center mb-6">
                      {game.description}
                    </p>

                    {/* 상세 설명 */}
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-6">
                      <p className="text-white/80 text-sm leading-relaxed">
                        {game.longDescription}
                      </p>
                    </div>

                    {/* 특징 */}
                    <div className="space-y-2 mb-6">
                      {game.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center space-x-2 text-white/90 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                        >
                          <Zap className="w-4 h-4 text-yellow-300" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* 플레이 버튼 */}
                    {hasTokens ? (
                      <motion.button
                        className="w-full bg-white text-gray-900 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Gamepad2 className="w-6 h-6" />
                        <span>지금 플레이</span>
                      </motion.button>
                    ) : (
                      <div className="w-full bg-gray-800/50 text-white/70 py-4 rounded-2xl font-bold text-lg text-center">
                        체험권이 부족합니다
                      </div>
                    )}
                  </div>

                  {/* 체험권 부족 오버레이 */}
                  {!hasTokens && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 rounded-3xl">
                      <div className="text-center text-white">
                        <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="font-bold text-xl mb-2">체험권이 필요해요</p>
                        <p className="text-sm opacity-80">수학 월드맵에서<br/>스테이지를 완료해보세요!</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <h3 className="font-dnf-heading-2 text-gray-800 mb-3">게임 체험권 획득 방법</h3>
            <p className="font-dnf-body text-gray-600">
              수학 월드맵에서 학습을 완료하면 게임 체험권을 획득할 수 있어요!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Target className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-800 mb-2">1. 스테이지 도전</h4>
              <p className="text-sm text-gray-600">수학 월드맵에서<br/>스테이지를 선택하세요</p>
            </div>

            <div className="text-center">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Clock className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-800 mb-2">2. 문제 풀기</h4>
              <p className="text-sm text-gray-600">수학 문제를 풀고<br/>스테이지를 완료하세요</p>
            </div>

            <div className="text-center">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Coins className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-800 mb-2">3. 체험권 획득</h4>
              <p className="text-sm text-gray-600">게임 체험권을 받고<br/>게임을 즐기세요!</p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate('/world-map')}
            className="mt-8 mx-auto block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            수학 월드맵으로 가기 →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

