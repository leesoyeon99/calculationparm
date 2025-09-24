import { Crop } from '../types';

interface CropPreviewProps {
  crops: Crop[];
}

export function CropPreview({ crops }: CropPreviewProps) {
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

  if (crops.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <div className="text-2xl mb-2">🌱</div>
        <div className="text-sm">아직 작물이 없어요</div>
        <div className="text-xs">스테이지를 완료해서 작물을 키워보세요!</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-2">
      {crops.map((crop, index) => (
        <div
          key={crop.id}
          className="relative group"
          title={`${crop.name} - ${crop.stage} (${crop.growthProgress}%)`}
        >
          <div className="text-2xl">
            {getCropEmoji(crop.type, crop.stage)}
          </div>
          {crop.isReadyToHarvest && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
          )}
          {crop.growthProgress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div 
                className="h-1 bg-farm-green rounded-full transition-all duration-300"
                style={{ width: `${crop.growthProgress}%` }}
              />
            </div>
          )}
        </div>
      ))}
      {crops.length > 3 && (
        <div className="flex items-center text-gray-500 text-sm">
          +{crops.length - 3}개 더
        </div>
      )}
    </div>
  );
}

