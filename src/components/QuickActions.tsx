import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Sprout, 
  Brain, 
  Map, 
  User, 
  Trophy, 
  Settings, 
  BookOpen,
  Target,
  Zap
} from 'lucide-react';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  color: string;
  bgColor: string;
  delay?: number;
}

const QuickAction = ({ icon, title, subtitle, href, color, bgColor, delay = 0 }: QuickActionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Link
      to={href}
      className={`block p-4 rounded-xl ${bgColor} hover:shadow-lg transition-all duration-300 hover:scale-105`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </Link>
  </motion.div>
);

export function QuickActions() {
  const actions = [
    {
      icon: <Play className="w-6 h-6 text-white" />,
      title: '학습 시작',
      subtitle: '스테이지를 선택해서 시작하세요',
      href: '/world-map',
      color: 'bg-farm-green',
      bgColor: 'bg-green-50 hover:bg-green-100',
      delay: 0
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: '진단 테스트',
      subtitle: '현재 실력을 확인해보세요',
      href: '/diagnostic',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      delay: 0.1
    },
    {
      icon: <Sprout className="w-6 h-6 text-white" />,
      title: '내 농장',
      subtitle: '작물을 키우고 관리하세요',
      href: '/farm',
      color: 'bg-farm-brown',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      delay: 0.2
    },
    {
      icon: <User className="w-6 h-6 text-white" />,
      title: '소마리터',
      subtitle: '캐릭터와 업적을 확인하세요',
      href: '/somariter',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      delay: 0.3
    }
  ];

  return (
    <div className="space-y-3">
      {actions.map((action, index) => (
        <QuickAction key={index} {...action} />
      ))}
    </div>
  );
}

export function QuickActionGrid() {
  const gridActions = [
    {
      icon: <Target className="w-8 h-8 text-farm-green" />,
      title: '월드맵',
      href: '/world-map',
      delay: 0
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: '진단',
      href: '/diagnostic',
      delay: 0.1
    },
    {
      icon: <Sprout className="w-8 h-8 text-farm-brown" />,
      title: '농장',
      href: '/farm',
      delay: 0.2
    },
    {
      icon: <User className="w-8 h-8 text-blue-500" />,
      title: '소마리터',
      href: '/somariter',
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {gridActions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: action.delay }}
        >
          <Link
            to={action.href}
            className="farm-card p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 block"
          >
            <div className="mb-2">{action.icon}</div>
            <div className="text-sm font-medium text-gray-800">{action.title}</div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}


