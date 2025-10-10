import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Clock, Trophy, Target, Heart, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  subject: string;
  isActive: boolean;
}

const StudyTimerPage: React.FC = () => {
  const { farm, updateFarm } = useGameStore();
  const [isStudying, setIsStudying] = useState(false);
  const [studyTime, setStudyTime] = useState(0); // in seconds
  const [selectedSubject, setSelectedSubject] = useState('수학');
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [showRabbitCheering, setShowRabbitCheering] = useState(false);
  const [cheeringMessage, setCheeringMessage] = useState('');
  const intervalRef = useRef<number | null>(null);

  const subjects = ['수학', '국어', '영어', '과학', '사회', '기타'];

  // 토끼 응원 메시지들
  const cheeringMessages = [
    "화이팅! 공부하고 있어서 대단해! 🐰✨",
    "조금만 더 힘내! 네가 할 수 있어! 💪",
    "공부하는 모습이 정말 멋져! 🌟",
    "오늘도 열심히 하는구나! 자랑스러워! 🎉",
    "꾸준히 하는 게 최고야! 계속해! 🚀",
    "공부하는 토끼가 제일 예뻐! 💕"
  ];

  // 공부 시작
  const startStudy = () => {
    if (isStudying) return;
    
    setIsStudying(true);
    setStudyTime(0);
    setShowRabbitCheering(true);
    
    // 랜덤 응원 메시지 선택
    const randomMessage = cheeringMessages[Math.floor(Math.random() * cheeringMessages.length)];
    setCheeringMessage(randomMessage);
    
    // 3초 후 응원 메시지 숨기기
    setTimeout(() => {
      setShowRabbitCheering(false);
    }, 3000);

    // 타이머 시작
    intervalRef.current = window.setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
  };

  // 공부 일시정지
  const pauseStudy = () => {
    if (!isStudying) return;
    
    setIsStudying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // 공부 완료
  const finishStudy = () => {
    if (!isStudying && studyTime === 0) return;
    
    const duration = Math.floor(studyTime / 60); // 분 단위로 변환
    
    if (duration > 0) {
      const newSession: StudySession = {
        id: Date.now().toString(),
        startTime: new Date(Date.now() - studyTime * 1000),
        endTime: new Date(),
        duration,
        subject: selectedSubject,
        isActive: false
      };
      
      setStudySessions(prev => [newSession, ...prev]);
      
      // 토끼에게 경험치와 행복도 추가
      updateFarm({
        ...farm,
        animals: farm.animals.map(animal => ({
          ...animal,
          experience: animal.experience + duration * 2,
          happiness: Math.min(100, animal.happiness + duration),
          stats: {
            ...animal.stats,
            studyTime: animal.stats.studyTime + duration
          }
        }))
      });
      
      // 완료 응원 메시지
      setCheeringMessage("공부 완료! 정말 수고했어! 🎊");
      setShowRabbitCheering(true);
      setTimeout(() => {
        setShowRabbitCheering(false);
      }, 3000);
    }
    
    setIsStudying(false);
    setStudyTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // 시간 포맷팅
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 오늘의 총 공부시간 계산
  const todayStudyTime = studySessions
    .filter(session => {
      const today = new Date();
      const sessionDate = new Date(session.startTime);
      return sessionDate.toDateString() === today.toDateString();
    })
    .reduce((total, session) => total + session.duration, 0);

  // 이번 주 총 공부시간 계산
  const weekStudyTime = studySessions
    .filter(session => {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return new Date(session.startTime) >= weekAgo;
    })
    .reduce((total, session) => total + session.duration, 0);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 공부 타이머
          </h1>
          <p className="text-gray-600">
            토끼와 함께 열심히 공부해보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 타이머 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              {/* 타이머 디스플레이 */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">
                        {formatTime(studyTime)}
                      </div>
                      <div className="text-white/80 text-sm">
                        {selectedSubject}
                      </div>
                    </div>
                  </div>
                  
                  {/* 진행률 표시 */}
                  {isStudying && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-white/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              </div>

              {/* 과목 선택 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  공부 과목
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {subjects.map(subject => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedSubject === subject
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex justify-center space-x-4">
                {!isStudying ? (
                  <motion.button
                    onClick={startStudy}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    <span>공부 시작</span>
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      onClick={pauseStudy}
                      className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Pause className="w-5 h-5" />
                      <span>일시정지</span>
                    </motion.button>
                    <motion.button
                      onClick={finishStudy}
                      className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Square className="w-5 h-5" />
                      <span>완료</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* 공부 통계 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                공부 통계
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.floor(todayStudyTime / 60)}시간 {todayStudyTime % 60}분
                  </div>
                  <div className="text-sm text-gray-600">오늘</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(weekStudyTime / 60)}시간 {weekStudyTime % 60}분
                  </div>
                  <div className="text-sm text-gray-600">이번 주</div>
                </div>
              </div>
            </div>
          </div>

          {/* 토끼 응원 패널 */}
          <div className="space-y-6">
            {/* 토끼 캐릭터 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="relative">
                <img 
                  src="images/rabbit.png" 
                  alt="Study Rabbit" 
                  className="w-32 h-32 mx-auto mb-4"
                />
                
                {/* 응원 말풍선 */}
                <AnimatePresence>
                  {showRabbitCheering && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-gray-800 px-4 py-2 rounded-2xl shadow-lg max-w-48"
                    >
                      <div className="text-sm font-medium">
                        {cheeringMessage}
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-200"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                공부 토끼
              </h3>
              <p className="text-gray-600 text-sm">
                {isStudying ? "열심히 공부하고 있어요!" : "공부할 준비가 되었어요!"}
              </p>
            </div>

            {/* 토끼 상태 */}
            {farm.animals.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  토끼 상태
                </h3>
                
                {farm.animals.map((animal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        경험치
                      </span>
                      <span className="text-sm text-gray-600">
                        {animal.experience} XP
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (animal.experience % 1000) / 10)}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        행복도
                      </span>
                      <span className="text-sm text-gray-600">
                        {animal.happiness}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${animal.happiness}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 공부 기록 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                최근 기록
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {studySessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800">
                        {session.subject}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(session.startTime).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">
                        {session.duration}분
                      </div>
                    </div>
                  </div>
                ))}
                
                {studySessions.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    아직 공부 기록이 없어요.<br />
                    공부를 시작해보세요!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimerPage;
