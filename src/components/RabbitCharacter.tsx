import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Heart, Zap, Star, Coffee } from 'lucide-react';
import { Animal } from '../types';

interface RabbitCharacterProps {
  animal: Animal;
  onFeed: () => void;
  onPlay: () => void;
  onTrain: () => void;
  onTalk?: () => void;
  onGift?: () => void;
  onStudyTimer?: () => void; // 개인 공부 타이머로 이동
  isInTank?: boolean;
  position?: { x: number; y: number };
}

export function RabbitCharacter({
  animal,
  onFeed,
  onPlay,
  onTrain,
  onTalk,
  onGift,
  onStudyTimer,
  isInTank = false,
  position = { x: 0, y: 0 }
}: RabbitCharacterProps) {
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueText, setDialogueText] = useState('');
  const controls = useAnimation();
  const movementInterval = useRef<number | null>(null);

  // 모든 토끼를 중딩 사이즈로 통일
  const size = 'large'; // 모든 토끼를 중딩 사이즈로 통일
  const sizeClasses = {
    small: 'w-32 h-32', // 유딩도 중딩 사이즈
    medium: 'w-32 h-32', // 초딩도 중딩 사이즈
    large: 'w-32 h-32'   // 중딩 사이즈
  };

  // 성격별 애니메이션
  const getPersonalityAnimation = () => {
    switch (animal.personality) {
      case 'shy':
        return {
          scale: [1, 0.95, 1],
          transition: { duration: 2, repeat: Infinity }
        };
      case 'playful':
        return {
          rotate: [0, 5, -5, 0],
          transition: { duration: 1, repeat: Infinity }
        };
      case 'studious':
        return {
          y: [0, -2, 0],
          transition: { duration: 3, repeat: Infinity }
        };
      case 'energetic':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 0.8, repeat: Infinity }
        };
      default:
        return {};
    }
  };

  // 기분에 따른 이모지
  const getMoodEmoji = () => {
    if (animal.happiness >= 80) return '😊';
    if (animal.happiness >= 60) return '🙂';
    if (animal.happiness >= 40) return '😐';
    if (animal.happiness >= 20) return '😔';
    return '😢';
  };

  // 액션 처리
  const handleAction = (action: string, callback: () => void) => {
    setCurrentAction(action);
    setIsAnimating(true);
    
    // NPC 미연시 스타일 대화
    if (action === 'talk' && onTalk) {
      const dialogues = [
        "안녕! 오늘도 수학 공부 열심히 해!",
        "너무 어려운 문제가 있어? 토끼가 도와줄게!",
        "수학은 정말 재미있어! 함께 배워보자!",
        "오늘도 화이팅! 토끼가 응원할게!",
        "문제를 풀 때마다 토끼도 똑똑해져!"
      ];
      const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
      setDialogueText(randomDialogue);
      setShowDialogue(true);
      setTimeout(() => setShowDialogue(false), 3000);
    }
    
    callback();
    
    setTimeout(() => {
      setCurrentAction(null);
      setIsAnimating(false);
    }, 1000);
  };

  // 수조에서 자유로운 움직임
  useEffect(() => {
    if (isInTank) {
      const moveRandomly = () => {
        const newX = Math.random() * 300;
        const newY = Math.random() * 200;
        const newDirection = Math.random() > 0.5 ? 'left' : 'right';
        
        setDirection(newDirection);
        setIsMoving(true);
        
        controls.start({
          x: newX,
          y: newY,
          transition: { duration: 2, ease: "easeInOut" }
        });
        
        setTimeout(() => setIsMoving(false), 2000);
      };

      movementInterval.current = window.setInterval(moveRandomly, 3000);
      return () => {
        if (movementInterval.current) {
          clearInterval(movementInterval.current);
        }
      };
    }
  }, [isInTank, controls]);

  return (
    <div className="relative">
      {isInTank ? (
        <>
          {/* 수조 안에서 토끼만 렌더링 (수조는 AnimalFarmPage에서 제공) */}
          <motion.div
            className={`${sizeClasses[size]} absolute cursor-pointer z-10`}
            animate={controls}
            initial={{ x: position.x, y: position.y }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAction('click', () => {})}
            style={{
              filter: isMoving ? 'brightness(1.1)' : 'brightness(1)',
              transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
            }}
          >
            <img
              src={animal.image || "https://leesoyeon99.github.io/calculationparm/images/rabbit.png"}
              alt={animal.name}
              className="w-full h-full object-contain"
            />
            
            {/* 레벨 표시 */}
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              Lv.{animal.level}
            </div>
            
            {/* 기분 표시 */}
            <div className="absolute -bottom-2 -left-2 text-2xl">
              {getMoodEmoji()}
            </div>
          </motion.div>
          
          {/* 대화 말풍선 (NPC 미연시 스타일) */}
          {showDialogue && (
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-pink-300 z-20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="text-sm font-medium text-gray-800 max-w-48 text-center">
                {dialogueText}
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-300"></div>
            </motion.div>
          )}
        </>
      ) : (
        <>
          {/* 일반 환경 (기존 스타일) */}
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
              className="w-full h-full relative cursor-pointer"
              animate={currentAction === 'feed' ? {
                scale: [1, 1.1, 1],
              } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStudyTimer}
            >
              <img
                src={animal.image || "https://leesoyeon99.github.io/calculationparm/images/rabbit.png"}
                alt={animal.name}
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
                  style={{ width: `${(animal.experience % 100)}%` }}
                  animate={{ width: `${(animal.experience % 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-gray-600">{animal.experience}</span>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
            {onFeed && (
              <motion.button
                onClick={() => handleAction('feed', onFeed)}
                className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🥕 먹이주기
              </motion.button>
            )}
            {onPlay && (
              <motion.button
                onClick={() => handleAction('play', onPlay)}
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ⚽ 놀아주기
              </motion.button>
            )}
            {onTrain && (
              <motion.button
                onClick={() => handleAction('train', onTrain)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📚 훈련하기
              </motion.button>
            )}
          </div>

          {/* NPC 미연시 스타일 액션 버튼 */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
            {onTalk && (
              <motion.button
                onClick={() => handleAction('talk', onTalk)}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-pink-500 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                💬 대화하기
              </motion.button>
            )}
            
            {onGift && (
              <motion.button
                onClick={() => handleAction('gift', onGift)}
                className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🎁 선물하기
              </motion.button>
            )}
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
        </>
      )}
    </div>
  );
}