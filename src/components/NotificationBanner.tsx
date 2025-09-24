import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Gift, Zap, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NotificationBannerProps {
  type: 'achievement' | 'reward' | 'reminder' | 'celebration';
  title: string;
  message: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function NotificationBanner({ 
  type, 
  title, 
  message, 
  icon, 
  onClose,
  autoClose = true,
  duration = 5000
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'achievement':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'reward':
        return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
      case 'reminder':
        return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      case 'celebration':
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-6 h-6" />;
      case 'reward':
        return <Gift className="w-6 h-6" />;
      case 'reminder':
        return <Zap className="w-6 h-6" />;
      case 'celebration':
        return <Star className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-2xl ${getTypeStyles()}`}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="flex items-start space-x-3">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {icon || getDefaultIcon()}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-lg">{title}</h4>
              <p className="text-sm opacity-90 mt-1">{message}</p>
            </div>
            
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

