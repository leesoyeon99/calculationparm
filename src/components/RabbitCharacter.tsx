import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Zap, Star, Coffee } from 'lucide-react';
import { Animal } from '../types';

interface RabbitCharacterProps {
  animal: Animal;
  onFeed: () => void;
  onPlay: () => void;
  onTrain: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function RabbitCharacter({ 
  animal, 
  onFeed, 
  onPlay, 
  onTrain, 
  size = 'medium' 
}: RabbitCharacterProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);

  // 모든 토끼를 중딩 사이즈로 통일
  const sizeClasses = {
    small: 'w-32 h-32', // 유딩도 중딩 사이즈
    medium: 'w-32 h-32', // 초딩도 중딩 사이즈
    large: 'w-32 h-32'   // 중딩 사이즈
  };

  // 레벨별 색상 설정
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'from-pink-300 to-pink-500'; // 유딩 - 핑크
      case 2: return 'from-blue-300 to-blue-500'; // 초딩 - 블루
      case 3: return 'from-purple-300 to-purple-500'; // 중딩 - 퍼플
      default: return 'from-gray-300 to-gray-500';
    }
  };

  // 성격별 애니메이션
  const getPersonalityAnimation = () => {
    switch (animal.personality) {
      case 'shy':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      case 'playful':
        return {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        };
      case 'studious':
        return {
          y: [0, -5, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
      case 'energetic':
        return {
          rotate: [0, 10, -10, 0],
          scale: [1, 1.15, 1],
          transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        };
      default:
        return {};
    }
  };

  // 상태별 표정
  const getMoodEmoji = () => {
    if (animal.happiness >= 80) return '😊';
    if (animal.happiness >= 60) return '😐';
    if (animal.happiness >= 40) return '😔';
    return '😢';
  };

  // 액션 실행
  const handleAction = (action: string, actionFn: () => void) => {
    setCurrentAction(action);
    setIsAnimating(true);
    actionFn();
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentAction(null);
    }, 1000);
  };

  return (
    <div className="relative">
      {/* 토끼 캐릭터 */}
      <motion.div
        className={`relative ${sizeClasses[size]} mx-auto`}
        animate={isAnimating ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        } : getPersonalityAnimation()}
        transition={{ duration: 0.5 }}
      >
        {/* 토끼 이미지 */}
        <motion.div
          className="w-full h-full relative"
          animate={currentAction === 'feed' ? {
            scale: [1, 1.1, 1],
          } : {}}
        >
          <img
            src="/images/rabbit.png"
            alt={`${animal.name} 토끼`}
            className="w-full h-full object-contain"
          />
          
          {/* 상태 표시 */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl">
            {getMoodEmoji()}
          </div>
        </motion.div>

        {/* 레벨 표시 */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 py-1 shadow-md">
          <span className="text-xs font-bold text-gray-700">Lv.{animal.level}</span>
        </div>
      </motion.div>

      {/* 상태 바 */}
      <div className="mt-4 space-y-2">
        {/* 행복도 */}
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-red-500" />
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${animal.happiness}%` }}
              animate={{ width: `${animal.happiness}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-gray-600">{animal.happiness}</span>
        </div>

        {/* 배고픔 */}
        <div className="flex items-center space-x-2">
          <Coffee className="w-4 h-4 text-orange-500" />
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${animal.hunger}%` }}
              animate={{ width: `${animal.hunger}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-gray-600">{animal.hunger}</span>
        </div>

        {/* 에너지 */}
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${animal.energy}%` }}
              animate={{ width: `${animal.energy}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-gray-600">{animal.energy}</span>
        </div>

        {/* 경험치 */}
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-purple-500" />
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${animal.experience}%` }}
              animate={{ width: `${animal.experience}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-gray-600">{animal.experience}</span>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="mt-4 flex justify-center space-x-2">
        <motion.button
          onClick={() => handleAction('feed', onFeed)}
          className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs hover:bg-orange-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🥕 먹이주기
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('play', onPlay)}
          className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎾 놀아주기
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('train', onTrain)}
          className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs hover:bg-purple-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📚 훈련하기
        </motion.button>
      </div>

      {/* 진화 준비 표시 */}
      {animal.isReadyToEvolve && (
        <motion.div
          className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-xs">✨</span>
        </motion.div>
      )}
    </div>
  );
}
