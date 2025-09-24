import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { RoadMap } from '../components/RoadMap';

export function WorldMapPage() {
  return (
    <div className="space-y-6 pb-20">
      {/* 헤더 */}
      <div className="flex items-center space-x-4 mb-6">
        <Link
          to="/"
          className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">학습의 길</h1>
          <p className="text-gray-600">소마리터와 함께 수학의 여정을 떠나보세요!</p>
        </div>
      </div>

      {/* 길 맵 컴포넌트 */}
      <RoadMap />
    </div>
  );
}