import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChefHat, Star, Clock, Target } from 'lucide-react'

interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string
  collected: boolean
  x: number
  y: number
}

interface Recipe {
  id: string
  name: string
  ingredients: Ingredient[]
  mathProblem: string
  answer: number
}

interface Player {
  x: number
  y: number
  width: number
  height: number
  velocityY: number
  onGround: boolean
}

export function PlatformerCookingGame() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'completed' | 'failed'>('playing')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null)
  const [player, setPlayer] = useState<Player>({
    x: 50,
    y: 300,
    width: 40,
    height: 40,
    velocityY: 0,
    onGround: false
  })
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [showMathModal, setShowMathModal] = useState(false)
  const [mathAnswer, setMathAnswer] = useState('')
  const [mathResult, setMathResult] = useState<'correct' | 'incorrect' | null>(null)

  // 레시피 데이터
  const recipes: Recipe[] = [
    {
      id: '1',
      name: '수학 쿠키',
      ingredients: [
        { id: '1', name: '밀가루', amount: 2, unit: '컵', collected: false, x: 200, y: 250 },
        { id: '2', name: '설탕', amount: 1, unit: '컵', collected: false, x: 400, y: 200 },
        { id: '3', name: '버터', amount: 3, unit: '큰술', collected: false, x: 600, y: 300 }
      ],
      mathProblem: '2 + 1 + 3 = ?',
      answer: 6
    },
    {
      id: '2',
      name: '수학 파이',
      ingredients: [
        { id: '4', name: '사과', amount: 4, unit: '개', collected: false, x: 300, y: 180 },
        { id: '5', name: '시나몬', amount: 2, unit: '작은술', collected: false, x: 500, y: 250 },
        { id: '6', name: '반죽', amount: 1, unit: '장', collected: false, x: 700, y: 200 }
      ],
      mathProblem: '4 × 2 + 1 = ?',
      answer: 9
    }
  ]

  // 게임 초기화
  useEffect(() => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    setCurrentRecipe(randomRecipe)
    setIngredients([...randomRecipe.ingredients])
  }, [])

  // 타이머
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameState('failed')
    }
  }, [timeLeft, gameState])

  // 키보드 입력 상태
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})

  // 키보드 이벤트 핸들러
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

  // 플레이어 물리
  useEffect(() => {
    if (gameState !== 'playing') return

    const gravity = 0.8
    const jumpPower = -15
    const moveSpeed = 5

    const gameLoop = () => {
      setPlayer(prev => {
        let newY = prev.y + prev.velocityY
        let newVelocityY = prev.velocityY + gravity
        let newOnGround = false

        // 바닥 충돌
        if (newY >= 300) {
          newY = 300
          newVelocityY = 0
          newOnGround = true
        }

        // 점프
        if (keys[' '] && prev.onGround) {
          newVelocityY = jumpPower
        }

        // 좌우 이동
        let newX = prev.x
        if (keys['ArrowLeft'] || keys['a']) {
          newX = Math.max(0, prev.x - moveSpeed)
        }
        if (keys['ArrowRight'] || keys['d']) {
          newX = Math.min(760, prev.x + moveSpeed)
        }

        return {
          ...prev,
          x: newX,
          y: newY,
          velocityY: newVelocityY,
          onGround: newOnGround
        }
      })
    }

    const interval = setInterval(gameLoop, 16)

    return () => {
      clearInterval(interval)
    }
  }, [gameState, keys])

  // 재료 수집 체크
  useEffect(() => {
    const checkCollection = () => {
      setIngredients(prev => {
        return prev.map(ingredient => {
          const distance = Math.sqrt(
            Math.pow(player.x - ingredient.x, 2) + Math.pow(player.y - ingredient.y, 2)
          )
          
          if (distance < 50 && !ingredient.collected) {
            setScore(prev => prev + 10)
            return { ...ingredient, collected: true }
          }
          return ingredient
        })
      })
    }

    if (gameState === 'playing') {
      checkCollection()
    }
  }, [player.x, player.y, gameState])

  // 모든 재료 수집 완료 체크
  useEffect(() => {
    if (ingredients.length > 0 && ingredients.every(ing => ing.collected)) {
      setShowMathModal(true)
    }
  }, [ingredients])

  const handleMathSubmit = () => {
    const userAnswer = parseInt(mathAnswer)
    if (userAnswer === currentRecipe?.answer) {
      setMathResult('correct')
      setScore(prev => prev + 50)
      setTimeout(() => {
        setGameState('completed')
      }, 1500)
    } else {
      setMathResult('incorrect')
      setTimeout(() => {
        setMathResult(null)
        setMathAnswer('')
      }, 1500)
    }
  }

  const resetGame = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    setCurrentRecipe(randomRecipe)
    setIngredients([...randomRecipe.ingredients])
    setPlayer({
      x: 50,
      y: 300,
      width: 40,
      height: 40,
      velocityY: 0,
      onGround: false
    })
    setScore(0)
    setTimeLeft(60)
    setGameState('playing')
    setShowMathModal(false)
    setMathAnswer('')
    setMathResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 relative overflow-hidden">
      {/* 상단 UI */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <motion.button
          onClick={() => navigate('/')}
          className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </motion.button>

        <div className="flex items-center space-x-6 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-gray-700">{score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-gray-700">{timeLeft}s</span>
          </div>
          <div className="flex items-center space-x-2">
            <ChefHat className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-gray-700">{currentRecipe?.name}</span>
          </div>
        </div>
      </div>

      {/* 게임 화면 */}
      <div className="relative w-full h-screen">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-green-200">
          {/* 구름 */}
          <div className="absolute top-20 left-20 w-16 h-8 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-32 right-32 w-20 h-10 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-16 right-64 w-12 h-6 bg-white rounded-full opacity-60"></div>
        </div>

        {/* 바닥 */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-600 to-green-400"></div>

        {/* 플랫폼들 */}
        <div className="absolute bottom-32 left-0 w-full h-4 bg-yellow-600"></div>
        <div className="absolute bottom-48 left-200 w-32 h-4 bg-yellow-600"></div>
        <div className="absolute bottom-64 left-400 w-32 h-4 bg-yellow-600"></div>
        <div className="absolute bottom-48 left-600 w-32 h-4 bg-yellow-600"></div>

        {/* 플레이어 */}
        <motion.div
          className="absolute w-10 h-10 bg-blue-500 rounded-full shadow-lg"
          style={{
            left: player.x,
            bottom: 400 - player.y,
          }}
          animate={{
            scale: player.onGround ? 1 : 1.1,
          }}
          transition={{ duration: 0.1 }}
        />

        {/* 재료들 */}
        <AnimatePresence>
          {ingredients.map((ingredient) => (
            !ingredient.collected && (
              <motion.div
                key={ingredient.id}
                className="absolute w-8 h-8 bg-orange-400 rounded-full shadow-lg flex items-center justify-center"
                style={{
                  left: ingredient.x,
                  bottom: 400 - ingredient.y,
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                exit={{ scale: 0 }}
                transition={{ 
                  duration: 0.3,
                  y: { repeat: Infinity, duration: 2 }
                }}
              >
                <span className="text-white text-xs font-bold">
                  {ingredient.amount}
                </span>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* 수학 문제 모달 */}
        <AnimatePresence>
          {showMathModal && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <div className="text-center">
                  <ChefHat className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {currentRecipe?.name} 완성!
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {currentRecipe?.mathProblem}
                  </p>
                  
                  <div className="mb-6">
                    <input
                      type="number"
                      value={mathAnswer}
                      onChange={(e) => setMathAnswer(e.target.value)}
                      className="w-full p-4 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                      placeholder="답을 입력하세요"
                      autoFocus
                    />
                  </div>

                  <motion.button
                    onClick={handleMathSubmit}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    확인
                  </motion.button>

                  {mathResult && (
                    <motion.div
                      className={`mt-4 p-4 rounded-xl font-bold ${
                        mathResult === 'correct' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {mathResult === 'correct' ? '정답입니다! 🎉' : '틀렸습니다. 다시 시도해보세요!'}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 게임 완료/실패 모달 */}
        <AnimatePresence>
          {(gameState === 'completed' || gameState === 'failed') && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                {gameState === 'completed' ? (
                  <>
                    <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">레시피 완성! 🎉</h2>
                    <p className="text-lg text-gray-600 mb-6">최종 점수: {score}점</p>
                  </>
                ) : (
                  <>
                    <Clock className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">시간 초과!</h2>
                    <p className="text-lg text-gray-600 mb-6">최종 점수: {score}점</p>
                  </>
                )}
                
                <div className="flex space-x-4">
                  <motion.button
                    onClick={resetGame}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    다시 플레이
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    홈으로
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 조작법 안내 */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="text-sm text-gray-600">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold">스페이스바:</span>
            <span>점프</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">←→:</span>
            <span>이동</span>
          </div>
        </div>
      </div>
    </div>
  )
}
