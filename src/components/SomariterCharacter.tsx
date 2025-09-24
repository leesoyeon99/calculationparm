import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function SomariterCharacter() {
  const { somariter } = useGameStore();

  const getCharacterEmoji = () => {
    switch (somariter.mood) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'encouraging': return '💪';
      case 'thinking': return '🤔';
      default: return '😊';
    }
  };

  return (
    <motion.div
      className="somariter-character relative"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="text-4xl mb-2">
        {getCharacterEmoji()}
      </div>
      <div className="text-sm font-bold text-white">
        {somariter.name}
      </div>
      <div className="text-xs text-blue-100">
        Lv.{somariter.level}
      </div>
      
      {/* 레벨 표시 */}
      <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
        {somariter.level}
      </div>
    </motion.div>
  );
}

