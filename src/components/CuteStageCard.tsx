import { motion } from 'framer-motion';
import { 
  Star, 
  Lock, 
  Crown, 
  Zap, 
  CheckCircle, 
  Play,
  Sparkles,
  Heart,
  Gem,
  Flame,
  Shield,
  Sword,
  Coins,
  Trophy,
  Sprout
} from 'lucide-react';
import { useState } from 'react';

interface CuteStageCardProps {
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
    starRating: number;
    plantPoints: number;
    isGoldStage: boolean;
  };
  unit?: {
    grade: number;
    subject: string;
    subSubject: string;
  };
  onStart: () => void;
  index: number;
}

export function CuteStageCard({ stage, unit, onStart, index }: CuteStageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getStageIcon = () => {
    if (stage.difficulty === 'boss') return Crown;
    if (stage.isCompleted) return CheckCircle;
    if (stage.isCurrent) return Zap;
    if (stage.isUnlocked) return Play;
    return Lock;
  };

  const getDifficultyIcon = () => {
    switch (stage.difficulty) {
      case 'easy': return Shield;
      case 'medium': return Sword;
      case 'hard': return Flame;
      case 'boss': return Crown;
      default: return Shield;
    }
  };

  const getDifficultyColor = () => {
    // 사고력 연산은 특별한 프리미엄 색상
    if (unit?.subject === '사고력 연산') {
      return 'from-yellow-400 via-yellow-500 to-yellow-600';
    }
    
    switch (stage.difficulty) {
      case 'easy':
        return 'from-green-400 via-emerald-300 to-green-500';
      case 'medium':
        return 'from-yellow-400 via-amber-300 to-orange-500';
      case 'hard':
        return 'from-red-400 via-rose-300 to-red-500';
      case 'boss':
        return 'from-purple-400 via-violet-300 to-purple-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyText = () => {
    switch (stage.difficulty) {
      case 'easy':
        return '쉬워요';
      case 'medium':
        return '보통이에요';
      case 'hard':
        return '어려워요';
      case 'boss':
        return '보스예요';
      default:
        return '기본';
    }
  };

  const getCardStyle = () => {
    // 사고력 연산은 특별한 프리미엄 스타일
    if (unit?.subject === '사고력 연산') {
      if (stage.isCurrent) {
        return 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 border-3 border-yellow-400 shadow-2xl animate-pulse';
      }
      if (stage.isCompleted) {
        return 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 border-2 border-yellow-300 shadow-xl';
      }
      if (stage.isUnlocked) {
        return 'bg-gradient-to-br from-yellow-50 via-yellow-25 to-yellow-50 border-2 border-yellow-300 hover:shadow-2xl animate-pulse';
      }
      return 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border-2 border-gray-300 opacity-60';
    }
    
    if (stage.isCurrent) {
      return 'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-100 border-3 border-yellow-400 shadow-2xl';
    }
    if (stage.isCompleted) {
      return 'bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 border-2 border-green-300 shadow-xl';
    }
    if (stage.isUnlocked) {
      return 'bg-gradient-to-br from-white via-blue-50 to-white border-2 border-blue-200 hover:shadow-2xl';
    }
    return 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border-2 border-gray-300 opacity-60';
  };

  const getCardCursor = () => {
    if (stage.isUnlocked && !stage.isCompleted) {
      return 'cursor-pointer';
    }
    return 'cursor-not-allowed';
  };

  const isClickable = stage.isUnlocked && !stage.isCompleted;

  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTapEnd={() => setIsPressed(false)}
    >
      {/* 연결선 */}
      {index < 5 && (
        <motion.div
          className="absolute top-12 left-full w-8 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 z-0 hidden md:block rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        />
      )}
      
      {/* 귀여운 스테이지 카드 */}
      <motion.div
        className={`relative p-6 rounded-3xl shadow-xl transition-all duration-500 transform ${getCardStyle()}`}
        whileHover={isClickable ? { 
          scale: 1.08, 
          y: -10,
          rotateY: 8,
          rotateX: 5,
          boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
        } : {}}
        whileTap={isClickable ? { scale: 0.92, rotateY: -3 } : {}}
        onClick={() => {
          if (isClickable) {
            onStart();
          }
        }}
        style={{ cursor: getCardCursor() }}
        animate={{
          scale: isPressed ? 0.92 : 1,
          y: isHovered && isClickable ? -10 : 0,
          rotateY: isHovered && isClickable ? 8 : 0,
          rotateX: isHovered && isClickable ? 5 : 0,
        }}
      >
        {/* 호버 효과 - 반짝이는 파티클 */}
        {isHovered && isClickable && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-purple-200/20 to-blue-200/20 rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* 카드 상단 장식 */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {/* 골드스테이지 표시 */}
        {stage.isGoldStage && (
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg z-10">
            <Crown className="w-3 h-3 text-white" />
          </div>
        )}

        {/* 사고력 연산 프리미엄 표시 */}
        {unit?.subject === '사고력 연산' && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse z-10">
            PREMIUM
          </div>
        )}

        {/* 스테이지 번호와 이모지 */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${getDifficultyColor()} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
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
            className="text-4xl"
            animate={{
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const IconComponent = getStageIcon();
              return <IconComponent className="w-8 h-8 text-white" />;
            })()}
          </motion.div>
        </div>

        {/* 제목과 설명 */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{stage.title}</h3>
          <p className="text-sm text-gray-600 mb-2 text-center">{stage.description}</p>
          {unit && (
            <div className="text-xs text-gray-500 text-center bg-white/50 rounded-full px-3 py-1">
              {unit.grade === 0 ? '유치원' : unit.grade <= 6 ? `${unit.grade}학년` : `${unit.grade - 6}학년`} - {unit.subject}
            </div>
          )}
        </div>

        {/* 난이도 표시 - 귀여운 스타일 */}
        <div className="mb-4 text-center">
          <motion.div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getDifficultyColor()} shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            {(() => {
              const DifficultyIcon = getDifficultyIcon();
              return <DifficultyIcon className="w-4 h-4" />;
            })()}
            <span>{getDifficultyText()}</span>
          </motion.div>
        </div>

        {/* 난이도와 보상 정보 */}
        <div className="space-y-3 mb-4">
          {/* 별 난이도 */}
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-4 h-4 ${
                  i < stage.starRating 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
                animate={i < stage.starRating ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <Star className="w-full h-full fill-current" />
              </motion.div>
            ))}
          </div>
          
          {/* 보상 정보 */}
          <div className="flex items-center justify-between text-sm">
            <motion.div
              className="flex items-center space-x-2 bg-yellow-100 rounded-full px-3 py-1"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-bold">+{stage.expReward}</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 bg-green-100 rounded-full px-3 py-1"
              whileHover={{ scale: 1.1 }}
            >
              <Sprout className="w-4 h-4 text-green-500" />
              <span className="font-bold">+{stage.plantPoints}</span>
            </motion.div>
          </div>
        </div>

        {/* 액션 버튼 - 귀여운 스타일 */}
        {stage.isUnlocked && (
          <motion.button
            className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg ${
              stage.isCurrent
                ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:via-orange-500 hover:to-yellow-600'
                : stage.isCompleted
                ? 'bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 hover:from-green-500 hover:via-emerald-500 hover:to-green-600'
                : 'bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600'
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: stage.isCurrent ? [
                "0 10px 25px rgba(251, 191, 36, 0.4)",
                "0 15px 35px rgba(251, 191, 36, 0.6)",
                "0 10px 25px rgba(251, 191, 36, 0.4)"
              ] : "0 10px 25px rgba(0,0,0,0.1)"
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: stage.isCurrent ? Infinity : 0,
                ease: "easeInOut"
              }
            }}
          >
            <div className="flex items-center justify-center space-x-2">
              {stage.isCompleted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>완료됨</span>
                </>
              ) : stage.isCurrent ? (
                <>
                  <Zap className="w-5 h-5" />
                  <span>계속하기</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>시작하기</span>
                </>
              )}
            </div>
          </motion.button>
        )}

        {/* 잠금 상태 */}
        {!stage.isUnlocked && (
          <div className="text-center text-gray-500 text-sm bg-gray-100 rounded-xl py-3">
            <Lock className="w-5 h-5 mx-auto mb-2" />
            <div>이전 스테이지를 완료하세요</div>
          </div>
        )}

        {/* 현재 스테이지 강조 - 귀여운 효과 */}
        {stage.isCurrent && (
          <motion.div
            className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
              boxShadow: [
                "0 0 0 0 rgba(251, 191, 36, 0.7)",
                "0 0 0 10px rgba(251, 191, 36, 0)",
                "0 0 0 0 rgba(251, 191, 36, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-5 h-5 text-white" />
          </motion.div>
        )}

        {/* 완료 표시 - 귀여운 효과 */}
        {stage.isCompleted && (
          <motion.div
            className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.5, 
              type: "spring", 
              stiffness: 200,
              damping: 10
            }}
          >
            <CheckCircle className="w-5 h-5 text-white" />
          </motion.div>
        )}

        {/* 보스 스테이지 특별 효과 */}
        {stage.difficulty === 'boss' && (
          <motion.div
            className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Crown className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* 카드 하단 장식 */}
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-3 h-3 text-white" />
        </div>

        {/* 카드 모서리 장식 */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
      </motion.div>
    </motion.div>
  );
}
