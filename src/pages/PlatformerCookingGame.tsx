import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChefHat, Star, Clock, Target, Trophy, Heart } from 'lucide-react'
import { getRandomRecipe, CookingRecipe, CookingIngredient } from '../data/cookingRecipes'

interface Player {
  x: number
  y: number
  width: number
  height: number
  velocityY: number
  onGround: boolean
  facingRight: boolean
}

interface Platform {
  x: number
  y: number
  width: number
  height: number
}

interface IngredientPosition extends CookingIngredient {
  x: number
  y: number
  collected: boolean
}

type GamePhase = 'start' | 'collecting' | 'cooking' | 'completed' | 'failed'

export function PlatformerCookingGame() {
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1)
  const [gamePhase, setGamePhase] = useState<GamePhase>('start')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [currentRecipe, setCurrentRecipe] = useState<CookingRecipe | null>(null)
  const [player, setPlayer] = useState<Player>({
    x: 50,
    y: 100,
    width: 40,
    height: 40,
    velocityY: 0,
    onGround: false,
    facingRight: true
  })
  const [ingredients, setIngredients] = useState<IngredientPosition[]>([])
  const [showMathModal, setShowMathModal] = useState(false)
  const [mathAnswer, setMathAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [totalScore, setTotalScore] = useState(0)

  // 플랫폼 설정 (난이도별로 다름)
  const platforms: Platform[] = difficulty === 1 ? [
    { x: 0, y: 500, width: 800, height: 20 }, // 바닥
    { x: 150, y: 400, width: 150, height: 20 },
    { x: 400, y: 300, width: 150, height: 20 },
    { x: 650, y: 200, width: 150, height: 20 },
  ] : difficulty === 2 ? [
    { x: 0, y: 500, width: 800, height: 20 },
    { x: 100, y: 420, width: 120, height: 20 },
    { x: 300, y: 340, width: 120, height: 20 },
    { x: 500, y: 260, width: 120, height: 20 },
    { x: 700, y: 180, width: 100, height: 20 },
  ] : [
    { x: 0, y: 500, width: 800, height: 20 },
    { x: 80, y: 430, width: 100, height: 20 },
    { x: 220, y: 360, width: 100, height: 20 },
    { x: 380, y: 290, width: 100, height: 20 },
    { x: 540, y: 220, width: 100, height: 20 },
    { x: 680, y: 150, width: 120, height: 20 },
  ]

  // 게임 시작
  const startGame = () => {
    const recipe = getRandomRecipe(difficulty)
    setCurrentRecipe(recipe)
    setGamePhase('collecting')
    setTimeLeft(recipe.timeLimit)
    setScore(0)
    setCurrentLevel(1)
    
    // 재료 배치 (플랫폼 위에)
    const ingredientPositions: IngredientPosition[] = recipe.ingredients.map((ing, i) => {
      const platform = platforms[i + 1] || platforms[0]
      return {
        ...ing,
        x: platform.x + platform.width / 2 - 20,
        y: platform.y - 50,
        collected: false
      }
    })
    
    setIngredients(ingredientPositions)
    setPlayer(prev => ({ ...prev, x: 50, y: 100 }))
  }

  // 타이머
  useEffect(() => {
    if (gamePhase === 'collecting' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gamePhase === 'collecting') {
      setGamePhase('failed')
    }
  }, [timeLeft, gamePhase])

  // 키보드 입력
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})

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

  // 플레이어 물리 & 이동
  useEffect(() => {
    if (gamePhase !== 'collecting') return

    const gravity = 0.8
    const jumpPower = -18
    const moveSpeed = 6

    const gameLoop = setInterval(() => {
      setPlayer(prev => {
        let newY = prev.y + prev.velocityY
        let newVelocityY = prev.velocityY + gravity
        let newOnGround = false
        let newX = prev.x
        let newFacingRight = prev.facingRight

        // 좌우 이동
        if (keys['ArrowLeft'] || keys['a']) {
          newX = Math.max(0, prev.x - moveSpeed)
          newFacingRight = false
        }
        if (keys['ArrowRight'] || keys['d']) {
          newX = Math.min(760, prev.x + moveSpeed)
          newFacingRight = true
        }

        // 플랫폼 충돌 체크
        platforms.forEach(platform => {
          if (
            newX + prev.width > platform.x &&
            newX < platform.x + platform.width &&
            newY + prev.height >= platform.y &&
            newY + prev.height <= platform.y + platform.height &&
            prev.velocityY >= 0
          ) {
            newY = platform.y - prev.height
            newVelocityY = 0
            newOnGround = true
          }
        })

        // 점프
        if ((keys[' '] || keys['ArrowUp'] || keys['w']) && prev.onGround) {
          newVelocityY = jumpPower
        }

        // 화면 밖으로 나가면 리셋
        if (newY > 600) {
          newY = 100
          newX = 50
          newVelocityY = 0
        }

        return {
          ...prev,
          x: newX,
          y: newY,
          velocityY: newVelocityY,
          onGround: newOnGround,
          facingRight: newFacingRight
        }
      })
    }, 1000 / 60)

    return () => clearInterval(gameLoop)
  }, [gamePhase, keys])

  // 재료 수집 체크
  useEffect(() => {
    if (gamePhase !== 'collecting') return

    ingredients.forEach((ing, index) => {
      if (!ing.collected) {
        const distance = Math.sqrt(
          Math.pow(player.x - ing.x, 2) + Math.pow(player.y - ing.y, 2)
        )
        
        if (distance < 50) {
          setIngredients(prev => prev.map((item, i) => 
            i === index ? { ...item, collected: true } : item
          ))
          
          // 모든 재료 수집 완료 시
          if (ingredients.filter(i => !i.collected).length === 1) {
            setTimeout(() => {
              setGamePhase('cooking')
              setShowMathModal(true)
            }, 500)
          }
        }
      }
    })
  }, [player, ingredients, gamePhase])

  // 답안 제출
  const handleSubmitAnswer = () => {
    if (!currentRecipe || mathAnswer === null) return

    const correct = mathAnswer === currentRecipe.mathProblem.correct
    setIsCorrect(correct)
    setShowResult(true)

    setTimeout(() => {
      if (correct) {
        const earnedScore = currentRecipe.scoreReward + (timeLeft * 10)
        setScore(earnedScore)
        setTotalScore(prev => prev + earnedScore)
        setGamePhase('completed')
      } else {
        setMathAnswer(null)
        setShowResult(false)
      }
    }, 2000)
  }

  // 다음 레벨
  const nextLevel = () => {
    const newLevel = currentLevel + 1
    setCurrentLevel(newLevel)
    
    // 난이도 증가
    if (newLevel % 3 === 0 && difficulty < 3) {
      setDifficulty(prev => Math.min(3, prev + 1) as 1 | 2 | 3)
    }
    
    startGame()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 relative overflow-hidden">
      {/* 배경 요소 */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['🍪', '🍰', '🍕', '🥧', '🧁'][Math.floor(Math.random() * 5)]}
          </motion.div>
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
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent">
              👨‍🍳 수학 레시피 👨‍🍳
            </h1>
            <p className="text-2xl mb-12 text-gray-700">
              재료를 모아서 맛있는 요리를 완성하세요!
            </p>

            {/* 난이도 선택 */}
            <div className="mb-12">
              <p className="text-lg mb-4 font-bold">난이도를 선택하세요:</p>
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
                        : 'bg-gray-400'
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
              className="px-12 py-6 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-2xl text-2xl font-bold shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 요리 시작!
            </motion.button>

            <div className="mt-12 text-gray-600">
              <p>← → 또는 A D: 이동 | Space 또는 ↑ 또는 W: 점프</p>
              <p>재료를 모두 모으고 문제를 풀어보세요!</p>
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
            <div className="text-8xl mb-6">😢</div>
            <h2 className="text-5xl font-bold mb-6 text-red-600">시간 초과!</h2>
            <p className="text-2xl mb-4">레벨: {currentLevel}</p>
            <p className="text-xl mb-8 text-gray-600">총 점수: {totalScore}</p>
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
            <Trophy className="w-32 h-32 mx-auto mb-8 text-yellow-500" />
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              🎉 요리 완성! 🎉
            </h2>
            <div className="text-6xl mb-4">{currentRecipe?.emoji}</div>
            <p className="text-3xl mb-4 font-bold">{currentRecipe?.name}</p>
            <p className="text-2xl mb-2">획득 점수: {score}</p>
            <p className="text-xl mb-8 text-gray-600">누적 점수: {totalScore + score}</p>
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
      ) : (
        // 게임 플레이 화면
        <div className="relative z-10 p-4">
          {/* 상단 UI */}
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl min-w-[250px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  <span className="font-bold">레벨 {currentLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold">{totalScore}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">남은 시간</span>
                </div>
                <span className={`text-lg font-bold ${timeLeft < 20 ? 'text-red-500 animate-pulse' : ''}`}>
                  {timeLeft}초
                </span>
              </div>

              {/* 진행률 */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">재료 수집</span>
                  <span className="text-sm font-bold">
                    {ingredients.filter(i => i.collected).length}/{ingredients.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    animate={{ width: `${(ingredients.filter(i => i.collected).length / ingredients.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 text-center shadow-xl">
                <div className="text-4xl mb-1">{currentRecipe?.emoji}</div>
                <p className="text-sm font-bold">{currentRecipe?.name}</p>
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

          {/* 게임 필드 */}
          <div className="relative h-[550px] bg-gradient-to-b from-sky-200 to-sky-100 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
            {/* 플랫폼 */}
            {platforms.map((platform, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-b from-green-600 to-green-800 rounded-lg shadow-lg"
                style={{
                  left: platform.x,
                  top: platform.y,
                  width: platform.width,
                  height: platform.height
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            ))}

            {/* 플레이어 */}
            <motion.div
              className="absolute bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-2xl"
              style={{
                left: player.x,
                top: player.y,
                width: player.width,
                height: player.height,
                transform: player.facingRight ? 'scaleX(1)' : 'scaleX(-1)'
              }}
              animate={{
                boxShadow: ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 40px rgba(59, 130, 246, 0.8)', '0 0 20px rgba(59, 130, 246, 0.5)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👨‍🍳
            </motion.div>

            {/* 재료 */}
            <AnimatePresence>
              {ingredients.map((ing, i) => !ing.collected && (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 flex flex-col items-center"
                  style={{ left: ing.x, top: ing.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -10, 0]
                  }}
                  exit={{ scale: 0, opacity: 0, rotate: 360 }}
                  transition={{
                    scale: { duration: 0.3 },
                    y: { duration: 2, repeat: Infinity }
                  }}
                >
                  <div className="text-4xl drop-shadow-lg">{ing.emoji}</div>
                  <div className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-full mt-1">
                    {ing.name}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 수학 문제 모달 */}
          <AnimatePresence>
            {showMathModal && currentRecipe && (
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
                  initial={{ scale: 0.5, y: 100 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.5, y: 100 }}
                >
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4">{currentRecipe.emoji}</div>
                    <h3 className="text-3xl font-bold text-white mb-2">{currentRecipe.name}</h3>
                    <p className="text-white/80">{currentRecipe.description}</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6">
                    <p className="text-sm text-white/80 mb-2">
                      난이도 {'⭐'.repeat(currentRecipe.mathProblem.difficulty)}
                    </p>
                    <h4 className="text-2xl font-bold mb-6 text-white text-center">
                      {currentRecipe.mathProblem.question}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {currentRecipe.mathProblem.options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => !showResult && setMathAnswer(index)}
                          disabled={showResult}
                          className={`px-6 py-4 rounded-xl text-lg font-bold transition-all ${
                            showResult
                              ? index === currentRecipe.mathProblem.correct
                                ? 'bg-green-600 text-white ring-4 ring-green-400'
                                : index === mathAnswer
                                ? 'bg-red-600 text-white ring-4 ring-red-400'
                                : 'bg-white/50 text-gray-600'
                              : mathAnswer === index
                              ? 'bg-white text-orange-600 ring-4 ring-white'
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
                      <p className="text-white text-center font-bold">
                        {currentRecipe.mathProblem.explanation}
                      </p>
                    </motion.div>
                  )}

                  {!showResult && (
                    <motion.button
                      onClick={handleSubmitAnswer}
                      disabled={mathAnswer === null}
                      className={`w-full px-8 py-4 rounded-xl text-xl font-bold ${
                        mathAnswer === null
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500'
                      }`}
                      whileHover={mathAnswer !== null ? { scale: 1.05 } : {}}
                      whileTap={mathAnswer !== null ? { scale: 0.95 } : {}}
                    >
                      답안 제출
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
