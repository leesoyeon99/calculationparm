import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedPathProps {
  progress: number;
  totalStages: number;
  completedStages: number;
}

export function AnimatedPath({ progress }: AnimatedPathProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full" />
      
      {/* 진행률 바 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${animatedProgress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* 반짝이는 효과 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
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
      
      {/* 진행률 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white drop-shadow-lg">
          {Math.round(animatedProgress)}%
        </span>
      </div>
    </div>
  );
}

export function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
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
  );
}

export function ProgressCelebration({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        >
          🎉
        </motion.div>
      ))}
    </motion.div>
  );
}

