import { useCallback } from 'react';

interface SoundOptions {
  volume?: number;
  playbackRate?: number;
}

export function useSound() {
  const playSound = useCallback((soundType: string, options: SoundOptions = {}) => {
    // 실제 프로덕션에서는 Web Audio API나 사운드 라이브러리를 사용
    // 여기서는 시각적 피드백만 제공
    
    // 진동 피드백 (모바일에서만)
    if ('vibrate' in navigator) {
      switch (soundType) {
        case 'click':
          navigator.vibrate(50);
          break;
        case 'success':
          navigator.vibrate([100, 50, 100]);
          break;
        case 'error':
          navigator.vibrate([200, 100, 200]);
          break;
        case 'levelup':
          navigator.vibrate([100, 50, 100, 50, 100]);
          break;
        default:
          navigator.vibrate(30);
      }
    }
  }, []);

  const playClick = useCallback(() => playSound('click'), [playSound]);
  const playSuccess = useCallback(() => playSound('success'), [playSound]);
  const playError = useCallback(() => playSound('error'), [playSound]);
  const playLevelUp = useCallback(() => playSound('levelup'), [playSound]);

  return {
    playClick,
    playSuccess,
    playError,
    playLevelUp,
    playSound
  };
}

