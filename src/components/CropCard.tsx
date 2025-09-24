import { motion } from 'framer-motion';
import { Droplets, Scissors } from 'lucide-react';
import { Crop } from '../types';

interface CropCardProps {
  crop: Crop;
  onWater: () => void;
  onHarvest: () => void;
}

export function CropCard({ crop, onWater, onHarvest }: CropCardProps) {
  const getCropEmoji = (type: Crop['type'], stage: Crop['stage']) => {
    const emojiMap = {
      potato: {
        seed: '🥔',
        sprout: '🌱',
        stem: '🌿',
        flower: '🌿',
        harvest: '🥔'
      },
      carrot: {
        seed: '🥕',
        sprout: '🌱',
        stem: '🌿',
        flower: '🌿',
        harvest: '🥕'
      },
      corn: {
        seed: '🌽',
        sprout: '🌱',
        stem: '🌿',
        flower: '🌿',
        harvest: '🌽'
      },
      sunflower: {
        seed: '🌻',
        sprout: '🌱',
        stem: '🌿',
        flower: '🌻',
        harvest: '🌻'
      }
    };
    
    return emojiMap[type][stage];
  };

  const getStageName = (stage: Crop['stage']) => {
    const stageNames = {
      seed: '씨앗',
      sprout: '새싹',
      stem: '줄기',
      flower: '꽃',
      harvest: '수확'
    };
    return stageNames[stage];
  };

  const getStageColor = (stage: Crop['stage']) => {
    const colors = {
      seed: 'bg-gray-100',
      sprout: 'bg-green-100',
      stem: 'bg-green-200',
      flower: 'bg-yellow-100',
      harvest: 'bg-orange-100'
    };
    return colors[stage];
  };

  return (
    <motion.div
      className={`crop-card ${getStageColor(crop.stage)} relative overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 작물 이모지 */}
      <div className="text-center mb-3">
        <motion.div
          className="text-4xl"
          animate={{
            y: crop.stage === 'harvest' ? [0, -2, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: crop.stage === 'harvest' ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {getCropEmoji(crop.type, crop.stage)}
        </motion.div>
        
        {/* 수확 준비 표시 */}
        {crop.isReadyToHarvest && (
          <motion.div
            className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      {/* 작물 정보 */}
      <div className="text-center mb-3">
        <h4 className="font-bold text-gray-800 text-sm">{crop.name}</h4>
        <p className="text-xs text-gray-600">{getStageName(crop.stage)}</p>
      </div>

      {/* 성장률 바 */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>성장률</span>
          <span>{crop.growthProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${crop.growthProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex space-x-2">
        {!crop.isReadyToHarvest && (
          <button
            onClick={onWater}
            className="flex-1 bg-blue-500 text-white text-xs py-2 px-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
          >
            <Droplets className="w-3 h-3" />
            <span>물주기</span>
          </button>
        )}
        
        {crop.isReadyToHarvest && (
          <button
            onClick={onHarvest}
            className="flex-1 bg-orange-500 text-white text-xs py-2 px-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-1"
          >
            <Scissors className="w-3 h-3" />
            <span>수확</span>
          </button>
        )}
      </div>

      {/* 심은 날짜 */}
      <div className="text-xs text-gray-500 text-center mt-2">
        {new Date(crop.plantedAt).toLocaleDateString('ko-KR', {
          month: 'short',
          day: 'numeric'
        })}
      </div>
    </motion.div>
  );
}

