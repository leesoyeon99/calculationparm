import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Crown } from 'lucide-react';

interface AchievementAnimationProps {
  show: boolean;
  type: 'stage_complete' | 'level_up' | 'streak' | 'boss_defeat';
  message: string;
  onComplete: () => void;
}

export function AchievementAnimation({ show, type, message, onComplete }: AchievementAnimationProps) {
  const getIcon = () => {
    switch (type) {
      case 'stage_complete':
        return <Star className="w-16 h-16 text-yellow-500" />;
      case 'level_up':
        return <Zap className="w-16 h-16 text-blue-500" />;
      case 'streak':
        return <Trophy className="w-16 h-16 text-orange-500" />;
      case 'boss_defeat':
        return <Crown className="w-16 h-16 text-purple-500" />;
      default:
        return <Star className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'stage_complete':
        return 'from-yellow-400 to-orange-500';
      case 'level_up':
        return 'from-blue-400 to-blue-600';
      case 'streak':
        return 'from-orange-400 to-red-500';
      case 'boss_defeat':
        return 'from-purple-400 to-pink-500';
      default:
        return 'from-yellow-400 to-orange-500';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setTimeout(onComplete, 3000);
          }}
        >
          <motion.div
            className={`bg-gradient-to-br ${getBackgroundColor()} text-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20 
            }}
          >
            {/* 아이콘 애니메이션 */}
            <motion.div
              className="mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              {getIcon()}
            </motion.div>

            {/* 메시지 */}
            <motion.h2
              className="text-2xl font-bold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              축하합니다! 🎉
            </motion.h2>
            
            <motion.p
              className="text-lg mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {message}
            </motion.p>

            {/* 파티클 효과 */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LevelUpEffect({ show, level }: { show: boolean; level: number }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-8xl font-bold text-yellow-500 drop-shadow-2xl"
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20 
            }}
          >
            LEVEL UP!
          </motion.div>
          
          <motion.div
            className="absolute text-6xl font-bold text-blue-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {level}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


