import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Brain, 
  Star, 
  ArrowRight, 
  Map,
  Gamepad2,
  CheckCircle,
  BookOpen,
  Zap
} from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{background: 'var(--gradient-secondary)'}}>
      {/* 상단 네비게이션 */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg w-full">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'var(--gradient-primary)'}}>
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-dnf-heading-2" style={{color: 'var(--color-text-primary)'}}>소마 연산 마스터</h1>
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
      <section className="relative py-24 px-4">
        <div className="w-full">
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
                      소마 사고력연산, 체계적인 학습 여정으로 수학을 마스터하세요
                    </h1>

                    <p className="font-dnf-body-large mb-8 max-w-3xl mx-auto" style={{color: 'var(--color-text-secondary)'}}>
                      <span style={{color: 'var(--color-text-primary)'}}>진단 → 맞춤 학습 → 게임 체험</span>의 완벽한 학습 사이클로 개인별 최적화된 수학 학습을 제공합니다.
                    </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="text-white px-8 py-4 rounded-2xl font-dnf-button-large shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                style={{background: 'var(--gradient-primary)'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/diagnostic')}
              >
                <Brain className="w-6 h-6 mr-2" />
                지금 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-2xl font-dnf-button-large transition-all duration-300 flex items-center justify-center border-2 hover:opacity-80"
                style={{borderColor: 'var(--color-primary)', color: 'var(--color-primary)'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/world-map')}
              >
                <Map className="w-6 h-6 mr-2" />
                학습 경로 보기
              </motion.button>
            </div>
          </motion.div>

          {/* 학습 여정 카드들 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            {/* 1단계: 진단 테스트 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-primary-light)', borderColor: 'var(--color-primary)'}}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/diagnostic')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse mx-auto" style={{background: 'var(--color-primary)'}}>
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-bold px-2 py-1 rounded-full text-white mr-2" style={{background: 'var(--color-primary)'}}>1단계</span>
                <h3 className="font-dnf-heading-3" style={{color: 'var(--color-text-primary)'}}>진단 테스트</h3>
              </div>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>현재 실력을 정확히 파악하고<br/>맞춤형 학습 경로를 받으세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-primary)'}}>
                <span className="text-sm">진단 시작</span>
                <CheckCircle className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* 2단계: 맞춤 학습 경로 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-secondary-light)', borderColor: 'var(--color-secondary)'}}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/world-map')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce mx-auto" style={{background: 'var(--color-secondary)'}}>
                <Map className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-bold px-2 py-1 rounded-full text-white mr-2" style={{background: 'var(--color-secondary)'}}>2단계</span>
                <h3 className="font-dnf-heading-3" style={{color: 'var(--color-text-primary)'}}>맞춤 학습 경로</h3>
              </div>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>개인별 최적화된 스테이지를<br/>체계적으로 학습하세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-secondary)'}}>
                <span className="text-sm">학습 시작</span>
                <BookOpen className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* 3단계: 게임 체험 카드 */}
            <motion.div
              className="rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border text-center"
              style={{background: 'var(--color-accent-light)', borderColor: 'var(--color-accent)'}}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/animal-farm')}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse mx-auto" style={{background: 'var(--color-accent)'}}>
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-bold px-2 py-1 rounded-full text-white mr-2" style={{background: 'var(--color-accent)'}}>3단계</span>
                <h3 className="font-dnf-heading-3" style={{color: 'var(--color-text-primary)'}}>게임 체험</h3>
              </div>
              <p className="font-dnf-body-small mb-4" style={{color: 'var(--color-text-secondary)'}}>학습 완료 후 보상으로<br/>다양한 게임을 즐기세요</p>
              <div className="flex items-center justify-center font-medium" style={{color: 'var(--color-accent)'}}>
                <span className="text-sm">게임 체험</span>
                <Zap className="w-4 h-4 ml-1" />
              </div>
            </motion.div>


          </motion.div>
        </div>
      </section>

    </div>
  );
}