import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, CheckCircle, XCircle, Sparkles, Trophy, Target, Flame } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStageProblems, curriculumUnits } from '../data/curriculum';

export function StagePlayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stages, completeStage, addCoins, updateSomariterMood, unlockStage } = useGameStore();
  
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cropGrowthAnimation, setCropGrowthAnimation] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [streak, setStreak] = useState(0);
  const [specialEffects, setSpecialEffects] = useState<string[]>([]);
  const [showCombo, setShowCombo] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const stageId = parseInt(id || '0');
  // 스테이지 ID에 따른 학년 계산
  let grade: number;
  if (stageId >= 81 && stageId <= 84) {
    grade = 9; // 중3
  } else if (stageId >= 71 && stageId <= 74) {
    grade = 8; // 중2
  } else if (stageId >= 61 && stageId <= 64) {
    grade = 7; // 중1
  } else if (stageId >= 51 && stageId <= 54) {
    grade = 6; // 6학년
  } else if (stageId >= 41 && stageId <= 44) {
    grade = 5; // 5학년
  } else if (stageId >= 31 && stageId <= 34) {
    grade = 4; // 4학년
  } else if (stageId >= 21 && stageId <= 24) {
    grade = 3; // 3학년
  } else if (stageId >= 11 && stageId <= 14) {
    grade = 2; // 2학년
  } else if (stageId >= 1 && stageId <= 4) {
    grade = 1; // 1학년
  } else {
    grade = 1; // 기본값
  }
  const stage = stages.find(s => s.id === stageId);
  const problems = stage ? generateStageProblems(grade, stageId) : {};
  const currentProblem = problems[currentProblemIndex + 1]; // 문제 인덱스는 1부터 시작
  
  // 현재 스테이지의 커리큘럼 단원 정보
  const currentUnit = curriculumUnits[grade] || curriculumUnits[1];

  const handleTimeUp = useCallback(() => {
    setShowResult(true);
    setCombo(0); // 콤보 초기화
    setStreak(0); // 연속 정답 초기화
    updateSomariterMood('thinking', '시간이 초과되었어요!');
    // 시간 초과 시 오답 처리 로직 추가 가능
  }, [updateSomariterMood]);

  useEffect(() => {
    if (!stage) {
      navigate('/world-map');
      return;
    }

    // 로딩 상태 해제
    setIsLoading(false);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, handleTimeUp]);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    
    // 선택 피드백 애니메이션
    const button = document.querySelector(`[data-answer="${answer}"]`);
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 200);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || showResult) return;
    
    setShowResult(true);
    
    if (selectedAnswer === currentProblem.answer) {
      const newCombo = combo + 1;
      const newScore = score + 1;
      const newStreak = streak + 1;
      
      setCombo(newCombo);
      setScore(newScore);
      setStreak(newStreak);
      setMaxCombo(Math.max(maxCombo, newCombo));
      setCropGrowthAnimation(true);
      
      // 콤보 효과
      if (newCombo >= 3) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 2000);
      }
      
      // 연속 정답 효과
      if (newStreak >= 5) {
        setShowStreak(true);
        setTimeout(() => setShowStreak(false), 2000);
      }
      
      // 특별 효과 추가
      const effects: string[] = [];
      if (newCombo >= 5) effects.push('fire');
      if (newStreak >= 10) effects.push('star');
      setSpecialEffects(effects);

      updateSomariterMood('happy', '정답을 맞혔어요!');
    } else {
      setCombo(0); // 콤보 초기화
      setStreak(0); // 연속 정답 초기화
      updateSomariterMood('thinking', '틀렸어요. 다시 시도해보세요!');
    }
  };

  const handleNextProblem = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCropGrowthAnimation(false);
    setSpecialEffects([]);

    if (currentProblemIndex < Object.keys(problems).length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      setTimeLeft(30); // 다음 문제로 넘어가면 시간 초기화
    } else {
      // 모든 문제 완료
      setIsCompleted(true);
      completeStage(stageId);
      addCoins(score * 10); // 점수당 코인 지급
      
      // 다음 스테이지 잠금 해제 (예: 현재 스테이지 ID + 1)
      const nextStageId = stageId + 1;
      const nextStage = stages.find(s => s.id === nextStageId);
      if (nextStage) {
        unlockStage(nextStageId);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="text-2xl font-bold text-blue-700">로딩 중...</div>
      </div>
    );
  }

  if (!stage || Object.keys(problems).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-200 text-red-800 p-4">
        <XCircle size={64} className="mb-4" />
        <h1 className="text-3xl font-bold mb-2">문제를 불러올 수 없습니다</h1>
        <p className="text-lg mb-6 text-center">잠시 후 다시 시도해주세요. 또는 월드맵에서 다른 스테이지를 선택해주세요.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center"
          onClick={() => navigate('/world-map')}
        >
          <ArrowLeft className="mr-2" /> 월드맵으로 돌아가기
        </motion.button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-teal-200 text-green-800 p-4"
      >
        <Trophy size={64} className="mb-4 text-yellow-500" />
        <h1 className="text-4xl font-bold mb-2">스테이지 완료!</h1>
        <p className="text-xl mb-4">총 {Object.keys(problems).length} 문제 중 {score} 문제 정답!</p>
        <p className="text-lg mb-6">최대 콤보: {maxCombo} 🎉</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center"
          onClick={() => navigate('/world-map')}
        >
          <ArrowLeft className="mr-2" /> 월드맵으로 돌아가기
        </motion.button>
      </motion.div>
    );
  }

  const progress = ((currentProblemIndex + 1) / Object.keys(problems).length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 배경 효과 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="absolute inset-0 bg-white bg-opacity-30 rounded-full blur-3xl opacity-50"
        style={{ width: '80vmin', height: '80vmin', top: '-40vmin', left: '-40vmin' }}
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100, delay: 0.2 }}
        className="absolute inset-0 bg-yellow-100 bg-opacity-30 rounded-full blur-3xl opacity-50"
        style={{ width: '60vmin', height: '60vmin', bottom: '-30vmin', right: '-30vmin' }}
      ></motion.div>

      {/* 특수 효과 애니메이션 */}
      <AnimatePresence>
        {specialEffects.includes('fire') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex items-center justify-center text-red-500 text-6xl font-bold z-10"
          >
            <Flame size={100} className="animate-bounce" />
          </motion.div>
        )}
        {specialEffects.includes('star') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex items-center justify-center text-yellow-400 text-6xl font-bold z-10"
          >
            <Sparkles size={100} className="animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 콤보 및 연속 정답 UI */}
      <AnimatePresence>
        {showCombo && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-2 rounded-full shadow-lg text-xl font-bold z-20"
          >
            {combo} 콤보!
          </motion.div>
        )}
        {showStreak && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-32 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg text-xl font-bold z-20"
          >
            {streak} 연속 정답!
          </motion.div>
        )}
      </AnimatePresence>

      {/* 뒤로가기 버튼 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 left-4 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 transition-all duration-200 z-10"
        onClick={() => navigate('/world-map')}
      >
        <ArrowLeft size={24} className="text-gray-800" />
      </motion.button>

      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl z-10 transform transition-all duration-300 hover:scale-[1.01]">
        {/* 상단 정보 */}
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-gray-800 flex items-center"
          >
            <Target className="mr-2 text-blue-500" />
            {currentUnit ? `${currentUnit.name} (${grade}학년)` : stage.title}
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center text-xl font-semibold text-blue-600"
            >
              <Clock className="mr-2" /> {timeLeft}s
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center text-xl font-semibold text-yellow-600"
            >
              <Star className="mr-2" /> {score} / {Object.keys(problems).length}
            </motion.div>
          </div>
        </div>

        {/* 진행 바 */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-3 bg-blue-500 rounded-full mb-8 shadow-inner"
        ></motion.div>

        {/* 문제 영역 */}
        <motion.div
          key={currentProblemIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-blue-50 p-6 rounded-2xl mb-8 shadow-inner"
        >
          <div className="flex items-start mb-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
              {currentProblemIndex + 1}
            </div>
            <p className="text-2xl font-bold text-gray-900 leading-relaxed">
              {currentProblem.question}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProblem.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl text-lg font-medium transition-all duration-200 flex items-center
                  ${selectedAnswer === option ? 'bg-blue-400 text-white shadow-md' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'}
                  ${showResult && option === currentProblem.answer ? 'bg-green-500 text-white animate-pulse-once' : ''}
                  ${showResult && selectedAnswer === option && selectedAnswer !== currentProblem.answer ? 'bg-red-500 text-white animate-shake' : ''}
                `}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                data-answer={option}
              >
                <span className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {String.fromCharCode(9312 + index)}
                </span>
                <span className="text-left">{option}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 결과 및 다음 문제 버튼 */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center"
          >
            {selectedAnswer === currentProblem.answer ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-green-600 text-2xl font-bold flex items-center justify-center mb-4"
              >
                <CheckCircle className="mr-2" /> 정답입니다!
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-red-600 text-2xl font-bold flex items-center justify-center mb-4"
              >
                <XCircle className="mr-2" /> 오답입니다. 정답은 {currentProblem.answer}
              </motion.div>
            )}
            <p className="text-gray-700 text-lg mb-4">{currentProblem.explanation}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
              onClick={handleNextProblem}
            >
              {currentProblemIndex < Object.keys(problems).length - 1 ? '다음 문제' : '결과 보기'}
            </motion.button>
          </motion.div>
        )}

        {!showResult && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-full shadow-lg text-xl mt-6
              ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
          >
            정답 제출
          </motion.button>
        )}
      </div>

      {/* 작물 성장 애니메이션 */}
      <AnimatePresence>
        {cropGrowthAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 right-10 z-20"
          >
            <Target size={80} className="text-green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
