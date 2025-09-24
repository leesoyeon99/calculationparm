import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Trophy, Zap, Target, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface Platform {
  id: string
  x: number
  y: number
  width: number
  height: number
  captured: boolean
  hasQuestion: boolean
}

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: '1',
    question: '🍎🍎🍎 사과가 몇 개 있나요?',
    options: ['2개', '3개', '4개', '5개'],
    correct: 1,
    explanation: '하나, 둘, 셋... 사과가 3개 있습니다!'
  },
  {
    id: '2',
    question: '7 + 3 = ?',
    options: ['9', '10', '11', '12'],
    correct: 1,
    explanation: '7 + 3 = 10입니다!'
  },
  {
    id: '3',
    question: '2 × 4 = ?',
    options: ['6', '8', '10', '12'],
    correct: 1,
    explanation: '2 × 4 = 8입니다!'
  },
  {
    id: '4',
    question: '15 - 6 = ?',
    options: ['8', '9', '10', '11'],
    correct: 1,
    explanation: '15 - 6 = 9입니다!'
  },
  {
    id: '5',
    question: '12 ÷ 3 = ?',
    options: ['3', '4', '5', '6'],
    correct: 1,
    explanation: '12 ÷ 3 = 4입니다!'
  }
]

export function PlatformerGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerPos, setPlayerPos] = useState<Position>({ x: 50, y: 400 })
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [score, setScore] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [particles, setParticles] = useState<Array<{id: string, x: number, y: number}>>([])

  // 플랫폼 생성
  useEffect(() => {
    if (!gameStarted) return

    const newPlatforms: Platform[] = []
    
    // 시작 플랫폼
    newPlatforms.push({
      id: 'start',
      x: 50,
      y: 450,
      width: 100,
      height: 20,
      captured: true,
      hasQuestion: false
    })

    // 랜덤 플랫폼들 생성
    for (let i = 0; i < 15; i++) {
      const x = 200 + (i * 80) + Math.random() * 40
      const y = 300 + Math.random() * 200
      const hasQuestion = Math.random() > 0.3 // 70% 확률로 문제 있음
      
      newPlatforms.push({
        id: `platform-${i}`,
        x,
        y,
        width: 80 + Math.random() * 40,
        height: 20,
        captured: false,
        hasQuestion
      })
    }

    setPlatforms(newPlatforms)
  }, [gameStarted])

  // 키보드 입력 처리
  useEffect(() => {
    if (!gameStarted) return

    const handleKeyPress = (e: KeyboardEvent) => {
      const moveDistance = 20
      const newPos = { ...playerPos }

      switch (e.key) {
        case 'ArrowLeft':
          newPos.x = Math.max(0, newPos.x - moveDistance)
          break
        case 'ArrowRight':
          newPos.x = Math.min(window.innerWidth - 40, newPos.x + moveDistance)
          break
        case 'ArrowUp':
          newPos.y = Math.max(0, newPos.y - moveDistance)
          break
        case 'ArrowDown':
          newPos.y = Math.min(window.innerHeight - 40, newPos.y + moveDistance)
          break
        case ' ':
          e.preventDefault()
          checkPlatformCollision()
          break
      }

      setPlayerPos(newPos)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playerPos, gameStarted])

  // 플랫폼 충돌 검사
  const checkPlatformCollision = useCallback(() => {
    platforms.forEach(platform => {
      if (platform.captured) return

      const playerCenterX = playerPos.x + 20
      const playerCenterY = playerPos.y + 20
      const platformCenterX = platform.x + platform.width / 2
      const platformCenterY = platform.y + platform.height / 2

      const distance = Math.sqrt(
        Math.pow(playerCenterX - platformCenterX, 2) + 
        Math.pow(playerCenterY - platformCenterY, 2)
      )

      if (distance < 60) {
        // 플랫폼 캡처
        setPlatforms(prev => prev.map(p => 
          p.id === platform.id ? { ...p, captured: true } : p
        ))
        
        setScore(prev => prev + 10)
        setEnergy(prev => Math.min(100, prev + 5))
        
        // 파티클 효과
        createParticles(platform.x + platform.width / 2, platform.y)
        
        // 문제가 있는 플랫폼이면 문제 표시
        if (platform.hasQuestion) {
          const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
          setCurrentQuestion(randomQuestion)
        }
      }
    })
  }, [playerPos, platforms])

  // 파티클 생성
  const createParticles = (x: number, y: number) => {
    const newParticles = []
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40
      })
    }
    setParticles(prev => [...prev, ...newParticles])
  }

  // 답안 선택
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
    
    if (answerIndex === currentQuestion?.correct) {
      setScore(prev => prev + 50)
      setEnergy(prev => Math.min(100, prev + 20))
    } else {
      setEnergy(prev => Math.max(0, prev - 10))
    }
  }

  // 문제 닫기
  const closeQuestion = () => {
    setCurrentQuestion(null)
    setShowAnswer(false)
    setSelectedAnswer(null)
  }

  // 게임 시작
  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setEnergy(100)
    setPlayerPos({ x: 50, y: 400 })
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* 배경 레이어들 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500">
        {/* 구름 애니메이션 */}
        <div className="absolute top-10 left-0 w-32 h-16 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-12 bg-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-32 left-1/3 w-20 h-10 bg-white/25 rounded-full animate-pulse delay-2000"></div>
        
        {/* 별들 */}
        <div className="absolute top-16 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute top-24 right-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-40 left-2/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-1000"></div>
      </div>

      {/* UI 패널 */}
      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl z-20 border border-gray-200">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
                            <div>
                                <div className="font-dnf-score" style={{color: 'var(--color-text-primary)'}}>{score}</div>
                                <div className="font-dnf-caption" style={{color: 'var(--color-text-secondary)'}}>Score</div>
                            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
                            <div>
                                <div className="font-dnf-score" style={{color: 'var(--color-text-primary)'}}>{Math.floor(energy)}</div>
                                <div className="font-dnf-caption" style={{color: 'var(--color-text-secondary)'}}>Energy</div>
                            </div>
          </div>
        </div>
        
        {/* 에너지 바 */}
        <div className="mt-4 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            style={{ width: `${energy}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${energy}%` }}
            transition={{ duration: 0.3 }}
          />
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
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{background: 'var(--gradient-primary)'}}>
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-dnf-heading-1 mb-4" style={{color: 'var(--color-text-primary)'}}>
              플랫포머 수학
            </h1>
            <p className="font-dnf-body-large mb-8" style={{color: 'var(--color-text-secondary)'}}>
              플랫폼 사이를 점프하며 점령해서 수학 문제를 풀어보세요!<br/>
              방향키로 이동하고 스페이스바로 플랫폼을 점령하세요.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2" style={{color: 'var(--color-text-secondary)'}}>
                <div className="w-2 h-2 rounded-full" style={{background: 'var(--color-primary)'}}></div>
                <span className="font-dnf-body-small">방향키로 이동</span>
              </div>
              <div className="flex items-center justify-center space-x-2" style={{color: 'var(--color-text-secondary)'}}>
                <div className="w-2 h-2 rounded-full" style={{background: 'var(--color-accent)'}}></div>
                <span className="font-dnf-body-small">스페이스바로 점령</span>
              </div>
              <div className="flex items-center justify-center space-x-2" style={{color: 'var(--color-text-secondary)'}}>
                <div className="w-2 h-2 rounded-full" style={{background: 'var(--color-primary)'}}></div>
                <span className="font-dnf-body-small">수학 문제 해결</span>
              </div>
            </div>
            <motion.button
              onClick={startGame}
              className="text-white px-10 py-4 rounded-2xl font-dnf-button-large shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
              style={{background: 'var(--gradient-primary)'}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 mr-2" />
              게임 시작
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 플랫폼들 */}
      {platforms.map(platform => (
        <motion.div
          key={platform.id}
          className={`absolute rounded-xl shadow-2xl ${
            platform.captured 
              ? 'bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 border-2 border-pink-300 shadow-pink-500/50' 
              : 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 border-2 border-gray-400 shadow-gray-500/30'
          }`}
          style={{
            left: platform.x,
            top: platform.y,
            width: platform.width,
            height: platform.height
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* 플랫폼 내부 패턴 */}
          <div className="absolute inset-1 rounded-lg bg-gradient-to-r from-white/20 to-transparent"></div>
          
          {platform.hasQuestion && !platform.captured && (
            <motion.div 
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="bg-yellow-400 rounded-full p-2 shadow-lg">
                ❓
              </div>
            </motion.div>
          )}
          
          {platform.captured && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="text-2xl">✨</div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* 플레이어 */}
      <motion.div
        className="absolute w-12 h-12 z-10"
        style={{
          left: playerPos.x,
          top: playerPos.y
        }}
        animate={{
          y: [playerPos.y, playerPos.y - 8, playerPos.y],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* 플레이어 그림자 */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-black/20 rounded-full blur-sm"></div>
        
        {/* 플레이어 본체 */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 rounded-full border-3 border-white shadow-2xl relative overflow-hidden"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* 플레이어 내부 그라데이션 */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
          
          {/* 플레이어 아이콘 */}
          <div className="absolute inset-0 flex items-center justify-center text-2xl drop-shadow-lg">
            🎨
          </div>
          
          {/* 반짝이는 효과 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* 파티클 효과 */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: particle.x,
              top: particle.y
            }}
            initial={{ 
              opacity: 1, 
              scale: 1,
              rotate: 0
            }}
            animate={{ 
              opacity: 0, 
              scale: 0, 
              y: particle.y - 80,
              rotate: 360
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut"
            }}
            onAnimationComplete={() => {
              setParticles(prev => prev.filter(p => p.id !== particle.id))
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 rounded-full shadow-lg"></div>
            <div className="absolute inset-0 bg-white/50 rounded-full animate-ping"></div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 배경 파티클 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 문제 모달 */}
      {currentQuestion && (
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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-dnf-heading-2 mb-6 text-center" style={{color: 'var(--color-text-primary)'}}>수학 문제</h2>
            <p className="text-xl text-gray-700 mb-8 text-center leading-relaxed">
              {currentQuestion.question}
            </p>
            
            <div className="space-y-4 mb-6">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all duration-300 border-2 ${
                    showAnswer 
                      ? index === currentQuestion.correct 
                        ? 'bg-green-50 text-green-800 border-green-300' 
                        : selectedAnswer === index 
                          ? 'bg-red-50 text-red-800 border-red-300' 
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 border-blue-200 hover:from-blue-100 hover:to-purple-100'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showAnswer}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showAnswer 
                        ? index === currentQuestion.correct 
                          ? 'bg-green-500 text-white' 
                          : selectedAnswer === index 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
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

      {/* 게임 오버 화면 */}
      {energy <= 0 && (
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
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-dnf-heading-1 mb-4" style={{color: 'var(--color-text-primary)'}}>게임 오버!</h2>
            <p className="font-dnf-body-large mb-8" style={{color: 'var(--color-text-secondary)'}}>최종 점수: {score}</p>
            <motion.button
              onClick={() => {
                setGameStarted(false)
                setEnergy(100)
                setScore(0)
                setPlatforms([])
                setParticles([])
              }}
              className="text-white px-10 py-4 rounded-2xl font-dnf-button-large shadow-lg hover:shadow-xl transition-all duration-300"
              style={{background: 'var(--gradient-primary)'}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              다시 시작
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 조작법 안내 */}
      {gameStarted && (
        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-lg text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <ArrowRight className="w-4 h-4" />
              <ArrowUp className="w-4 h-4" />
              <ArrowDown className="w-4 h-4" />
              <span>이동</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gray-600 rounded text-xs flex items-center justify-center">스페이스</div>
              <span>캡처</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
