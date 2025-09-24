import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Crown, Flame, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'stage_complete' | 'level_up' | 'streak' | 'boss_defeat' | 'perfect_score' | 'speed_run';
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementSystemProps {
  stages: any[];
  user: any;
  onAchievementUnlock: (achievement: Achievement) => void;
}

export function AchievementSystem({ stages, user, onAchievementUnlock }: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_stage',
      title: '첫 걸음',
      description: '첫 번째 스테이지를 완료했습니다!',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      type: 'stage_complete',
      unlocked: false
    },
    {
      id: 'stage_10',
      title: '열심히 하는 중',
      description: '10개 스테이지를 완료했습니다!',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      type: 'stage_complete',
      unlocked: false
    },
    {
      id: 'stage_25',
      title: '꾸준함의 힘',
      description: '25개 스테이지를 완료했습니다!',
      icon: <Trophy className="w-6 h-6 text-orange-500" />,
      type: 'stage_complete',
      unlocked: false
    },
    {
      id: 'stage_50',
      title: '중간 지점',
      description: '50개 스테이지를 완료했습니다!',
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      type: 'stage_complete',
      unlocked: false
    },
    {
      id: 'stage_100',
      title: '완주자',
      description: '모든 스테이지를 완료했습니다!',
      icon: <Crown className="w-6 h-6 text-gold-500" />,
      type: 'stage_complete',
      unlocked: false
    },
    {
      id: 'level_5',
      title: '레벨 5 달성',
      description: '레벨 5에 도달했습니다!',
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      type: 'level_up',
      unlocked: false
    },
    {
      id: 'level_10',
      title: '레벨 10 달성',
      description: '레벨 10에 도달했습니다!',
      icon: <Zap className="w-6 h-6 text-green-500" />,
      type: 'level_up',
      unlocked: false
    },
    {
      id: 'streak_7',
      title: '일주일 연속',
      description: '7일 연속으로 학습했습니다!',
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      type: 'streak',
      unlocked: false
    },
    {
      id: 'streak_30',
      title: '한 달 연속',
      description: '30일 연속으로 학습했습니다!',
      icon: <Flame className="w-6 h-6 text-red-500" />,
      type: 'streak',
      unlocked: false
    }
  ]);

  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  // 업적 체크 로직
  useEffect(() => {
    const completedStages = stages.filter(s => s.isCompleted).length;
    const currentLevel = user.level;
    const currentStreak = user.currentStreak;

    achievements.forEach(achievement => {
      if (achievement.unlocked) return;

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first_stage':
          shouldUnlock = completedStages >= 1;
          break;
        case 'stage_10':
          shouldUnlock = completedStages >= 10;
          break;
        case 'stage_25':
          shouldUnlock = completedStages >= 25;
          break;
        case 'stage_50':
          shouldUnlock = completedStages >= 50;
          break;
        case 'stage_100':
          shouldUnlock = completedStages >= 100;
          break;
        case 'level_5':
          shouldUnlock = currentLevel >= 5;
          break;
        case 'level_10':
          shouldUnlock = currentLevel >= 10;
          break;
        case 'streak_7':
          shouldUnlock = currentStreak >= 7;
          break;
        case 'streak_30':
          shouldUnlock = currentStreak >= 30;
          break;
      }

      if (shouldUnlock) {
        const updatedAchievement = { ...achievement, unlocked: true, unlockedAt: new Date() };
        setAchievements(prev => 
          prev.map(a => a.id === achievement.id ? updatedAchievement : a)
        );
        setShowAchievement(updatedAchievement);
        onAchievementUnlock(updatedAchievement);
      }
    });
  }, [stages, user, achievements, onAchievementUnlock]);

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'stage_complete':
        return 'from-green-400 to-green-600';
      case 'level_up':
        return 'from-blue-400 to-blue-600';
      case 'streak':
        return 'from-orange-400 to-red-500';
      case 'boss_defeat':
        return 'from-purple-400 to-pink-500';
      case 'perfect_score':
        return 'from-yellow-400 to-orange-500';
      case 'speed_run':
        return 'from-cyan-400 to-blue-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <>
      {/* 업적 알림 */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="fixed top-4 right-4 z-50 max-w-sm"
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onAnimationComplete={() => {
              setTimeout(() => setShowAchievement(null), 3000);
            }}
          >
            <div className={`bg-gradient-to-r ${getAchievementColor(showAchievement.type)} text-white p-4 rounded-xl shadow-2xl`}>
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {showAchievement.icon}
                </motion.div>
                <div>
                  <h4 className="font-bold text-lg">업적 달성! 🎉</h4>
                  <p className="text-sm opacity-90">{showAchievement.title}</p>
                  <p className="text-xs opacity-75">{showAchievement.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      className={`p-3 rounded-lg bg-gradient-to-r ${achievement.unlocked ? 'from-green-50 to-green-100 border border-green-200' : 'from-gray-50 to-gray-100 border border-gray-200'} transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center space-x-3">
        <div className={`${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`}>
          {achievement.icon}
        </div>
        <div>
          <h4 className={`font-bold ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
            {achievement.title}
          </h4>
          <p className={`text-sm ${achievement.unlocked ? 'text-green-600' : 'text-gray-500'}`}>
            {achievement.description}
          </p>
          {achievement.unlockedAt && (
            <p className="text-xs text-gray-500 mt-1">
              {achievement.unlockedAt.toLocaleDateString()} 달성
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

