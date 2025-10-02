import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Clock, 
  Users, 
  Flame,
  ChevronLeft,
  ChevronRight,
  Star,
  Target,
  Award
} from 'lucide-react';

export function RankingPage() {
  const navigate = useNavigate();
  const { getRankings, dailyStudyTime, totalStudyTime, updateRankings } = useGameStore();
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ranking, setRanking] = useState(getRankings('daily'));

  useEffect(() => {
    updateRankings();
    setRanking(getRankings(selectedTab));
  }, [selectedTab, selectedDate]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-amber-400 to-amber-600';
    return 'from-blue-400 to-blue-600';
  };

  const top3Users = ranking.users.slice(0, 3);
  const otherUsers = ranking.users.slice(3, 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-bold text-gray-700">홈으로</span>
          </motion.button>

          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              🏆 수학 마스터 랭킹
            </h1>
            <p className="text-gray-600">친구들과 공부시간을 비교해보세요!</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-600">랭킹</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex space-x-2">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                selectedTab === tab
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'daily' ? '일간' : tab === 'weekly' ? '주간' : '월간'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 날짜 선택 */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </motion.button>
            <span className="text-2xl font-bold text-gray-800">{formatDate(selectedDate)}</span>
            <motion.button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* 일간 Top3 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🏆 일간 Top3</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {top3Users.map((user, index) => (
              <motion.div
                key={user.id}
                className={`flex flex-col items-center p-6 rounded-2xl bg-gradient-to-r ${getMedalColor(user.rank)} text-white shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4">
                  {getMedalIcon(user.rank)}
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl mb-2">{user.nickname}</div>
                  <div className="text-lg mb-2">{formatTime(user.studyTime)}</div>
                  <div className="text-sm opacity-90">Lv.{user.level}</div>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">{user.streak}일 연속</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 공부 현황 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Users className="w-6 h-6" />
              <span className="text-lg">공부중 267명 오늘 전체 553명</span>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                내 등수 {ranking.myRank || 'N/A'}등
              </div>
              <div className="text-lg text-gray-600 mb-4">
                상위 {ranking.myRank ? Math.round((ranking.myRank / ranking.users.length) * 100) : 0}%
              </div>
              <div className="text-2xl font-semibold text-blue-600">
                {formatTime(ranking.myStudyTime)}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <input type="checkbox" className="rounded w-5 h-5" />
              <span className="text-lg text-gray-600">캠 인증 랭킹</span>
            </div>
          </div>
        </div>

        {/* 상세 랭킹 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📚 수학 학습 랭킹</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherUsers.map((user, index) => (
              <motion.div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 3) * 0.05 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {user.rank}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-lg">{user.nickname}</div>
                    <div className="text-sm text-gray-600">{formatTime(user.studyTime)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      style={{ width: `${(user.studyTime / Math.max(...ranking.users.map(u => u.studyTime))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 안내 메시지 */}
        <motion.div
          className="bg-gray-100 rounded-2xl p-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-lg text-gray-700 leading-relaxed text-center">
            * 최대 집중시간 9시간 이상 / 하루 공부 20시간 이상 랭킹에서 제외됩니다.
          </div>
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">
            ×
          </button>
        </motion.div>
      </div>

    </div>
  );
}
