import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Play,
  MapPin,
  Flame,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { curriculumUnits } from '../data/curriculum';
import { AnimatedPath, FloatingParticles, ProgressCelebration } from './AnimatedPath';
import { CuteStageCard } from './CuteStageCard';
import { AchievementSystem } from './AchievementSystem';
import { useSound } from '../hooks/useSound';
import { AchievementAnimation, LevelUpEffect } from './AchievementAnimation';
import { LevelSelectionMap } from './LevelSelectionMap';

// 학년별 커리큘럼 레벨 정의
const curriculumLevels = [
  { 
    id: 'elementary-1', 
    name: '1학년', 
    school: '초등학교',
    grades: [1], 
    color: 'pink', 
    icon: '🌱',
    description: '100까지의 수, 덧셈·뺄셈 기초',
    stageCount: 9
  },
  { 
    id: 'elementary-2', 
    name: '2학년', 
    school: '초등학교',
    grades: [2], 
    color: 'blue', 
    icon: '📚',
    description: '세·네 자리 수, 곱셈구구',
    stageCount: 10
  },
  { 
    id: 'elementary-3', 
    name: '3학년', 
    school: '초등학교',
    grades: [3], 
    color: 'green', 
    icon: '🌿',
    description: '분수·소수, 세 자리 수 곱셈·나눗셈',
    stageCount: 9
  },
  { 
    id: 'elementary-4', 
    name: '4학년', 
    school: '초등학교',
    grades: [4], 
    color: 'purple', 
    icon: '🔮',
    description: '분수 덧셈·뺄셈, 평행·수직',
    stageCount: 8
  },
  { 
    id: 'thinking-4', 
    name: '4학년', 
    school: '사고력 연산',
    grades: [4], 
    color: 'premium', 
    icon: '🧠',
    description: '논리적 사고, 문제 해결',
    stageCount: 8,
    isPremium: true
  },
  { 
    id: 'elementary-5', 
    name: '5학년', 
    school: '초등학교',
    grades: [5], 
    color: 'blue', 
    icon: '📘',
    description: '약분·통분, 분수·소수 곱셈',
    stageCount: 8
  },
  { 
    id: 'thinking-5', 
    name: '5학년', 
    school: '사고력 연산',
    grades: [5], 
    color: 'premium', 
    icon: '⚡',
    description: '창의적 사고, 추론',
    stageCount: 8,
    isPremium: true
  },
  { 
    id: 'elementary-6', 
    name: '6학년', 
    school: '초등학교',
    grades: [6], 
    color: 'red', 
    icon: '🎯',
    description: '비와 비율, 원의 넓이',
    stageCount: 7
  },
  { 
    id: 'thinking-6', 
    name: '6학년', 
    school: '사고력 연산',
    grades: [6], 
    color: 'premium', 
    icon: '💡',
    description: '비판적 사고, 종합 분석',
    stageCount: 7,
    isPremium: true
  },
  { 
    id: 'middle-1', 
    name: '1학년', 
    school: '중학교',
    grades: [1], 
    color: 'indigo', 
    icon: '🎓',
    description: '정수와 유리수, 문자와 식',
    stageCount: 7
  },
  { 
    id: 'middle-2', 
    name: '2학년', 
    school: '중학교',
    grades: [2], 
    color: 'teal', 
    icon: '⚡',
    description: '일차방정식, 피타고라스 정리',
    stageCount: 7
  },
  { 
    id: 'middle-3', 
    name: '3학년', 
    school: '중학교',
    grades: [3], 
    color: 'emerald', 
    icon: '🏆',
    description: '이차방정식, 삼각비',
    stageCount: 6
  }
];

export function RoadMap() {
  const { stages, setCurrentStage, user } = useGameStore();
  const { playClick, playSuccess, playLevelUp } = useSound();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);


  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');

  const handleAchievementUnlock = (achievement: any) => {
    playSuccess();
    setAchievementMessage(achievement.title);
    setShowAchievement(true);
    // 업적 달성 시 추가 로직 (예: 코인 지급, 경험치 보너스 등)
  };

  const handleLevelUp = () => {
    playLevelUp();
    setShowLevelUp(true);
    setTimeout(() => setShowLevelUp(false), 3000);
  };

  // 레벨업 체크 (실제로는 스테이지 완료 시 호출되어야 함)
  useEffect(() => {
    const completedStages = stages.filter(s => s.isCompleted).length;
    if (completedStages > 0 && completedStages % 5 === 0) {
      handleLevelUp();
    }
  }, [stages]);

  // 레벨 선택 화면
  if (!selectedLevel) {
    return <LevelSelectionMap onLevelSelect={setSelectedLevel} />;
  }

  // 선택된 레벨의 스테이지들
  const currentLevel = curriculumLevels.find(l => l.id === selectedLevel);
  if (!currentLevel) return null;

  // 선택된 레벨에 맞는 스테이지들 필터링
  const getLevelStages = (levelId: string) => {
    switch (levelId) {
      case 'elementary-1':
        return stages.slice(0, 9); // 초등 1학년: 1-9 스테이지
      case 'elementary-2':
        return stages.slice(9, 19); // 초등 2학년: 10-19 스테이지
      case 'elementary-3':
        return stages.slice(19, 28); // 초등 3학년: 20-28 스테이지
      case 'elementary-4':
        return stages.slice(28, 36); // 초등 4학년: 29-36 스테이지
      case 'elementary-5':
        return stages.slice(36, 44); // 초등 5학년: 37-44 스테이지
      case 'elementary-6':
        return stages.slice(44, 51); // 초등 6학년: 45-51 스테이지
      case 'middle-1':
        return stages.slice(51, 58); // 중등 1학년: 52-58 스테이지
      case 'middle-2':
        return stages.slice(58, 65); // 중등 2학년: 59-65 스테이지
      case 'middle-3':
        return stages.slice(65, 71); // 중등 3학년: 66-71 스테이지
      default:
        return stages;
    }
  };

  const levelStages = getLevelStages(selectedLevel);

  return (
    <div className="space-y-8 pb-20">
      {/* 레벨업 효과 */}
      <LevelUpEffect show={showLevelUp} level={user.level} />
      
      {/* 성취 애니메이션 */}
      <AchievementAnimation
        show={showAchievement}
        type="stage_complete"
        message={achievementMessage}
        onComplete={() => setShowAchievement(false)}
      />

      {/* 업적 시스템 */}
      <AchievementSystem 
        stages={stages} 
        user={user} 
        onAchievementUnlock={handleAchievementUnlock}
      />

      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setSelectedLevel(null)}
            className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </motion.button>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {currentLevel.icon} {currentLevel.name}
            </h1>
            <p className="text-lg text-gray-600">{currentLevel.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span>{levelStages.length}개 스테이지</span>
        </div>
      </div>

      {/* 진행률 표시 */}
      <motion.div
        className="farm-card p-6 bg-gradient-to-r from-blue-50 to-green-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">전체 진행률</h3>
          <div className="flex items-center space-x-2 text-orange-500">
            <Flame className="w-5 h-5" />
            <span className="font-bold text-lg">연속 학습 중</span>
          </div>
        </div>
        
        <div className="mb-4">
                <AnimatedPath 
                  progress={(levelStages.filter(s => s.isCompleted).length / levelStages.length) * 100}
                  totalStages={levelStages.length}
                  completedStages={levelStages.filter(s => s.isCompleted).length}
                />
                {/* 진행률 축하 효과 */}
                <ProgressCelebration show={levelStages.filter(s => s.isCompleted).length > 0} />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>완료: {levelStages.filter(s => s.isCompleted).length}개</span>
          <span>전체: {levelStages.length}개</span>
        </div>
      </motion.div>

      {/* 길 맵 */}
      <div className="relative">
        {/* 배경 길 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full opacity-30"></div>
        </div>
        
        {/* 떠다니는 파티클 */}
        <FloatingParticles />
        
        {/* 길 맵 제목 */}
        <div className="text-center mb-8">
                  <motion.h2
                    className="text-2xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    🛣️ {currentLevel.name} 학습의 길 - {levelStages.length}개 스테이지
                  </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            각 스테이지를 완료하여 수학의 여정을 완주하세요!
          </motion.p>
        </div>

                {/* 스테이지 노드들 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {levelStages.map((stage, index) => {
                    // 학년별로 매핑 (1-6학년)
                    // 스테이지 ID에 따른 학년 계산
      let grade: number;
      if (stage.id >= 81 && stage.id <= 84) {
        grade = 9; // 중3
      } else if (stage.id >= 71 && stage.id <= 74) {
        grade = 8; // 중2
      } else if (stage.id >= 61 && stage.id <= 64) {
        grade = 7; // 중1
      } else if (stage.id >= 51 && stage.id <= 54) {
        grade = 6; // 6학년
      } else if (stage.id >= 41 && stage.id <= 44) {
        grade = 5; // 5학년
      } else if (stage.id >= 31 && stage.id <= 34) {
        grade = 4; // 4학년
      } else if (stage.id >= 21 && stage.id <= 24) {
        grade = 3; // 3학년
      } else if (stage.id >= 11 && stage.id <= 14) {
        grade = 2; // 2학년
      } else if (stage.id >= 1 && stage.id <= 4) {
        grade = 1; // 1학년
      } else {
        grade = 1; // 기본값
      }
                    const unit = curriculumUnits[grade] || curriculumUnits[1];
                    
                    const difficultyMap = {
                      1: 'easy' as const,
                      2: 'medium' as const,
                      3: 'hard' as const,
                      4: 'boss' as const
                    };
                    
                    return (
                      <CuteStageCard
                        key={stage.id}
                        stage={{
                          ...stage,
                          difficulty: difficultyMap[stage.difficulty as keyof typeof difficultyMap] || 'medium'
                        }}
                        unit={{
                          grade: unit?.id || 1,
                          subject: unit?.name || '수학',
                          subSubject: unit?.description || '기초 수학'
                        }}
                        onStart={() => {
                          playClick();
                          setCurrentStage(stage.id);
                          // 스테이지가 잠금 해제되어 있으면 바로 게임 시작
                          if (stage.isUnlocked) {
                            navigate(`/stage/${stage.id}`);
                          }
                        }}
                        index={index}
                      />
                    );
                  })}
                </div>
      </div>

      {/* 현재 스테이지 정보 */}
      {levelStages.find(s => s.isCurrent) && (
        <motion.div
          className="farm-card p-6 bg-gradient-to-r from-yellow-50 to-orange-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-800">현재 위치</h3>
          </div>
          
                  {(() => {
                    const currentStage = levelStages.find(s => s.isCurrent);
                    if (!currentStage) return null;
            
            return (
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">{currentStage.title}</h4>
                  <p className="text-gray-600">{currentStage.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">난이도</div>
                    <div className="text-lg font-bold text-gray-800">
                      {currentStage.difficulty === 1 && '🟢 쉬움'}
                      {currentStage.difficulty === 2 && '🟡 보통'}
                      {currentStage.difficulty === 3 && '🔴 어려움'}
                      {currentStage.difficulty === 4 && '👑 보스'}
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">보상</div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>+{currentStage.expReward} EXP</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span>🌱</span>
                        <span>+{currentStage.cropGrowthReward} 성장</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/stage/${currentStage.id}`}
                  className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-4 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>스테이지 시작하기</span>
                  </div>
                </Link>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* 통계 정보 */}

      {/* 길 맵 완성 축하 메시지 */}
      {levelStages.filter(s => s.isCompleted).length === levelStages.length && (
        <motion.div
          className="farm-card p-8 bg-gradient-to-r from-yellow-50 to-orange-50 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">축하합니다!</h2>
          <p className="text-lg text-gray-600 mb-6">
            모든 스테이지를 완료하여 수학의 여정을 완주하셨습니다!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">🏆</div>
              <div className="text-sm text-gray-600">완주자</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">⭐</div>
              <div className="text-sm text-gray-600">마스터</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">🌟</div>
              <div className="text-sm text-gray-600">전문가</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
