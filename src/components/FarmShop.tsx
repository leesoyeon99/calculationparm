import { useState } from 'react';
import { X, Coins, Droplets, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FarmShopProps {
  onClose: () => void;
  resources: {
    water: number;
    fertilizer: number;
    sunlight: number;
    coins: number;
  };
}

const shopItems = [
  {
    id: 'water',
    name: '물통',
    emoji: '💧',
    description: '물을 더 많이 저장할 수 있어요',
    cost: 50,
    effect: '+20 물 저장량',
    category: 'resource'
  },
  {
    id: 'fertilizer',
    name: '비료',
    emoji: '🌱',
    description: '작물이 더 빨리 자라요',
    cost: 30,
    effect: '+10 성장 속도',
    category: 'resource'
  },
  {
    id: 'fence',
    name: '울타리',
    emoji: '🚧',
    description: '농장을 예쁘게 꾸며요',
    cost: 100,
    effect: '농장 장식',
    category: 'decoration'
  },
  {
    id: 'pot',
    name: '화분',
    emoji: '🪴',
    description: '작물을 더 많이 키울 수 있어요',
    cost: 80,
    effect: '+1 작물 슬롯',
    category: 'decoration'
  },
  {
    id: 'background',
    name: '배경 테마',
    emoji: '🌅',
    description: '농장 배경을 바꿔요',
    cost: 150,
    effect: '새로운 배경',
    category: 'decoration'
  },
  {
    id: 'path',
    name: '길',
    emoji: '🛤️',
    description: '농장에 길을 만들어요',
    cost: 60,
    effect: '농장 길',
    category: 'decoration'
  }
];

export function FarmShop({ onClose, resources }: FarmShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: '전체', emoji: '🛍️' },
    { id: 'resource', name: '리소스', emoji: '⚡' },
    { id: 'decoration', name: '장식', emoji: '🎨' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const canAfford = (item: typeof shopItems[0]) => {
    return resources.coins >= item.cost;
  };

  const handlePurchase = (itemId: string) => {
    if (!purchasedItems.includes(itemId)) {
      setPurchasedItems([...purchasedItems, itemId]);
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
          className="farm-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-800">농장 상점</h2>
              <p className="text-sm text-gray-600">리소스와 장식품을 구매하세요!</p>
            </div>
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="text-lg font-bold text-gray-800">{resources.coins}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* 카테고리 필터 */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">카테고리</h3>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-farm-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 상품 목록 */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const affordable = canAfford(item);
                const isPurchased = purchasedItems.includes(item.id);
                
                return (
                  <motion.div
                    key={item.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isPurchased
                        ? 'border-green-500 bg-green-50'
                        : affordable
                          ? 'border-gray-200 hover:border-farm-green hover:bg-green-50'
                          : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}
                    whileHover={affordable && !isPurchased ? { scale: 1.02 } : {}}
                    whileTap={affordable && !isPurchased ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{item.emoji}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-xs text-gray-500">{item.effect}</div>
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-gray-800">{item.cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      {isPurchased ? (
                        <div className="w-full py-2 px-4 bg-green-500 text-white text-center rounded-lg text-sm font-medium">
                          구매 완료
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePurchase(item.id)}
                          disabled={!affordable}
                          className="w-full py-2 px-4 bg-farm-green text-white rounded-lg hover:bg-farm-darkGreen transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          구매하기
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 구매한 아이템 요약 */}
          {purchasedItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-green-50">
              <h3 className="text-sm font-medium text-gray-700 mb-3">구매한 아이템</h3>
              <div className="flex flex-wrap gap-2">
                {purchasedItems.map((itemId) => {
                  const item = shopItems.find(i => i.id === itemId);
                  return item ? (
                    <div key={itemId} className="flex items-center space-x-1 bg-white px-3 py-1 rounded-full text-sm">
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


