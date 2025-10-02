import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Shield, Heart, Zap, Crown, Skull, Gem, Star } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface Monster {
  id: string
  x: number
  y: number
  hp: number
  maxHp: number
  attack: number
  name: string
  emoji: string
  question: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }
}

interface Player {
  hp: number
  maxHp: number
  attack: number
  level: number
  exp: number
  gold: number
}

const monsters: Omit<Monster, 'id' | 'x' | 'y'>[] = [
  {
    hp: 30,
    maxHp: 30,
    attack: 5,
    name: "슬라임",
    emoji: "🟢",
    question: {
      question: "2 + 3 = ?",
      options: ["4", "5", "6", "7"],
      correct: 1,
      explanation: "2 + 3 = 5입니다!"
    }
  },
  {
    hp: 50,
    maxHp: 50,
    attack: 8,
    name: "고블린",
    emoji: "👹",
    question: {
      question: "7 × 4 = ?",
      options: ["24", "28", "32", "36"],
      correct: 1,
      explanation: "7 × 4 = 28입니다!"
    }
  },
  {
    hp: 80,
    maxHp: 80,
    attack: 12,
    name: "오크",
    emoji: "👹",
    question: {
      question: "15 - 8 = ?",
      options: ["6", "7", "8", "9"],
      correct: 1,
      explanation: "15 - 8 = 7입니다!"
    }
  },
  {
    hp: 120,
    maxHp: 120,
    attack: 18,
    name: "드래곤",
    emoji: "🐉",
    question: {
      question: "12 ÷ 3 = ?",
      options: ["3", "4", "5", "6"],
      correct: 1,
      explanation: "12 ÷ 3 = 4입니다!"
    }
  }
]

export function DungeonGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [player, setPlayer] = useState<Player>({
    hp: 100,
    maxHp: 100,
    attack: 20,
    level: 1,
    exp: 0,
    gold: 0
  })
  const [playerPos, setPlayerPos] = useState<Position>({ x: 400, y: 300 })
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [currentMonster, setCurrentMonster] = useState<Monster | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [floor, setFloor] = useState(1)

  // 몬스터 생성
  useEffect(() => {
    if (!gameStarted) return

    const newMonsters: Monster[] = []
    const monsterCount = Math.min(3 + floor, 6)
    
    for (let i = 0; i < monsterCount; i++) {
      const monsterData = monsters[Math.floor(Math.random() * monsters.length)]
      const x = 100 + (i % 3) * 200 + Math.random() * 100
      const y = 100 + Math.floor(i / 3) * 150 + Math.random() * 100
      
      newMonsters.push({
        ...monsterData,
        id: `monster-${i}`,
        x,
        y
      })
    }

    setMonsters(newMonsters)
  }, [gameStarted, floor])

  // 키보드 입력 처리
  useEffect(() => {
    if (!gameStarted || currentMonster) return

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
          checkMonsterCollision()
          break
      }

      setPlayerPos(newPos)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playerPos, gameStarted, currentMonster])

  // 몬스터 충돌 검사
  const checkMonsterCollision = useCallback(() => {
    monsters.forEach(monster => {
      if (monster.hp <= 0) return

      const distance = Math.sqrt(
        Math.pow(playerPos.x - monster.x, 2) + 
        Math.pow(playerPos.y - monster.y, 2)
      )

      if (distance < 60) {
        setCurrentMonster(monster)
        setShowQuestion(true)
      }
    })
  }, [playerPos, monsters])

  // 답안 선택
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
    
    if (answerIndex === currentMonster?.question.correct) {
      // 정답 - 몬스터에게 데미지
      const damage = player.attack + Math.floor(Math.random() * 10)
      const newHp = Math.max(0, currentMonster.hp - damage)
      
      setMonsters(prev => prev.map(m => 
        m.id === currentMonster.id ? { ...m, hp: newHp } : m
      ))
      
      if (newHp <= 0) {
        // 몬스터 처치
        const expGain = currentMonster.maxHp
        const goldGain = currentMonster.attack * 2
        
        setPlayer(prev => {
          const newExp = prev.exp + expGain
          const newLevel = Math.floor(newExp / 100) + 1
          const levelUp = newLevel > prev.level
          
          return {
            ...prev,
            exp: newExp,
            level: newLevel,
            gold: prev.gold + goldGain,
            maxHp: levelUp ? prev.maxHp + 20 : prev.maxHp,
            hp: levelUp ? prev.maxHp + 20 : prev.hp,
            attack: levelUp ? prev.attack + 5 : prev.attack
          }
        })
      } else {
        // 몬스터가 살아있으면 플레이어에게 데미지
        const damage = currentMonster.attack + Math.floor(Math.random() * 5)
        setPlayer(prev => {
          const newHp = Math.max(0, prev.hp - damage)
          if (newHp <= 0) {
            setGameOver(true)
          }
          return { ...prev, hp: newHp }
        })
      }
    } else {
      // 오답 - 플레이어에게 데미지
      const damage = (currentMonster?.attack || 0) + Math.floor(Math.random() * 10)
      setPlayer(prev => {
        const newHp = Math.max(0, prev.hp - damage)
        if (newHp <= 0) {
          setGameOver(true)
        }
        return { ...prev, hp: newHp }
      })
    }
  }

  // 전투 종료
  const endBattle = () => {
    setCurrentMonster(null)
    setShowQuestion(false)
    setShowAnswer(false)
    setSelectedAnswer(null)
    
    // 모든 몬스터가 처치되었는지 확인
    const aliveMonsters = monsters.filter(m => m.hp > 0)
    if (aliveMonsters.length === 0) {
      setVictory(true)
    }
  }

  // 다음 층으로
  const nextFloor = () => {
    setFloor(prev => prev + 1)
    setVictory(false)
    setPlayer(prev => ({ ...prev, hp: prev.maxHp })) // HP 회복
  }

  // 게임 시작
  const startGame = () => {
    setGameStarted(true)
    setPlayer({
      hp: 100,
      maxHp: 100,
      attack: 20,
      level: 1,
      exp: 0,
      gold: 0
    })
    setPlayerPos({ x: 400, y: 300 })
    setFloor(1)
    setGameOver(false)
    setVictory(false)
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* 던전 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        {/* 벽돌 패턴 */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-8 border border-gray-600"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 5}%`,
              }}
            />
          ))}
        </div>
        
        {/* 불꽃 효과 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/30 to-transparent">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                bottom: '0',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* UI 패널 */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-gray-800/90 to-purple-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl z-20 text-white border border-purple-500/30">
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="font-bold">{player.hp}/{player.maxHp}</span>
            {/* HP 바 */}
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sword className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">{player.attack}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-purple-400" />
            <span className="font-bold">Lv.{player.level}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="font-bold">{player.exp}/100</span>
            {/* EXP 바 */}
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                style={{ width: `${(player.exp % 100)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(player.exp % 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Gem className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">{player.gold}</span>
          </div>
          <div className="text-sm text-purple-300 font-bold bg-purple-600/30 px-2 py-1 rounded">
            {floor}층
          </div>
        </div>
      </div>

      {/* 게임 시작 화면 */}
      {!gameStarted && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h1 className="text-4xl font-bold text-purple-600 mb-4">
              🏰 수학 던전 탐험
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              몬스터를 만나면 수학 문제를 풀어서 처치하세요!
            </p>
            <div className="text-sm text-gray-500 mb-4">
              <p>방향키로 이동하고 스페이스바로 몬스터와 전투하세요!</p>
            </div>
            <motion.button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sword className="w-6 h-6 mr-2" />
              던전 입장
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 몬스터들 */}
      {monsters.map(monster => (
        <motion.div
          key={monster.id}
          className={`absolute w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-2xl ${
            monster.hp <= 0 ? 'opacity-30' : ''
          }`}
          style={{
            left: monster.x,
            top: monster.y,
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: monster.hp <= 0 ? 0.8 : 1,
            rotate: 0,
            y: monster.hp > 0 ? [monster.y, monster.y - 5, monster.y] : monster.y
          }}
          transition={{ 
            duration: 0.8,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* 몬스터 그림자 */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-black/30 rounded-full blur-sm"></div>
          
          {/* 몬스터 본체 */}
          <motion.div
            className={`w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden ${
              monster.hp <= 0 
                ? 'bg-gradient-to-br from-gray-400 to-gray-600' 
                : 'bg-gradient-to-br from-red-500 via-orange-500 to-red-600'
            }`}
            animate={monster.hp > 0 ? {
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* 몬스터 내부 그라데이션 */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            
            {/* 몬스터 아이콘 */}
            <div className="relative z-10 drop-shadow-lg">
              {monster.emoji}
            </div>
            
            {/* 몬스터 눈빛 효과 */}
            {monster.hp > 0 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
          
          {/* HP 바 */}
          {monster.hp > 0 && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                style={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
                initial={{ width: '100%' }}
                animate={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
          
          {/* 몬스터 이름 */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold bg-black/50 px-2 py-1 rounded">
            {monster.name}
          </div>
        </motion.div>
      ))}

      {/* 플레이어 */}
      <motion.div
        className="absolute w-16 h-16 z-10"
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
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-black/30 rounded-full blur-sm"></div>
        
        {/* 플레이어 본체 */}
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-blue-400 via-blue-600 to-purple-700 rounded-full border-3 border-white shadow-2xl relative overflow-hidden flex items-center justify-center"
          animate={{
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* 플레이어 내부 그라데이션 */}
          <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
          
          {/* 플레이어 아이콘 */}
          <div className="relative z-10 text-3xl drop-shadow-lg">
            ⚔️
          </div>
          
          {/* 반짝이는 효과 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
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

      {/* 전투 모달 */}
      {currentMonster && showQuestion && (
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
              <div className="text-6xl mb-2">{currentMonster.emoji}</div>
              <h2 className="text-2xl font-bold text-gray-800">{currentMonster.name}</h2>
              <div className="text-sm text-gray-600">HP: {currentMonster.hp}/{currentMonster.maxHp}</div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {currentMonster.question.question}
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentMonster.question.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`p-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    showAnswer 
                      ? index === currentMonster.question.correct 
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
                  {currentMonster.question.explanation}
                </p>
              </motion.div>
            )}

            <motion.button
              onClick={endBattle}
              className="w-full bg-gray-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAnswer ? '계속하기' : '도망가기'}
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
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">승리!</h2>
            <p className="text-xl text-gray-600 mb-6">{floor}층 클리어!</p>
            <motion.button
              onClick={nextFloor}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              다음 층으로
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
            <Skull className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">게임 오버!</h2>
            <p className="text-xl text-gray-600 mb-6">최종 레벨: {player.level}</p>
            <motion.button
              onClick={() => {
                setGameStarted(false)
                setGameOver(false)
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              다시 시작
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 조작법 안내 */}
      {gameStarted && !currentMonster && (
        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-lg text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gray-600 rounded text-xs flex items-center justify-center">←→↑↓</div>
              <span>이동</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gray-600 rounded text-xs flex items-center justify-center">스페이스</div>
              <span>전투</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
