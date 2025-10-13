// 던전 게임용 수학 문제 은행
// 학년별, 난이도별로 분류된 문제들

export interface DungeonQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1=쉬움, 5=매우 어려움
  grade: 1 | 2 | 3 | 4 | 5 | 6; // 학년
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed' | 'thinking';
  expReward: number;
  goldReward: number;
}

// 1학년 문제 (한 자리 수 연산)
const grade1Questions: DungeonQuestion[] = [
  {
    id: 'g1_easy_1',
    question: '2 + 3 = ?',
    options: ['4', '5', '6', '7'],
    correct: 1,
    explanation: '2 + 3 = 5입니다!',
    difficulty: 1,
    grade: 1,
    type: 'addition',
    expReward: 10,
    goldReward: 5
  },
  {
    id: 'g1_easy_2',
    question: '5 - 2 = ?',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explanation: '5 - 2 = 3입니다!',
    difficulty: 1,
    grade: 1,
    type: 'subtraction',
    expReward: 10,
    goldReward: 5
  },
  {
    id: 'g1_medium_1',
    question: '7 + 6 = ?',
    options: ['12', '13', '14', '15'],
    correct: 1,
    explanation: '7 + 6 = 13입니다!',
    difficulty: 2,
    grade: 1,
    type: 'addition',
    expReward: 15,
    goldReward: 8
  },
  {
    id: 'g1_medium_2',
    question: '14 - 8 = ?',
    options: ['5', '6', '7', '8'],
    correct: 1,
    explanation: '14 - 8 = 6입니다!',
    difficulty: 2,
    grade: 1,
    type: 'subtraction',
    expReward: 15,
    goldReward: 8
  }
];

// 2학년 문제 (두 자리 수 연산, 구구단 시작)
const grade2Questions: DungeonQuestion[] = [
  {
    id: 'g2_easy_1',
    question: '23 + 15 = ?',
    options: ['36', '38', '40', '42'],
    correct: 1,
    explanation: '23 + 15 = 38입니다!',
    difficulty: 1,
    grade: 2,
    type: 'addition',
    expReward: 12,
    goldReward: 6
  },
  {
    id: 'g2_easy_2',
    question: '2 × 3 = ?',
    options: ['4', '5', '6', '7'],
    correct: 2,
    explanation: '2 × 3 = 6입니다!',
    difficulty: 1,
    grade: 2,
    type: 'multiplication',
    expReward: 12,
    goldReward: 6
  },
  {
    id: 'g2_medium_1',
    question: '45 - 28 = ?',
    options: ['15', '16', '17', '18'],
    correct: 2,
    explanation: '45 - 28 = 17입니다!',
    difficulty: 2,
    grade: 2,
    type: 'subtraction',
    expReward: 18,
    goldReward: 10
  },
  {
    id: 'g2_medium_2',
    question: '7 × 4 = ?',
    options: ['24', '28', '32', '36'],
    correct: 1,
    explanation: '7 × 4 = 28입니다!',
    difficulty: 2,
    grade: 2,
    type: 'multiplication',
    expReward: 18,
    goldReward: 10
  },
  {
    id: 'g2_hard_1',
    question: '8 × 9 = ?',
    options: ['63', '72', '81', '90'],
    correct: 1,
    explanation: '8 × 9 = 72입니다!',
    difficulty: 3,
    grade: 2,
    type: 'multiplication',
    expReward: 25,
    goldReward: 15
  }
];

// 3학년 문제 (나눗셈, 혼합 연산)
const grade3Questions: DungeonQuestion[] = [
  {
    id: 'g3_easy_1',
    question: '12 ÷ 3 = ?',
    options: ['3', '4', '5', '6'],
    correct: 1,
    explanation: '12 ÷ 3 = 4입니다!',
    difficulty: 1,
    grade: 3,
    type: 'division',
    expReward: 15,
    goldReward: 8
  },
  {
    id: 'g3_easy_2',
    question: '156 + 234 = ?',
    options: ['380', '390', '400', '410'],
    correct: 1,
    explanation: '156 + 234 = 390입니다!',
    difficulty: 1,
    grade: 3,
    type: 'addition',
    expReward: 15,
    goldReward: 8
  },
  {
    id: 'g3_medium_1',
    question: '24 ÷ 6 = ?',
    options: ['3', '4', '5', '6'],
    correct: 1,
    explanation: '24 ÷ 6 = 4입니다!',
    difficulty: 2,
    grade: 3,
    type: 'division',
    expReward: 20,
    goldReward: 12
  },
  {
    id: 'g3_medium_2',
    question: '3 + 4 × 2 = ?',
    options: ['10', '11', '14', '16'],
    correct: 1,
    explanation: '곱셈을 먼저: 4 × 2 = 8, 그 다음 덧셈: 3 + 8 = 11입니다!',
    difficulty: 2,
    grade: 3,
    type: 'mixed',
    expReward: 20,
    goldReward: 12
  },
  {
    id: 'g3_hard_1',
    question: '(12 + 8) ÷ 4 = ?',
    options: ['4', '5', '6', '7'],
    correct: 1,
    explanation: '괄호 안을 먼저: 12 + 8 = 20, 그 다음 나눗셈: 20 ÷ 4 = 5입니다!',
    difficulty: 3,
    grade: 3,
    type: 'mixed',
    expReward: 30,
    goldReward: 18
  },
  {
    id: 'g3_hard_2',
    question: '56 ÷ 7 + 3 = ?',
    options: ['8', '10', '11', '12'],
    correct: 2,
    explanation: '나눗셈을 먼저: 56 ÷ 7 = 8, 그 다음 덧셈: 8 + 3 = 11입니다!',
    difficulty: 3,
    grade: 3,
    type: 'mixed',
    expReward: 30,
    goldReward: 18
  }
];

// 4학년 문제 (큰 수의 연산, 복잡한 혼합 연산)
const grade4Questions: DungeonQuestion[] = [
  {
    id: 'g4_medium_1',
    question: '2345 + 1678 = ?',
    options: ['3923', '4023', '4123', '4223'],
    correct: 1,
    explanation: '2345 + 1678 = 4023입니다!',
    difficulty: 2,
    grade: 4,
    type: 'addition',
    expReward: 22,
    goldReward: 13
  },
  {
    id: 'g4_medium_2',
    question: '15 × 12 = ?',
    options: ['150', '170', '180', '200'],
    correct: 2,
    explanation: '15 × 12 = 180입니다!',
    difficulty: 2,
    grade: 4,
    type: 'multiplication',
    expReward: 22,
    goldReward: 13
  },
  {
    id: 'g4_hard_1',
    question: '144 ÷ 12 = ?',
    options: ['10', '11', '12', '13'],
    correct: 2,
    explanation: '144 ÷ 12 = 12입니다!',
    difficulty: 3,
    grade: 4,
    type: 'division',
    expReward: 35,
    goldReward: 20
  },
  {
    id: 'g4_hard_2',
    question: '5 × 6 - 8 ÷ 2 = ?',
    options: ['22', '24', '26', '28'],
    correct: 2,
    explanation: '곱셈과 나눗셈을 먼저: 5 × 6 = 30, 8 ÷ 2 = 4, 그 다음 뺄셈: 30 - 4 = 26입니다!',
    difficulty: 3,
    grade: 4,
    type: 'mixed',
    expReward: 35,
    goldReward: 20
  },
  {
    id: 'g4_veryhard_1',
    question: '(36 ÷ 6 + 4) × 2 = ?',
    options: ['18', '20', '22', '24'],
    correct: 1,
    explanation: '괄호 안을 먼저: 36 ÷ 6 = 6, 6 + 4 = 10, 그 다음 곱셈: 10 × 2 = 20입니다!',
    difficulty: 4,
    grade: 4,
    type: 'mixed',
    expReward: 45,
    goldReward: 25
  }
];

// 5학년 문제 (분수, 소수, 복잡한 사고력)
const grade5Questions: DungeonQuestion[] = [
  {
    id: 'g5_medium_1',
    question: '0.5 + 0.3 = ?',
    options: ['0.7', '0.8', '0.9', '1.0'],
    correct: 1,
    explanation: '0.5 + 0.3 = 0.8입니다!',
    difficulty: 2,
    grade: 5,
    type: 'addition',
    expReward: 25,
    goldReward: 15
  },
  {
    id: 'g5_hard_1',
    question: '1/2 + 1/4 = ?',
    options: ['1/4', '2/6', '3/4', '1'],
    correct: 2,
    explanation: '1/2 = 2/4이므로, 2/4 + 1/4 = 3/4입니다!',
    difficulty: 3,
    grade: 5,
    type: 'addition',
    expReward: 40,
    goldReward: 22
  },
  {
    id: 'g5_hard_2',
    question: '2.5 × 4 = ?',
    options: ['8', '9', '10', '11'],
    correct: 2,
    explanation: '2.5 × 4 = 10입니다!',
    difficulty: 3,
    grade: 5,
    type: 'multiplication',
    expReward: 40,
    goldReward: 22
  },
  {
    id: 'g5_veryhard_1',
    question: '정사각형의 한 변이 5cm일 때, 넓이는?',
    options: ['20cm²', '25cm²', '30cm²', '35cm²'],
    correct: 1,
    explanation: '정사각형 넓이 = 한 변 × 한 변 = 5 × 5 = 25cm²입니다!',
    difficulty: 4,
    grade: 5,
    type: 'thinking',
    expReward: 50,
    goldReward: 28
  },
  {
    id: 'g5_veryhard_2',
    question: '12의 약수는 몇 개인가요?',
    options: ['4개', '5개', '6개', '7개'],
    correct: 2,
    explanation: '12의 약수는 1, 2, 3, 4, 6, 12로 총 6개입니다!',
    difficulty: 4,
    grade: 5,
    type: 'thinking',
    expReward: 50,
    goldReward: 28
  }
];

// 6학년 문제 (고급 연산, 사고력)
const grade6Questions: DungeonQuestion[] = [
  {
    id: 'g6_hard_1',
    question: '3/4 × 2/3 = ?',
    options: ['1/2', '2/4', '5/7', '6/12'],
    correct: 0,
    explanation: '분수의 곱셈: 3×2=6, 4×3=12, 6/12 = 1/2입니다!',
    difficulty: 3,
    grade: 6,
    type: 'multiplication',
    expReward: 45,
    goldReward: 25
  },
  {
    id: 'g6_veryhard_1',
    question: '원의 반지름이 5cm일 때, 넓이는? (π=3.14)',
    options: ['62.8cm²', '78.5cm²', '94.2cm²', '100cm²'],
    correct: 1,
    explanation: '원의 넓이 = π × r² = 3.14 × 5 × 5 = 78.5cm²입니다!',
    difficulty: 4,
    grade: 6,
    type: 'thinking',
    expReward: 55,
    goldReward: 30
  },
  {
    id: 'g6_veryhard_2',
    question: '24와 36의 최대공약수는?',
    options: ['6', '8', '12', '18'],
    correct: 2,
    explanation: '24의 약수: 1,2,3,4,6,8,12,24 / 36의 약수: 1,2,3,4,6,9,12,18,36 / 최대공약수는 12입니다!',
    difficulty: 4,
    grade: 6,
    type: 'thinking',
    expReward: 55,
    goldReward: 30
  },
  {
    id: 'g6_boss_1',
    question: '어떤 수의 40%가 80이면, 그 수는?',
    options: ['160', '180', '200', '220'],
    correct: 2,
    explanation: '80 ÷ 0.4 = 200입니다!',
    difficulty: 5,
    grade: 6,
    type: 'thinking',
    expReward: 100,
    goldReward: 50
  }
];

// 모든 문제를 학년별로 내보내기
export const dungeonQuestionsByGrade = {
  1: grade1Questions,
  2: grade2Questions,
  3: grade3Questions,
  4: grade4Questions,
  5: grade5Questions,
  6: grade6Questions
};

// 모든 문제를 하나의 배열로
export const allDungeonQuestions = [
  ...grade1Questions,
  ...grade2Questions,
  ...grade3Questions,
  ...grade4Questions,
  ...grade5Questions,
  ...grade6Questions
];

// 난이도별로 문제 필터링
export const getQuestionsByDifficulty = (difficulty: 1 | 2 | 3 | 4 | 5): DungeonQuestion[] => {
  return allDungeonQuestions.filter(q => q.difficulty === difficulty);
};

// 학년과 난이도로 문제 필터링
export const getQuestionsByGradeAndDifficulty = (
  grade: 1 | 2 | 3 | 4 | 5 | 6, 
  difficulty: 1 | 2 | 3 | 4 | 5
): DungeonQuestion[] => {
  return dungeonQuestionsByGrade[grade].filter(q => q.difficulty === difficulty);
};

// 랜덤 문제 가져오기
export const getRandomQuestion = (
  grade?: 1 | 2 | 3 | 4 | 5 | 6, 
  difficulty?: 1 | 2 | 3 | 4 | 5
): DungeonQuestion => {
  let questions: DungeonQuestion[];
  
  if (grade && difficulty) {
    questions = getQuestionsByGradeAndDifficulty(grade, difficulty);
    // 해당 학년/난이도 문제가 없으면 학년만으로 필터링
    if (questions.length === 0 && grade) {
      questions = dungeonQuestionsByGrade[grade];
    }
  } else if (grade) {
    questions = dungeonQuestionsByGrade[grade];
  } else if (difficulty) {
    questions = getQuestionsByDifficulty(difficulty);
  } else {
    questions = allDungeonQuestions;
  }
  
  // 문제가 없으면 전체 문제에서 랜덤 선택
  if (questions.length === 0) {
    questions = allDungeonQuestions;
  }
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

// 여러 개의 랜덤 문제 가져오기 (중복 없이)
export const getRandomQuestions = (
  count: number,
  grade?: 1 | 2 | 3 | 4 | 5 | 6,
  difficulty?: 1 | 2 | 3 | 4 | 5
): DungeonQuestion[] => {
  let questions: DungeonQuestion[];
  
  if (grade && difficulty) {
    questions = getQuestionsByGradeAndDifficulty(grade, difficulty);
    // 해당 학년/난이도 문제가 없으면 학년만으로 필터링
    if (questions.length === 0 && grade) {
      questions = dungeonQuestionsByGrade[grade];
    }
  } else if (grade) {
    questions = dungeonQuestionsByGrade[grade];
  } else if (difficulty) {
    questions = getQuestionsByDifficulty(difficulty);
  } else {
    questions = allDungeonQuestions;
  }
  
  // 문제가 없으면 전체 문제에서 랜덤 선택
  if (questions.length === 0) {
    questions = allDungeonQuestions;
  }
  
  // 섞기
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

