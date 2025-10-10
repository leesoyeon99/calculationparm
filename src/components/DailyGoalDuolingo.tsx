import { motion } from 'framer-motion';
import { Target, Star, Zap, Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function DailyGoalDuolingo() {
  const { user, farm } = useGameStore();
  
  const dailyGoal = 5; // 하루 목표 스테이지 수
  const completedToday = 0; // 실제로는 날짜별 완료 수를 추적해야 함
  const remaining = Math.max(0, dailyGoal - completedToday);
  const progressPercentage = Math.min((completedToday / dailyGoal) * 100, 100);

  const getMotivationalMessage = () => {
    if (completedToday === 0) {
      return "오늘의 목표를 달성해보세요! 🌱";
    } else if (completedToday < dailyGoal) {
      return `${remaining}개 더 완료하면 목표 달성! 💪`;
    } else {
      return "와! 오늘의 목표를 달성했어요! 🎉";
    }
  };

  const getRewardMessage = () => {
    if (completedToday >= dailyGoal) {
      return "보상: +50 코인, +20 햇살";
    } else {
      return `목표 달성 시: +50 코인, +20 햇살`;
    }
  };

  return (
    <motion.div
      className="farm-card p-6 bg-gradient-to-r from-yellow-50 to-orange-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <Target className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-800">오늘의 목표</h3>
        {completedToday >= dailyGoal && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <Trophy className="w-6 h-6 text-yellow-500" />
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        {/* 목표 진행률 */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {completedToday}/{dailyGoal}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            {getMotivationalMessage()}
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-4 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* 반짝이는 효과 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progressPercentage)}% 완료
            </span>
          </div>
        </div>

        {/* 보상 정보 */}
        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">일일 보상</span>
            </div>
            <div className="text-sm text-gray-600">
              {getRewardMessage()}
            </div>
          </div>
        </div>

        {/* 연속 학습 정보 */}
        <div className="flex items-center justify-between bg-white/30 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">연속 학습</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{user.currentStreak}일</div>
            <div className="text-xs text-gray-500">최고: {user.longestStreak}일</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


