import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Target, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { RoadMap } from '../components/RoadMap';

export function WorldMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* 특별한 헤더 */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
            style={{background: 'var(--gradient-primary)', color: 'white'}}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Map className="w-5 h-5 mr-2" />
            🗺️ 수학 학습의 길
            <Star className="w-4 h-4 ml-2" />
          </motion.div>
          
          <motion.h1
            className="text-5xl font-bold mb-4"
            style={{color: 'var(--color-text-primary)'}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            맞춤 학습 경로
          </motion.h1>
          
                  <motion.p
                    className="text-lg max-w-2xl mx-auto mb-8"
                    style={{color: 'var(--color-text-secondary)'}}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>초등학교, 사고력 연산, 중학교</span>의 
                    <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>개인별 최적화된 스테이지</span>를 통해 
                    체계적으로 수학을 학습하고, 완료 시 <span style={{color: 'var(--color-text-primary)', fontWeight: 'bold'}}>게임 체험권</span>을 획득하세요!
                  </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
              <Target className="w-4 h-4 mr-1" />
              단계별 학습
            </div>
            <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
              <Award className="w-4 h-4 mr-1" />
              보상 시스템
            </div>
            <div className="flex items-center text-sm" style={{color: 'var(--color-text-secondary)'}}>
              <Star className="w-4 h-4 mr-1" />
              성취감
            </div>
          </motion.div>
        </div>

        {/* 길 맵 컴포넌트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <RoadMap />
        </motion.div>
      </div>
    </div>
  );
}