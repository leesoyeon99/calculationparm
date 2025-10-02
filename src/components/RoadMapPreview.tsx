import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Lock, 
  Crown, 
  Zap, 
  CheckCircle, 
  Play,
  MapPin,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function RoadMapPreview() {
  const { stages } = useGameStore();

  const getStageIcon = (stage: typeof stages[0]) => {
    if (stage.difficulty === 'boss') return Crown;
    if (stage.isCompleted) return CheckCircle;
    if (stage.isCurrent) return Zap;
    if (stage.isUnlocked) return Play;
    return Lock;
  };

  const getStageColor = (stage: typeof stages[0]) => {
    if (stage.isCompleted) return 'bg-green-500';
    if (stage.isCurrent) return 'bg-yellow-500 animate-pulse';
    if (stage.isUnlocked) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  const getStageEmoji = (stage: typeof stages[0]) => {
    if (stage.difficulty === 'boss') return '👑';
    if (stage.isCompleted) return '✅';
    if (stage.isCurrent) return '🎯';
    if (stage.isUnlocked) return '🌱';
    return '🔒';
  };

  const recentStages = stages.slice(0, 6); // 최근 6개 스테이지만 표시

  return (
    <motion.div
      className="farm-card p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-2 border-pink-200 shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* 배경 파티클 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MapPin className="w-4 h-4 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">🛣️ 학습의 길</h3>
            <p className="text-sm text-gray-600">소마리터와 함께 떠나는 수학 여정</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/world-map"
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>전체 보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* 귀여운 미니 길 맵 */}
      <div className="relative z-10">
        {/* 귀여운 배경 길 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-2 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full opacity-40 shadow-lg"></div>
        </div>
        
        {/* 떠다니는 파티클 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* 스테이지 노드들 */}
        <div className="relative grid grid-cols-6 gap-4">
          {recentStages.map((stage, index) => {
            const Icon = getStageIcon(stage);
            const isClickable = stage.isUnlocked && !stage.isCompleted;
            
            return (
              <motion.div
                key={stage.id}
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* 귀여운 연결선 */}
                {index < recentStages.length - 1 && (
                  <motion.div 
                    className="absolute top-6 left-full w-4 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 z-0 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />
                )}
                
                {/* 귀여운 스테이지 노드 */}
                <motion.div
                  className={`relative p-4 rounded-2xl shadow-lg transition-all duration-500 transform ${
                    stage.isCurrent
                      ? 'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-100 border-2 border-yellow-400 shadow-xl scale-105'
                      : stage.isCompleted
                      ? 'bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 border border-green-300'
                      : stage.isUnlocked
                      ? 'bg-gradient-to-br from-white via-blue-50 to-white border border-blue-200 hover:shadow-xl hover:scale-110'
                      : 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border border-gray-300 opacity-60'
                  }`}
                  whileHover={isClickable ? { 
                    scale: 1.1, 
                    y: -5,
                    rotateY: 5,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  } : {}}
                  whileTap={isClickable ? { scale: 0.9 } : {}}
                  onClick={() => {
                    if (isClickable) {
                      window.location.href = `/stage/${stage.id}`;
                    }
                  }}
                  style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}
                >
                  {/* 귀여운 장식 요소 */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>

                  {/* 스테이지 번호와 아이콘 */}
                  <div className="flex items-center justify-between mb-2">
                    <motion.div 
                      className={`w-10 h-10 rounded-full ${getStageColor(stage)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
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
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {getStageEmoji(stage)}
                    </motion.div>
                  </div>

                  {/* 제목 */}
                  <div className="mb-2">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{stage.title}</h4>
                  </div>

                  {/* 귀여운 난이도 표시 */}
                  <div className="mb-2 text-center">
                    <motion.div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                        stage.difficulty === 1 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                        stage.difficulty === 2 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        stage.difficulty === 3 ? 'bg-gradient-to-r from-red-400 to-rose-500' :
                        'bg-gradient-to-r from-purple-400 to-pink-500'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {stage.difficulty === 1 ? '쉬워요' :
                       stage.difficulty === 2 ? '보통이에요' :
                       stage.difficulty === 3 ? '어려워요' : '보스예요'}
                    </motion.div>
                  </div>

                  {/* 귀여운 보상 표시 */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <motion.div 
                      className="flex items-center space-x-1 bg-yellow-100 rounded-full px-2 py-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="font-bold">{stage.expReward}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-1 bg-green-100 rounded-full px-2 py-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-sm">🌱</span>
                      <span className="font-bold">{stage.cropGrowthReward}</span>
                    </motion.div>
                  </div>

                  {/* 하단 장식 */}
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-2 h-2 text-white" />
                  </div>

                  {/* 귀여운 현재 스테이지 강조 */}
                  {stage.isCurrent && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -10, 0],
                        boxShadow: [
                          "0 0 0 0 rgba(251, 191, 36, 0.7)",
                          "0 0 0 8px rgba(251, 191, 36, 0)",
                          "0 0 0 0 rgba(251, 191, 36, 0)"
                        ]
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

                  {/* 귀여운 완료 표시 */}
                  {stage.isCompleted && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.5, 
                        type: "spring", 
                        stiffness: 200,
                        damping: 10
                      }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 귀여운 진행률 표시 */}
      <div className="mt-6 relative z-10">
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Star className="w-4 h-4 text-yellow-500" />
            </motion.div>
            <span className="font-bold">전체 진행률</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">{Math.round((stages.filter(s => s.isCompleted).length / stages.length) * 100)}%</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
            </motion.div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 h-3 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(stages.filter(s => s.isCompleted).length / stages.length) * 100}%` 
            }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            {/* 진행률 바 내부 반짝이는 효과 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* 귀여운 전체 보기 버튼 */}
      <div className="mt-6 text-center relative z-10">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/world-map"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MapPin className="w-6 h-6" />
            </motion.div>
            <span>전체 길 맵 보기</span>
            <motion.div
              animate={{
                x: [0, 5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
