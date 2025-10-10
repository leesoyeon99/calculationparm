import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  maxStreak?: number;
}

export function StreakCounter({ streak, maxStreak = 0 }: StreakCounterProps) {
  return (
    <motion.div
      className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Flame className="w-5 h-5" />
      </motion.div>
      <div className="text-center">
        <div className="text-lg font-bold">{streak}</div>
        <div className="text-xs opacity-90">연속 학습</div>
      </div>
      {maxStreak > streak && (
        <div className="text-xs opacity-75">
          최고: {maxStreak}
        </div>
      )}
    </motion.div>
  );
}


