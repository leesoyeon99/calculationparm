import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Shield, Heart, Zap, Crown, Skull, Gem, Star, ArrowLeft, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getRandomQuestion, DungeonQuestion } from '../data/dungeonQuestions'
import { getMonstersForFloor, MonsterType } from '../data/dungeonMonsters'

interface Position {
  x: number
  y: number
}

interface Monster extends MonsterType {
  id: string
  x: number
  y: number
  question: DungeonQuestion
}

interface Player {
  hp: number
  maxHp: number
  attack: number
  defense: number
  level: number
  exp: number
  maxExp: number
  gold: number
}

interface Skill {
  name: string
  icon: string
  description: string
  damage: number
  cooldown: number
  currentCooldown: number
}

export function DungeonGame() {
  const navigate = useNavigate()
  const [gameStarted, setGameStarted] = useState(false)
  const [player, setPlayer] = useState<Player>({
    hp: 100,
    maxHp: 100,
    attack: 20,
    defense: 5,
    level: 1,
    exp: 0,
    maxExp: 100,
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
  const [playerGrade, setPlayerGrade] = useState<1 | 2 | 3 | 4 | 5 | 6>(3) // 기본 3학년
  const [comboCount, setComboCount] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)

  // 스킬 시스템
  const [skills, setSkills] = useState<Skill[]>([
    {
      name: '강타',
      icon: '⚔️',
      description: '2배 데미지',
      damage: 2,
      cooldown: 3,
      currentCooldown: 0
    },
    {
      name: '회복',
      icon: '💚',
      description: 'HP 30 회복',
      damage: -30,
      cooldown: 5,
      currentCooldown: 0
    }
  ])

  // 몬스터 생성
  useEffect(() => {
    if (!gameStarted) return

    const monsterTypes = getMonstersForFloor(floor)
    const newMonsters: Monster[] = []
    
    monsterTypes.forEach((monsterType, i) => {
      const x = 100 + (i % 3) * 250 + Math.random() * 80
      const y = 100 + Math.floor(i / 3) * 180 + Math.random() * 80
      
      // 몬스터 난이도에 맞는 문제 가져오기
      const question = getRandomQuestion(playerGrade, monsterType.difficulty)
      
      newMonsters.push({
        ...monsterType,
        id: `monster-${floor}-${i}`,
        x,
        y,
        question
      })
    })

    setMonsters(newMonsters)
  }, [gameStarted, floor, playerGrade])

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
        default:
          return
      }

      setPlayerPos(newPos)
      checkMonsterCollision(newPos)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, playerPos, currentMonster, monsters])

  // 몬스터 충돌 체크
  const checkMonsterCollision = (pos: Position) => {
    monsters.forEach(monster => {
      const distance = Math.sqrt(
        Math.pow(pos.x - monster.x, 2) + Math.pow(pos.y - monster.y, 2)
      )
      
      if (distance < 50 && !currentMonster) {
        setCurrentMonster(monster)
        setShowQuestion(true)
      }
    })
  }

  // 답변 제출
  const handleAnswer = (answerIndex: number) => {
    if (!currentMonster) return
    
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)

    const isCorrect = answerIndex === currentMonster.question.correct
    
    setTimeout(() => {
      if (isCorrect) {
        handleCorrectAnswer()
      } else {
        handleWrongAnswer()
      }
      
      setShowAnswer(false)
      setSelectedAnswer(null)
    }, 2000)
  }

  // 정답 처리
  const handleCorrectAnswer = () => {
    if (!currentMonster) return

    // 콤보 증가
    const newCombo = comboCount + 1
    setComboCount(newCombo)

    // 데미지 계산 (방어력 적용)
    const baseDamage = player.attack + (newCombo * 5) // 콤보 보너스
    const actualDamage = Math.max(1, baseDamage - currentMonster.defense)
    
    const newMonsterHp = currentMonster.hp - actualDamage

    if (newMonsterHp <= 0) {
      // 몬스터 처치
      handleMonsterDefeated()
    } else {
      // 몬스터 HP 감소
      setMonsters(prev => prev.map(m => 
        m.id === currentMonster.id ? { ...m, hp: newMonsterHp } : m
      ))
      setCurrentMonster(prev => prev ? { ...prev, hp: newMonsterHp } : null)
      setShowQuestion(false)
      setCurrentMonster(null)
    }
  }

  // 오답 처리
  const handleWrongAnswer = () => {
    if (!currentMonster) return

    // 콤보 초기화
    setComboCount(0)

    // 플레이어가 데미지 받음 (방어력 적용)
    const monsterDamage = currentMonster.attack
    const actualDamage = Math.max(1, monsterDamage - player.defense)
    const newPlayerHp = player.hp - actualDamage

    if (newPlayerHp <= 0) {
      setGameOver(true)
    } else {
      setPlayer(prev => ({ ...prev, hp: newPlayerHp }))
    }

    setShowQuestion(false)
    setCurrentMonster(null)
  }

  // 몬스터 처치
  const handleMonsterDefeated = () => {
    if (!currentMonster) return

    // 보상 획득
    const expGain = currentMonster.expReward * (1 + comboCount * 0.1) // 콤보 보너스
    const goldGain = currentMonster.goldReward

    const newExp = player.exp + expGain
    const newGold = player.gold + goldGain

    // 레벨업 체크
    if (newExp >= player.maxExp) {
      levelUp(newExp)
    } else {
      setPlayer(prev => ({ ...prev, exp: newExp, gold: newGold }))
    }

    // 몬스터 제거
    setMonsters(prev => prev.filter(m => m.id !== currentMonster.id))
    setShowQuestion(false)
    setCurrentMonster(null)

    // 모든 몬스터 처치 시 다음 층으로
    if (monsters.length === 1) {
      setTimeout(() => {
        nextFloor()
      }, 1000)
    }
  }

  // 레벨업
  const levelUp = (currentExp: number) => {
    const newLevel = player.level + 1
    const remainingExp = currentExp - player.maxExp
    const newMaxExp = player.maxExp + 50

    setPlayer(prev => ({
      ...prev,
      level: newLevel,
      exp: remainingExp,
      maxExp: newMaxExp,
      maxHp: prev.maxHp + 20,
      hp: prev.maxHp + 20, // 레벨업 시 HP 전체 회복
      attack: prev.attack + 5,
      defense: prev.defense + 2
    }))

    setShowLevelUp(true)
    setTimeout(() => setShowLevelUp(false), 2000)
  }

  // 다음 층으로
  const nextFloor = () => {
    const newFloor = floor + 1
    setFloor(newFloor)
    
    // 플레이어 위치 초기화
    setPlayerPos({ x: 400, y: 300 })
    
    // 콤보 초기화
    setComboCount(0)

    // 10층 클리어 시 승리
    if (newFloor > 10) {
      setVictory(true)
    }
  }

  // 게임 시작
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setVictory(false)
    setFloor(1)
    setPlayer({
      hp: 100,
      maxHp: 100,
      attack: 20,
      defense: 5,
      level: 1,
      exp: 0,
      maxExp: 100,
      gold: 0
    })
    setPlayerPos({ x: 400, y: 300 })
    setComboCount(0)
  }

  // 스킬 사용
  const useSkill = (skillIndex: number) => {
    const skill = skills[skillIndex]
    if (skill.currentCooldown > 0 || !currentMonster) return

    if (skill.name === '강타') {
      // 2배 데미지
      const damage = player.attack * skill.damage
      const actualDamage = Math.max(1, damage - currentMonster.defense)
      const newMonsterHp = currentMonster.hp - actualDamage
      
      if (newMonsterHp <= 0) {
        handleMonsterDefeated()
      } else {
        setMonsters(prev => prev.map(m => 
          m.id === currentMonster.id ? { ...m, hp: newMonsterHp } : m
        ))
        setCurrentMonster(prev => prev ? { ...prev, hp: newMonsterHp } : null)
      }
    } else if (skill.name === '회복') {
      // HP 회복
      const newHp = Math.min(player.maxHp, player.hp + Math.abs(skill.damage))
      setPlayer(prev => ({ ...prev, hp: newHp }))
    }

    // 쿨다운 설정
    setSkills(prev => prev.map((s, i) => 
      i === skillIndex ? { ...s, currentCooldown: s.cooldown } : s
    ))
  }

  // 쿨다운 감소
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills(prev => prev.map(s => ({
        ...s,
        currentCooldown: Math.max(0, s.currentCooldown - 1)
      })))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {!gameStarted ? (
        // 시작 화면
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              ⚔️ 수학 던전 ⚔️
            </h1>
            <p className="text-2xl mb-12 text-gray-300">
              수학 문제를 풀고 몬스터를 물리치세요!
            </p>

            {/* 학년 선택 */}
            <div className="mb-12">
              <p className="text-lg mb-4">학년을 선택하세요:</p>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5, 6].map(grade => (
                  <motion.button
                    key={grade}
                    onClick={() => setPlayerGrade(grade as 1 | 2 | 3 | 4 | 5 | 6)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      playerGrade === grade
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white scale-110'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {grade}학년
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={startGame}
              className="px-12 py-6 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-red-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 게임 시작
            </motion.button>

            <div className="mt-12 text-gray-400">
              <p>방향키로 이동 • 몬스터에 접근해 전투 시작</p>
              <p>10층을 클리어하면 승리!</p>
            </div>
          </motion.div>
        </div>
      ) : gameOver ? (
        // 게임 오버 화면
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Skull className="w-32 h-32 mx-auto mb-8 text-red-500" />
            <h2 className="text-5xl font-bold mb-6 text-red-500">게임 오버</h2>
            <p className="text-2xl mb-4">도달한 층: {floor}층</p>
            <p className="text-xl mb-8 text-gray-400">획득한 골드: {player.gold}</p>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다시 도전
              </motion.button>
              <motion.button
                onClick={() => navigate('/game-hub')}
                className="px-8 py-4 bg-gray-700 rounded-xl text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                나가기
              </motion.button>
            </div>
          </motion.div>
        </div>
      ) : victory ? (
        // 승리 화면
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Trophy className="w-32 h-32 mx-auto mb-8 text-yellow-400" />
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🎉 승리! 🎉
            </h2>
            <p className="text-2xl mb-4">던전 정복 완료!</p>
            <p className="text-xl mb-2">최종 레벨: Lv.{player.level}</p>
            <p className="text-xl mb-8 text-yellow-400">획득 골드: {player.gold}</p>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다시 플레이
              </motion.button>
              <motion.button
                onClick={() => navigate('/game-hub')}
                className="px-8 py-4 bg-gray-700 rounded-xl text-xl font-bold"
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
            {/* 왼쪽: 플레이어 정보 */}
            <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 space-y-2 min-w-[300px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">Lv.{player.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gem className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">{player.gold}</span>
                </div>
              </div>
              
              {/* HP */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">HP</span>
                  </div>
                  <span className="text-sm">{player.hp}/{player.maxHp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* EXP */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">EXP</span>
                  </div>
                  <span className="text-sm">{Math.floor(player.exp)}/{player.maxExp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                    animate={{ width: `${(player.exp / player.maxExp) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* 스탯 */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Sword className="w-4 h-4 text-orange-400" />
                  <span>공격: {player.attack}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>방어: {player.defense}</span>
                </div>
              </div>

              {/* 콤보 */}
              {comboCount > 0 && (
                <motion.div
                  className="text-center py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  🔥 {comboCount} COMBO! 🔥
                </motion.div>
              )}
            </div>

            {/* 오른쪽: 층 정보 & 나가기 */}
            <div className="space-y-2">
              <div className="bg-black/50 backdrop-blur-md rounded-2xl px-6 py-3 text-center">
                <p className="text-sm text-gray-400">현재 층</p>
                <p className="text-3xl font-bold text-yellow-400">{floor}F</p>
                {floor % 5 === 0 && (
                  <p className="text-xs text-red-400 font-bold mt-1">⚠️ 보스층 ⚠️</p>
                )}
              </div>
              
              <motion.button
                onClick={() => navigate('/game-hub')}
                className="w-full px-4 py-2 bg-gray-700 rounded-xl flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>나가기</span>
              </motion.button>
            </div>
          </div>

          {/* 게임 필드 */}
          <div className="relative min-h-[600px] bg-black/30 rounded-3xl p-4">
            {/* 플레이어 */}
            <motion.div
              className="absolute w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-2xl cursor-pointer"
              style={{ left: playerPos.x, top: playerPos.y }}
              animate={{
                boxShadow: ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 40px rgba(59, 130, 246, 0.8)', '0 0 20px rgba(59, 130, 246, 0.5)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧙‍♂️
            </motion.div>

            {/* 몬스터들 */}
            <AnimatePresence>
              {monsters.map(monster => (
                <motion.div
                  key={monster.id}
                  className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center text-3xl shadow-2xl ${
                    monster.isBoss ? 'ring-4 ring-red-500' : ''
                  }`}
                  style={{ 
                    left: monster.x, 
                    top: monster.y,
                    background: monster.isBoss 
                      ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
                      : 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -10, 0]
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    scale: { duration: 0.3 },
                    y: { duration: 2, repeat: Infinity }
                  }}
                >
                  <span>{monster.emoji}</span>
                  {monster.isBoss && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Crown className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="text-xs font-bold text-white">{monster.name}</div>
                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                      <div
                        className={`${monster.isBoss ? 'bg-red-500' : 'bg-green-500'} h-1 rounded-full transition-all`}
                        style={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 수학 문제 모달 */}
          <AnimatePresence>
            {showQuestion && currentMonster && (
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
                  initial={{ scale: 0.5, y: 100 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.5, y: 100 }}
                >
                  {/* 몬스터 정보 */}
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">{currentMonster.emoji}</div>
                    <h3 className="text-2xl font-bold mb-2">{currentMonster.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{currentMonster.description}</p>
                    
                    {/* 몬스터 HP */}
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>{currentMonster.hp}/{currentMonster.maxHp}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 max-w-xs mx-auto">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all"
                        style={{ width: `${(currentMonster.hp / currentMonster.maxHp) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* 문제 */}
                  <div className="bg-white/10 rounded-2xl p-6 mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      난이도 {'⭐'.repeat(currentMonster.question.difficulty)}
                    </p>
                    <h4 className="text-2xl font-bold mb-4 text-center">
                      {currentMonster.question.question}
                    </h4>
                    
                    {/* 선택지 */}
                    <div className="grid grid-cols-2 gap-3">
                      {currentMonster.question.options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => !showAnswer && handleAnswer(index)}
                          disabled={showAnswer}
                          className={`px-6 py-4 rounded-xl text-lg font-bold transition-all ${
                            showAnswer
                              ? index === currentMonster.question.correct
                                ? 'bg-green-600 ring-4 ring-green-400'
                                : index === selectedAnswer
                                ? 'bg-red-600 ring-4 ring-red-400'
                                : 'bg-gray-700 opacity-50'
                              : 'bg-purple-700 hover:bg-purple-600'
                          }`}
                          whileHover={!showAnswer ? { scale: 1.05 } : {}}
                          whileTap={!showAnswer ? { scale: 0.95 } : {}}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* 설명 (정답 후) */}
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        className={`p-4 rounded-xl ${
                          selectedAnswer === currentMonster.question.correct
                            ? 'bg-green-600/30'
                            : 'bg-red-600/30'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-center">{currentMonster.question.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 스킬 버튼 */}
                  <div className="mt-6 flex gap-3">
                    {skills.map((skill, index) => (
                      <motion.button
                        key={index}
                        onClick={() => useSkill(index)}
                        disabled={skill.currentCooldown > 0}
                        className={`flex-1 px-4 py-3 rounded-xl font-bold ${
                          skill.currentCooldown > 0
                            ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500'
                        }`}
                        whileHover={skill.currentCooldown === 0 ? { scale: 1.05 } : {}}
                        whileTap={skill.currentCooldown === 0 ? { scale: 0.95 } : {}}
                      >
                        <div className="text-2xl mb-1">{skill.icon}</div>
                        <div className="text-sm">{skill.name}</div>
                        {skill.currentCooldown > 0 && (
                          <div className="text-xs text-gray-400">{skill.currentCooldown}초</div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 레벨업 알림 */}
          <AnimatePresence>
            {showLevelUp && (
              <motion.div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center shadow-2xl">
                  <Zap className="w-24 h-24 mx-auto mb-4 text-white" />
                  <h3 className="text-4xl font-bold text-white mb-2">레벨업!</h3>
                  <p className="text-2xl text-white">Lv.{player.level}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
