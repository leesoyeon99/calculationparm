import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function FarmPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // FarmPage를 AnimalFarmPage로 리다이렉트
    navigate('/animal-farm', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-sky to-green-200 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <div className="text-xl font-semibold text-gray-700">
          동물농장으로 이동 중...
        </div>
      </div>
    </div>
  );
}