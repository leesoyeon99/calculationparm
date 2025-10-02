import React from 'react';
import { ImageProblem, ImageItem } from '../data/curriculum';

interface ImageProblemRendererProps {
  problem: ImageProblem;
  onAnswerSelect?: (answer: string) => void;
  selectedAnswer?: string;
}

export const ImageProblemRenderer: React.FC<ImageProblemRendererProps> = ({
  problem,
  onAnswerSelect,
  selectedAnswer
}) => {
  const renderImageItems = () => {
    const { items, layout } = problem.images;
    
    switch (layout) {
      case 'grid':
        return (
          <div className="grid grid-cols-4 gap-4 p-4">
            {items.map((item, index) => (
              <ImageItemComponent key={index} item={item} />
            ))}
          </div>
        );
      
      case 'row':
        return (
          <div className="flex justify-center items-center gap-8 p-4">
            {items.map((item, index) => (
              <ImageItemComponent key={index} item={item} />
            ))}
          </div>
        );
      
      case 'scattered':
        return (
          <div className="relative w-full h-80 p-4" style={{ backgroundImage: problem.images.background ? `url(${problem.images.background})` : 'none' }}>
            {items.map((item, index) => (
              <ImageItemComponent 
                key={index} 
                item={item} 
                position={item.position}
                scattered={true}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div className="flex flex-wrap gap-4 p-4">
            {items.map((item, index) => (
              <ImageItemComponent key={index} item={item} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 문제 제목 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {problem.stem}
        </h2>
        
        {/* 이미지 영역 */}
        <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
          {renderImageItems()}
        </div>
      </div>

      {/* 선택지 */}
      {problem.choices && (
        <div className="space-y-3">
          {problem.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onAnswerSelect?.(choice.id)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                selectedAnswer === choice.id
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="font-semibold mr-3">{choice.id}</span>
              <span>{choice.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* 게임 컨텍스트 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <p><strong>테마:</strong> {problem.gameContext.theme}</p>
          <p><strong>보상:</strong> {problem.gameContext.reward}</p>
          <p><strong>효과:</strong> {problem.gameContext.visual}</p>
        </div>
      </div>
    </div>
  );
};

interface ImageItemComponentProps {
  item: ImageItem;
  position?: { x: number; y: number };
  scattered?: boolean;
}

const ImageItemComponent: React.FC<ImageItemComponentProps> = ({ 
  item, 
  position, 
  scattered = false 
}) => {
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'w-8 h-8';
      case 'large': return 'w-16 h-16';
      default: return 'w-12 h-12';
    }
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'bounce': return 'animate-bounce';
      case 'pulse': return 'animate-pulse';
      case 'fade': return 'animate-ping';
      default: return '';
    }
  };

  const style = scattered && position ? {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 10
  } : {};

  return (
    <div 
      className={`${getSizeClass(item.size || 'medium')} ${getAnimationClass(item.animation || 'none')} transition-transform hover:scale-110`}
      style={style}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-contain"
        onError={(e) => {
          // 이미지 로드 실패 시 이모지로 대체
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl">${getEmojiForItem(item.alt)}</div>`;
          }
        }}
      />
    </div>
  );
};

// 이미지 로드 실패 시 사용할 이모지 매핑
const getEmojiForItem = (alt: string): string => {
  const emojiMap: { [key: string]: string } = {
    '풍선': '🎈',
    '별': '⭐',
    '사과': '🍎',
    '꽃': '🌸',
    '하트': '❤️',
    '피자': '🍕',
    '케이크': '🎂',
    '사탕': '🍭',
    '마법 구슬': '💎',
    '포션': '🧪',
    '빨간 구슬': '🔴',
    '파란 구슬': '🔵',
    '다이아몬드': '💎',
    '에메랄드': '💎',
    '용사': '⚔️',
    '마법사': '🧙‍♂️',
    '궁수': '🏹',
    '몬스터': '👹',
    '드래곤': '🐉',
    '늑대': '🐺'
  };
  
  return emojiMap[alt] || '❓';
};

export default ImageProblemRenderer;
