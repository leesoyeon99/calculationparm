// 레이싱 게임용 수학 문제 데이터

export interface RacingQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  speedBoost: number;
  difficulty: 1 | 2 | 3;
  category: 'speed' | 'distance' | 'time' | 'arithmetic' | 'thinking';
}

// 쉬운 문제 (난이도 1)
const easyQuestions: RacingQuestion[] = [
  {
    id: 'easy_1',
    question: '자동차가 시속 50km로 2시간 달리면 몇 km?',
    options: ['100km', '50km', '75km', '120km'],
    correct: 0,
    explanation: '속도 × 시간 = 거리\n50km/h × 2h = 100km',
    speedBoost: 20,
    difficulty: 1,
    category: 'distance'
  },
  {
    id: 'easy_2',
    question: '5 + 3 × 2 = ?',
    options: ['11', '16', '13', '10'],
    correct: 0,
    explanation: '곱셈 먼저! 3 × 2 = 6\n그 다음 5 + 6 = 11',
    speedBoost: 15,
    difficulty: 1,
    category: 'arithmetic'
  },
  {
    id: 'easy_3',
    question: '100km를 시속 50km로 달리면 몇 시간?',
    options: ['2시간', '1시간', '3시간', '4시간'],
    correct: 0,
    explanation: '시간 = 거리 ÷ 속도\n100km ÷ 50km/h = 2시간',
    speedBoost: 18,
    difficulty: 1,
    category: 'time'
  },
  {
    id: 'easy_4',
    question: '10 + 5 - 3 = ?',
    options: ['12', '10', '15', '8'],
    correct: 0,
    explanation: '왼쪽부터 차례로 계산!\n10 + 5 = 15, 15 - 3 = 12',
    speedBoost: 15,
    difficulty: 1,
    category: 'arithmetic'
  },
  {
    id: 'easy_5',
    question: '2시간 30분은 몇 분?',
    options: ['150분', '120분', '180분', '200분'],
    correct: 0,
    explanation: '1시간 = 60분\n2시간 = 120분, 120 + 30 = 150분',
    speedBoost: 20,
    difficulty: 1,
    category: 'time'
  }
];

// 중간 문제 (난이도 2)
const mediumQuestions: RacingQuestion[] = [
  {
    id: 'medium_1',
    question: '시속 80km로 3시간 30분 달리면 몇 km?',
    options: ['280km', '240km', '320km', '300km'],
    correct: 0,
    explanation: '3시간 30분 = 3.5시간\n80km/h × 3.5h = 280km',
    speedBoost: 25,
    difficulty: 2,
    category: 'distance'
  },
  {
    id: 'medium_2',
    question: '(5 + 3) × 4 = ?',
    options: ['32', '23', '20', '17'],
    correct: 0,
    explanation: '괄호 먼저! (5 + 3) = 8\n8 × 4 = 32',
    speedBoost: 20,
    difficulty: 2,
    category: 'arithmetic'
  },
  {
    id: 'medium_3',
    question: '300km를 시속 75km로 달리면 몇 시간?',
    options: ['4시간', '3시간', '5시간', '6시간'],
    correct: 0,
    explanation: '시간 = 거리 ÷ 속도\n300km ÷ 75km/h = 4시간',
    speedBoost: 25,
    difficulty: 2,
    category: 'time'
  },
  {
    id: 'medium_4',
    question: '12 ÷ 3 + 2 × 5 = ?',
    options: ['14', '12', '16', '20'],
    correct: 0,
    explanation: '나눗셈과 곱셈 먼저!\n12 ÷ 3 = 4, 2 × 5 = 10\n4 + 10 = 14',
    speedBoost: 22,
    difficulty: 2,
    category: 'arithmetic'
  },
  {
    id: 'medium_5',
    question: 'A 자동차는 시속 60km, B는 시속 80km. B가 A보다 시속 몇 km 빠른가?',
    options: ['20km', '30km', '40km', '10km'],
    correct: 0,
    explanation: '속도 차이 = 80 - 60 = 20km/h',
    speedBoost: 23,
    difficulty: 2,
    category: 'speed'
  }
];

// 어려운 문제 (난이도 3)
const hardQuestions: RacingQuestion[] = [
  {
    id: 'hard_1',
    question: '시속 120km로 45분 달리면 몇 km?',
    options: ['90km', '60km', '80km', '100km'],
    correct: 0,
    explanation: '45분 = 0.75시간\n120km/h × 0.75h = 90km',
    speedBoost: 30,
    difficulty: 3,
    category: 'distance'
  },
  {
    id: 'hard_2',
    question: '(8 + 4) ÷ 3 + 5 × 2 = ?',
    options: ['14', '12', '16', '18'],
    correct: 0,
    explanation: '(8 + 4) = 12, 12 ÷ 3 = 4\n5 × 2 = 10, 4 + 10 = 14',
    speedBoost: 28,
    difficulty: 3,
    category: 'arithmetic'
  },
  {
    id: 'hard_3',
    question: '540km를 시속 90km로 달리면 몇 시간 몇 분?',
    options: ['6시간', '5시간', '7시간', '8시간'],
    correct: 0,
    explanation: '540km ÷ 90km/h = 6시간',
    speedBoost: 30,
    difficulty: 3,
    category: 'time'
  },
  {
    id: 'hard_4',
    question: '20 - 8 ÷ 2 + 3 × 4 = ?',
    options: ['28', '24', '32', '20'],
    correct: 0,
    explanation: '나눗셈과 곱셈 먼저!\n8 ÷ 2 = 4, 3 × 4 = 12\n20 - 4 + 12 = 28',
    speedBoost: 27,
    difficulty: 3,
    category: 'arithmetic'
  },
  {
    id: 'hard_5',
    question: 'A는 시속 60km로 3시간, B는 시속 80km로 2시간 달렸다. 누가 더 멀리 갔나?',
    options: ['A가 20km 더 멀리', 'B가 20km 더 멀리', '같다', 'A가 40km 더 멀리'],
    correct: 0,
    explanation: 'A: 60 × 3 = 180km\nB: 80 × 2 = 160km\n180 - 160 = 20km',
    speedBoost: 32,
    difficulty: 3,
    category: 'thinking'
  }
];

// 모든 문제
export const allRacingQuestions = [
  ...easyQuestions,
  ...mediumQuestions,
  ...hardQuestions
];

// 난이도별 문제
export const racingQuestionsByDifficulty = {
  1: easyQuestions,
  2: mediumQuestions,
  3: hardQuestions
};

// 랜덤 문제 가져오기
export const getRandomRacingQuestion = (difficulty?: 1 | 2 | 3): RacingQuestion => {
  let questions: RacingQuestion[];
  
  if (difficulty) {
    questions = racingQuestionsByDifficulty[difficulty];
  } else {
    questions = allRacingQuestions;
  }
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

// 여러 문제 가져오기
export const getRandomRacingQuestions = (count: number, difficulty?: 1 | 2 | 3): RacingQuestion[] => {
  let questions: RacingQuestion[];
  
  if (difficulty) {
    questions = racingQuestionsByDifficulty[difficulty];
  } else {
    questions = allRacingQuestions;
  }
  
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

