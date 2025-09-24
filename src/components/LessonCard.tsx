import { motion } from 'framer-motion';
import { Play, Star, Lock, CheckCircle, Zap } from 'lucide-react';

interface LessonCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'boss';
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
  expReward: number;
  cropGrowthReward: number;
  onStart: () => void;
}

export function LessonCard({
  id,
  title,
  description,
  difficulty,
  isCompleted,
  isUnlocked,
  isCurrent,
  expReward,
  cropGrowthReward,
  onStart
}: LessonCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
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
    switch (difficulty) {
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

  const getStatusIcon = () => {
    if (isCompleted) return CheckCircle;
    if (isCurrent) return Zap;
    if (isUnlocked) return Play;
    return Lock;
  };

  const StatusIcon = getStatusIcon();

  return (
    <motion.div
      className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 ${
        isCurrent
          ? 'bg-gradient-to-br from-blue-50 to-green-50 border-2 border-farm-green shadow-xl'
          : isCompleted
          ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'
          : isUnlocked
          ? 'bg-white border border-gray-200 hover:shadow-xl hover:scale-105'
          : 'bg-gray-100 border border-gray-200 opacity-60'
      }`}
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      onClick={isUnlocked ? onStart : undefined}
      style={{ cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
    >
      {/* 상태 표시 */}
      <div className="absolute top-4 right-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isCompleted
            ? 'bg-green-500 text-white'
            : isCurrent
            ? 'bg-farm-green text-white animate-pulse'
            : isUnlocked
            ? 'bg-blue-500 text-white'
            : 'bg-gray-400 text-white'
        }`}>
          <StatusIcon className="w-4 h-4" />
        </div>
      </div>

      {/* 난이도 표시 */}
      <div className="mb-4">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor()}`}>
          {getDifficultyText()}
        </div>
      </div>

      {/* 제목과 설명 */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* 보상 정보 */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>+{expReward} EXP</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>🌱</span>
          <span>+{cropGrowthReward} 성장</span>
        </div>
      </div>

      {/* 액션 버튼 */}
      {isUnlocked && (
        <motion.button
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
            isCurrent
              ? 'bg-farm-green hover:bg-farm-darkGreen'
              : isCompleted
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCompleted ? '완료됨' : isCurrent ? '계속하기' : '시작하기'}
        </motion.button>
      )}

      {/* 잠금 상태 메시지 */}
      {!isUnlocked && (
        <div className="text-center text-gray-500 text-sm">
          이전 스테이지를 완료하세요
        </div>
      )}

      {/* 현재 스테이지 강조 */}
      {isCurrent && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}

