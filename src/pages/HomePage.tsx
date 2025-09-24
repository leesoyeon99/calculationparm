import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Brain, 
  Star, 
  Gamepad2, 
  ArrowRight, 
  Target, 
  ChefHat,
  Sword,
  Car,
  Zap,
  Heart,
  Sparkles,
  Trophy
} from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* 상단 네비게이션 */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'var(--gradient-primary)'}}>
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-dnf-heading-2" style={{color: 'var(--color-text-primary)'}}>수학Edu</h1>
            </div>
            <div className="flex items-center space-x-6">
              <button className="font-dnf-body hover:opacity-70 transition-opacity" style={{color: 'var(--color-text-secondary)'}}>홈</button>
              <button className="font-dnf-body hover:opacity-70 transition-opacity" style={{color: 'var(--color-text-secondary)'}}>과정</button>
              <button className="font-dnf-body hover:opacity-70 transition-opacity" style={{color: 'var(--color-text-secondary)'}}>소개</button>
              <button className="text-white px-6 py-2 rounded-full font-dnf-button hover:shadow-lg transition-all" style={{background: 'var(--gradient-primary)'}}>
                시작하기
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 히어로 섹션 */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* 가운데 정렬된 메인 콘텐츠 */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6" style={{background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)'}}>
              <Star className="w-4 h-4 mr-2" />
              새로운 인터랙티브 학습 플랫폼
            </div>

            <h1 className="font-dnf-display mb-6" style={{color: 'var(--color-text-primary)'}}>
              게임으로
              <span 
                className="bg-clip-text text-transparent" 
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary) 50%, var(--color-accent) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              > 
                수학을 마스터하세요
              </span>
            </h1>

            <p className="font-dnf-body-large mb-8 max-w-3xl mx-auto" style={{color: 'var(--color-text-secondary)'}}>
              게임화된 플랫폼으로 수학 학습 경험을 바꿔보세요.
              문제를 풀고, 보상을 받고, 실시간으로 진도를 추적하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="text-white px-8 py-4 rounded-2xl font-dnf-button-large shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                style={{background: 'var(--gradient-primary)'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/world-map')}
              >
                <Gamepad2 className="w-6 h-6 mr-2" />
                학습 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-2xl font-dnf-button-large transition-all duration-300 flex items-center justify-center border-2 hover:opacity-80"
                style={{borderColor: 'var(--color-primary)', color: 'var(--color-primary)'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/diagnostic')}
              >
                <Target className="w-6 h-6 mr-2" />
                진단 테스트
              </motion.button>
            </div>
          </motion.div>

          {/* 게임 카드들 - 한 줄로 배열 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 플랫포머 게임 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-neutral-100)', borderColor: 'var(--color-neutral-300)'}}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/platformer')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce mx-auto" style={{background: 'var(--gradient-primary)'}}>
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-dnf-heading-3 mb-2" style={{color: 'var(--color-text-primary)'}}>플랫포머</h3>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>점프하며 수학 퍼즐을 풀어보세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-primary)'}}>
                <span className="text-sm">지금 플레이</span>
                <Zap className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* 던전 게임 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-primary-light)', borderColor: 'var(--color-primary)'}}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dungeon')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse mx-auto" style={{background: 'var(--color-accent)'}}>
                <Sword className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-dnf-heading-3 mb-2" style={{color: 'var(--color-text-primary)'}}>던전</h3>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>수학으로 몬스터와 전투하세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-accent)'}}>
                <span className="text-sm">지금 플레이</span>
                <Heart className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* 요리 게임 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-secondary-light)', borderColor: 'var(--color-secondary)'}}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cooking')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-spin mx-auto" style={{background: 'var(--color-primary)'}}>
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-dnf-heading-3 mb-2" style={{color: 'var(--color-text-primary)'}}>요리</h3>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>수학 레시피로 요리하세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-primary)'}}>
                <span className="text-sm">지금 플레이</span>
                <Sparkles className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* 레이싱 게임 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-neutral-100)', borderColor: 'var(--color-accent)'}}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/racing')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse mx-auto" style={{background: 'var(--color-accent)'}}>
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-dnf-heading-3 mb-2" style={{color: 'var(--color-text-primary)'}}>레이싱</h3>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>수학으로 속도를 높이세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-accent)'}}>
                <span className="text-sm">지금 플레이</span>
                <Trophy className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* 동물농장 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-success-light)', borderColor: 'var(--color-success)'}}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/animal-farm')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce mx-auto" style={{background: 'var(--color-success)'}}>
                <span className="text-3xl">[?]</span>
              </div>
              <h3 className="font-dnf-heading-3 mb-2" style={{color: 'var(--color-text-primary)'}}>동물농장</h3>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>토끼들과 함께 수학을 배워보세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-success)'}}>
                <span className="text-sm">농장 가기</span>
                <Heart className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}