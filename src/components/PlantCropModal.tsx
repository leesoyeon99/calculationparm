import { useState } from 'react';
import { X, Droplets, Sun, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlantCropModalProps {
  onClose: () => void;
  onPlant: (cropType: string, position: { x: number; y: number }) => void;
  resources: {
    water: number;
    fertilizer: number;
    sunlight: number;
    coins: number;
  };
}

const cropTypes = [
  {
    type: 'potato',
    name: '감자',
    emoji: '🥔',
    cost: 10,
    description: '기본 작물, 쉽게 키울 수 있어요',
    requiredWater: 20,
    requiredSunlight: 10
  },
  {
    type: 'carrot',
    name: '당근',
    emoji: '🥕',
    cost: 15,
    description: '영양가 높은 작물',
    requiredWater: 25,
    requiredSunlight: 15
  },
  {
    type: 'corn',
    name: '옥수수',
    emoji: '🌽',
    cost: 20,
    description: '키우기 어렵지만 보상이 좋아요',
    requiredWater: 30,
    requiredSunlight: 20
  },
  {
    type: 'sunflower',
    name: '해바라기',
    emoji: '🌻',
    cost: 30,
    description: '특별한 작물, 아름다운 꽃을 피워요',
    requiredWater: 40,
    requiredSunlight: 30
  }
];

export function PlantCropModal({ onClose, onPlant, resources }: PlantCropModalProps) {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const canAfford = (crop: typeof cropTypes[0]) => {
    return resources.coins >= crop.cost && 
           resources.water >= crop.requiredWater && 
           resources.sunlight >= crop.requiredSunlight;
  };

  const handlePlant = () => {
    if (selectedCrop) {
      const crop = cropTypes.find(c => c.type === selectedCrop);
      if (crop && canAfford(crop)) {
        onPlant(selectedCrop, { x: Math.random() * 100, y: Math.random() * 100 });
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="farm-card w-full max-w-md max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">작물 심기</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* 리소스 표시 */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">현재 리소스</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">물: {resources.water}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">햇살: {resources.sunlight}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-600">코인: {resources.coins}</span>
              </div>
            </div>
          </div>

          {/* 작물 선택 */}
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">작물을 선택하세요</h3>
            <div className="space-y-3">
              {cropTypes.map((crop) => {
                const affordable = canAfford(crop);
                const isSelected = selectedCrop === crop.type;
                
                return (
                  <motion.div
                    key={crop.type}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-farm-green bg-green-50' 
                        : affordable 
                          ? 'border-gray-200 hover:border-farm-green hover:bg-green-50' 
                          : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => affordable && setSelectedCrop(crop.type)}
                    whileHover={affordable ? { scale: 1.02 } : {}}
                    whileTap={affordable ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{crop.emoji}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{crop.name}</h4>
                        <p className="text-sm text-gray-600">{crop.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Droplets className="w-3 h-3" />
                            <span>{crop.requiredWater}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Sun className="w-3 h-3" />
                            <span>{crop.requiredSunlight}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Coins className="w-3 h-3" />
                            <span>{crop.cost}</span>
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-farm-green rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="p-6 border-t border-gray-200 flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handlePlant}
              disabled={!selectedCrop || !canAfford(cropTypes.find(c => c.type === selectedCrop)!)}
              className="flex-1 py-3 px-4 bg-farm-green text-white rounded-lg hover:bg-farm-darkGreen transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              심기
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

