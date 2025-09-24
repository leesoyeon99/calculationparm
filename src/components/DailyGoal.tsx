import { Target, Star, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function DailyGoal() {
  const { stages, user } = useGameStore();
  
  const currentStage = stages.find(s => s.isCurrent);
  const completedToday = 0; // 실제로는 날짜별 완료 수를 추적해야 함
  const dailyTarget = 3; // 하루 목표 스테이지 수

  return (
    <div className="farm-card p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div className="flex items-center space-x-3 mb-4">
        <Target className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-800">오늘의 목표</h3>
      </div>
      
      <div className="space-y-4">
        {/* 스테이지 목표 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">스테이지 완료</span>
            <span className="text-sm text-gray-600">{completedToday}/{dailyTarget}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedToday / dailyTarget) * 100}%` }}
            />
          </div>
        </div>

        {/* 현재 스테이지 */}
        {currentStage && (
          <div className="bg-white/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">다음 목표</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{currentStage.title}</div>
            <div className="text-sm text-gray-600">{currentStage.description}</div>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span>+{currentStage.expReward} EXP</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🌱</span>
                <span>+{currentStage.cropGrowthReward} 성장</span>
              </div>
            </div>
          </div>
        )}

        {/* 연속 학습 */}
        <div className="flex items-center justify-between bg-white/30 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">연속 학습</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{user.currentStreak}일</div>
            <div className="text-xs text-gray-500">최고: {user.longestStreak}일</div>
          </div>
        </div>
      </div>
    </div>
  );
}

