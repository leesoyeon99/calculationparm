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
  Check 
} from 'lucide-react';

export function AnimalFarmPage() {
  const navigate = useNavigate();
  const { farm, adoptAnimal, feedAnimal, playWithAnimal, trainAnimal, addCoins, addStudyTime } = useGameStore();
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
    const minutesStudied = Math.floor(timer / 60);
    if (minutesStudied > 0) {
      addStudyTime(minutesStudied, selectedSubject);
      setCheeringMessage(`오늘 ${minutesStudied}분 공부 완료! 정말 대단해! 🎉`);
      setShowCheering(true);
      setTimeout(() => setShowCheering(false), 3000);
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
    adoptAnimal(selectedLevel);
    setShowAdoptModal(false);
  };

  const handleEggHatch = () => {
    setHatchingProgress(0);
    const interval = setInterval(() => {
      setHatchingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          adoptAnimal(selectedEggType);
          setShowEggModal(false);
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
              🐰 토끼 농장
            </h1>
            <p className="text-gray-600">귀여운 토끼들과 함께 공부해요!</p>
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
                    <div className="text-8xl mb-4">[?]</div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">아직 토끼가 없어요!</h3>
                    <p className="text-gray-500 mb-6">새로운 토끼를 입양해보세요</p>
                    <motion.button
                      onClick={() => setShowAdoptModal(true)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-6 h-6 inline mr-2" />
                      토끼 입양하기
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
                          size={animal.level === 1 ? 'small' : animal.level === 2 ? 'medium' : 'large'}
                          isInTank={true}
                          tankSize={{ width: window.innerWidth - 100, height: window.innerHeight * 0.7 }}
                        />
                      ))}
                    </div>

                    {/* 토끼 정보 리스트 - 수조 아래에 표시 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🐰 우리 토끼들</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {farm.animals.map((animal) => (
                          <motion.div
                            key={animal.id}
                            className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow-sm border border-gray-200"
                            whileHover={{ translateY: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img src="/images/rabbit.png" alt="토끼" className="w-20 h-20 object-contain mb-2" />
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

              {/* 알 깨기 버튼 - 항상 표시 */}
              <motion.button
                onClick={() => setShowEggModal(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-2xl">🥚</span>
              </motion.button>
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
                        <img src="/images/rabbit.png" alt="토끼" className="w-16 h-16" />
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
                      완료
                    </motion.button>
                  </div>
                </div>

                {/* 학습 통계 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📊 학습 통계</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.floor(timer / 60)}분
                      </div>
                      <div className="text-sm text-gray-600">오늘 공부 시간</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedSubject}
                      </div>
                      <div className="text-sm text-gray-600">현재 과목</div>
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
                
                {hatchingProgress > 0 && (
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
                
                <div className="flex space-x-4">
                  <motion.button
                    onClick={() => setShowEggModal(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    취소
                  </motion.button>
                  <motion.button
                    onClick={handleEggHatch}
                    disabled={hatchingProgress > 0}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {hatchingProgress > 0 ? '부화 중...' : '부화하기'}
                  </motion.button>
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
    </div>
  );
}