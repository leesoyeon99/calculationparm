import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { RabbitCharacter } from '../components/RabbitCharacter';
import { 
  Plus, 
  Heart, 
  Zap, 
  Coffee, 
  Play, 
  Pause, 
  Check,
  Award,
  Star,
  Sparkles,
  Trophy,
  TrendingUp,
  Users
} from 'lucide-react';

export function AnimalFarmPage() {
  const navigate = useNavigate();
  const { farm, adoptAnimal, feedAnimal, playWithAnimal, trainAnimal, addCoins, addStudyTime, dailyStudyTime, getRankings } = useGameStore();
  const [activeTab, setActiveTab] = useState<'farm' | 'study'>('farm');
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [showDialogueModal, setShowDialogueModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [currentDialogue, setCurrentDialogue] = useState('');
  const [showEggModal, setShowEggModal] = useState(false);
  const [selectedEggType, setSelectedEggType] = useState<1 | 2 | 3>(1);
  const [hatchingProgress, setHatchingProgress] = useState(0);
  
  // 공부 타이머 관련 상태
  const [timer, setTimer] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('수학');
  const [cheeringMessage, setCheeringMessage] = useState('');
  const [showCheering, setShowCheering] = useState(false);
  const [selectedAnimalForStudy, setSelectedAnimalForStudy] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [isHatching, setIsHatching] = useState(false);
  const [pendingAnimal, setPendingAnimal] = useState<{animalType: string, animalLevel: number} | null>(null);
  
  // 랜덤 동물 타입 정의 (이미지와 함께)
  const animalTypes = [
    { type: 'rabbit', name: '토끼', emoji: '🐰', description: '귀여운 토끼 친구', image: '/images/rabbit.png' },
    { type: 'cat1', name: '고양이', emoji: '🐱', description: '장난꾸러기 고양이', image: '/images/c1.png' },
    { type: 'cat2', name: '고양이', emoji: '🐱', description: '우아한 고양이', image: '/images/c2.png' },
    { type: 'cat3', name: '고양이', emoji: '🐱', description: '털복숭이 고양이', image: '/images/c3.png' },
    { type: 'fish1', name: '물고기', emoji: '🐠', description: '수영하는 물고기', image: '/images/f1.png' },
    { type: 'rabbit1', name: '토끼', emoji: '🐰', description: '활발한 토끼', image: '/images/r1.png' },
    { type: 'rabbit2', name: '토끼', emoji: '🐰', description: '귀여운 토끼', image: '/images/r2.png' },
    { type: 'rabbit3', name: '토끼', emoji: '🐰', description: '똑똑한 토끼', image: '/images/r3.png' },
    { type: 'rabbit4', name: '토끼', emoji: '🐰', description: '친근한 토끼', image: '/images/r4.png' },
    { type: 'rabbit5', name: '토끼', emoji: '🐰', description: '특별한 토끼', image: '/images/r5.png' }
  ];
  
  const [hatchedAnimal, setHatchedAnimal] = useState<any>(null);
  
  // 알깨기 비용 설정
  const eggHatchCost = 100; // 코인 100개 필요

  // 공부 타이머 관련 함수들
  const subjects = ['수학', '국어', '영어', '과학', '사회', '기타'];
  const cheeringMessages = [
    "열심히 공부하는 모습 멋져! 🐰",
    "조금만 더 힘내! 토끼가 응원해! 💪",
    "집중하는 모습이 최고야! ✨",
    "수학 마스터가 되는 길! 📚",
    "토끼도 너처럼 똑똑해지고 싶어! 🧠",
    "쉬는 시간엔 토끼랑 놀자! 🥕",
  ];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // 부화 완료 후 동물 입양 처리
  useEffect(() => {
    if (pendingAnimal) {
      console.log('동물 입양 실행:', pendingAnimal);
      adoptAnimal(
        pendingAnimal.animalType as any, 
        pendingAnimal.animalLevel as any, 
        { x: Math.random() * 300 + 50, y: Math.random() * 200 + 50 }
      );
      setPendingAnimal(null);
    }
  }, [pendingAnimal, adoptAnimal]);

  useEffect(() => {
    if (isRunning && timer % 60 === 0 && timer > 0) {
      // Every minute, update animal stats and show a cheering message
      const minutes = timer / 60;
      addStudyTime(1, selectedSubject); // Add 1 minute of study time
      showRandomCheeringMessage();
    }
  }, [timer, isRunning, selectedSubject, addStudyTime]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      showRandomCheeringMessage();
    }
  };

  const handleComplete = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // 초 단위까지 정확하게 저장
    const totalSeconds = timer;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (totalSeconds > 0) {
      // 초 단위를 분으로 변환하여 저장 (소수점 포함)
      const exactMinutes = totalSeconds / 60;
      addStudyTime(exactMinutes, selectedSubject);
      
      setCheeringMessage(`오늘 ${minutes}분 ${seconds}초 공부 완료! 정말 대단해! 🎉`);
      setShowCheering(true);
      setTimeout(() => setShowCheering(false), 3000);
      
      // 공부 완료 후 랭킹 모달 표시
      setTimeout(() => {
        setShowRankingModal(true);
      }, 2000);
    }
    setTimer(0);
  };

  const showRandomCheeringMessage = () => {
    const randomIndex = Math.floor(Math.random() * cheeringMessages.length);
    setCheeringMessage(cheeringMessages[randomIndex]);
    setShowCheering(true);
    setTimeout(() => setShowCheering(false), 3000);
  };



  // 토끼 클릭 시 개인 공부 타이머로 이동
  const handleRabbitClick = (animalId: string) => {
    setSelectedAnimalForStudy(animalId);
    setActiveTab('study');
  };

  const handleTalk = (animalId: string) => {
    setSelectedAnimal(animalId);
    setCurrentDialogue("안녕! 오늘도 열심히 공부해보자! 🐰");
    setShowDialogueModal(true);
  };

  const handleGift = (animalId: string) => {
    setSelectedAnimal(animalId);
    setCurrentDialogue("선물 고마워! 더 열심히 할게! 🎁");
    setShowDialogueModal(true);
  };

  const handleAdopt = () => {
    // 랜덤 동물 타입 선택
    const randomAnimal = Math.random() < 0.6 ? 
      animalTypes[Math.floor(Math.random() * 6)] : // 토끼들 (0-5)
      animalTypes[Math.floor(Math.random() * animalTypes.length)]; // 전체
    
    const animalType = randomAnimal.type as 'rabbit' | 'rabbit1' | 'rabbit2' | 'rabbit3' | 'rabbit4' | 'rabbit5' | 'cat' | 'cat1' | 'cat2' | 'cat3' | 'fish' | 'fish1' | 'bird' | 'hamster' | 'dog';
    const animalLevel = selectedLevel as 1 | 2 | 3;
    
    adoptAnimal(animalType, animalLevel, { x: Math.random() * 300 + 50, y: Math.random() * 200 + 50 });
    setShowAdoptModal(false);
  };

  const handleEggHatch = () => {
    // 중복 호출 방지
    if (isHatching) {
      console.log('이미 부화 중입니다.');
      return;
    }
    
    // 코인 확인
    if (farm.resources.coins < eggHatchCost) {
      setCurrentDialogue(`코인이 부족해요! ${eggHatchCost}개가 필요해요 💰`);
      setShowDialogueModal(true);
      return;
    }
    
    // 부화 시작
    setIsHatching(true);
    
    // 코인 차감
    addCoins(-eggHatchCost);
    
    setHatchingProgress(0);
    setHatchedAnimal(null);
    
    const interval = setInterval(() => {
      setHatchingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // 랜덤 동물 선택 (토끼가 나올 확률이 높음)
          const randomAnimal = Math.random() < 0.6 ? 
            animalTypes[Math.floor(Math.random() * 6)] : // 토끼들 (0-5)
            animalTypes[Math.floor(Math.random() * animalTypes.length)]; // 전체
          setHatchedAnimal(randomAnimal);
          
          // 실제 동물 타입에 따라 입양 정보 저장
          const animalType = randomAnimal.type as 'rabbit' | 'rabbit1' | 'rabbit2' | 'rabbit3' | 'rabbit4' | 'rabbit5' | 'cat' | 'cat1' | 'cat2' | 'cat3' | 'fish' | 'fish1' | 'bird' | 'hamster' | 'dog';
          // selectedEggType을 level로 변환 (1->1, 2->2, 3->3)
          const animalLevel = selectedEggType as 1 | 2 | 3;
          
          console.log('부화된 동물:', randomAnimal);
          console.log('동물 타입:', animalType);
          console.log('동물 레벨:', animalLevel);
          
          // 동물 입양 정보를 저장 (나중에 호출)
          setPendingAnimal({ animalType, animalLevel });
          
          // 부화 완료
          setIsHatching(false);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">🏠</span>
            <span className="font-bold text-gray-700">홈으로</span>
          </motion.button>

          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              🐰 동물 농장
            </h1>
            <p className="text-gray-600">귀여운 동물들과 함께 공부해요!</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🍃</span>
                <span className="font-bold text-green-600">{farm.resources.food}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🪙</span>
                <span className="font-bold text-yellow-600">{farm.resources.coins}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 버튼 */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex space-x-2">
          <motion.button
            onClick={() => setActiveTab('farm')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'farm'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏠 농장
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('study')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'study'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⏰ 공부 타이머
          </motion.button>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl min-h-[600px] relative overflow-hidden">
          {/* 농장 탭 콘텐츠 */}
          {activeTab === 'farm' && (
            <div>
              {/* 배경 장식 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-6xl">[?]</div>
                <div className="absolute top-4 right-4 text-6xl">[?]</div>
                <div className="absolute bottom-4 left-4 text-6xl">[?]</div>
                <div className="absolute bottom-4 right-4 text-6xl">[?]</div>
              </div>

              {/* 토끼들 */}
              <div className="relative z-10">
                {farm.animals.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-8xl mb-4">🥚</div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">아직 동물이 없어요!</h3>
                    <p className="text-gray-500 mb-6">알을 깨서 새로운 친구를 만나보세요</p>
                    <motion.button
                      onClick={() => setShowEggModal(true)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl mr-2">🥚</span>
                      알 깨기
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* 하나의 큰 수조 - 화면에 꽉 차게 */}
                    <div className="relative bg-gradient-to-b from-blue-200 to-blue-400 rounded-3xl border-4 border-blue-600 shadow-2xl overflow-hidden w-full" style={{ height: '70vh', minHeight: '500px' }}>
                      {/* 수조 장식 */}
                      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-300 to-transparent">
                        <div className="absolute bottom-4 left-8 w-12 h-12 bg-green-500 rounded-full"></div>
                        <div className="absolute bottom-2 right-12 w-8 h-8 bg-green-400 rounded-full"></div>
                        <div className="absolute bottom-6 right-24 w-6 h-6 bg-green-600 rounded-full"></div>
                        <div className="absolute bottom-3 left-24 w-10 h-10 bg-green-500 rounded-full"></div>
                        <div className="absolute bottom-5 right-40 w-7 h-7 bg-green-400 rounded-full"></div>
                      </div>
                      
                      {/* 물방울 효과 */}
                      <div className="absolute top-6 left-12 w-3 h-3 bg-blue-300 rounded-full animate-bounce"></div>
                      <div className="absolute top-12 right-16 w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-20 left-20 w-2.5 h-2.5 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-16 right-32 w-1.5 h-1.5 bg-blue-200 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                      <div className="absolute top-24 left-40 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
                      
                      {/* 모든 토끼들이 수조 안에서 자유롭게 움직임 */}
                      {farm.animals.map((animal, index) => (
                        <RabbitCharacter
                          key={animal.id}
                          animal={animal}
                          onFeed={() => feedAnimal(animal.id)}
                          onPlay={() => playWithAnimal(animal.id)}
                          onTrain={() => trainAnimal(animal.id)}
                          onTalk={() => handleTalk(animal.id)}
                          onGift={() => handleGift(animal.id)}
                          onStudyTimer={() => handleRabbitClick(animal.id)}
                          isInTank={true}
                        />
                      ))}
                    </div>

                    {/* 동물 정보 리스트 - 수조 아래에 표시 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🐰 우리 동물들</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {farm.animals.map((animal) => (
                          <motion.div
                            key={animal.id}
                            className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow-sm border border-gray-200"
                            whileHover={{ translateY: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img src={animal.image || "/images/rabbit.png"} alt={animal.name} className="w-20 h-20 object-contain mb-2" />
                            <h4 className="font-bold text-lg text-gray-800">{animal.name}</h4>
                            <p className="text-sm text-gray-600">Lv.{animal.level} | {animal.personality}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-gray-700">{animal.happiness}%</span>
                              <Zap className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-gray-700">{animal.energy}%</span>
                              <Coffee className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-gray-700">{animal.hunger}%</span>
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <motion.button
                                onClick={() => feedAnimal(animal.id)}
                                className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs hover:bg-orange-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                밥 주기
                              </motion.button>
                              <motion.button
                                onClick={() => playWithAnimal(animal.id)}
                                className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                놀아주기
                              </motion.button>
                              <motion.button
                                onClick={() => trainAnimal(animal.id)}
                                className="bg-green-500 text-white px-2 py-1 rounded-full text-xs hover:bg-green-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                훈련하기
                              </motion.button>
                              <motion.button
                                onClick={() => handleTalk(animal.id)}
                                className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs hover:bg-pink-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                💬
                              </motion.button>
                              <motion.button
                                onClick={() => handleGift(animal.id)}
                                className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs hover:bg-purple-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                🎁
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

          {/* 공부 타이머 탭 콘텐츠 */}
          {activeTab === 'study' && (
            <div className="relative z-10">
              {/* 선택된 토끼 정보 */}
              {selectedAnimalForStudy && (
                <div className="mb-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border-2 border-pink-200">
                  {(() => {
                    const animal = farm.animals.find(a => a.id === selectedAnimalForStudy);
                    return animal ? (
                      <div className="flex items-center space-x-4">
                        <img src={animal.image || "/images/rabbit.png"} alt={animal.name} className="w-16 h-16" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{animal.name}와 함께 공부해요!</h3>
                          <p className="text-gray-600">Lv.{animal.level} • 행복도: {animal.happiness}%</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              {/* 공부 타이머 UI */}
              <div className="text-center space-y-8">
                {/* 과목 선택 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">📚 어떤 과목을 공부할까요?</h3>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {subjects.map((subject) => (
                      <motion.button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={`p-4 rounded-xl font-bold transition-all duration-300 ${
                          selectedSubject === subject
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {subject}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 타이머 디스플레이 */}
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 border-4 border-blue-200">
                  <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
                    {formatTime(timer)}
                  </div>
                  <div className="text-xl text-gray-600 mb-6">
                    {selectedSubject} 공부 중...
                  </div>

                  {/* 토끼 응원 메시지 */}
                  {showCheering && (
                    <motion.div
                      className="bg-white rounded-2xl p-4 shadow-lg border-2 border-pink-200 mb-6"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <p className="text-lg font-bold text-pink-600">{cheeringMessage}</p>
                    </motion.div>
                  )}

                  {/* 컨트롤 버튼들 */}
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={handleStartPause}
                      className={`px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 ${
                        isRunning
                          ? 'bg-gradient-to-r from-orange-500 to-red-500'
                          : 'bg-gradient-to-r from-green-500 to-blue-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isRunning ? (
                        <>
                          <Pause className="w-6 h-6 inline mr-2" />
                          일시정지
                        </>
                      ) : (
                        <>
                          <Play className="w-6 h-6 inline mr-2" />
                          시작
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleComplete}
                      disabled={timer === 0}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check className="w-6 h-6 inline mr-2" />
                      공부 완료
                    </motion.button>
                  </div>
                </div>

                {/* 학습 통계 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📊 학습 통계</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.floor(timer / 60)}분 {timer % 60}초
                      </div>
                      <div className="text-sm text-gray-600">현재 공부 시간</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedSubject}
                      </div>
                      <div className="text-sm text-gray-600">현재 과목</div>
                    </div>
                  </div>
                </div>

                {/* 랭킹 섹션 */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 shadow-lg border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                      <Trophy className="w-6 h-6 text-orange-500 mr-2" />
                      수학 마스터 랭킹
                    </h3>
                    <motion.button
                      onClick={() => navigate('/ranking')}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>랭킹 보기</span>
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.floor(dailyStudyTime / 60)}시간 {Math.floor(dailyStudyTime % 60)}분
                      </div>
                      <div className="text-sm text-gray-600">오늘 총 공부시간</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        #{getRankings('daily').myRank || '?'}
                      </div>
                      <div className="text-sm text-gray-600">현재 등수</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      친구들과 공부시간을 비교하고 경쟁해보세요! 🏆
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>현재 267명이 공부 중</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 입양 모달 */}
      <AnimatePresence>
        {showAdoptModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">토끼 입양하기</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((level) => (
                    <motion.button
                      key={level}
                      onClick={() => setSelectedLevel(level as 1 | 2 | 3)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedLevel === level
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl mb-2">🐰</div>
                      <div className="text-sm font-bold">레벨 {level}</div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    onClick={() => setShowAdoptModal(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    취소
                  </motion.button>
                  <motion.button
                    onClick={handleAdopt}
                    className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    입양하기
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 알 깨기 모달 */}
      <AnimatePresence>
        {showEggModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">알 깨기</h2>
              
              {/* 비용 정보 */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6 border-2 border-yellow-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">🪙</span>
                  <span className="font-bold text-gray-800">알깨기 비용</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{eggHatchCost} 코인</div>
                  <div className="text-sm text-gray-600 mt-1">현재 보유: {farm.resources.coins} 코인</div>
                  {farm.resources.coins < eggHatchCost && (
                    <div className="text-red-500 text-sm mt-2 font-bold">❌ 코인이 부족합니다!</div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((type) => (
                    <motion.button
                      key={type}
                      onClick={() => setSelectedEggType(type as 1 | 2 | 3)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedEggType === type
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl mb-2">🥚</div>
                      <div className="text-sm font-bold">타입 {type}</div>
                    </motion.button>
                  ))}
                </div>
                
                {hatchingProgress > 0 && hatchingProgress < 100 && (
                  <div className="bg-gray-100 rounded-xl p-4">
                    <div className="text-center mb-2">부화 중...</div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${hatchingProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2 text-sm text-gray-600">{hatchingProgress}%</div>
                  </div>
                )}
                
                {hatchedAnimal && (
                  <motion.div
                    className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="mb-4"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <img 
                          src={hatchedAnimal.image} 
                          alt={hatchedAnimal.name}
                          className="w-24 h-24 object-contain mx-auto"
                        />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">축하합니다! 🎉</h3>
                      <p className="text-lg text-gray-700 mb-2">
                        <span className="font-bold text-green-600">{hatchedAnimal.name}</span>이(가) 태어났어요!
                      </p>
                      <p className="text-sm text-gray-600">{hatchedAnimal.description}</p>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex space-x-4">
                  {hatchedAnimal ? (
                    <motion.button
                      onClick={() => {
                        setShowEggModal(false);
                        setHatchedAnimal(null);
                        setHatchingProgress(0);
                        setIsHatching(false);
                        setPendingAnimal(null);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      농장으로 가기
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => {
                          setShowEggModal(false);
                          setHatchingProgress(0);
                          setHatchedAnimal(null);
                          setIsHatching(false);
                          setPendingAnimal(null);
                        }}
                        className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        취소
                      </motion.button>
                      <motion.button
                        onClick={handleEggHatch}
                        disabled={hatchingProgress > 0 || farm.resources.coins < eggHatchCost || isHatching}
                        className={`flex-1 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                          farm.resources.coins < eggHatchCost || isHatching
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-xl'
                        }`}
                        whileHover={farm.resources.coins >= eggHatchCost && !isHatching ? { scale: 1.02 } : {}}
                        whileTap={farm.resources.coins >= eggHatchCost && !isHatching ? { scale: 0.98 } : {}}
                      >
                        {hatchingProgress > 0 ? '부화 중...' : 
                         isHatching ? '부화 중...' :
                         farm.resources.coins < eggHatchCost ? '코인 부족' : '부화하기'}
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 대화 모달 */}
      <AnimatePresence>
        {showDialogueModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🐰</div>
                <p className="text-lg text-gray-800 mb-6">{currentDialogue}</p>
                <motion.button
                  onClick={() => setShowDialogueModal(false)}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  확인
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 랭킹 모달 */}
      <AnimatePresence>
        {showRankingModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-r from-orange-500 to-yellow-500">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">공부 완료! 🎉</h2>
                <p className="text-gray-600 mb-6">
                  오늘 <span className="font-bold text-orange-600">{Math.floor(dailyStudyTime / 60)}시간 {Math.floor(dailyStudyTime % 60)}분</span> 공부했어요!
                </p>
                
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Trophy className="w-5 h-5 text-orange-600" />
                    <span className="font-bold text-gray-800">현재 랭킹</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    #{getRankings('daily').myRank || '?'}등
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    상위 {Math.round(((getRankings('daily').myRank || 0) / 20) * 100)}%
                  </div>
                </div>
                
                <div className="space-y-3">
                  <motion.button
                    onClick={() => {
                      setShowRankingModal(false);
                      navigate('/ranking');
                    }}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TrendingUp className="w-6 h-6" />
                    <span>전체 랭킹 보기</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowRankingModal(false)}
                    className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    계속 공부하기
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 알 깨기 버튼 - 모든 탭에서 항상 표시 */}
      <motion.button
        onClick={() => setShowEggModal(true)}
        className={`fixed bottom-24 right-8 text-white p-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 border-4 border-white ${
          farm.resources.coins < eggHatchCost
            ? 'bg-gradient-to-r from-gray-400 to-gray-500'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500'
        }`}
        whileHover={{ scale: 1.15, y: -5 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-4xl">🥚</span>
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
          farm.resources.coins < eggHatchCost ? 'bg-red-500' : 'bg-green-500'
        }`}>
          <span className="text-white text-xs font-bold">
            {farm.resources.coins < eggHatchCost ? '!' : '✓'}
          </span>
        </div>
        {/* 코인 비용 표시 */}
        <div className="absolute -bottom-2 -left-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full">
          {eggHatchCost}🪙
        </div>
      </motion.button>
    </div>
  );
}