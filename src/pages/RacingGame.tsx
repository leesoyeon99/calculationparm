import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Car, Flag, Zap, Trophy, Clock, Target, Heart, Fuel } from 'lucide-react'
import { getRandomRacingQuestion, RacingQuestion } from '../data/racingQuestions'

interface RacingCar {
  id: string
  x: number
  y: number
  speed: number
  maxSpeed: number
  lane: number
  emoji: string
  color: string
  distance: number
}

interface Obstacle {
  id: string
  x: number
  lane: number
  type: 'cone' | 'barrier' | 'oil'
  emoji: string
}

interface PowerUp {
  id: string
  x: number
  lane: number
  type: 'speed' | 'shield' | 'question'
  emoji: string
}

type GamePhase = 'start' | 'racing' | 'question' | 'completed' | 'failed'

const LANE_COUNT = 3
const LANE_HEIGHT = 120
const TRACK_LENGTH = 5000
const GAME_WIDTH = 800

export function RacingGame() {
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1)
  const [gamePhase, setGamePhase] = useState<GamePhase>('start')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [totalScore, setTotalScore] = useState(0)

  // 플레이어
  const [playerCar, setPlayerCar] = useState<RacingCar>({
    id: 'player',
    x: 100,
    y: 0,
    speed: 50,
    maxSpeed: 150,
    lane: 1,
    emoji: '🏎️',
    color: 'blue',
    distance: 0
  })

  // 적 자동차들
  const [enemyCars, setEnemyCars] = useState<RacingCar[]>([])
  
  // 장애물
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  
  // 파워업
  const [powerUps, setPowerUps] = useState<PowerUp[]>([])

  // 플레이어 상태
  const [fuel, setFuel] = useState(100)
  const [health, setHealth] = useState(3)
  const [hasShield, setHasShield] = useState(false)
  const [speedBoost, setSpeedBoost] = useState(1)

  // 수학 문제
  const [currentQuestion, setCurrentQuestion] = useState<RacingQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // 키보드 입력
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})

  // 게임 시작
  const startGame = () => {
    setGamePhase('racing')
    setTimeLeft(120)
    setScore(0)
    setFuel(100)
    setHealth(3)
    setHasShield(false)
    setSpeedBoost(1)
    setPlayerCar(prev => ({ ...prev, x: 100, lane: 1, distance: 0, speed: 50 }))
    setEnemyCars([])
    setObstacles([])
    setPowerUps([])
  }

  // 타이머
  useEffect(() => {
    if (gamePhase === 'racing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gamePhase === 'racing') {
      setGamePhase('failed')
    }
  }, [timeLeft, gamePhase])

  // 키보드 입력 리스너
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: true }))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // 적 자동차 생성
  useEffect(() => {
    if (gamePhase !== 'racing') return

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomLane = Math.floor(Math.random() * LANE_COUNT)
        const colors = ['red', 'green', 'yellow', 'purple', 'orange']
        const emojis = ['🚗', '🚙', '🚕', '🚓', '🚑']
        const randomIndex = Math.floor(Math.random() * colors.length)
        
        setEnemyCars(prev => [...prev, {
          id: `enemy-${Date.now()}`,
          x: GAME_WIDTH + 100,
          y: 0,
          speed: 30 + Math.random() * 40 * difficulty,
          maxSpeed: 100,
          lane: randomLane,
          emoji: emojis[randomIndex],
          color: colors[randomIndex],
          distance: 0
        }])
      }
    }, 2000 / difficulty)

    return () => clearInterval(interval)
  }, [gamePhase, difficulty])

  // 장애물 생성
  useEffect(() => {
    if (gamePhase !== 'racing') return

    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        const randomLane = Math.floor(Math.random() * LANE_COUNT)
        const types = ['cone', 'barrier', 'oil'] as const
        const emojis = ['🚧', '🚫', '🛢️']
        const randomIndex = Math.floor(Math.random() * types.length)
        
        setObstacles(prev => [...prev, {
          id: `obstacle-${Date.now()}`,
          x: GAME_WIDTH + 100,
          lane: randomLane,
          type: types[randomIndex],
          emoji: emojis[randomIndex]
        }])
      }
    }, 3000 / difficulty)

    return () => clearInterval(interval)
  }, [gamePhase, difficulty])

  // 파워업 생성
  useEffect(() => {
    if (gamePhase !== 'racing') return

    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const randomLane = Math.floor(Math.random() * LANE_COUNT)
        const types = ['speed', 'shield', 'question'] as const
        const emojis = ['⚡', '🛡️', '❓']
        const randomIndex = Math.floor(Math.random() * types.length)
        
        setPowerUps(prev => [...prev, {
          id: `powerup-${Date.now()}`,
          x: GAME_WIDTH + 100,
          lane: randomLane,
          type: types[randomIndex],
          emoji: emojis[randomIndex]
        }])
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [gamePhase])

  // 메인 게임 루프
  useEffect(() => {
    if (gamePhase !== 'racing') return

    const gameLoop = setInterval(() => {
      // 플레이어 조작
      setPlayerCar(prev => {
        let newLane = prev.lane
        let newSpeed = prev.speed

        // 차선 변경 (위/아래)
        if ((keys['ArrowUp'] || keys['w']) && prev.lane > 0) {
          newLane = Math.max(0, prev.lane - 1)
        }
        if ((keys['ArrowDown'] || keys['s']) && prev.lane < LANE_COUNT - 1) {
          newLane = Math.min(LANE_COUNT - 1, prev.lane + 1)
        }

        // 가속/감속
        if (keys['ArrowRight'] || keys['d']) {
          newSpeed = Math.min(prev.maxSpeed, prev.speed + 2 * speedBoost)
        } else if (keys['ArrowLeft'] || keys['a']) {
          newSpeed = Math.max(0, prev.speed - 2)
        } else {
          // 자동 감속
          newSpeed = Math.max(30, prev.speed - 0.5)
        }

        // 연료 소모
        if (newSpeed > 30) {
          setFuel(f => Math.max(0, f - 0.05 * (newSpeed / 50)))
        }

        // 거리 계산
        const newDistance = prev.distance + newSpeed * 0.1

        // 완주 체크
        if (newDistance >= TRACK_LENGTH) {
          setGamePhase('completed')
        }

        return {
          ...prev,
          lane: newLane,
          speed: newSpeed,
          distance: newDistance
        }
      })

      // 적 자동차 이동
      setEnemyCars(prev => prev
        .map(car => ({
          ...car,
          x: car.x - (playerCar.speed - car.speed) * 0.2,
          distance: car.distance + car.speed * 0.1
        }))
        .filter(car => car.x > -100)
      )

      // 장애물 이동
      setObstacles(prev => prev
        .map(obs => ({
          ...obs,
          x: obs.x - playerCar.speed * 0.3
        }))
        .filter(obs => obs.x > -100)
      )

      // 파워업 이동
      setPowerUps(prev => prev
        .map(pu => ({
          ...pu,
          x: pu.x - playerCar.speed * 0.3
        }))
        .filter(pu => pu.x > -100)
      )

      // 충돌 감지 - 장애물
      obstacles.forEach(obs => {
        if (
          Math.abs(obs.x - playerCar.x) < 50 &&
          obs.lane === playerCar.lane
        ) {
          if (!hasShield) {
            setHealth(h => {
              const newHealth = h - 1
              if (newHealth <= 0) {
                setGamePhase('failed')
              }
              return Math.max(0, newHealth)
            })
            setPlayerCar(prev => ({ ...prev, speed: Math.max(20, prev.speed - 30) }))
          } else {
            setHasShield(false)
          }
          setObstacles(prev => prev.filter(o => o.id !== obs.id))
        }
      })

      // 충돌 감지 - 파워업
      powerUps.forEach(pu => {
        if (
          Math.abs(pu.x - playerCar.x) < 50 &&
          pu.lane === playerCar.lane
        ) {
          if (pu.type === 'speed') {
            setSpeedBoost(2)
            setTimeout(() => setSpeedBoost(1), 5000)
          } else if (pu.type === 'shield') {
            setHasShield(true)
          } else if (pu.type === 'question') {
            setGamePhase('question')
            setCurrentQuestion(getRandomRacingQuestion(difficulty))
          }
          setPowerUps(prev => prev.filter(p => p.id !== pu.id))
          setScore(s => s + 10)
        }
      })

    }, 50)

    return () => clearInterval(gameLoop)
  }, [gamePhase, keys, playerCar, obstacles, powerUps, hasShield, speedBoost, difficulty])

  // 연료 부족
  useEffect(() => {
    if (fuel <= 0 && gamePhase === 'racing') {
      setPlayerCar(prev => ({ ...prev, speed: Math.max(10, prev.speed * 0.5) }))
    }
  }, [fuel, gamePhase])

  // 수학 문제 답안 제출
  const handleSubmitAnswer = () => {
    if (!currentQuestion || selectedAnswer === null) return

    const correct = selectedAnswer === currentQuestion.correct
    setIsCorrect(correct)
    setShowResult(true)

    setTimeout(() => {
      if (correct) {
        setScore(s => s + 50 * difficulty)
        setPlayerCar(prev => ({ 
          ...prev, 
          speed: Math.min(prev.maxSpeed, prev.speed + currentQuestion.speedBoost)
        }))
        setFuel(f => Math.min(100, f + 20))
      }
      setGamePhase('racing')
      setCurrentQuestion(null)
      setSelectedAnswer(null)
      setShowResult(false)
    }, 2000)
  }

  // 다음 레벨
  const nextLevel = () => {
    const newLevel = currentLevel + 1
    setCurrentLevel(newLevel)
    setTotalScore(prev => prev + score)
    
    if (newLevel % 3 === 0 && difficulty < 3) {
      setDifficulty(prev => Math.min(3, prev + 1) as 1 | 2 | 3)
    }
    
    startGame()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* 배경 별 */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {gamePhase === 'start' ? (
        // 시작 화면
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              🏎️ 수학 레이싱 🏁
            </h1>
            <p className="text-2xl mb-12 text-white">
              차선을 바꾸고 장애물을 피하며 1등으로 완주하세요!
            </p>

            {/* 난이도 선택 */}
            <div className="mb-12">
              <p className="text-lg mb-4 font-bold text-white">난이도를 선택하세요:</p>
              <div className="flex gap-4 justify-center">
                {[
                  { level: 1, name: '쉬움', color: 'from-green-500 to-emerald-500' },
                  { level: 2, name: '보통', color: 'from-yellow-500 to-orange-500' },
                  { level: 3, name: '어려움', color: 'from-red-500 to-pink-500' }
                ].map(item => (
                  <motion.button
                    key={item.level}
                    onClick={() => setDifficulty(item.level as 1 | 2 | 3)}
                    className={`px-8 py-4 rounded-xl font-bold text-white transition-all ${
                      difficulty === item.level
                        ? `bg-gradient-to-r ${item.color} scale-110 ring-4 ring-white`
                        : 'bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={startGame}
              className="px-12 py-6 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl text-2xl font-bold shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🏁 레이싱 시작!
            </motion.button>

            <div className="mt-12 text-white space-y-2">
              <p>↑ 또는 W: 위 차선 이동 | ↓ 또는 S: 아래 차선 이동</p>
              <p>→ 또는 D: 가속 | ← 또는 A: 감속</p>
              <p>장애물을 피하고 파워업을 획득하세요!</p>
            </div>
          </motion.div>
        </div>
      ) : gamePhase === 'failed' ? (
        // 실패 화면
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-8xl mb-6">💥</div>
            <h2 className="text-5xl font-bold mb-6 text-red-500">레이스 실패!</h2>
            <p className="text-2xl mb-4 text-white">레벨: {currentLevel}</p>
            <p className="text-xl mb-8 text-gray-300">총 점수: {totalScore}</p>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다시 도전
              </motion.button>
              <motion.button
                onClick={() => navigate('/game-hub')}
                className="px-8 py-4 bg-gray-600 text-white rounded-xl text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                나가기
              </motion.button>
            </div>
          </motion.div>
        </div>
      ) : gamePhase === 'completed' ? (
        // 완료 화면
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Trophy className="w-32 h-32 mx-auto mb-8 text-yellow-400" />
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              🎉 완주 성공! 🎉
            </h2>
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-2xl mb-2 text-white">획득 점수: {score}</p>
            <p className="text-xl mb-8 text-gray-300">누적 점수: {totalScore + score}</p>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={nextLevel}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다음 레벨 →
              </motion.button>
              <motion.button
                onClick={() => navigate('/game-hub')}
                className="px-8 py-4 bg-gray-600 text-white rounded-xl text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                나가기
              </motion.button>
            </div>
          </motion.div>
        </div>
      ) : gamePhase === 'question' ? (
        // 수학 문제 화면
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">❓</div>
              <h3 className="text-3xl font-bold text-white mb-2">보너스 문제!</h3>
              <p className="text-white/80">정답이면 속도 부스트와 연료 충전!</p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6">
              <p className="text-sm text-white/80 mb-2">
                난이도 {'⭐'.repeat(currentQuestion?.difficulty || 1)}
              </p>
              <h4 className="text-2xl font-bold mb-6 text-white text-center">
                {currentQuestion?.question}
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                {currentQuestion?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`px-6 py-4 rounded-xl text-lg font-bold transition-all ${
                      showResult
                        ? index === currentQuestion.correct
                          ? 'bg-green-600 text-white ring-4 ring-green-400'
                          : index === selectedAnswer
                          ? 'bg-red-600 text-white ring-4 ring-red-400'
                          : 'bg-white/50 text-gray-600'
                        : selectedAnswer === index
                        ? 'bg-white text-blue-600 ring-4 ring-white'
                        : 'bg-white/80 text-gray-800 hover:bg-white'
                    }`}
                    whileHover={!showResult ? { scale: 1.05 } : {}}
                    whileTap={!showResult ? { scale: 0.95 } : {}}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {showResult && (
              <motion.div
                className={`p-4 rounded-xl mb-4 ${
                  isCorrect ? 'bg-green-600/30' : 'bg-red-600/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-white text-center font-bold whitespace-pre-line">
                  {currentQuestion?.explanation}
                </p>
              </motion.div>
            )}

            {!showResult && (
              <motion.button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`w-full px-8 py-4 rounded-xl text-xl font-bold ${
                  selectedAnswer === null
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500'
                }`}
                whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
              >
                답안 제출
              </motion.button>
            )}
          </motion.div>
        </div>
      ) : (
        // 게임 플레이 화면
        <div className="relative z-10 p-4">
          {/* 상단 UI */}
          <div className="flex justify-between items-start mb-4">
            <div className="bg-black/70 backdrop-blur-md rounded-2xl p-4 shadow-xl min-w-[280px] text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Car className="w-5 h-5 text-blue-400" />
                  <span className="font-bold">레벨 {currentLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">{totalScore + score}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">시간</span>
                </div>
                <span className={`text-lg font-bold ${timeLeft < 30 ? 'text-red-400 animate-pulse' : ''}`}>
                  {timeLeft}초
                </span>
              </div>

              {/* 연료 게이지 */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <Fuel className="w-4 h-4 text-green-400" />
                    <span className="text-sm">연료</span>
                  </div>
                  <span className="text-sm font-bold">{Math.floor(fuel)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${fuel > 50 ? 'bg-green-500' : fuel > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    animate={{ width: `${fuel}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* 체력 */}
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${i < health ? 'bg-red-500' : 'bg-gray-600'}`}
                    />
                  ))}
                </div>
                {hasShield && (
                  <div className="ml-2 px-2 py-1 bg-blue-500 rounded-full text-xs font-bold">
                    🛡️ 보호막
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-black/70 backdrop-blur-md rounded-2xl px-6 py-3 text-center shadow-xl text-white">
                <div className="text-sm mb-1">거리</div>
                <div className="text-2xl font-bold">
                  {Math.floor(playerCar.distance)} / {TRACK_LENGTH}m
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    animate={{ width: `${(playerCar.distance / TRACK_LENGTH) * 100}%` }}
                  />
                </div>
              </div>
              
              <motion.button
                onClick={() => navigate('/game-hub')}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-xl flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>나가기</span>
              </motion.button>
            </div>
          </div>

          {/* 레이싱 트랙 */}
          <div className="relative h-[400px] bg-gradient-to-b from-gray-700 to-gray-800 rounded-3xl overflow-hidden border-4 border-yellow-500 shadow-2xl">
            {/* 차선 구분선 */}
            {[...Array(LANE_COUNT - 1)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-t-2 border-dashed border-white/30"
                style={{ top: `${((i + 1) * 100) / LANE_COUNT}%` }}
              />
            ))}

            {/* 플레이어 자동차 */}
            <motion.div
              className="absolute flex items-center justify-center text-5xl"
              style={{
                left: playerCar.x,
                top: playerCar.lane * LANE_HEIGHT + 35,
                width: 60,
                height: 50
              }}
              animate={{
                boxShadow: speedBoost > 1 
                  ? ['0 0 20px rgba(255, 255, 0, 0.8)', '0 0 40px rgba(255, 255, 0, 1)', '0 0 20px rgba(255, 255, 0, 0.8)']
                  : 'none'
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {playerCar.emoji}
              {hasShield && (
                <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-pulse" />
              )}
            </motion.div>

            {/* 적 자동차 */}
            {enemyCars.map(car => (
              <motion.div
                key={car.id}
                className="absolute text-4xl"
                style={{
                  left: car.x,
                  top: car.lane * LANE_HEIGHT + 40
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                {car.emoji}
              </motion.div>
            ))}

            {/* 장애물 */}
            {obstacles.map(obs => (
              <motion.div
                key={obs.id}
                className="absolute text-4xl"
                style={{
                  left: obs.x,
                  top: obs.lane * LANE_HEIGHT + 40
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ rotate: { duration: 0.5, repeat: Infinity } }}
              >
                {obs.emoji}
              </motion.div>
            ))}

            {/* 파워업 */}
            {powerUps.map(pu => (
              <motion.div
                key={pu.id}
                className="absolute text-4xl"
                style={{
                  left: pu.x,
                  top: pu.lane * LANE_HEIGHT + 40
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  scale: { duration: 1, repeat: Infinity },
                  rotate: { duration: 2, repeat: Infinity }
                }}
              >
                {pu.emoji}
              </motion.div>
            ))}

            {/* 속도 표시 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-2 rounded-full">
              <div className="text-white font-bold text-2xl">
                {Math.floor(playerCar.speed)} km/h
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
