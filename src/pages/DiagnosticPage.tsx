import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Star, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { diagnosticTests, curriculumUnits } from '../data/curriculum';
import { useGameStore } from '../store/gameStore';

// 새로운 커리큘럼 레벨 정의
const curriculumLevels = [
  { id: 'kindergarten', name: '유치원', grades: [1, 2, 3], color: 'purple', icon: '🌱' },
  { id: 'elementary', name: '초등학교', grades: [1, 2, 3, 4, 5, 6], color: 'blue', icon: '📚' },
  { id: 'thinking', name: '사고력 연산', grades: [4, 5, 6], color: 'orange', icon: '🧠' },
  { id: 'middle', name: '중학교', grades: [1, 2, 3], color: 'green', icon: '🎓' }
];

export function DiagnosticPage() {
  const navigate = useNavigate();
  const { setCurrentStage, updateSomariterMood } = useGameStore();
  
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [currentTest, setCurrentTest] = useState<any>(null);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const [showLevelSelectModal, setShowLevelSelectModal] = useState(false);

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setSelectedGrade(null);
    setCurrentTest(null);
    setCurrentProblemIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers({});
    setIsCompleted(false);
    setDiagnosticResult(null);
  };

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    const test = diagnosticTests.find(t => t.grade === grade);
    if (test) {
      setCurrentTest(test);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentTest) return;
    
    const problem = currentTest.problems[currentProblemIndex];
    setAnswers(prev => ({
      ...prev,
      [problem.id]: selectedAnswer
    }));
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentProblemIndex < currentTest.problems.length - 1) {
        setCurrentProblemIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        handleDiagnosticComplete();
      }
    }, 2000);
  };

  const handleDiagnosticComplete = () => {
    if (!currentTest) return;
    
    const correctAnswers = currentTest.problems.filter((problem: any) => 
      answers[problem.id] === problem.correctAnswer
    ).length;
    
    const totalProblems = currentTest.problems.length;
    const passRate = correctAnswers / totalProblems;
    
    const result = {
      level: selectedLevel,
      grade: selectedGrade,
      correctAnswers,
      totalProblems,
      passRate,
      passed: passRate >= 0.7, // 70% 이상 정답 시 통과
      recommendedStage: passRate >= 0.7 ? getRecommendedStage(selectedGrade!, passRate) : getRemedialStage(selectedGrade!)
    };
    
    setDiagnosticResult(result);
    setIsCompleted(true);
    
    if (result.passed) {
      updateSomariterMood('excited', `와! ${selectedGrade}학년 진단을 통과했어! ${result.recommendedStage}부터 시작하자! 🌱`);
    } else {
      updateSomariterMood('encouraging', '괜찮아! 보충 학습을 통해 기초를 다지고 다시 도전해보자! 💪');
    }
  };

  const getRecommendedStage = (grade: number, passRate: number): number => {
    const unit = curriculumUnits.find(u => u.grade === grade);
    if (!unit) return 1;
    
    // 통과율에 따라 시작 스테이지 조정
    if (passRate >= 0.9) {
      return unit.stageRange[1] - 2; // 상위 레벨
    } else if (passRate >= 0.8) {
      return unit.stageRange[0] + 2; // 중간 레벨
    } else {
      return unit.stageRange[0]; // 기본 레벨
    }
  };

  const getRemedialStage = (grade: number): number => {
    // 보충 학습을 위한 이전 학년 단원
    const remedialGrade = Math.max(1, grade - 1);
    const unit = curriculumUnits.find(u => u.grade === remedialGrade);
    return unit ? unit.stageRange[0] : 1;
  };

  const handleStartLearning = () => {
    if (diagnosticResult) {
      setCurrentStage(diagnosticResult.recommendedStage);
      setShowLevelSelectModal(true);
    }
  };

  const handleGoToWorldMap = () => {
    navigate('/world-map');
  };

  const handleRetry = () => {
    setSelectedLevel(null);
    setSelectedGrade(null);
    setCurrentTest(null);
    setCurrentProblemIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers({});
    setIsCompleted(false);
    setDiagnosticResult(null);
    setShowLevelSelectModal(false);
  };

  // 진단 완료 후 월드맵 이동 모달
  if (showLevelSelectModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          >
            🎉
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            진단 완료!
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="text-2xl font-bold text-green-600">
              {diagnosticResult.correctAnswers}/{diagnosticResult.totalProblems} 문제 정답
            </div>
            <div className="text-lg text-gray-600">
              정답률: {Math.round(diagnosticResult.passRate * 100)}%
            </div>
            <div className="text-lg text-gray-600">
              추천 시작 스테이지: {diagnosticResult.recommendedStage}
            </div>
          </div>

          <motion.button
            onClick={handleGoToWorldMap}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6" />
            <span>월드맵으로 이동</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (isCompleted && diagnosticResult) {
    return (
      <div className="space-y-6 pb-20">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">진단 결과</h1>
            <p className="text-gray-600">{selectedGrade}학년 수학 진단 완료</p>
          </div>
        </div>

        {/* 결과 화면 */}
        <motion.div
          className="farm-card p-8 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.6 }}
          >
            {diagnosticResult.passed ? '🎉' : '💪'}
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {diagnosticResult.passed ? '진단 통과!' : '보충 학습 필요'}
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="text-2xl font-bold text-farm-green">
              {diagnosticResult.correctAnswers}/{diagnosticResult.totalProblems} 문제 정답
            </div>
            <div className="text-lg text-gray-600">
              정답률: {Math.round(diagnosticResult.passRate * 100)}%
            </div>
            <div className="text-lg text-gray-600">
              추천 시작 스테이지: {diagnosticResult.recommendedStage}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-gray-800 mb-2">학습 계획</h3>
            <p className="text-gray-700">
              {diagnosticResult.passed 
                ? `축하합니다! ${selectedGrade}학년 수준을 잘 알고 있어요. 스테이지 ${diagnosticResult.recommendedStage}부터 시작해서 더 높은 수준에 도전해보세요!`
                : `${selectedGrade}학년 수준을 완전히 익히기 위해 보충 학습이 필요해요. 스테이지 ${diagnosticResult.recommendedStage}부터 차근차근 학습해보세요!`
              }
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleRetry}
              className="flex-1 py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              다시 진단
            </button>
            <button
              onClick={handleStartLearning}
              className="flex-1 py-3 px-6 bg-farm-green text-white rounded-lg hover:bg-farm-darkGreen transition-colors font-medium"
            >
              학습 시작
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!selectedLevel) {
    return (
      <div className="space-y-6 pb-20">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">학습 진단</h1>
            <p className="text-gray-600">현재 수학 실력을 확인해보세요!</p>
          </div>
        </div>

        {/* 레벨 선택 */}
        <div className="farm-card p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">학습 레벨을 선택하세요</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculumLevels.map((level) => (
              <motion.button
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                className={`p-6 rounded-2xl border-2 transition-all text-center ${
                  level.color === 'purple' 
                    ? 'border-purple-200 hover:border-purple-400 bg-purple-50/30' 
                    : level.color === 'blue'
                    ? 'border-blue-200 hover:border-blue-400 bg-blue-50/30'
                    : level.color === 'orange'
                    ? 'border-orange-200 hover:border-orange-400 bg-orange-50/30'
                    : 'border-green-200 hover:border-green-400 bg-green-50/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-3">{level.icon}</div>
                <div className="text-2xl font-bold mb-2">{level.name}</div>
                <div className="text-sm text-gray-600">
                  {level.grades.map(grade => `${grade}학년`).join(', ')}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 진단 안내 */}
        <div className="farm-card p-6 bg-gradient-to-r from-blue-50 to-green-50">
          <h3 className="text-lg font-bold text-gray-800 mb-4">진단 안내</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>각 학년별 3문제씩 출제됩니다</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>3개 이상 정답 시 상위 레벨로 진입</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span>2개 이하 정답 시 보충 학습 제공</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedGrade) {
    const currentLevel = curriculumLevels.find(l => l.id === selectedLevel);
    if (!currentLevel) return null;

    return (
      <div className="space-y-6 pb-20">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedLevel(null)}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{currentLevel.name} 진단</h1>
            <p className="text-gray-600">학년을 선택하세요</p>
          </div>
        </div>

        {/* 학년 선택 */}
        <div className="farm-card p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">학년을 선택하세요</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {currentLevel.grades.map((grade) => (
              <motion.button
                key={grade}
                onClick={() => handleGradeSelect(grade)}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  currentLevel.color === 'purple' 
                    ? 'border-purple-200 hover:border-purple-400 bg-purple-50/30' 
                    : currentLevel.color === 'blue'
                    ? 'border-blue-200 hover:border-blue-400 bg-blue-50/30'
                    : currentLevel.color === 'orange'
                    ? 'border-orange-200 hover:border-orange-400 bg-orange-50/30'
                    : 'border-green-200 hover:border-green-400 bg-green-50/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl font-bold">{grade}학년</div>
                <div className="text-sm text-gray-600">{currentLevel.name}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentTest) return null;

  const currentProblem = currentTest.problems[currentProblemIndex];

  return (
    <div className="space-y-6 pb-20">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{selectedGrade}학년 진단</h1>
            <p className="text-gray-600">수학 실력 진단 테스트</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {currentProblemIndex + 1}/{currentTest.problems.length}
          </div>
        </div>
      </div>

      {/* 진행률 */}
      <div className="farm-card p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>진단 진행률</span>
          <span>{currentProblemIndex + 1}/{currentTest.problems.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-farm-green to-farm-darkGreen h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentProblemIndex + 1) / currentTest.problems.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 문제 카드 */}
      <motion.div
        key={currentProblemIndex}
        className="farm-card p-8"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            문제 {currentProblemIndex + 1}
          </h2>
          <p className="text-xl text-gray-700">{currentProblem.question}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentProblem.options.map((option: string) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = showResult && option === currentProblem.correctAnswer;
            const isWrong = showResult && isSelected && option !== currentProblem.correctAnswer;
            
            return (
              <motion.button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`p-4 rounded-lg text-lg font-medium transition-all ${
                  isCorrect
                    ? 'bg-green-500 text-white border-2 border-green-600'
                    : isWrong
                      ? 'bg-red-500 text-white border-2 border-red-600'
                      : isSelected
                        ? 'bg-farm-green text-white border-2 border-farm-darkGreen'
                        : 'bg-gray-100 text-gray-800 border-2 border-gray-200 hover:border-farm-green hover:bg-green-50'
                }`}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isCorrect && <CheckCircle className="w-5 h-5" />}
                  {isWrong && <XCircle className="w-5 h-5" />}
                  <span>{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            className="bg-blue-50 p-4 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-bold text-gray-800 mb-2">해설</h3>
            <p className="text-gray-700">{currentProblem.explanation}</p>
          </motion.div>
        )}

        {!showResult && selectedAnswer && (
          <motion.button
            onClick={handleSubmitAnswer}
            className="w-full py-4 bg-farm-green text-white rounded-lg font-bold text-lg hover:bg-farm-darkGreen transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            답안 제출
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

