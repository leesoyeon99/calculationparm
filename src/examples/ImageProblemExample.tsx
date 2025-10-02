import React, { useState } from 'react';
import { generateImageProblem, generateImageStageProblems } from '../data/curriculum';
import ImageProblemRenderer from '../components/ImageProblemRenderer';

const ImageProblemExample: React.FC = () => {
  const [stageId, setStageId] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showSolution, setShowSolution] = useState(false);

  // 이미지 기반 문제 생성
  const imageProblem = generateImageProblem(stageId);
  const stageProblems = generateImageStageProblems(stageId);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowSolution(true);
  };

  const isCorrect = selectedAnswer === imageProblem.answer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🖼️ 이미지 기반 수학 문제 시스템
        </h1>

        {/* 스테이지 선택 */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">스테이지 선택</h2>
          <div className="flex flex-wrap gap-2">
            {[1, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setStageId(id);
                  setSelectedAnswer('');
                  setShowSolution(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  stageId === id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                스테이지 {id}
              </button>
            ))}
          </div>
        </div>

        {/* 문제 렌더링 */}
        <div className="mb-8">
          <ImageProblemRenderer
            problem={imageProblem}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
          />
        </div>

        {/* 정답 및 해설 */}
        {showSolution && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isCorrect ? '✅ 정답입니다!' : '❌ 틀렸습니다!'}
            </h3>
            <div className="space-y-4">
              <div>
                <strong>정답:</strong> {imageProblem.answer}
              </div>
              <div>
                <strong>해설:</strong> {imageProblem.solution}
              </div>
              <div>
                <strong>게임 테마:</strong> {imageProblem.gameContext.theme}
              </div>
              <div>
                <strong>보상:</strong> {imageProblem.gameContext.reward}
              </div>
            </div>
          </div>
        )}

        {/* 문제 데이터 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 이미지 정보 */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">🖼️ 이미지 정보</h3>
            <div className="space-y-2 text-sm">
              <div><strong>배경:</strong> {imageProblem.images.background || '없음'}</div>
              <div><strong>레이아웃:</strong> {imageProblem.images.layout}</div>
              <div><strong>아이템 수:</strong> {imageProblem.images.items.length}개</div>
              <div className="mt-4">
                <strong>아이템 목록:</strong>
                <ul className="mt-2 space-y-1">
                  {imageProblem.images.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <img 
                        src={item.src} 
                        alt={item.alt} 
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-lg">${getEmojiForItem(item.alt)}</span>`;
                          }
                        }}
                      />
                      <span>{item.alt} ({item.count}개)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 기존 형식 변환 데이터 */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">📊 변환된 데이터</h3>
            <div className="space-y-2 text-sm">
              <div><strong>ID:</strong> {stageProblems[0].id}</div>
              <div><strong>학년:</strong> {stageProblems[0].grade}</div>
              <div><strong>난이도:</strong> {stageProblems[0].difficulty}</div>
              <div><strong>카테고리:</strong> {stageProblems[0].category}</div>
              <div><strong>이미지 레이아웃:</strong> {stageProblems[0].imageLayout}</div>
              <div><strong>게임 테마:</strong> {stageProblems[0].gameTheme}</div>
            </div>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">💡 사용법</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>1. 이미지 기반 문제 생성:</strong> <code>generateImageProblem(stageId)</code></p>
            <p><strong>2. 기존 형식으로 변환:</strong> <code>generateImageStageProblems(stageId)</code></p>
            <p><strong>3. 컴포넌트 렌더링:</strong> <code>&lt;ImageProblemRenderer problem={imageProblem} /&gt;</code></p>
            <p><strong>4. 이미지 로드 실패 시:</strong> 자동으로 이모지로 대체됩니다</p>
          </div>
        </div>
      </div>
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

export default ImageProblemExample;
