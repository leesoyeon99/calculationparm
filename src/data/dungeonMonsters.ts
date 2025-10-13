// 던전 게임용 몬스터 데이터
import { DungeonQuestion } from './dungeonQuestions';

export interface MonsterType {
  name: string;
  emoji: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  expReward: number;
  goldReward: number;
  isBoss: boolean;
  description: string;
}

// 난이도 1 - 초급 몬스터
export const easyMonsters: MonsterType[] = [
  {
    name: '슬라임',
    emoji: '🟢',
    hp: 30,
    maxHp: 30,
    attack: 5,
    defense: 0,
    difficulty: 1,
    expReward: 10,
    goldReward: 5,
    isBoss: false,
    description: '가장 약한 몬스터입니다.'
  },
  {
    name: '작은 슬라임',
    emoji: '🔵',
    hp: 20,
    maxHp: 20,
    attack: 3,
    defense: 0,
    difficulty: 1,
    expReward: 8,
    goldReward: 3,
    isBoss: false,
    description: '슬라임보다 더 약합니다.'
  },
  {
    name: '달팽이',
    emoji: '🐌',
    hp: 25,
    maxHp: 25,
    attack: 4,
    defense: 2,
    difficulty: 1,
    expReward: 10,
    goldReward: 4,
    isBoss: false,
    description: '느리지만 방어력이 있습니다.'
  }
];

// 난이도 2 - 중급 몬스터
export const mediumMonsters: MonsterType[] = [
  {
    name: '고블린',
    emoji: '👺',
    hp: 50,
    maxHp: 50,
    attack: 8,
    defense: 2,
    difficulty: 2,
    expReward: 20,
    goldReward: 10,
    isBoss: false,
    description: '약한 무리 몬스터입니다.'
  },
  {
    name: '박쥐',
    emoji: '🦇',
    hp: 40,
    maxHp: 40,
    attack: 10,
    defense: 0,
    difficulty: 2,
    expReward: 18,
    goldReward: 8,
    isBoss: false,
    description: '빠르고 공격력이 높습니다.'
  },
  {
    name: '거미',
    emoji: '🕷️',
    hp: 45,
    maxHp: 45,
    attack: 9,
    defense: 1,
    difficulty: 2,
    expReward: 19,
    goldReward: 9,
    isBoss: false,
    description: '독을 가진 몬스터입니다.'
  },
  {
    name: '늑대',
    emoji: '🐺',
    hp: 55,
    maxHp: 55,
    attack: 12,
    defense: 3,
    difficulty: 2,
    expReward: 22,
    goldReward: 11,
    isBoss: false,
    description: '빠르고 날카로운 이빨을 가졌습니다.'
  }
];

// 난이도 3 - 고급 몬스터
export const hardMonsters: MonsterType[] = [
  {
    name: '오크',
    emoji: '👹',
    hp: 80,
    maxHp: 80,
    attack: 15,
    defense: 5,
    difficulty: 3,
    expReward: 35,
    goldReward: 18,
    isBoss: false,
    description: '강한 힘을 가진 전사입니다.'
  },
  {
    name: '스켈레톤',
    emoji: '💀',
    hp: 70,
    maxHp: 70,
    attack: 18,
    defense: 3,
    difficulty: 3,
    expReward: 32,
    goldReward: 16,
    isBoss: false,
    description: '언데드 전사입니다.'
  },
  {
    name: '트롤',
    emoji: '👿',
    hp: 100,
    maxHp: 100,
    attack: 20,
    defense: 8,
    difficulty: 3,
    expReward: 40,
    goldReward: 20,
    isBoss: false,
    description: '거대한 괴물입니다.'
  },
  {
    name: '마법사 고블린',
    emoji: '🧙',
    hp: 60,
    maxHp: 60,
    attack: 25,
    defense: 2,
    difficulty: 3,
    expReward: 38,
    goldReward: 19,
    isBoss: false,
    description: '마법을 사용하는 고블린입니다.'
  }
];

// 난이도 4 - 엘리트 몬스터
export const eliteMonsters: MonsterType[] = [
  {
    name: '미노타우로스',
    emoji: '🐮',
    hp: 150,
    maxHp: 150,
    attack: 30,
    defense: 10,
    difficulty: 4,
    expReward: 60,
    goldReward: 30,
    isBoss: false,
    description: '미궁의 강력한 수호자입니다.'
  },
  {
    name: '드레이크',
    emoji: '🦎',
    hp: 130,
    maxHp: 130,
    attack: 35,
    defense: 8,
    difficulty: 4,
    expReward: 55,
    goldReward: 28,
    isBoss: false,
    description: '어린 드래곤입니다.'
  },
  {
    name: '다크 나이트',
    emoji: '⚔️',
    hp: 140,
    maxHp: 140,
    attack: 32,
    defense: 12,
    difficulty: 4,
    expReward: 58,
    goldReward: 29,
    isBoss: false,
    description: '타락한 기사입니다.'
  },
  {
    name: '고대 골렘',
    emoji: '🗿',
    hp: 180,
    maxHp: 180,
    attack: 28,
    defense: 15,
    difficulty: 4,
    expReward: 62,
    goldReward: 31,
    isBoss: false,
    description: '강철 같은 방어력을 가졌습니다.'
  }
];

// 난이도 5 - 보스 몬스터
export const bossMonsters: MonsterType[] = [
  {
    name: '레드 드래곤',
    emoji: '🐉',
    hp: 300,
    maxHp: 300,
    attack: 50,
    defense: 20,
    difficulty: 5,
    expReward: 150,
    goldReward: 100,
    isBoss: true,
    description: '불을 뿜는 강력한 드래곤입니다!'
  },
  {
    name: '데몬 로드',
    emoji: '😈',
    hp: 280,
    maxHp: 280,
    attack: 55,
    defense: 18,
    difficulty: 5,
    expReward: 145,
    goldReward: 95,
    isBoss: true,
    description: '암흑의 군주입니다!'
  },
  {
    name: '리치 킹',
    emoji: '👻',
    hp: 250,
    maxHp: 250,
    attack: 60,
    defense: 15,
    difficulty: 5,
    expReward: 140,
    goldReward: 90,
    isBoss: true,
    description: '언데드의 왕입니다!'
  },
  {
    name: '타이탄',
    emoji: '⚡',
    hp: 350,
    maxHp: 350,
    attack: 45,
    defense: 25,
    difficulty: 5,
    expReward: 160,
    goldReward: 110,
    isBoss: true,
    description: '거대한 신화 속 존재입니다!'
  },
  {
    name: '수학의 신',
    emoji: '🧮',
    hp: 500,
    maxHp: 500,
    attack: 70,
    defense: 30,
    difficulty: 5,
    expReward: 200,
    goldReward: 150,
    isBoss: true,
    description: '최종 보스! 모든 수학 지식을 시험합니다!'
  }
];

// 모든 몬스터를 난이도별로 내보내기
export const monstersByDifficulty = {
  1: easyMonsters,
  2: mediumMonsters,
  3: hardMonsters,
  4: eliteMonsters,
  5: bossMonsters
};

// 모든 몬스터를 하나의 배열로
export const allMonsters = [
  ...easyMonsters,
  ...mediumMonsters,
  ...hardMonsters,
  ...eliteMonsters,
  ...bossMonsters
];

// 난이도에 맞는 랜덤 몬스터 가져오기
export const getRandomMonsterByDifficulty = (difficulty: 1 | 2 | 3 | 4 | 5): MonsterType => {
  const monsters = monstersByDifficulty[difficulty];
  const randomIndex = Math.floor(Math.random() * monsters.length);
  return monsters[randomIndex];
};

// 층수에 따라 적절한 난이도의 몬스터들 가져오기
export const getMonstersForFloor = (floor: number): MonsterType[] => {
  let difficulty: 1 | 2 | 3 | 4 | 5;
  
  if (floor <= 2) {
    difficulty = 1; // 1-2층: 쉬움
  } else if (floor <= 4) {
    difficulty = 2; // 3-4층: 중간
  } else if (floor <= 6) {
    difficulty = 3; // 5-6층: 어려움
  } else if (floor <= 8) {
    difficulty = 4; // 7-8층: 엘리트
  } else {
    difficulty = 5; // 9층 이상: 보스
  }
  
  // 보스층 (5의 배수)인 경우 보스 몬스터만
  if (floor % 5 === 0) {
    return [getRandomMonsterByDifficulty(5)];
  }
  
  // 일반층: 난이도에 맞는 몬스터 여러 마리
  const monsterCount = Math.min(3 + Math.floor(floor / 2), 6);
  const monsters: MonsterType[] = [];
  
  for (let i = 0; i < monsterCount; i++) {
    monsters.push(getRandomMonsterByDifficulty(difficulty));
  }
  
  return monsters;
};

