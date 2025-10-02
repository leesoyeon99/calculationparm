import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Star, BookOpen, Sparkles, Brain, Target, Clock, TrendingUp } from 'lucide-react';
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
    const test = diagnosticTests[grade - 1] || diagnosticTests[0];
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
    const unit = curriculumUnits[grade] || curriculumUnits[1];
    if (!unit) return 1;
    
    // 스테이지 ID에 따른 범위 설정
    let stageStart: number, stageEnd: number;
    if (grade === 9) { // 중3
      stageStart = 81;
      stageEnd = 84;
    } else if (grade === 8) { // 중2
      stageStart = 71;
      stageEnd = 74;
    } else if (grade === 7) { // 중1
      stageStart = 61;
      stageEnd = 64;
    } else if (grade === 6) { // 6학년
      stageStart = 51;
      stageEnd = 54;
    } else if (grade === 5) { // 5학년
      stageStart = 41;
      stageEnd = 44;
    } else if (grade === 4) { // 4학년
      stageStart = 31;
      stageEnd = 34;
    } else if (grade === 3) { // 3학년
      stageStart = 21;
      stageEnd = 24;
    } else if (grade === 2) { // 2학년
      stageStart = 11;
      stageEnd = 14;
    } else { // 1학년
      stageStart = 1;
      stageEnd = 4;
    }
    
    if (passRate >= 0.9) {
      return stageEnd - 2; // 상위 레벨
    } else if (passRate >= 0.8) {
      return stageStart + 2; // 중간 레벨
    } else {
      return stageStart; // 기본 레벨
    }
  };

  const getRemedialStage = (grade: number): number => {
    // 보충 학습을 위한 이전 학년 단원
    const remedialGrade = Math.max(1, grade - 1);
    const unit = curriculumUnits[remedialGrade] || curriculumUnits[1];
    
    // 스테이지 ID에 따른 보충 학습 스테이지 설정
    if (remedialGrade === 9) { // 중3
      return 81;
    } else if (remedialGrade === 8) { // 중2
      return 71;
    } else if (remedialGrade === 7) { // 중1
      return 61;
    } else if (remedialGrade === 6) { // 6학년
      return 51;
    } else if (remedialGrade === 5) { // 5학년
      return 41;
    } else if (remedialGrade === 4) { // 4학년
      return 31;
    } else if (remedialGrade === 3) { // 3학년
      return 21;
    } else if (remedialGrade === 2) { // 2학년
      return 11;
    } else { // 1학년
      return 1;
    }
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          {/* 특별한 헤더 */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
              style={{background: 'var(--gradient-primary)', color: 'white'}}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="w-5 h-5 mr-2" />
              🎯 AI 기반 실력 진단 테스트
              <Sparkles className="w-4 h-4 ml-2" />
            </motion.div>
            
            <motion.h1
              className="text-5xl font-bold mb-4"
              style={{color: 'var(--color-text-primary)'}}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              나의 수학 실력은?
            </motion.h1>
            
            <motion.div
              className="flex items-center justify-center space-x-4 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
                <Clock className="w-4 h-4 mr-1" />
                약 5분 소요
              </div>
              <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
                <Target className="w-4 h-4 mr-1" />
                정확한 분석
              </div>
              <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
                <TrendingUp className="w-4 h-4 mr-1" />
                맞춤 경로 추천
              </div>
            </motion.div>
            
            <motion.p
              className="text-lg max-w-2xl mx-auto mb-8"
              style={{color: 'var(--color-text-secondary)'}}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>검증된 알고리즘</span>으로 현재 실력을 정확히 파악하고, 
              <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>개인별 최적화된 학습 경로</span>를 추천받으세요
            </motion.p>
          </div>

        {/* 레벨 선택 */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>학습 레벨을 선택하세요</h3>
            <p className="text-sm" style={{color: 'var(--color-text-secondary)'}}>현재 수준에 맞는 레벨을 선택해주세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculumLevels.map((level, index) => (
              <motion.button
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                className={`p-8 rounded-3xl border-2 transition-all text-center group hover:shadow-lg ${
                  level.color === 'purple' 
                    ? 'border-purple-200 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100/50' 
                    : level.color === 'blue'
                    ? 'border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100/50'
                    : level.color === 'orange'
                    ? 'border-orange-200 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100/50'
                    : 'border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-green-100/50'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {level.icon}
                </motion.div>
                <div className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">{level.name}</div>
                <div className="text-sm text-gray-600 group-hover:text-white/80 transition-colors">
                  {level.grades.map(grade => `${grade}학년`).join(', ')}
                </div>
                <motion.div
                  className="mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{color: 'var(--color-text-primary)'}}
                >
                  클릭하여 진단 시작 →
                </motion.div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 진단 안내 */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>진단 안내</h3>
            <p className="text-sm" style={{color: 'var(--color-text-secondary)'}}>정확한 진단을 위한 안내사항입니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>3문제 출제</h4>
              <p className="text-sm" style={{color: 'var(--color-text-secondary)'}}>각 학년별 3문제씩<br/>출제됩니다</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>상위 레벨 진입</h4>
              <p className="text-sm" style={{color: 'var(--color-text-secondary)'}}>3개 이상 정답 시<br/>상위 레벨로 진입</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>보충 학습</h4>
              <p className="text-sm" style={{color: 'var(--color-text-secondary)'}}>2개 이하 정답 시<br/>보충 학습 제공</p>
            </motion.div>
          </div>
        </motion.div>
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

