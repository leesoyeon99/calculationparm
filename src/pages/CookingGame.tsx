import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Clock, Star, Flame, Timer, CheckCircle, ArrowLeft } from 'lucide-react'

interface Recipe {
  id: string
  name: string
  emoji: string
  ingredients: {
    name: string
    amount: number
    unit: string
  }[]
  timeLimit: number
  questions: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }[]
}

const recipes: Recipe[] = [
  {
    id: '1',
    name: '스파게티',
    emoji: '🍝',
    ingredients: [
      { name: '파스타', amount: 200, unit: 'g' },
      { name: '토마토', amount: 3, unit: '개' },
      { name: '양파', amount: 1, unit: '개' },
      { name: '마늘', amount: 2, unit: '쪽' }
    ],
    timeLimit: 30,
    questions: [
      {
        question: '파스타 200g에 토마토 3개를 더하면 총 몇 개인가요?',
        options: ['203개', '200개', '3개', '계산할 수 없음'],
        correct: 3,
        explanation: '파스타는 g 단위, 토마토는 개 단위로 서로 다른 단위입니다!'
      },
      {
        question: '양파 1개와 마늘 2쪽을 더하면 총 몇 개인가요?',
        options: ['3개', '2개', '1개', '계산할 수 없음'],
        correct: 0,
        explanation: '양파 1개 + 마늘 2쪽 = 3개입니다!'
      }
    ]
  },
  {
    id: '2',
    name: '피자',
    emoji: '🍕',
    ingredients: [
      { name: '밀가루', amount: 300, unit: 'g' },
      { name: '치즈', amount: 150, unit: 'g' },
      { name: '토핑', amount: 5, unit: '종류' },
      { name: '토마토소스', amount: 100, unit: 'ml' }
    ],
    timeLimit: 45,
    questions: [
      {
        question: '밀가루 300g에 치즈 150g을 더하면 총 몇 g인가요?',
        options: ['450g', '300g', '150g', '450ml'],
        correct: 0,
        explanation: '300g + 150g = 450g입니다!'
      },
      {
        question: '토핑 5종류에 토마토소스 100ml를 더하면?',
        options: ['계산할 수 없음', '105', '5종류', '100ml'],
        correct: 0,
        explanation: '종류와 ml는 서로 다른 단위로 더할 수 없습니다!'
      }
    ]
  },
  {
    id: '3',
    name: '케이크',
    emoji: '🎂',
    ingredients: [
      { name: '밀가루', amount: 250, unit: 'g' },
      { name: '설탕', amount: 200, unit: 'g' },
      { name: '계란', amount: 3, unit: '개' },
      { name: '버터', amount: 100, unit: 'g' }
    ],
    timeLimit: 60,
    questions: [
      {
        question: '밀가루 250g에 설탕 200g을 더하면 총 몇 g인가요?',
        options: ['450g', '250g', '200g', '50g'],
        correct: 0,
        explanation: '250g + 200g = 450g입니다!'
      },
      {
        question: '계란 3개에 버터 100g을 더하면?',
        options: ['계산할 수 없음', '103', '3개', '100g'],
        correct: 0,
        explanation: '개와 g는 서로 다른 단위로 더할 수 없습니다!'
      }
    ]
  }
]

export function CookingGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [level, setLevel] = useState(1)

  // 타이머
  useEffect(() => {
    if (!gameStarted || !currentRecipe || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          setGameStarted(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, currentRecipe, timeLeft])

  // 답안 선택
  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentRecipe || !currentRecipe.questions[currentQuestion]) return
    
    setSelectedAnswer(answerIndex)
    
    // 점수 계산
    if (answerIndex === currentRecipe.questions[currentQuestion].correct) {
      setScore(prev => prev + 10)
    } else {
      setScore(prev => Math.max(0, prev - 5))
    }
    
    // 2초 후에 정답 표시
    setTimeout(() => {
      setShowAnswer(true)
    }, 2000)
  }

  // 다음 문제 또는 완료
  const nextQuestion = () => {
    if (!currentRecipe) return
    
    if (currentQuestion < currentRecipe.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setShowAnswer(false)
      setSelectedAnswer(null)
    } else {
      setVictory(true)
    }
  }

  // 게임 시작
  const startGame = () => {
    const recipe = recipes[Math.floor(Math.random() * recipes.length)]
    
    setGameOver(false)
    setVictory(false)
    setShowAnswer(false)
    setSelectedAnswer(null)
    setCurrentQuestion(0)
    setScore(0)
    setCurrentRecipe(recipe)
    setTimeLeft(recipe.timeLimit)
    setGameStarted(true)
  }

  // 다음 레벨
  const nextLevel = () => {
    setLevel(prev => prev + 1)
    setVictory(false)
    startGame()
  }

  // 게임 재시작
  const restartGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setVictory(false)
    setLevel(1)
    setScore(0)
    setCurrentRecipe(null)
    setCurrentQuestion(0)
    setTimeLeft(0)
    setShowAnswer(false)
    setSelectedAnswer(null)
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* 주방 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-red-200 to-pink-200">
        {/* 타일 패턴 */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 border border-orange-300"
              style={{
                left: `${(i % 20) * 5}%`,
                top: `${Math.floor(i / 20) * 5}%`,
              }}
            />
          ))}
        </div>
        
        {/* 증기 효과 */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 bg-white/30 rounded-full blur-sm"
              style={{
                left: `${15 + i * 15}%`,
                top: '0',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* UI 패널 */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl z-20 border border-orange-300/30">
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="font-bold text-white text-lg">{score}점</span>
          </div>
          <div className="flex items-center space-x-2">
            <ChefHat className="w-5 h-5 text-orange-300" />
            <span className="font-bold text-white">레벨 {level}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-red-300" />
          <span className="font-bold text-red-200 text-lg">{Math.max(0, Math.round(timeLeft))}초</span>
          {/* 타이머 바 */}
          <div className="w-20 h-2 bg-white/30 rounded-full overflow-hidden ml-2">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
              style={{ 
                width: `${Math.max(0, Math.min(100, (timeLeft / (currentRecipe?.timeLimit || 60)) * 100))}%` 
              }}
              initial={{ width: '100%' }}
              animate={{ 
                width: `${Math.max(0, Math.min(100, (timeLeft / (currentRecipe?.timeLimit || 60)) * 100))}%` 
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
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
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              👨‍🍳 수학 요리 게임
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              레시피에 따라 재료를 계산하고 요리를 완성하세요!
            </p>
            <motion.button
              onClick={startGame}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChefHat className="w-6 h-6 mr-2" />
              요리 시작
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 요리 화면 */}
      {gameStarted && currentRecipe && currentRecipe.questions && currentRecipe.questions[currentQuestion] && (
        <div className="flex h-full">
          {/* 레시피 카드 */}
          <motion.div
            className="w-1/3 bg-gradient-to-br from-white/95 to-orange-50/95 backdrop-blur-md p-6 shadow-2xl border border-orange-200"
            initial={{ x: -300, rotate: -5 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="text-center mb-6"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-6xl mb-2">{currentRecipe.emoji}</div>
              <h2 className="text-2xl font-bold text-gray-800">{currentRecipe.name}</h2>
            </motion.div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-orange-500" />
                재료:
              </h3>
              {currentRecipe.ingredients && currentRecipe.ingredients.map((ingredient, index) => (
                <motion.div 
                  key={index} 
                  className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-xl border border-orange-200 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-medium text-gray-700">{ingredient.name}</span>
                  <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                    {ingredient.amount}{ingredient.unit}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-300"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center text-orange-700">
                <Clock className="w-5 h-5 mr-2 animate-pulse" />
                <span className="font-bold">제한시간: {currentRecipe.timeLimit}초</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 문제 영역 */}
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  문제 {currentQuestion + 1}/{currentRecipe.questions.length}
                </h3>
                <p className="text-lg text-gray-600">
                  {currentRecipe.questions[currentQuestion].question}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currentRecipe.questions[currentQuestion].options && currentRecipe.questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      showAnswer 
                        ? index === currentRecipe.questions[currentQuestion].correct 
                          ? 'bg-green-500 text-white' 
                          : selectedAnswer === index 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        : selectedAnswer === index
                          ? 'bg-orange-600 text-white scale-105 shadow-lg'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showAnswer}
                    whileHover={{ scale: showAnswer ? 1 : 1.05 }}
                    whileTap={{ scale: showAnswer ? 1 : 0.95 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {showAnswer && (
                <motion.div
                  className="mb-6 p-4 bg-blue-50 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-lg font-semibold text-blue-800 text-center">
                    {currentRecipe.questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}

              {showAnswer && (
                <motion.button
                  onClick={nextQuestion}
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {currentQuestion < currentRecipe.questions.length - 1 ? '다음 문제' : '완료'}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* 승리 화면 */}
      {victory && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">{currentRecipe?.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">요리 완성!</h2>
            <p className="text-xl text-gray-600 mb-2">{currentRecipe?.name}을(를) 완성했습니다!</p>
            <p className="text-lg text-orange-600 mb-6">획득 점수: {score}점</p>
            <div className="flex space-x-4">
              <motion.button
                onClick={nextLevel}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다음 레벨
              </motion.button>
              <motion.button
                onClick={restartGame}
                className="bg-gray-500 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다시 시작
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 게임 오버 화면 */}
      {gameOver && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
          >
            <Flame className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">시간 초과!</h2>
            <p className="text-xl text-gray-600 mb-6">요리가 타버렸습니다! 🔥</p>
            <motion.button
              onClick={restartGame}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              다시 시도
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}