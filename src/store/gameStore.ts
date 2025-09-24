import { create } from 'zustand';
import { GameState, Stage, Animal, AnimalFarm, Somariter, Achievement } from '../types';

interface GameStore extends GameState {
  // Actions
  completeStage: (stageId: number) => void;
  adoptAnimal: (animalType: Animal['type'], level: Animal['level'], position: { x: number; y: number }) => void;
  feedAnimal: (animalId: string) => void;
  playWithAnimal: (animalId: string) => void;
  trainAnimal: (animalId: string) => void;
  updateAnimalStats: (animalId: string, stats: Partial<Pick<Animal, 'happiness' | 'hunger' | 'energy' | 'experience'>>) => void;
  addExperience: (amount: number) => void;
  addCoins: (amount: number) => void;
  unlockStage: (stageId: number) => void;
  setCurrentStage: (stageId: number) => void;
  updateSomariterMood: (mood: Somariter['mood'], message: string) => void;
  checkAchievements: () => void;
  resetGame: () => void;
}

// 초등학교 1-6학년, 중학교 1-3학년 커리큘럼 스테이지 생성
const generateStages = (): Stage[] => {
  const stages: Stage[] = [];
  
  const curriculumStages = [
    // 초등학교 1학년
    { id: 1, title: "100까지의 수", description: "1부터 100까지의 수를 읽고 쓰기", grade: 1, difficulty: 1, starRating: 1, plantPoints: 10, isGoldStage: false },
    { id: 2, title: "한 자리 수 덧셈", description: "한 자리 수의 덧셈하기", grade: 1, difficulty: 1, starRating: 1, plantPoints: 10, isGoldStage: false },
    { id: 3, title: "한 자리 수 뺄셈", description: "한 자리 수의 뺄셈하기", grade: 1, difficulty: 1, starRating: 1, plantPoints: 10, isGoldStage: false },
    { id: 4, title: "두 자리 수 덧셈", description: "받아올림 없는 두 자리 수 덧셈", grade: 1, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },
    { id: 5, title: "두 자리 수 뺄셈", description: "받아내림 없는 두 자리 수 뺄셈", grade: 1, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },
    { id: 6, title: "시계 보기", description: "몇 시, 몇 시 30분 읽기", grade: 1, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },
    { id: 7, title: "길이와 무게 비교", description: "길이, 무게, 들이의 비교하기", grade: 1, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },
    { id: 8, title: "그림그래프", description: "그림그래프 읽고 만들기", grade: 1, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },
    { id: 9, title: "평면도형과 입체도형", description: "평면도형·입체도형 모양 알기", grade: 1, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },

    // 초등학교 2학년
    { id: 10, title: "세 자리 수", description: "세 자리 수 읽고 쓰기", grade: 2, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },
    { id: 11, title: "네 자리 수", description: "네 자리 수 읽고 쓰기", grade: 2, difficulty: 2, starRating: 2, plantPoints: 15, isGoldStage: false },
    { id: 12, title: "세 자리 수 덧셈", description: "세 자리 수의 덧셈하기", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },
    { id: 13, title: "세 자리 수 뺄셈", description: "세 자리 수의 뺄셈하기", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },
    { id: 14, title: "곱셈구구", description: "2단부터 9단까지의 곱셈구구", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },
    { id: 15, title: "두 자리 수 곱셈", description: "두 자리 수의 곱셈하기", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },
    { id: 16, title: "시간과 달력", description: "시간(시·분), 달력(일, 주, 월, 년)", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },
    { id: 17, title: "막대그래프", description: "막대그래프 읽고 만들기", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },
    { id: 18, title: "각도 기초", description: "각도의 기본 개념 알기", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },
    { id: 19, title: "규칙 찾기", description: "수와 도형의 규칙 찾기", grade: 2, difficulty: 3, starRating: 3, plantPoints: 20, isGoldStage: false },

    // 초등학교 3학년
    { id: 20, title: "분수 기초", description: "분수의 개념과 기본 연산", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 21, title: "소수 기초", description: "소수의 개념과 기본 연산", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 22, title: "세 자리 수 곱셈", description: "세 자리 수 × 한 자리 수", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 23, title: "세 자리 수 나눗셈", description: "세 자리 ÷ 한 자리", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 24, title: "약수와 배수", description: "약수와 배수의 개념과 구하기", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 25, title: "도형의 구성 요소", description: "도형의 구성 요소 알기", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 26, title: "직사각형과 정사각형", description: "직사각형·정사각형의 성질", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 27, title: "들이와 무게의 합과 차", description: "들이, 무게의 합과 차 구하기", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 28, title: "꺾은선그래프", description: "꺾은선그래프 읽고 만들기", grade: 3, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },

    // 초등학교 4학년
    { id: 29, title: "분모가 같은 분수의 덧셈·뺄셈", description: "분모가 같은 분수의 덧셈·뺄셈", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 30, title: "분수와 소수의 덧셈·뺄셈", description: "분수와 소수의 덧셈·뺄셈", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 31, title: "두 자리 나눗셈", description: "두 자리 ÷ 두 자리", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 32, title: "삼각형과 사각형의 성질", description: "삼각형·사각형의 성질", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 33, title: "평행과 수직", description: "평행·수직의 개념", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 34, title: "각도와 각의 합·차", description: "각도와 각의 합·차 구하기", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 35, title: "다각형의 둘레와 넓이", description: "다각형의 둘레와 넓이 구하기", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },
    { id: 36, title: "원그래프", description: "원그래프 읽고 만들기", grade: 4, difficulty: 4, starRating: 4, plantPoints: 25, isGoldStage: false },

    // 초등학교 5학년
    { id: 37, title: "약분과 통분", description: "약분·통분의 개념과 방법", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 38, title: "분모 다른 분수의 덧셈·뺄셈", description: "분모가 다른 분수의 덧셈·뺄셈", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 39, title: "분수의 곱셈", description: "분수의 곱셈하기", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 40, title: "소수의 곱셈", description: "소수의 곱셈하기", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 41, title: "합동과 대칭", description: "합동과 대칭의 개념", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 42, title: "원의 구성 요소", description: "원의 구성 요소 알기", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 43, title: "직육면체와 각기둥의 부피와 겉넓이", description: "직육면체·각기둥의 부피와 겉넓이", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 44, title: "평균", description: "평균 구하기", grade: 5, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },

    // 초등학교 6학년
    { id: 45, title: "분수의 나눗셈", description: "분수의 나눗셈하기", grade: 6, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 46, title: "소수의 나눗셈", description: "소수의 나눗셈하기", grade: 6, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 47, title: "비와 비율", description: "비와 비율, 비례식과 비례배분", grade: 6, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 48, title: "원의 넓이", description: "원의 넓이 구하기", grade: 6, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 49, title: "입체도형의 성질", description: "각뿔, 원기둥, 원뿔, 구의 성질", grade: 6, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 50, title: "경우의 수 기초", description: "경우의 수 기초 개념", grade: 6, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 51, title: "일이 일어날 가능성", description: "일이 일어날 가능성", grade: 6, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },

    // 중학교 1학년
    { id: 52, title: "정수와 유리수", description: "정수와 유리수의 개념과 연산", grade: 7, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 53, title: "문자와 식", description: "문자와 식, 일차식", grade: 7, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 54, title: "좌표와 그래프", description: "좌표와 그래프", grade: 7, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 55, title: "정비례와 반비례", description: "정비례·반비례", grade: 7, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 56, title: "평면도형 기본 성질", description: "평면도형 기본 성질", grade: 7, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 57, title: "입체도형 성질", description: "입체도형 성질", grade: 7, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 58, title: "도수분포표와 그래프", description: "도수분포표·그래프, 평균·중앙값", grade: 7, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },

    // 중학교 2학년
    { id: 59, title: "유리수와 순환소수", description: "유리수와 순환소수", grade: 8, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 60, title: "일차방정식", description: "일차방정식, 연립일차방정식", grade: 8, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 61, title: "일차부등식", description: "일차부등식", grade: 8, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 62, title: "일차함수와 그래프", description: "일차함수와 그래프", grade: 8, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 63, title: "평행선과 닮음", description: "평행선과 닮음", grade: 8, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 64, title: "피타고라스 정리", description: "피타고라스 정리", grade: 8, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 65, title: "확률 기초", description: "확률 기초", grade: 8, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },

    // 중학교 3학년
    { id: 66, title: "다항식", description: "다항식, 곱셈과 인수분해", grade: 9, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 67, title: "이차방정식", description: "이차방정식", grade: 9, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 68, title: "이차함수와 그래프", description: "이차함수와 그래프", grade: 9, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 69, title: "삼각비", description: "삼각비", grade: 9, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 70, title: "원의 성질", description: "원의 성질", grade: 9, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true },
    { id: 71, title: "통계 심화", description: "산포도, 상자그림, 산점도", grade: 9, difficulty: 5, starRating: 5, plantPoints: 30, isGoldStage: true }
  ];

  curriculumStages.forEach(stageData => {
    const newStage: Stage = {
      id: stageData.id,
      title: stageData.title,
      description: stageData.description,
      difficulty: stageData.difficulty,
      expReward: stageData.difficulty * 25,
      cropGrowthReward: stageData.difficulty * 5,
      isUnlocked: true,
      isCompleted: false,
      isCurrent: false,
      starRating: stageData.starRating,
      plantPoints: stageData.plantPoints,
      isGoldStage: stageData.isGoldStage
    };
    stages.push(newStage);
  });

  return stages;
};

const initialStages: Stage[] = generateStages();

const initialFarm: AnimalFarm = {
  id: 'main-farm',
  name: '소마리터의 동물농장',
  animals: [],
  resources: {
    food: 100,
    toys: 50,
    medicine: 30,
    coins: 1000,
  },
  decorations: [],
  level: 1,
  experience: 0,
};

const initialSomariter: Somariter = {
  name: '소마리터',
  level: 1,
  experience: 0,
  skin: 'default',
  accessories: [],
  mood: 'happy',
  currentMessage: '안녕! 수학을 함께 배워보자!',
  energy: 100,
  happiness: 100,
  achievements: [],
  unlockedOutfits: ['default'],
  currentOutfit: 'default',
  stats: {
    totalStagesCompleted: 0,
    perfectScores: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalPlayTime: 0,
    favoriteSubject: 'arithmetic',
    learningStyle: 'visual',
    difficultyPreference: 'adaptive'
  }
};

const initialAchievements: Achievement[] = [
  {
    id: 'first_stage',
    title: '첫 걸음',
    description: '첫 번째 스테이지를 완료했어요!',
    icon: '🎯',
    isCompleted: false,
    completedAt: undefined,
    reward: { type: 'experience', amount: 50 },
    requirements: {
      type: 'stagesCompleted',
      target: 1,
      current: 0
    }
  },
  {
    id: 'math_master',
    title: '수학 마스터',
    description: '10개의 스테이지를 완료했어요!',
    icon: '🏆',
    isCompleted: false,
    completedAt: undefined,
    reward: { type: 'experience', amount: 200 },
    requirements: {
      type: 'stagesCompleted',
      target: 10,
      current: 0
    }
  },
  {
    id: 'perfect_score',
    title: '완벽한 점수',
    description: '첫 번째 완벽한 점수를 받았어요!',
    icon: '⭐',
    isCompleted: false,
    completedAt: undefined,
    reward: { type: 'experience', amount: 100 },
    requirements: {
      type: 'perfectScore',
      target: 1,
      current: 0
    }
  }
];

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  user: {
    name: '수학 학습자',
    level: 1,
    experience: 0,
    totalStagesCompleted: 0,
    totalCropsHarvested: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
  farm: initialFarm,
  somariter: initialSomariter,
  stages: initialStages,
  achievements: initialAchievements,
  currentStage: undefined,
  isPlaying: false,
  lastPlayedAt: new Date(),

  // Actions
  completeStage: (stageId) => {
    const { stages, user, farm, somariter } = get();
    const stage = stages.find(s => s.id === stageId);
    if (!stage || !stage.isUnlocked) return;

    const updatedStages = stages.map(s => 
      s.id === stageId 
        ? { ...s, isCompleted: true, isCurrent: false }
        : s
    );

    // 다음 스테이지 잠금 해제
    const nextStage = stages.find(s => s.id === stageId + 1);
    if (nextStage) {
      nextStage.isUnlocked = true;
      nextStage.isCurrent = true;
    }

    // 경험치 및 작물 성장 보상
    const newExp = user.experience + stage.expReward;
    const newLevel = Math.floor(newExp / 100) + 1;
    const newFood = farm.resources.food + stage.cropGrowthReward;

    set({
      stages: updatedStages,
      user: {
        ...user,
        experience: newExp,
        level: newLevel,
        totalStagesCompleted: user.totalStagesCompleted + 1,
      },
      farm: {
        ...farm,
        resources: {
          ...farm.resources,
          food: newFood,
        },
        experience: newExp,
        level: newLevel,
      },
      somariter: {
        ...somariter,
        mood: 'excited',
        currentMessage: `훌륭해! ${stage.title}을 완료했어! 🎉`,
        experience: somariter.experience + stage.expReward,
        energy: Math.max(somariter.energy - 10, 0),
        happiness: Math.min(somariter.happiness + 5, 100),
      },
    });

    get().checkAchievements();
  },

  adoptAnimal: (animalType, level, position) => {
    const { farm } = get();
    const levelNames = { 1: '유딩', 2: '초딩', 3: '중딩' };
    const stageNames = { 1: 'baby', 2: 'child', 3: 'teen' } as const;
    const personalities = ['shy', 'playful', 'studious', 'energetic'] as const;
    const colors = ['brown', 'white', 'gray', 'black'] as const;
    
    const newAnimal: Animal = {
      id: `animal-${Date.now()}`,
      name: `${levelNames[level]} 토끼`,
      type: animalType,
      level,
      stage: stageNames[level],
      happiness: 80,
      hunger: 50,
      energy: 70,
      experience: 0,
      position,
      adoptedAt: new Date(),
      lastFed: new Date(),
      lastPlayed: new Date(),
      isReadyToEvolve: false,
      personality: personalities[Math.floor(Math.random() * personalities.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    set({
      farm: {
        ...farm,
        animals: [...farm.animals, newAnimal],
      },
    });
  },

  feedAnimal: (animalId) => {
    const { farm, somariter } = get();
    const updatedAnimals = farm.animals.map(animal => {
      if (animal.id === animalId) {
        const newHunger = Math.min(animal.hunger + 20, 100);
        const newHappiness = Math.min(animal.happiness + 10, 100);
        
        return {
          ...animal,
          hunger: newHunger,
          happiness: newHappiness,
          lastFed: new Date(),
        };
      }
      return animal;
    });

    set({
      farm: {
        ...farm,
        animals: updatedAnimals,
        resources: {
          ...farm.resources,
          food: Math.max(farm.resources.food - 5, 0),
        },
      },
      somariter: {
        ...somariter,
        mood: 'happy',
        currentMessage: '맛있게 먹고 있네! 🥕',
      },
    });
  },

  playWithAnimal: (animalId) => {
    const { farm, somariter } = get();
    const updatedAnimals = farm.animals.map(animal => {
      if (animal.id === animalId) {
        const newHappiness = Math.min(animal.happiness + 15, 100);
        const newEnergy = Math.max(animal.energy - 10, 0);
        
        return {
          ...animal,
          happiness: newHappiness,
          energy: newEnergy,
          lastPlayed: new Date(),
        };
      }
      return animal;
    });

    set({
      farm: {
        ...farm,
        animals: updatedAnimals,
        resources: {
          ...farm.resources,
          toys: Math.max(farm.resources.toys - 2, 0),
        },
      },
      somariter: {
        ...somariter,
        mood: 'happy',
        currentMessage: '재미있게 놀고 있네! 🎾',
      },
    });
  },

  trainAnimal: (animalId) => {
    const { farm, somariter } = get();
    const updatedAnimals = farm.animals.map(animal => {
      if (animal.id === animalId) {
        const newExperience = Math.min(animal.experience + 25, 100);
        const newHappiness = Math.min(animal.happiness + 5, 100);
        const newEnergy = Math.max(animal.energy - 15, 0);
        
        return {
          ...animal,
          experience: newExperience,
          happiness: newHappiness,
          energy: newEnergy,
          isReadyToEvolve: newExperience >= 100,
        };
      }
      return animal;
    });

    set({
      farm: {
        ...farm,
        animals: updatedAnimals,
        resources: {
          ...farm.resources,
          medicine: Math.max(farm.resources.medicine - 1, 0),
        },
      },
      somariter: {
        ...somariter,
        mood: 'excited',
        currentMessage: '열심히 훈련하고 있네! 📚',
      },
    });
  },

  updateAnimalStats: (animalId, stats) => {
    const { farm } = get();
    const updatedAnimals = farm.animals.map(animal => {
      if (animal.id === animalId) {
        return {
          ...animal,
          ...stats,
        };
      }
      return animal;
    });

    set({
      farm: {
        ...farm,
        animals: updatedAnimals,
      },
    });
  },

  addExperience: (amount) => {
    const { user, farm, somariter } = get();
    const newExp = user.experience + amount;
    const newLevel = Math.floor(newExp / 100) + 1;

    set({
      user: {
        ...user,
        experience: newExp,
        level: newLevel,
      },
      farm: {
        ...farm,
        experience: newExp,
        level: newLevel,
      },
      somariter: {
        ...somariter,
        experience: somariter.experience + amount,
        level: newLevel,
        mood: 'excited',
        currentMessage: `레벨업! ${newLevel}레벨이 되었어! 🎉`,
      },
    });
  },

  addCoins: (amount) => {
    const { farm } = get();
    set({
      farm: {
        ...farm,
        resources: {
          ...farm.resources,
          coins: farm.resources.coins + amount,
        },
      },
    });
  },

  unlockStage: (stageId) => {
    const { stages } = get();
    const updatedStages = stages.map(stage =>
      stage.id === stageId ? { ...stage, isUnlocked: true } : stage
    );

    set({ stages: updatedStages });
  },

  setCurrentStage: (stageId) => {
    const { stages } = get();
    const updatedStages = stages.map(stage => ({
      ...stage,
      isCurrent: stage.id === stageId
    }));

    set({ 
      stages: updatedStages,
      currentStage: stages.find(s => s.id === stageId),
      isPlaying: true,
      lastPlayedAt: new Date()
    });
  },

  updateSomariterMood: (mood, message) => {
    const { somariter } = get();
    set({
      somariter: {
        ...somariter,
        mood,
        currentMessage: message,
      },
    });
  },

  checkAchievements: () => {
    const { user, achievements } = get();
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.isCompleted) return achievement;

      let current = 0;
      switch (achievement.requirements.type) {
        case 'stagesCompleted':
          current = user.totalStagesCompleted;
          break;
        case 'cropsHarvested':
          current = user.totalCropsHarvested;
          break;
        case 'daysStreak':
          current = user.currentStreak;
          break;
        case 'perfectScore':
          current = 0; // This would need to be tracked separately
          break;
      }

      if (current >= achievement.requirements.target) {
        return {
          ...achievement,
          isCompleted: true,
          completedAt: new Date(),
        };
      }

      return {
        ...achievement,
        requirements: {
          ...achievement.requirements,
          current,
        },
      };
    });

    set({ achievements: updatedAchievements });
  },

  resetGame: () => {
    set({
      user: {
        name: '수학 학습자',
        level: 1,
        experience: 0,
        totalStagesCompleted: 0,
        totalCropsHarvested: 0,
        currentStreak: 0,
        longestStreak: 0,
      },
      farm: initialFarm,
      somariter: initialSomariter,
      stages: initialStages,
      achievements: initialAchievements,
      currentStage: undefined,
      isPlaying: false,
      lastPlayedAt: new Date(),
    });
  },
}));