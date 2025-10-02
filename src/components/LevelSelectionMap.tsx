import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
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

// 색상 매핑 객체 - 유지보수성 향상
const colorMap = {
  premium: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 shadow-yellow-500/50 animate-pulse',
  pink: 'bg-gradient-to-br from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800',
  blue: 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
  green: 'bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800',
  purple: 'bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
  orange: 'bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800',
  red: 'bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800',
  indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800',
  teal: 'bg-gradient-to-br from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800',
  emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800'
};

// Canvas 기반 SnakeCurve 컴포넌트
function SnakeCurveCanvas({ levelCount, pathHeight }: { levelCount: number; pathHeight: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 파라미터
    const centerX = canvas.width / 2; // 중앙 X (400px)
    const amplitude = 100;            // 좌우 흔들림 크기 (적당히)
    const wavelength = 440;           // 파동 주기 (220px * 2 = 440px로 스테이지 간격에 맞춤)
    const step = 10;                  // y 간격 (작을수록 곡선 부드러움)
    const startY = 50;
    const endY = pathHeight - 50;

    // 스타일
    ctx.strokeStyle = "#8B5CF6";
    ctx.globalAlpha = 0.3;            // 투명도 30% (50% → 30%)
    ctx.lineWidth = 8;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // 경로 시작
    ctx.beginPath();
    ctx.moveTo(centerX, startY);

    for (let y = startY; y <= endY; y += step) {
      const x = centerX + amplitude * Math.sin((y / wavelength) * 2 * Math.PI);
      ctx.lineTo(x, y);
    }

    ctx.stroke();

    // 노드 위치 표시 (레벨 포인트) - 스테이지 위치에 맞춰 조정
    for (let i = 0; i < levelCount; i++) {
      const y = 100 + i * 220; // 스테이지와 동일한 Y 위치
      const x = centerX + amplitude * Math.sin((y / wavelength) * 2 * Math.PI);
      
      // 노드 원
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "#8B5CF6";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    // 투명도 리셋
    ctx.globalAlpha = 1.0;
  }, [levelCount, pathHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={pathHeight}
      className="absolute left-1/2 top-0 w-full h-full z-0"
      style={{ transform: 'translateX(-50%)' }}
    />
  );
}

export function LevelSelectionMap({ onLevelSelect }: LevelSelectionMapProps) {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  // 동적으로 골목길 높이와 경로 계산
  const levelCount = curriculumLevels.length;
  const pathHeight = Math.max(800, levelCount * 220 + 200); // 최소 800px로 줄여서 빈 공간 최소화
  const containerHeight = pathHeight + 100; // 여유 공간 추가

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">


              {/* 학년별 골목길 스타일 학습 경로 */}
              <div className="px-4 py-8">
                <div className="max-w-6xl mx-auto">
                  {/* 학습 경로 컨테이너 - 세로 스크롤 가능 */}
                  <div className="relative overflow-y-auto" style={{ minHeight: `${containerHeight}px` }}>
                    {/* Canvas 기반 SnakeCurve - 진짜 부드러운 사인파 곡선 */}
                    <SnakeCurveCanvas levelCount={levelCount} pathHeight={pathHeight} />

                    {/* 학년별 스테이지들 - 골목길을 따라 배치 */}
                    <div className="relative z-10">
                      {curriculumLevels.map((level, index) => {
                        // 일정한 간격으로 세로 배치
                        const startY = 100;
                        const y = startY + index * 220; // 220px 간격으로 일정하게 배치
                        
                        // 좌우 번갈아 배치 (일정한 규칙)
                        const isLeft = index % 2 === 0;
                        const leftX = 300;   // 왼쪽 고정 위치
                        const rightX = 700;  // 오른쪽 고정 위치
                        const x = isLeft ? leftX : rightX;
                        
                        return (
                          <motion.div
                            key={level.id}
                            className="absolute"
                            style={{
                              left: `${x - 60}px`,
                              top: `${y - 60}px`,
                            }}
                            initial={{ opacity: 0, scale: 0, x: isLeft ? -150 : 150 }}
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
                                  colorMap[level.color as keyof typeof colorMap] || colorMap.emerald
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

                              {/* 반짝이는 효과 - 프리미엄만 적용 */}
                              {level.isPremium && (
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
                              )}
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

    </div>
  );
}
