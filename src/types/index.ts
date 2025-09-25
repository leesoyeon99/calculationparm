// 학습 스테이지 타입
export interface Stage {
  id: number;
  title: string;
  description: string;
  difficulty: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
  expReward: number;
  cropGrowthReward: number;
  requiredLevel?: number;
  starRating: number; // 1-5 별 난이도
  plantPoints: number; // 식물점수 (나뭇잎)
  isGoldStage: boolean; // 골드스테이지 여부
}

// 동물 타입
export interface Animal {
  id: string;
  name: string;
  type: 'rabbit';
  level: 1 | 2 | 3; // 유딩(1), 초딩(2), 중딩(3)
  stage: 'baby' | 'child' | 'teen' | 'adult';
  happiness: number; // 0-100
  hunger: number; // 0-100
  energy: number; // 0-100
  experience: number; // 0-100
  position: { x: number; y: number };
  adoptedAt: Date;
  lastFed: Date;
  lastPlayed: Date;
  isReadyToEvolve: boolean;
  personality: 'shy' | 'playful' | 'studious' | 'energetic';
  color: 'brown' | 'white' | 'gray' | 'black';
  stats: {
    studyTime: number; // 총 공부시간 (분)
    gamesPlayed: number; // 플레이한 게임 수
    stagesCompleted: number; // 완료한 스테이지 수
  };
}

// 동물농장 타입
export interface AnimalFarm {
  id: string;
  name: string;
  animals: Animal[];
  resources: {
    food: number;
    toys: number;
    medicine: number;
    coins: number;
  };
  decorations: FarmDecoration[];
  level: number;
  experience: number;
}

// 농장 장식 타입
export interface FarmDecoration {
  id: string;
  type: 'fence' | 'pot' | 'background' | 'path';
  name: string;
  cost: number;
  isUnlocked: boolean;
  isPlaced: boolean;
  position?: { x: number; y: number };
}

// 소마리터 캐릭터 타입
export interface Somariter {
  name: string;
  level: number;
  experience: number;
  skin: string;
  accessories: string[];
  mood: 'happy' | 'excited' | 'encouraging' | 'thinking';
  currentMessage: string;
  energy: number;
  happiness: number;
  achievements: string[];
  unlockedOutfits: string[];
  currentOutfit: string;
  stats: {
    totalStagesCompleted: number;
    perfectScores: number;
    currentStreak: number;
    longestStreak: number;
    totalPlayTime: number;
    favoriteSubject: string;
    learningStyle: string;
    difficultyPreference: string;
  };
}

// 학습 문제 타입
export interface MathProblem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions';
}

// 보상 타입
export interface Reward {
  type: 'exp' | 'cropGrowth' | 'coins' | 'item' | 'decoration' | 'experience';
  amount: number;
  itemId?: string;
  message?: string;
}

// 업적 타입
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  completedAt?: Date;
  reward: Reward;
  requirements: {
    type: 'stagesCompleted' | 'cropsHarvested' | 'daysStreak' | 'perfectScore';
    target: number;
    current: number;
  };
}

// 게임 상태 타입
export interface GameState {
  user: {
    name: string;
    level: number;
    experience: number;
    totalStagesCompleted: number;
    totalCropsHarvested: number;
    currentStreak: number;
    longestStreak: number;
  };
  farm: AnimalFarm;
  somariter: Somariter;
  stages: Stage[];
  achievements: Achievement[];
  currentStage?: Stage;
  isPlaying: boolean;
  lastPlayedAt: Date;
}

