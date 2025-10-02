import { motion } from 'framer-motion';
import { 
  Star, 
  Lock, 
  Crown, 
  Zap, 
  CheckCircle, 
  Play,
  MapPin,
  Trophy,
  Flame
} from 'lucide-react';
import { useState } from 'react';

interface InteractiveStageCardProps {
  stage: {
    id: number;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'boss';
    isCompleted: boolean;
    isUnlocked: boolean;
    isCurrent: boolean;
    expReward: number;
    cropGrowthReward: number;
  };
  unit?: {
    grade: number;
    subject: string;
    subSubject: string;
  };
  onStart: () => void;
  index: number;
}

export function InteractiveStageCard({ stage, unit, onStart, index }: InteractiveStageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getStageIcon = () => {
    if (stage.difficulty === 'boss') return Crown;
    if (stage.isCompleted) return CheckCircle;
    if (stage.isCurrent) return Zap;
    if (stage.isUnlocked) return Play;
    return Lock;
  };

  const getStageColor = () => {
    if (stage.isCompleted) return 'bg-green-500';
    if (stage.isCurrent) return 'bg-yellow-500 animate-pulse';
    if (stage.isUnlocked) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  const getStageEmoji = () => {
    if (stage.difficulty === 'boss') return '👑';
    if (stage.isCompleted) return '✅';
    if (stage.isCurrent) return '🎯';
    if (stage.isUnlocked) return '🌱';
    return '🔒';
  };

  const getDifficultyColor = () => {
    switch (stage.difficulty) {
      case 'easy':
        return 'from-green-400 to-green-500';
      case 'medium':
        return 'from-yellow-400 to-orange-500';
      case 'hard':
        return 'from-red-400 to-red-500';
      case 'boss':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyText = () => {
    switch (stage.difficulty) {
      case 'easy':
        return '쉬움';
      case 'medium':
        return '보통';
      case 'hard':
        return '어려움';
      case 'boss':
        return '보스';
      default:
        return '기본';
    }
  };

  const Icon = getStageIcon();
  const isClickable = stage.isUnlocked && !stage.isCompleted;

  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
    >
      {/* 연결선 */}
      {index < 5 && (
        <motion.div
          className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-farm-green to-farm-darkGreen z-0 hidden md:block"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        />
      )}
      
      {/* 스테이지 카드 */}
      <motion.div
        className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 ${
          stage.isCurrent
            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 shadow-xl'
            : stage.isCompleted
            ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'
            : stage.isUnlocked
            ? 'bg-white border border-gray-200 hover:shadow-xl'
            : 'bg-gray-100 border border-gray-200 opacity-60'
        }`}
        whileHover={isClickable ? { 
          scale: 1.05, 
          y: -5,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        } : {}}
        whileTap={isClickable ? { scale: 0.95 } : {}}
        onClick={() => {
          if (isClickable) {
            onStart();
          }
        }}
        style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}
        animate={{
          scale: isPressed ? 0.95 : 1,
          y: isHovered && isClickable ? -5 : 0,
        }}
      >
        {/* 호버 효과 */}
        {isHovered && isClickable && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* 스테이지 번호와 아이콘 */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className={`w-12 h-12 rounded-full ${getStageColor()} flex items-center justify-center text-white font-bold text-lg`}
            animate={{
              scale: stage.isCurrent ? [1, 1.1, 1] : 1,
              rotate: stage.isCurrent ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: stage.isCurrent ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {stage.id}
          </motion.div>
          <motion.div
            className="text-2xl"
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {getStageEmoji()}
          </motion.div>
        </div>

        {/* 제목과 설명 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{stage.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
          {unit && (
            <div className="text-xs text-gray-500">
              {unit.grade === 0 ? '유치원' : unit.grade <= 6 ? `${unit.grade}학년` : `${unit.grade - 6}학년`} - {unit.subject}
            </div>
          )}
        </div>

        {/* 난이도 표시 */}
        <div className="mb-4">
          <motion.div
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor()}`}
            whileHover={{ scale: 1.05 }}
          >
            {getDifficultyText()}
          </motion.div>
        </div>

        {/* 보상 정보 */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <motion.div
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="w-4 h-4 text-yellow-500" />
            <span>+{stage.expReward}</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.1 }}
          >
            <span>🌱</span>
            <span>+{stage.cropGrowthReward}</span>
          </motion.div>
        </div>

        {/* 액션 버튼 */}
        {stage.isUnlocked && (
          <motion.button
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
              stage.isCurrent
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                : stage.isCompleted
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: stage.isCurrent ? [
                "0 4px 15px rgba(251, 191, 36, 0.3)",
                "0 4px 25px rgba(251, 191, 36, 0.5)",
                "0 4px 15px rgba(251, 191, 36, 0.3)"
              ] : "0 4px 15px rgba(0, 0, 0, 0.1)"
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: stage.isCurrent ? Infinity : 0,
                ease: "easeInOut"
              }
            }}
          >
            {stage.isCompleted ? '완료됨' : stage.isCurrent ? '계속하기' : '시작하기'}
          </motion.button>
        )}

        {/* 잠금 상태 */}
        {!stage.isUnlocked && (
          <div className="text-center text-gray-500 text-sm">
            이전 스테이지를 완료하세요
          </div>
        )}

        {/* 현재 스테이지 강조 */}
        {stage.isCurrent && (
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* 완료 표시 */}
        {stage.isCompleted && (
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* 보스 스테이지 특별 효과 */}
        {stage.difficulty === 'boss' && (
          <motion.div
            className="absolute -top-1 -left-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Crown className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

