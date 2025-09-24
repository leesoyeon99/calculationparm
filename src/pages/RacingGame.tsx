import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Flag, Zap, Trophy, Clock, Target } from 'lucide-react'

interface Car {
  id: string
  x: number
  y: number
  speed: number
  maxSpeed: number
  color: string
  emoji: string
}

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
  speedBoost: number
}

const questions: Question[] = [
  {
    id: '1',
    question: '자동차가 시속 60km로 2시간 달리면 몇 km를 갈까요?',
    options: ['120km', '30km', '60km', '240km'],
    correct: 0,
    explanation: '60km/h × 2h = 120km입니다!',
    speedBoost: 20
  },
  {
    id: '2',
    question: '3 + 4 × 2 = ?',
    options: ['14', '11', '10', '9'],
    correct: 1,
    explanation: '곱셈을 먼저: 4 × 2 = 8, 그 다음 덧셈: 3 + 8 = 11입니다!',
    speedBoost: 15
  },
  {
    id: '3',
    question: '15 - 8 + 3 = ?',
    options: ['10', '11', '12', '13'],
    correct: 0,
    explanation: '왼쪽부터 계산: 15 - 8 = 7, 7 + 3 = 10입니다!',
    speedBoost: 25
  },
  {
    id: '4',
    question: '2 × 3 + 4 = ?',
    options: ['10', '14', '18', '12'],
    correct: 0,
    explanation: '곱셈을 먼저: 2 × 3 = 6, 그 다음 덧셈: 6 + 4 = 10입니다!',
    speedBoost: 18
  },
  {
    id: '5',
    question: '20 ÷ 4 + 3 = ?',
    options: ['8', '7', '6', '9'],
    correct: 0,
    explanation: '나눗셈을 먼저: 20 ÷ 4 = 5, 그 다음 덧셈: 5 + 3 = 8입니다!',
    speedBoost: 22
  }
]

export function RacingGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerCar, setPlayerCar] = useState<Car>({
    id: 'player',
    x: 50,
    y: 300,
    speed: 0,
    maxSpeed: 100,
    color: 'blue',
    emoji: '🏎️'
  })
  const [enemyCars, setEnemyCars] = useState<Car[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [racePosition, setRacePosition] = useState(0)
  const [raceProgress, setRaceProgress] = useState(0)

  // 적 자동차 생성
  useEffect(() => {
    if (!gameStarted) return

    const newEnemyCars: Car[] = []
    const colors = ['red', 'green', 'yellow', 'purple']
    const emojis = ['🚗', '🚙', '🚕', '🚓']
    
    for (let i = 0; i < 4; i++) {
      newEnemyCars.push({
        id: `enemy-${i}`,
        x: 50,
        y: 200 + i * 80,
        speed: 0,
        maxSpeed: 80 + Math.random() * 40,
        color: colors[i],
        emoji: emojis[i]
      })
    }

    setEnemyCars(newEnemyCars)
  }, [gameStarted])

  // 게임 루프
  useEffect(() => {
    if (!gameStarted || gameOver || victory) return

    const gameLoop = setInterval(() => {
      // 플레이어 자동차 이동
      setPlayerCar(prev => ({
        ...prev,
        x: Math.min(window.innerWidth - 100, prev.x + prev.speed * 0.1)
      }))

      // 적 자동차 이동
      setEnemyCars(prev => prev.map(car => ({
        ...car,
        x: Math.min(window.innerWidth - 100, car.x + car.speed * 0.1)
      })))

      // 경주 진행률 업데이트
      setRaceProgress(prev => {
        const newProgress = (playerCar.x / (window.innerWidth - 100)) * 100
        return Math.min(100, newProgress)
      })

      // 승리 조건 확인
      if (playerCar.x >= window.innerWidth - 100) {
        setVictory(true)
      }

      // 타이머 감소
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          return 0
        }
        return prev - 0.1
      })

    }, 50)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, victory, playerCar.x])

  // 키보드 입력 처리
  useEffect(() => {
    if (!gameStarted || showQuestion) return

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setPlayerCar(prev => ({
            ...prev,
            speed: Math.min(prev.maxSpeed, prev.speed + 5)
          }))
          break
        case 'ArrowDown':
          setPlayerCar(prev => ({
            ...prev,
            speed: Math.max(0, prev.speed - 5)
          }))
          break
        case ' ':
          e.preventDefault()
          showRandomQuestion()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, showQuestion])

  // 랜덤 문제 표시
  const showRandomQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    setCurrentQuestion(randomQuestion)
    setShowQuestion(true)
  }

  // 답안 선택
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
    
    if (answerIndex === currentQuestion?.correct) {
      setScore(prev => prev + 10)
      setPlayerCar(prev => ({
        ...prev,
        speed: Math.min(prev.maxSpeed, prev.speed + currentQuestion.speedBoost)
      }))
    } else {
      setPlayerCar(prev => ({
        ...prev,
        speed: Math.max(0, prev.speed - 10)
      }))
    }
  }

  // 문제 닫기
  const closeQuestion = () => {
    setCurrentQuestion(null)
    setShowQuestion(false)
    setShowAnswer(false)
    setSelectedAnswer(null)
  }

  // 게임 시작
  const startGame = () => {
    setGameStarted(true)
    setPlayerCar({
      id: 'player',
      x: 50,
      y: 300,
      speed: 0,
      maxSpeed: 100,
      color: 'blue',
      emoji: '🏎️'
    })
    setScore(0)
    setTimeLeft(60)
    setRaceProgress(0)
    setGameOver(false)
    setVictory(false)
  }

  // 게임 재시작
  const restartGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setVictory(false)
    setScore(0)
    setRaceProgress(0)
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* 레이싱 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-blue-500 to-green-400">
        {/* 구름들 */}
        <div className="absolute top-10 left-0 w-40 h-20 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-16 bg-white/25 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/3 w-24 h-12 bg-white/20 rounded-full animate-pulse delay-2000"></div>
        
        {/* 산맥 실루엣 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-600 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-1/4 right-0 h-24 bg-gradient-to-t from-gray-500 to-transparent opacity-20"></div>
      </div>

      {/* UI 패널 */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600/90 to-green-600/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl z-20 border border-blue-300/30">
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="font-bold text-white text-lg">{score}점</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-5 h-5 text-blue-300" />
            <span className="font-bold text-white">속도: {Math.round(playerCar.speed)}km/h</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-red-300" />
          <span className="font-bold text-red-200 text-lg">{Math.round(timeLeft)}초</span>
          {/* 속도 바 */}
          <div className="w-20 h-2 bg-white/30 rounded-full overflow-hidden ml-2">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
              style={{ width: `${(playerCar.speed / playerCar.maxSpeed) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(playerCar.speed / playerCar.maxSpeed) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg z-20">
        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
            style={{ width: `${raceProgress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${raceProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="text-sm text-gray-600 mt-1 text-center">
          {Math.round(raceProgress)}% 완주
        </div>
      </div>

      {/* 게임 시작 화면 */}
      {!gameStarted && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              🏎️ 수학 레이싱 게임
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              수학 문제를 풀어서 속도를 높이고 1등을 차지하세요!
            </p>
            <div className="text-sm text-gray-500 mb-4">
              <p>↑↓ 방향키로 속도 조절, 스페이스바로 문제 풀기!</p>
            </div>
            <motion.button
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Car className="w-6 h-6 mr-2" />
              레이스 시작
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 도로 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-800 to-gray-700">
        {/* 도로 패턴 */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 border border-gray-600"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 20}%`,
              }}
            />
          ))}
        </div>
        
        {/* 중앙선 */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-yellow-400 transform -translate-y-1/2">
          <motion.div 
            className="h-full bg-yellow-400"
            style={{
              background: 'repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 20px, transparent 20px, transparent 40px)'
            }}
            animate={{
              x: ['-40px', '0px'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* 도로 가장자리 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
        
        {/* 스피드 라인 효과 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-16 bg-white/30"
              style={{
                left: `${20 + i * 20}%`,
                top: '0',
              }}
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* 플레이어 자동차 */}
      <motion.div
        className="absolute w-20 h-10 z-10"
        style={{
          left: playerCar.x,
          top: playerCar.y
        }}
        animate={{
          y: [playerCar.y, playerCar.y - 3, playerCar.y],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* 자동차 그림자 */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-black/30 rounded-full blur-sm"></div>
        
        {/* 자동차 본체 */}
        <motion.div
          className="w-20 h-10 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 rounded-lg shadow-2xl relative overflow-hidden flex items-center justify-center"
          animate={{
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* 자동차 내부 그라데이션 */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-md"></div>
          
          {/* 자동차 아이콘 */}
          <div className="relative z-10 text-2xl drop-shadow-lg">
            {playerCar.emoji}
          </div>
          
          {/* 스피드 라인 효과 */}
          {playerCar.speed > 20 && (
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-2 bg-white/60"
                  style={{
                    left: `${i * 2}px`,
                    top: `${i * 2}px`,
                  }}
                  animate={{
                    x: [-10, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* 적 자동차들 */}
      {enemyCars.map(car => (
        <motion.div
          key={car.id}
          className="absolute w-18 h-9 z-10"
          style={{
            left: car.x,
            top: car.y,
          }}
          animate={{
            y: [car.y, car.y - 2, car.y],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* 적 자동차 그림자 */}
          <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-black/20 rounded-full blur-sm"></div>
          
          {/* 적 자동차 본체 */}
          <motion.div
            className="w-18 h-9 rounded-lg shadow-xl relative overflow-hidden flex items-center justify-center"
            style={{
              background: car.color === 'red' ? 'linear-gradient(45deg, #ef4444, #dc2626)' : 
                         car.color === 'green' ? 'linear-gradient(45deg, #10b981, #059669)' :
                         car.color === 'yellow' ? 'linear-gradient(45deg, #f59e0b, #d97706)' : 
                         'linear-gradient(45deg, #8b5cf6, #7c3aed)'
            }}
            animate={{
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* 자동차 내부 그라데이션 */}
            <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-md"></div>
            
            {/* 자동차 아이콘 */}
            <div className="relative z-10 text-xl drop-shadow-lg">
              {car.emoji}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* 문제 모달 */}
      {currentQuestion && showQuestion && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-lg w-full"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🏁</div>
              <h2 className="text-xl font-bold text-gray-800">속도 부스트 문제!</h2>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {currentQuestion.question}
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`p-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    showAnswer 
                      ? index === currentQuestion.correct 
                        ? 'bg-green-500 text-white' 
                        : selectedAnswer === index 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showAnswer}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {showAnswer && (
              <motion.div
                className="mb-4 p-4 bg-blue-50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-lg font-semibold text-blue-800 text-center">
                  {currentQuestion.explanation}
                </p>
                {selectedAnswer === currentQuestion.correct && (
                  <p className="text-center text-green-600 font-bold mt-2">
                    +{currentQuestion.speedBoost}km/h 속도 부스트!
                  </p>
                )}
              </motion.div>
            )}

            <motion.button
              onClick={closeQuestion}
              className="w-full bg-gray-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAnswer ? '계속하기' : '건너뛰기'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 승리 화면 */}
      {victory && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
          >
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">1등 완주!</h2>
            <p className="text-xl text-gray-600 mb-6">최종 점수: {score}점</p>
            <motion.button
              onClick={restartGame}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              다시 레이스
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 게임 오버 화면 */}
      {gameOver && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
          >
            <Flag className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">시간 초과!</h2>
            <p className="text-xl text-gray-600 mb-6">최종 점수: {score}점</p>
            <motion.button
              onClick={restartGame}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              다시 시도
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 조작법 안내 */}
      {gameStarted && !showQuestion && (
        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-lg text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gray-600 rounded text-xs flex items-center justify-center">↑↓</div>
              <span>속도 조절</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gray-600 rounded text-xs flex items-center justify-center">스페이스</div>
              <span>문제 풀기</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
