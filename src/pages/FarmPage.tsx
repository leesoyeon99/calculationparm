import { useState } from 'react';
import { ArrowLeft, Plus, Droplets, Sun, Coins, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { CropCard } from '../components/CropCard';
import { PlantCropModal } from '../components/PlantCropModal';
import { FarmShop } from '../components/FarmShop';
import { motion } from 'framer-motion';

export function FarmPage() {
  const { farm, waterCrop, harvestCrop, plantCrop } = useGameStore();
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const getCropEmoji = (type: string, stage: string) => {
    const emojiMap: Record<string, Record<string, string>> = {
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
    
    return emojiMap[type]?.[stage] || '🌱';
  };

  const handlePlantCrop = (cropType: string, position: { x: number; y: number }) => {
    plantCrop(cropType as any, position);
    setShowPlantModal(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{farm.name}</h1>
            <p className="text-gray-600">작물을 키우고 농장을 꾸며보세요!</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowShop(true)}
          className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* 리소스 표시 */}
      <div className="farm-card p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-lg font-bold text-gray-800">{farm.resources.water}</div>
              <div className="text-xs text-gray-600">물</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <div>
              <div className="text-lg font-bold text-gray-800">{farm.resources.sunlight}</div>
              <div className="text-xs text-gray-600">햇살</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-yellow-600" />
            <div>
              <div className="text-lg font-bold text-gray-800">{farm.resources.coins}</div>
              <div className="text-xs text-gray-600">코인</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-green-500">🌱</div>
            <div>
              <div className="text-lg font-bold text-gray-800">{farm.crops.length}</div>
              <div className="text-xs text-gray-600">작물</div>
            </div>
          </div>
        </div>
      </div>

      {/* 농장 밭 */}
      <div className="farm-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">농장 밭</h3>
          <button
            onClick={() => setShowPlantModal(true)}
            className="flex items-center space-x-2 bg-farm-green text-white px-4 py-2 rounded-lg hover:bg-farm-darkGreen transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>작물 심기</span>
          </button>
        </div>

        {farm.crops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">아직 작물이 없어요</h4>
            <p className="text-gray-600 mb-4">스테이지를 완료하거나 직접 작물을 심어보세요!</p>
            <button
              onClick={() => setShowPlantModal(true)}
              className="bg-farm-green text-white px-6 py-3 rounded-lg font-medium hover:bg-farm-darkGreen transition-colors"
            >
              첫 작물 심기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {farm.crops.map((crop, index) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <CropCard
                  crop={crop}
                  onWater={() => waterCrop(crop.id)}
                  onHarvest={() => harvestCrop(crop.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 농장 통계 */}
      <div className="farm-card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">농장 통계</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">{farm.level}</div>
            <div className="text-sm text-gray-600">농장 레벨</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">{farm.crops.length}</div>
            <div className="text-sm text-gray-600">현재 작물</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">
              {farm.crops.filter(c => c.isReadyToHarvest).length}
            </div>
            <div className="text-sm text-gray-600">수확 가능</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-farm-green">
              {farm.crops.filter(c => c.stage === 'harvest').length}
            </div>
            <div className="text-sm text-gray-600">완전 성장</div>
          </div>
        </div>
      </div>

      {/* 작물 심기 모달 */}
      {showPlantModal && (
        <PlantCropModal
          onClose={() => setShowPlantModal(false)}
          onPlant={handlePlantCrop}
          resources={farm.resources}
        />
      )}

      {/* 농장 상점 모달 */}
      {showShop && (
        <FarmShop
          onClose={() => setShowShop(false)}
          resources={farm.resources}
        />
      )}
    </div>
  );
}

