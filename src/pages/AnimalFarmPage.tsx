import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Heart, Zap, Star, Coffee, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { RabbitCharacter } from '../components/RabbitCharacter';

export function AnimalFarmPage() {
  const navigate = useNavigate();
  const { farm, adoptAnimal, feedAnimal, playWithAnimal, trainAnimal, addCoins } = useGameStore();
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);

  // 데모용 토끼들 자동 생성
  useEffect(() => {
    if (farm.animals.length === 0) {
      // 유딩 토끼 (레벨 1)
      adoptAnimal('rabbit', 1, { x: 100, y: 200 });
      // 초딩 토끼 (레벨 2)  
      adoptAnimal('rabbit', 2, { x: 300, y: 200 });
      // 중딩 토끼 (레벨 3)
      adoptAnimal('rabbit', 3, { x: 500, y: 200 });
    }
  }, [farm.animals.length, adoptAnimal]);

  const handleAdopt = () => {
    const position = {
      x: Math.random() * 400 + 100,
      y: Math.random() * 200 + 150
    };
    adoptAnimal('rabbit', selectedLevel, position);
    setShowAdoptModal(false);
    addCoins(-50); // 입양 비용
  };

  const getLevelInfo = (level: number) => {
    switch (level) {
      case 1:
        return { name: '유딩 토끼', color: 'pink', description: '5~7세 수학 기초' };
      case 2:
        return { name: '초딩 토끼', color: 'blue', description: '8~13세 기본 수학' };
      case 3:
        return { name: '중딩 토끼', color: 'purple', description: '14~16세 중등 수학' };
      default:
        return { name: '토끼', color: 'gray', description: '' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => navigate('/')}
            className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🐰 동물농장</h1>
            <p className="text-gray-600">토끼들과 함께 수학을 배워보세요!</p>
          </div>
        </div>

        {/* 리소스 표시 */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-orange-100 rounded-full px-4 py-2">
            <Coffee className="w-5 h-5 text-orange-600" />
            <span className="font-bold text-orange-700">{farm.resources.food}</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-700">{farm.resources.toys}</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-100 rounded-full px-4 py-2">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-700">{farm.resources.medicine}</span>
          </div>
          <div className="flex items-center space-x-2 bg-yellow-100 rounded-full px-4 py-2">
            <Gift className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-700">{farm.resources.coins}</span>
          </div>
        </div>
      </div>

      {/* 농장 영역 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl min-h-[600px] relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">[?]</div>
          <div className="absolute top-4 right-4 text-6xl">[?]</div>
          <div className="absolute bottom-4 left-4 text-6xl">[?]</div>
          <div className="absolute bottom-4 right-4 text-6xl">[?]</div>
        </div>

        {/* 토끼들 */}
        <div className="relative z-10">
          {farm.animals.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-4">[?]</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">아직 토끼가 없어요!</h3>
              <p className="text-gray-500 mb-6">새로운 토끼를 입양해보세요</p>
              <motion.button
                onClick={() => setShowAdoptModal(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-6 h-6 inline mr-2" />
                토끼 입양하기
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {farm.animals.map((animal, index) => (
                <motion.div
                  key={animal.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border-2 border-gray-100"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{animal.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{getLevelInfo(animal.level).description}</p>
                    
                    <RabbitCharacter
                      animal={animal}
                      onFeed={() => feedAnimal(animal.id)}
                      onPlay={() => playWithAnimal(animal.id)}
                      onTrain={() => trainAnimal(animal.id)}
                      size={animal.level === 1 ? 'small' : animal.level === 2 ? 'medium' : 'large'}
                    />

                    {/* 성격 표시 */}
                    <div className="mt-4">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {animal.personality === 'shy' && '😊 수줍음'}
                        {animal.personality === 'playful' && '🎾 장난꾸러기'}
                        {animal.personality === 'studious' && '📚 공부벌레'}
                        {animal.personality === 'energetic' && '⚡ 활발함'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 입양 버튼 */}
        {farm.animals.length > 0 && (
          <motion.button
            onClick={() => setShowAdoptModal(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        )}
      </div>

      {/* 입양 모달 */}
      {showAdoptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">토끼 입양하기</h2>
            
            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((level) => {
                const info = getLevelInfo(level);
                return (
                  <motion.button
                    key={level}
                    onClick={() => setSelectedLevel(level as 1 | 2 | 3)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all ${
                      selectedLevel === level
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                        level === 1 ? 'from-pink-300 to-pink-500' :
                        level === 2 ? 'from-blue-300 to-blue-500' :
                        'from-purple-300 to-purple-500'
                      } flex items-center justify-center text-white text-xl`}>
                        [?]
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-800">{info.name}</div>
                        <div className="text-sm text-gray-600">{info.description}</div>
                        <div className="text-xs text-gray-500">입양비: 50코인</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex space-x-4">
              <motion.button
                onClick={() => setShowAdoptModal(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                취소
              </motion.button>
              <motion.button
                onClick={handleAdopt}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                입양하기
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
