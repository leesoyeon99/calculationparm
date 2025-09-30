import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

// 학년별 커리큘럼 레벨 정의
const curriculumLevels = [
  // 초등학교 1학년
  { 
    id: 'elementary-1', 
    name: '1학년', 
    school: '초등학교',
    grades: [1], 
    color: 'pink', 
    icon: '🌱',
    description: '100까지의 수, 덧셈·뺄셈 기초',
    stageCount: 9,
    position: { x: 20, y: 90 }
  },
  // 초등학교 2학년
  { 
    id: 'elementary-2', 
    name: '2학년', 
    school: '초등학교',
    grades: [2], 
    color: 'blue', 
    icon: '📚',
    description: '세·네 자리 수, 곱셈구구',
    stageCount: 10,
    position: { x: 40, y: 80 }
  },
  // 초등학교 3학년
  { 
    id: 'elementary-3', 
    name: '3학년', 
    school: '초등학교',
    grades: [3], 
    color: 'green', 
    icon: '🌿',
    description: '분수·소수, 세 자리 수 곱셈·나눗셈',
    stageCount: 9,
    position: { x: 60, y: 70 }
  },
  // 초등학교 4학년
  { 
    id: 'elementary-4', 
    name: '4학년', 
    school: '초등학교',
    grades: [4], 
    color: 'purple', 
    icon: '🔮',
    description: '분수 덧셈·뺄셈, 평행·수직',
    stageCount: 8,
    position: { x: 20, y: 60 }
  },
  // 사고력 연산 4학년
  { 
    id: 'thinking-4', 
    name: '4학년', 
    school: '사고력 연산',
    grades: [4], 
    color: 'premium', 
    icon: '🧠',
    description: '논리적 사고, 문제 해결',
    stageCount: 8,
    position: { x: 40, y: 50 },
    isPremium: true
  },
  // 초등학교 5학년
  { 
    id: 'elementary-5', 
    name: '5학년', 
    school: '초등학교',
    grades: [5], 
    color: 'blue', 
    icon: '📘',
    description: '약분·통분, 분수·소수 곱셈',
    stageCount: 8,
    position: { x: 60, y: 40 }
  },
  // 사고력 연산 5학년
  { 
    id: 'thinking-5', 
    name: '5학년', 
    school: '사고력 연산',
    grades: [5], 
    color: 'premium', 
    icon: '⚡',
    description: '창의적 사고, 추론',
    stageCount: 8,
    position: { x: 80, y: 30 },
    isPremium: true
  },
  // 초등학교 6학년
  { 
    id: 'elementary-6', 
    name: '6학년', 
    school: '초등학교',
    grades: [6], 
    color: 'red', 
    icon: '🎯',
    description: '비와 비율, 원의 넓이',
    stageCount: 7,
    position: { x: 20, y: 20 }
  },
  // 사고력 연산 6학년
  { 
    id: 'thinking-6', 
    name: '6학년', 
    school: '사고력 연산',
    grades: [6], 
    color: 'premium', 
    icon: '💡',
    description: '비판적 사고, 종합 분석',
    stageCount: 7,
    position: { x: 40, y: 10 },
    isPremium: true
  },
  // 중학교 1학년
  { 
    id: 'middle-1', 
    name: '1학년', 
    school: '중학교',
    grades: [1], 
    color: 'indigo', 
    icon: '🎓',
    description: '정수와 유리수, 문자와 식',
    stageCount: 7,
    position: { x: 60, y: 30 }
  },
  // 중학교 2학년
  { 
    id: 'middle-2', 
    name: '2학년', 
    school: '중학교',
    grades: [2], 
    color: 'teal', 
    icon: '⚡',
    description: '일차방정식, 피타고라스 정리',
    stageCount: 7,
    position: { x: 80, y: 20 }
  },
  // 중학교 3학년
  { 
    id: 'middle-3', 
    name: '3학년', 
    school: '중학교',
    grades: [3], 
    color: 'emerald', 
    icon: '🏆',
    description: '이차방정식, 삼각비',
    stageCount: 6,
    position: { x: 20, y: 10 }
  }
];

interface LevelSelectionMapProps {
  onLevelSelect: (levelId: string) => void;
}

export function LevelSelectionMap({ onLevelSelect }: LevelSelectionMapProps) {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">


              {/* 학년별 골목길 스타일 학습 경로 */}
              <div className="px-4 py-8">
                <div className="max-w-6xl mx-auto">
                  {/* 학습 경로 컨테이너 - 세로 스크롤 가능 */}
                  <div className="relative min-h-[2100px] overflow-y-auto">
                    {/* 골목길 경로 SVG - 구불구불한 길 */}
                    <svg 
                      className="absolute left-1/2 top-0 w-full h-full z-0" 
                      viewBox="0 0 800 2100" 
                      preserveAspectRatio="none"
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      <motion.path
                        d="M 400 50 Q 300 150 400 250 Q 500 350 400 450 Q 300 550 400 650 Q 500 750 400 850 Q 300 950 400 1050 Q 500 1150 400 1250 Q 300 1350 400 1450 Q 500 1550 400 1650 Q 300 1750 400 1850 Q 500 1950 400 2050"
                        stroke="#8B5CF6"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 5, ease: "easeInOut" }}
                      />
                      <defs>
                        <linearGradient id="alleyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#EC4899" />
                          <stop offset="11%" stopColor="#3B82F6" />
                          <stop offset="22%" stopColor="#10B981" />
                          <stop offset="33%" stopColor="#8B5CF6" />
                          <stop offset="44%" stopColor="#F59E0B" />
                          <stop offset="55%" stopColor="#EF4444" />
                          <stop offset="67%" stopColor="#6366F1" />
                          <stop offset="78%" stopColor="#14B8A6" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* 학년별 스테이지들 - 골목길을 따라 배치 */}
                    <div className="relative z-10">
                      {curriculumLevels.map((level, index) => {
                        // 골목길을 따라 위치 계산 (세로로 쭉 배치, 곡선 사이사이에)
                        const baseY = 100 + index * 220;
                        // 곡선의 중심(400)을 기준으로 좌우 번갈아 배치하여 곡선 사이사이에 위치
                        const xOffset = index % 2 === 0 ? 400 : 740;
                        
                        return (
                          <motion.div
                            key={level.id}
                            className="absolute"
                            style={{
                              left: `${xOffset - 60}px`,
                              top: `${baseY - 60}px`,
                            }}
                            initial={{ opacity: 0, scale: 0, x: xOffset < 400 ? -100 : 100 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ 
                              duration: 0.8, 
                              delay: index * 0.2,
                              type: "spring",
                              stiffness: 200
                            }}
                          >
                            {/* 둥근 버튼 스타일 스테이지 */}
                            <motion.button
                              onClick={() => onLevelSelect(level.id)}
                              onMouseEnter={() => setHoveredLevel(level.id)}
                              onMouseLeave={() => setHoveredLevel(null)}
                                className={`w-32 h-32 rounded-full shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-white relative ${
                                 level.color === 'premium'
                                   ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 shadow-yellow-500/50 animate-pulse'
                                   : level.color === 'pink' 
                                   ? 'bg-gradient-to-br from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800' 
                                   : level.color === 'blue'
                                  ? 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                                  : level.color === 'green'
                                  ? 'bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800'
                                  : level.color === 'purple'
                                  ? 'bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'
                                  : level.color === 'orange'
                                  ? 'bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800'
                                  : level.color === 'red'
                                  ? 'bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'
                                  : level.color === 'indigo'
                                  ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800'
                                  : level.color === 'teal'
                                  ? 'bg-gradient-to-br from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                                  : 'bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800'
                              }`}
                              whileHover={{ scale: 1.1, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                              }}
                            >
                              {/* 프리미엄 배지 */}
                              {level.isPremium && (
                                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce z-10">
                                  PREMIUM
                                </div>
                              )}

                              {/* 아이콘 */}
                              <div className="text-3xl mb-1">{level.icon}</div>
                              
                              {/* 학년명 */}
                              <div className="text-xs font-bold text-center leading-tight mb-1">
                                {level.school}
                              </div>
                              <div className="text-sm font-bold text-center leading-tight">
                                {level.name}
                              </div>

                              {/* 스테이지 수 표시 */}
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-xs font-bold text-gray-700">{level.stageCount}</span>
                              </div>

                              {/* 진행 화살표 */}
                              <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-gray-600 text-xs">→</span>
                              </div>

                              {/* 호버 시 상세 정보 */}
                              {hoveredLevel === level.id && (
                                <motion.div
                                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-2xl p-4 shadow-2xl border-2 border-gray-200 min-w-64 z-20"
                                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-gray-800 mb-1">{level.school} {level.name}</div>
                                    <div className="text-sm text-gray-600 mb-2">{level.description}</div>
                                    <div className="text-xs text-gray-500 mb-3">
                                      {level.stageCount}개 스테이지
                                    </div>
                                    <div className="flex items-center justify-center space-x-1 bg-green-100 rounded-full px-3 py-1">
                                      <Sparkles className="w-4 h-4 text-green-600" />
                                      <span className="text-sm font-medium text-green-700">클릭하여 시작</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* 반짝이는 효과 */}
                              <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                  boxShadow: [
                                    '0 0 0 0 rgba(255, 255, 255, 0.7)',
                                    '0 0 0 20px rgba(255, 255, 255, 0)',
                                    '0 0 0 0 rgba(255, 255, 255, 0)',
                                  ],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: index * 0.3,
                                }}
                              />
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🏠</span>
              </div>
              <span className="text-xs text-green-600 font-medium">홈</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">📚</span>
              </div>
              <span className="text-xs text-gray-500">스토리</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">💪</span>
              </div>
              <span className="text-xs text-gray-500">연습</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">🌳</span>
              </div>
              <span className="text-xs text-gray-500">리더보드</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">👤</span>
              </div>
              <span className="text-xs text-gray-500">프로필</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
