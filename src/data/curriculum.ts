// 2022 개정 수학 계통도 기반 커리큘럼 데이터

export interface CurriculumUnit {
  id: string;
  title: string;
  grade: number;
  subject: string;
  subSubject: string;
  stageRange: [number, number];
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites: string[];
  description: string;
}

export interface DiagnosticTest {
  id: string;
  grade: number;
  subject: string;
  problems: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    unit: string;
  }[];
}

// 유치~중학교 수학 커리큘럼 구조
export const curriculumUnits: CurriculumUnit[] = [
  // 유치원 (누리과정)
  {
    id: 'K1',
    title: '수 세기와 비교',
    grade: 0,
    subject: '수와 연산',
    subSubject: '기초 수 개념',
    stageRange: [1, 5],
    difficulty: 'easy',
    prerequisites: [],
    description: '1~10까지의 수 세기와 비교하기'
  },
  {
    id: 'K2',
    title: '기초 덧셈·뺄셈',
    grade: 0,
    subject: '수와 연산',
    subSubject: '사칙연산 기초',
    stageRange: [6, 10],
    difficulty: 'easy',
    prerequisites: ['K1'],
    description: '5까지의 덧셈·뺄셈 놀이'
  },

  // 1학년
  {
    id: 'G1-1',
    title: '100까지의 수',
    grade: 1,
    subject: '수와 연산',
    subSubject: '자연수',
    stageRange: [11, 15],
    difficulty: 'easy',
    prerequisites: ['K1'],
    description: '100까지의 수 읽기, 쓰기, 크기 비교'
  },
  {
    id: 'G1-2',
    title: '한 자리 수 덧셈·뺄셈',
    grade: 1,
    subject: '수와 연산',
    subSubject: '사칙연산',
    stageRange: [16, 25],
    difficulty: 'easy',
    prerequisites: ['G1-1'],
    description: '9까지의 덧셈·뺄셈'
  },
  {
    id: 'G1-3',
    title: '두 자리 수 덧셈·뺄셈',
    grade: 1,
    subject: '수와 연산',
    subSubject: '사칙연산',
    stageRange: [26, 30],
    difficulty: 'medium',
    prerequisites: ['G1-2'],
    description: '받아올림·받아내림 없는 덧셈·뺄셈'
  },

  // 2학년
  {
    id: 'G2-1',
    title: '세 자리 수, 네 자리 수',
    grade: 2,
    subject: '수와 연산',
    subSubject: '자연수',
    stageRange: [31, 35],
    difficulty: 'easy',
    prerequisites: ['G1-1'],
    description: '1000까지의 수 읽기, 쓰기, 크기 비교'
  },
  {
    id: 'G2-2',
    title: '곱셈구구',
    grade: 2,
    subject: '수와 연산',
    subSubject: '사칙연산',
    stageRange: [36, 45],
    difficulty: 'medium',
    prerequisites: ['G1-2'],
    description: '2~9단 곱셈구구'
  },
  {
    id: 'G2-3',
    title: '두 자리 수 곱셈',
    grade: 2,
    subject: '수와 연산',
    subSubject: '사칙연산',
    stageRange: [46, 50],
    difficulty: 'hard',
    prerequisites: ['G2-2'],
    description: '두 자리 수 × 한 자리 수'
  },

  // 3학년
  {
    id: 'G3-1',
    title: '분수와 소수 기초',
    grade: 3,
    subject: '수와 연산',
    subSubject: '분수와 소수',
    stageRange: [51, 55],
    difficulty: 'medium',
    prerequisites: ['G2-1'],
    description: '분수와 소수의 개념과 읽기, 쓰기'
  },
  {
    id: 'G3-2',
    title: '곱셈과 나눗셈',
    grade: 3,
    subject: '수와 연산',
    subSubject: '사칙연산',
    stageRange: [56, 65],
    difficulty: 'medium',
    prerequisites: ['G2-3'],
    description: '세 자리 수 × 한 자리 수, 세 자리 ÷ 한 자리'
  },
  {
    id: 'G3-3',
    title: '약수와 배수',
    grade: 3,
    subject: '수와 연산',
    subSubject: '약수와 배수',
    stageRange: [66, 70],
    difficulty: 'hard',
    prerequisites: ['G3-2'],
    description: '약수와 배수의 개념과 구하기'
  },

  // 4학년
  {
    id: 'G4-1',
    title: '분수의 덧셈·뺄셈',
    grade: 4,
    subject: '수와 연산',
    subSubject: '분수와 소수',
    stageRange: [71, 75],
    difficulty: 'medium',
    prerequisites: ['G3-1'],
    description: '분모가 같은 분수의 덧셈·뺄셈'
  },
  {
    id: 'G4-2',
    title: '분수와 소수의 덧셈·뺄셈',
    grade: 4,
    subject: '수와 연산',
    subSubject: '분수와 소수',
    stageRange: [76, 80],
    difficulty: 'hard',
    prerequisites: ['G4-1'],
    description: '분수와 소수의 혼합 계산'
  },

  // 5학년
  {
    id: 'G5-1',
    title: '분수의 곱셈',
    grade: 5,
    subject: '수와 연산',
    subSubject: '분수와 소수',
    stageRange: [81, 85],
    difficulty: 'hard',
    prerequisites: ['G4-2'],
    description: '분수의 곱셈과 약분·통분'
  },
  {
    id: 'G5-2',
    title: '소수의 곱셈',
    grade: 5,
    subject: '수와 연산',
    subSubject: '분수와 소수',
    stageRange: [86, 90],
    difficulty: 'hard',
    prerequisites: ['G5-1'],
    description: '소수의 곱셈과 나눗셈'
  },

  // 6학년
  {
    id: 'G6-1',
    title: '분수의 나눗셈',
    grade: 6,
    subject: '수와 연산',
    subSubject: '분수와 소수',
    stageRange: [91, 95],
    difficulty: 'hard',
    prerequisites: ['G5-2'],
    description: '분수의 나눗셈과 비와 비율'
  },
  {
    id: 'G6-2',
    title: '비례식과 비례배분',
    grade: 6,
    subject: '수와 연산',
    subSubject: '비와 비율',
    stageRange: [96, 100],
    difficulty: 'hard',
    prerequisites: ['G6-1'],
    description: '비례식과 비례배분 문제'
  },

  // 중학교 1학년
  {
    id: 'M1-1',
    title: '정수와 유리수',
    grade: 7,
    subject: '수와 연산',
    subSubject: '정수와 유리수',
    stageRange: [101, 110],
    difficulty: 'hard',
    prerequisites: ['G6-2'],
    description: '정수와 유리수의 개념과 사칙연산'
  },
  {
    id: 'M1-2',
    title: '문자와 식',
    grade: 7,
    subject: '수와 연산',
    subSubject: '문자와 식',
    stageRange: [111, 120],
    difficulty: 'hard',
    prerequisites: ['M1-1'],
    description: '일차식의 계산과 활용'
  },

  // 중학교 2학년
  {
    id: 'M2-1',
    title: '유리수와 순환소수',
    grade: 8,
    subject: '수와 연산',
    subSubject: '유리수와 순환소수',
    stageRange: [121, 130],
    difficulty: 'hard',
    prerequisites: ['M1-2'],
    description: '순환소수의 개념과 유리수로의 변환'
  },
  {
    id: 'M2-2',
    title: '일차방정식',
    grade: 8,
    subject: '수와 연산',
    subSubject: '방정식',
    stageRange: [131, 140],
    difficulty: 'hard',
    prerequisites: ['M2-1'],
    description: '일차방정식의 풀이와 활용'
  },

  // 중학교 3학년
  {
    id: 'M3-1',
    title: '다항식',
    grade: 9,
    subject: '수와 연산',
    subSubject: '다항식',
    stageRange: [141, 150],
    difficulty: 'hard',
    prerequisites: ['M2-2'],
    description: '다항식의 덧셈, 뺄셈, 곱셈'
  },
  {
    id: 'M3-2',
    title: '인수분해',
    grade: 9,
    subject: '수와 연산',
    subSubject: '다항식',
    stageRange: [151, 160],
    difficulty: 'hard',
    prerequisites: ['M3-1'],
    description: '인수분해의 기본 공식과 활용'
  },
  // 사고력 연산 4학년
  {
    id: 'T4-1',
    title: '논리적 사고',
    grade: 4,
    subject: '사고력 연산',
    subSubject: '논리적 추론',
    stageRange: [161, 168],
    difficulty: 'medium',
    prerequisites: ['E4-3'],
    description: '논리적 사고와 문제 해결'
  },
  // 사고력 연산 5학년
  {
    id: 'T5-1',
    title: '창의적 사고',
    grade: 5,
    subject: '사고력 연산',
    subSubject: '창의적 추론',
    stageRange: [169, 176],
    difficulty: 'hard',
    prerequisites: ['E5-3'],
    description: '창의적 사고와 추론'
  },
  // 사고력 연산 6학년
  {
    id: 'T6-1',
    title: '비판적 사고',
    grade: 6,
    subject: '사고력 연산',
    subSubject: '비판적 분석',
    stageRange: [177, 183],
    difficulty: 'hard',
    prerequisites: ['E6-3'],
    description: '비판적 사고와 종합 분석'
  }
];

// 진단 테스트 데이터
export const diagnosticTests: DiagnosticTest[] = [
  {
    id: 'diagnostic-grade-1',
    grade: 1,
    subject: '수와 연산',
    problems: [
      {
        id: 'd1-1',
        question: '다음 중 가장 큰 수는?',
        options: ['15', '25', '35', '45'],
        correctAnswer: '45',
        explanation: '45가 가장 큰 수입니다.',
        unit: 'G1-1'
      },
      {
        id: 'd1-2',
        question: '7 + 3 = ?',
        options: ['8', '9', '10', '11'],
        correctAnswer: '10',
        explanation: '7 + 3 = 10입니다.',
        unit: 'G1-2'
      },
      {
        id: 'd1-3',
        question: '12 - 5 = ?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '7',
        explanation: '12 - 5 = 7입니다.',
        unit: 'G1-2'
      }
    ]
  },
  {
    id: 'diagnostic-grade-2',
    grade: 2,
    subject: '수와 연산',
    problems: [
      {
        id: 'd2-1',
        question: '3 × 4 = ?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
        explanation: '3 × 4 = 12입니다.',
        unit: 'G2-2'
      },
      {
        id: 'd2-2',
        question: '24 ÷ 6 = ?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        explanation: '24 ÷ 6 = 4입니다.',
        unit: 'G2-2'
      },
      {
        id: 'd2-3',
        question: '15 + 27 = ?',
        options: ['40', '41', '42', '43'],
        correctAnswer: '42',
        explanation: '15 + 27 = 42입니다.',
        unit: 'G1-3'
      }
    ]
  },
  {
    id: 'diagnostic-grade-3',
    grade: 3,
    subject: '수와 연산',
    problems: [
      {
        id: 'd3-1',
        question: '1/2 + 1/2 = ?',
        options: ['1/4', '1/2', '1', '2'],
        correctAnswer: '1',
        explanation: '1/2 + 1/2 = 2/2 = 1입니다.',
        unit: 'G3-1'
      },
      {
        id: 'd3-2',
        question: '0.5 + 0.3 = ?',
        options: ['0.7', '0.8', '0.9', '1.0'],
        correctAnswer: '0.8',
        explanation: '0.5 + 0.3 = 0.8입니다.',
        unit: 'G3-1'
      },
      {
        id: 'd3-3',
        question: '6 × 7 = ?',
        options: ['40', '41', '42', '43'],
        correctAnswer: '42',
        explanation: '6 × 7 = 42입니다.',
        unit: 'G2-2'
      }
    ]
  }
];

// Advanced, curriculum-aware problem generator (K-6)
// Author: ChatGPT (for TimeEdu)
// 목표: 단순 암기형 문항이 아닌 사고 촉발형(오개념 유도 지문, 다단계 추론, 오류 분석, 비교/일반화 등)

/********************
 * Types
 ********************/
export type Bloom = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
export type ProblemFormat = "MCQ" | "MultiSelect" | "Short" | "Ordering" | "Matching";

export interface Choice {
  id: string; // "①", "②" 등 보기 라벨
  text: string; // 보기 텍스트
  isCorrect: boolean;
  rationale?: string; // 선택지에 대한 해설(오개념 근거 포함)
}

export interface Problem {
  id: string; // e.g., "STAGE-001"
  gradeBand: string; // e.g., "Kindergarten", "G1" … "G6"
  stageId: number;
  format: ProblemFormat;
  difficulty: 1 | 2 | 3 | 4 | 5;
  blooms: Bloom;
  skills: string[]; // e.g., ["수와 연산", "자릿값", "분수의 의미"]
  tags: string[]; // 검색/추천용 태그
  stem: string; // 문제 본문
  choices?: Choice[]; // MCQ/MultiSelect에서 사용
  answer: string | string[]; // 정답(멀티셀렉트면 배열)
  solution: string; // 풀이/근거
  data?: Record<string, any>; // 시각화/조작형을 위한 추가 데이터(패턴, 이미지 표기 등)
}

/********************
 * Utilities
 ********************/
function rng(seed: number) {
  // 선형합동 생성기(LCG) - 재현성 보장
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 0xffffffff;
}

function pick<T>(rand: () => number, arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function shuffle<T>(rand: () => number, arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toChoiceLabel(i: number): string {
  const map = ["①", "②", "③", "④", "⑤", "⑥"];
  return map[i] || String(i + 1);
}

function ensureUnique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr.map(v => JSON.stringify(v)))).map(v => JSON.parse(v));
}

/********************
 * Core generators by topic
 ********************/

// K: 서브타이징/패턴 확장/비교 (시각적 데이터 포함)
function genK_Subitizing(seed: number, stageId: number): Problem {
  const rand = rng(seed);
  const count = Math.floor(rand() * 4) + 2; // 2~5
  const emoji = pick(rand, ["🍎", "🎈", "⭐", "🌸", "❤️"]);
  const wrong1 = count - 1; // 전형적 오답(한 개 덜 세기)
  const wrong2 = count + 1; // 전형적 오답(한 개 더 세기)
  const options = shuffle(rand, [count, wrong1, wrong2].map((n, i) => ({
    id: toChoiceLabel(i),
    text: `${n}개`,
    isCorrect: n === count,
    rationale: n === count ? `${emoji.repeat(count)}는 ${count}개입니다.` : `아이들이 자주 하는 실수: 한 번 덜/더 셈.`
  })));

  return {
    id: `STAGE-${stageId}`,
    gradeBand: "Kindergarten",
    stageId,
    format: "MCQ",
    difficulty: 1,
    blooms: "Understand",
    skills: ["수 개수 인식(서브타이징)", "비교"],
    tags: ["시각", "유아", "카운팅"],
    stem: `${emoji.repeat(count)}\n그림의 개수는 몇 개인가요?`,
    choices: options,
    answer: options.find(c => c.isCorrect)!.id,
    solution: `${emoji}의 개수를 바로 인식(서브타이징)하거나 하나씩 세어 ${count}개임을 확인합니다.`,
    data: { emoji, count }
  };
}

// G1: 자릿값 분해 + 받아올림/빼내림 오류분석 포함 덧셈
function genG1_AdditionWithErrorAnalysis(seed: number, stageId: number): Problem {
  const rand = rng(seed);
  const a = Math.floor(rand() * 90) + 10; // 10~99
  const b = Math.floor(rand() * 90) + 10;
  const correct = a + b;
  const ones = (a % 10) + (b % 10);
  const carryWrong = (a - (a % 10)) + (b - (b % 10)) + (ones % 10); // 받아올림 누락
  const placeWrong = (Math.floor(a / 10) + Math.floor(b / 10)) * 10 + (a % 10 + b % 10); // 자릿값 혼동

  const choices: Choice[] = shuffle(rand, ensureUnique([
    { id: "①", text: String(correct), isCorrect: true, rationale: "일의 자리 합에서 받아올림을 더한 값까지 포함해야 합니다." },
    { id: "②", text: String(carryWrong), isCorrect: false, rationale: "받아올림(올림 1)을 더하지 않은 오류입니다." },
    { id: "③", text: String(placeWrong), isCorrect: false, rationale: "십의 자리/일의 자리 자릿값을 혼동했습니다." },
    { id: "④", text: String(correct + 1), isCorrect: false, rationale: "단순 부정확 계산." }
  ]));

  return {
    id: `STAGE-${stageId}`,
    gradeBand: "G1",
    stageId,
    format: "MCQ",
    difficulty: 2,
    blooms: "Analyze",
    skills: ["두 자리 수 덧셈", "받아올림", "오류 분석"],
    tags: ["자릿값", "연산 전략"],
    stem: `${a} + ${b} = ?\n(계산 과정을 적어 보세요.)`,
    choices,
    answer: choices.find(c => c.isCorrect)!.id,
    solution: `일의 자리 ${a % 10} + ${b % 10} = ${ones} → ${Math.floor(ones / 10)} 올림, 십의 자리 ${Math.floor(a / 10)} + ${Math.floor(b / 10)} + 올림 ${Math.floor(ones / 10)} = ${Math.floor(a / 10) + Math.floor(b / 10) + Math.floor(ones / 10)}. 정답은 ${correct}.`
  };
}

// G2: 두 단계 문장제(단가×수량 → 합계 비교) + 불필요 정보 포함
function genG2_TwoStepWordProblem(seed: number, stageId: number): Problem {
  const rand = rng(seed);
  const priceA = (Math.floor(rand() * 6) + 2) * 100; // 200~800원
  const priceB = priceA + (Math.floor(rand() * 5) + 1) * 100; // 더 비싼 B
  const qtyA = Math.floor(rand() * 5) + 2; // 2~6개
  const qtyB = Math.floor(rand() * 4) + 2; // 2~5개
  const coupon = (Math.floor(rand() * 3)) * 100; // 0,100,200 (혼란용)
  const totalA = priceA * qtyA;
  const totalB = priceB * qtyB;
  const question = `과일가게에서 사과는 ${priceA}원, 배는 ${priceB}원입니다. 영이는 사과 ${qtyA}개와 배 ${qtyB}개를 샀고, 가게 쿠폰(오늘은 과자 전용  ${coupon}원 할인)을 받았습니다. 누가 더 많이 내렸을까요?`;
  // 정답: 더 큰 total을 찾는 비교 문제 (쿠폰은 과자 전용이므로 무관)
  const correct = totalA > totalB ? "사과" : totalA < totalB ? "배" : "같다";

  const choices: Choice[] = shuffle(rand, [
    { id: "①", text: "사과", isCorrect: correct === "사과", rationale: correct === "사과" ? "사과 총액이 더 큽니다." : "배 총액이 더 큽니다." },
    { id: "②", text: "배", isCorrect: correct === "배", rationale: correct === "배" ? "배 총액이 더 큽니다." : "사과 총액이 더 큽니다." },
    { id: "③", text: "같다", isCorrect: correct === "같다", rationale: correct === "같다" ? "두 합계가 같습니다." : "두 합계는 다릅니다." },
    { id: "④", text: "쿠폰 받은 것이 더 싸다", isCorrect: false, rationale: "쿠폰은 과자 전용으로 문제의 구매와 무관합니다 (불필요 정보)." }
  ]);

  return {
    id: `STAGE-${stageId}`,
    gradeBand: "G2",
    stageId,
    format: "MCQ",
    difficulty: 3,
    blooms: "Apply",
    skills: ["곱셈(단가×수량)", "비교", "불필요 정보 배제"],
    tags: ["문장제", "두 단계 추론"],
    stem: question,
    choices,
    answer: choices.find(c => c.isCorrect)!.id,
    solution: `사과 합계 ${priceA}×${qtyA}=${totalA}원, 배 합계 ${priceB}×${qtyB}=${totalB}원. 쿠폰은 과자 전용 → 무관. 비교 결과: ${correct === "같다" ? "같다" : `${correct}가 더 큼`}.`
  };
}

// G3: 분수의 의미(전체의 일부)와 동치분수 판단 + 시각 모델 데이터 제공
function genG3_FractionEquivalence(seed: number, stageId: number): Problem {
  const rand = rng(seed);
  const n = Math.floor(rand() * 3) + 2; // 2~4 등분
  const k = Math.floor(rand() * (n - 1)) + 1; // 1~(n-1)
  // 동치분수 후보: (k/n) == (2k/2n) == (3k/3n)
  const candidates = [
    { num: k, den: n },
    { num: 2 * k, den: 2 * n },
    { num: k + 1, den: n },
    { num: 3 * k, den: 3 * n },
  ];
  const optionsRaw = [
    `${k}/${n}`,
    `${2 * k}/${2 * n}`,
    `${k + 1}/${n}`,
    `${3 * k}/${3 * n}`,
  ];
  // 정답: k/n과 2k/2n과 3k/3n (동치), 단 k+1/n은 일반적으로 비동치
  const isEquiv = (a: { num: number; den: number }) => a.num * n === a.den * k; // k/n과 비교
  const options: Choice[] = optionsRaw.map((text, i) => ({ id: toChoiceLabel(i), text, isCorrect: isEquiv(candidates[i]), rationale: isEquiv(candidates[i]) ? "분자와 분모를 같은 수로 곱하면 값은 같아요." : "분자만 바뀌면 값이 달라집니다." }));

  return {
    id: `STAGE-${stageId}`,
    gradeBand: "G3",
    stageId,
    format: "MultiSelect",
    difficulty: 3,
    blooms: "Analyze",
    skills: ["분수의 동치", "배율 추론"],
    tags: ["시각 모델", "일부-전체"],
    stem: `다음 중 ${k}/${n}과 같은 크기의 분수를 모두 고르세요.`,
    choices: options,
    answer: options.filter(o => o.isCorrect).map(o => o.id),
    solution: `분자와 분모에 같은 수를 곱하면 크기는 같습니다. 따라서 ${k}/${n} ≡ ${2 * k}/${2 * n} ≡ ${3 * k}/${3 * n}.`,
    data: { areaModel: { partitions: n, filled: k } }
  };
}

// G4: 서로 다른 분모의 덧셈(통분 전략 비교) + 전략 선택 유도
function genG4_AddUnlikeFractions(seed: number, stageId: number): Problem {
  const rand = rng(seed);
  const a = [2, 3, 4, 5][Math.floor(rand() * 4)];
  const b = [3, 4, 5, 6][Math.floor(rand() * 4)];
  const x = Math.floor(rand() * (a - 1)) + 1;
  const y = Math.floor(rand() * (b - 1)) + 1;
  const lcm = (m: number, n: number) => {
    const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
    return (m * n) / gcd(m, n);
  };
  const L = lcm(a, b);
  const sumNum = x * (L / a) + y * (L / b);
  const simplified = (() => {
    const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
    const g = gcd(sumNum, L);
    return `${sumNum / g}/${L / g}`;
  })();

  const choices: Choice[] = shuffle(rand, [
    { id: "①", text: simplified, isCorrect: true, rationale: "통분 후 기약분수로 약분." },
    { id: "②", text: `${sumNum}/${L}`, isCorrect: false, rationale: "약분을 하지 않았습니다." },
    { id: "③", text: `${x + y}/${a + b}`, isCorrect: false, rationale: "분자/분모를 각각 더하는 오개념." },
    { id: "④", text: `${x}/${a} + ${y}/${b}`, isCorrect: false, rationale: "계산을 수행하지 않음." }
  ]);

  return {
    id: `STAGE-${stageId}`,
    gradeBand: "G4",
    stageId,
    format: "MCQ",
    difficulty: 3,
    blooms: "Apply",
    skills: ["분모가 다른 분수의 덧셈", "통분", "약분"],
    tags: ["분수 연산", "전략 비교"],
    stem: `${x}/${a} + ${y}/${b} = ? (기약분수로)`,
    choices,
    answer: choices.find(c => c.isCorrect)!.id,
    solution: `공통분모 ${L}로 통분 → 분자 ${x * (L / a)} + ${y * (L / b)} = ${sumNum}. 약분하면 ${simplified}.`
  };
}

// G5: 비와 비율, 퍼센트 증감(두 단계) + 단위 해석
function genG5_PercentIncrease(seed: number, stageId: number): Problem {
  const rand = rng(seed);
  const base = (Math.floor(rand() * 16) + 20) * 100; // 2000~3600
  const inc = (Math.floor(rand() * 5) + 5); // 5~9%
  const extra = (Math.floor(rand() * 4) + 2); // 추가 2~5%
  const after1 = Math.round(base * (1 + inc / 100));
  const after2 = Math.round(after1 * (1 + extra / 100));

  const choices: Choice[] = shuffle(rand, [
    { id: "①", text: `${after2}원`, isCorrect: true, rationale: "연속 퍼센트 증가는 곱셈으로 누적." },
    { id: "②", text: `${base + Math.round(base * (inc + extra) / 100)}원`, isCorrect: false, rationale: "퍼센트를 단순 합으로 처리한 오류." },
    { id: "③", text: `${after1}원`, isCorrect: false, rationale: "첫 단계까지만 계산." },
    { id: "④", text: `${base}원`, isCorrect: false, rationale: "변화 무시." }
  ]);

  return {
    id: `STAGE-${stageId}`,
    gradeBand: "G5",
    stageId,
    format: "MCQ",
    difficulty: 4,
    blooms: "Analyze",
    skills: ["비율 해석", "연속 퍼센트", "단위"],
    tags: ["퍼센트 증가", "두 단계 계산"],
    stem: `물건 가격이 ${inc}% 인상된 뒤 다시 ${extra}% 인상되었습니다. 처음 가격이 ${base}원일 때 최종 가격은?`,
    choices,
    answer: choices.find(c => c.isCorrect)!.id,
    solution: `1단계: ${base}×(1+${inc}/100)=${after1}원 → 2단계: ${after1}×(1+${extra}/100)=${after2}원.`
  };
}

// G6: 비례식/단위속력(속력=거리/시간) 다단계 + 오류분석 보기
function genG6_RateProportion(seed: number, stageId: number): Problem {
  const rand = rng(seed);
  const distance = (Math.floor(rand() * 6) + 4) * 3; // 12,15,18,...,30 km
  const timeH = (Math.floor(rand() * 3) + 2); // 2~4 h
  const speed = distance / timeH; // km/h
  const moreTime = (Math.floor(rand() * 3) + 1); // 1~3 h 추가 주행
  const totalDist = distance + speed * moreTime;

  const choices: Choice[] = shuffle(rand, [
    { id: "①", text: `${totalDist}km`, isCorrect: true, rationale: "속력 일정: d=vt를 두 번 적용." },
    { id: "②", text: `${distance + moreTime}km`, isCorrect: false, rationale: "시간을 거리로 더한 단위 오류." },
    { id: "③", text: `${speed * (timeH + moreTime)}km`, isCorrect: false, rationale: "사실상 정답과 동일해 보이나 첫 구간 거리 계산을 누락/혼동." },
    { id: "④", text: `${distance}km`, isCorrect: false, rationale: "추가 이동 무시." }
  ]);

  return {
    id: `STAGE-${stageId}`,
    gradeBand: "G6",
    stageId,
    format: "MCQ",
    difficulty: 4,
    blooms: "Apply",
    skills: ["비례식", "속력=거리/시간", "단위 일관성"],
    tags: ["속력", "다단계"],
    stem: `어떤 자동차가 ${timeH}시간 동안 ${distance}km를 일정한 속력으로 달렸습니다. 같은 속력으로 ${moreTime}시간 더 달리면 총 몇 km를 이동하나요?`,
    choices,
    answer: choices.find(c => c.isCorrect)!.id,
    solution: `속력 v=${distance}/${timeH}=${speed}km/h. 추가 거리=${speed}×${moreTime}=${speed * moreTime}km. 총합=${distance}+${speed * moreTime}=${totalDist}km.`
  };
}

/********************
 * Stage router
 * 기존 stage 구간을 유지하되, 각 구간에 고차원 문제 생성기 매핑
 ********************/
export function generateProblem(stageId: number, seed: number = stageId * 97 + 13): Problem {
  if (stageId >= 1 && stageId <= 50) {
    return genK_Subitizing(seed, stageId);
  } else if (stageId >= 51 && stageId <= 80) {
    return genG1_AdditionWithErrorAnalysis(seed, stageId);
  } else if (stageId >= 81 && stageId <= 110) {
    return genG2_TwoStepWordProblem(seed, stageId);
  } else if (stageId >= 111 && stageId <= 140) {
    return genG3_FractionEquivalence(seed, stageId);
  } else if (stageId >= 141 && stageId <= 160) {
    return genG4_AddUnlikeFractions(seed, stageId);
  } else if (stageId >= 171 && stageId <= 180) {
    return genG5_PercentIncrease(seed, stageId);
  } else if (stageId >= 181 && stageId <= 200) {
    return genG6_RateProportion(seed, stageId);
  }
  // 기본값: 유치원형 생성
  return genK_Subitizing(seed, stageId);
}

/********************
 * Batch API (기존 시그니처 호환을 위한 wrapper)
 ********************/
export function generateProblems(stageId: number): Problem[] {
  return [generateProblem(stageId)];
}

// 기존 호환성을 위한 래퍼 함수
export function generateStageProblems(stageId: number): any[] {
  const problem = generateProblem(stageId);
  
  // 기존 형식으로 변환
  return [{
    id: problem.id,
    question: problem.stem,
    options: problem.choices?.map(c => c.id) || ["①", "②", "③", "④"],
    correctAnswer: problem.answer,
    explanation: problem.solution,
    difficulty: problem.difficulty <= 2 ? 'easy' : problem.difficulty <= 4 ? 'medium' : 'hard',
    category: problem.skills[0] || '수와 연산',
    grade: problem.gradeBand === 'Kindergarten' ? '유치원' : 
           problem.gradeBand.startsWith('G') ? `${problem.gradeBand.slice(1)}학년` : 
           problem.gradeBand
  }];
}

// 유치원 문제 생성 (기존 호환성)
function generateKindergartenProblems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    1: { 
      question: "🍎🍎🍎 사과가 몇 개 있나요?", 
      answer: "3", 
      explanation: "하나, 둘, 셋... 사과가 3개 있습니다!" 
    },
    2: { 
      question: "⭐⭐⭐⭐⭐ 별이 몇 개 있나요?", 
      answer: "5", 
      explanation: "하나, 둘, 셋, 넷, 다섯... 별이 5개 있습니다!" 
    },
    3: { 
      question: "🎈🎈 풍선이 몇 개 있나요?", 
      answer: "2", 
      explanation: "하나, 둘... 풍선이 2개 있습니다!" 
    },
    4: { 
      question: "🌸🌸🌸🌸 꽃이 몇 개 있나요?", 
      answer: "4", 
      explanation: "하나, 둘, 셋, 넷... 꽃이 4개 있습니다!" 
    },
    5: { 
      question: "❤️ 하트가 몇 개 있나요?", 
      answer: "1", 
      explanation: "하나... 하트가 1개 있습니다!" 
    },
    6: { 
      question: "🎈🎈🎈과 같은 개수를 가진 것은?\n① 🎈🎈 ② 🎈🎈🎈 ③ 🎈🎈🎈🎈", 
      answer: "②", 
      explanation: "🎈🎈🎈과 같은 개수는 🎈🎈🎈입니다!" 
    },
    7: { 
      question: "⭐⭐과 같은 개수를 가진 것은?\n① ⭐ ② ⭐⭐ ③ ⭐⭐⭐", 
      answer: "②", 
      explanation: "⭐⭐과 같은 개수는 ⭐⭐입니다!" 
    },
    8: { 
      question: "🍎🍎🍎🍎과 같은 개수를 가진 것은?\n① 🍎🍎🍎 ② 🍎🍎🍎🍎 ③ 🍎🍎🍎🍎🍎", 
      answer: "②", 
      explanation: "🍎🍎🍎🍎과 같은 개수는 🍎🍎🍎🍎입니다!" 
    },
    9: { 
      question: "🌸과 같은 개수를 가진 것은?\n① 🌸🌸 ② 🌸 ③ 🌸🌸🌸", 
      answer: "②", 
      explanation: "🌸과 같은 개수는 🌸입니다!" 
    },
    10: { 
      question: "❤️❤️❤️❤️❤️과 같은 개수를 가진 것은?\n① ❤️❤️❤️❤️ ② ❤️❤️❤️❤️❤️ ③ ❤️❤️❤️❤️❤️❤️", 
      answer: "②", 
      explanation: "❤️❤️❤️❤️❤️과 같은 개수는 ❤️❤️❤️❤️❤️입니다!" 
    },
    11: { 
      question: "🍎🍎 + 🍎 = ?\n① 🍎🍎🍎 ② 🍎🍎🍎🍎 ③ 🍎🍎🍎🍎🍎", 
      answer: "①", 
      explanation: "🍎🍎 + 🍎 = 🍎🍎🍎입니다!" 
    },
    12: { 
      question: "⭐ + ⭐⭐ = ?\n① ⭐⭐⭐ ② ⭐⭐⭐⭐ ③ ⭐⭐⭐⭐⭐", 
      answer: "①", 
      explanation: "⭐ + ⭐⭐ = ⭐⭐⭐입니다!" 
    },
    13: { 
      question: "🎈🎈🎈 + 🎈 = ?\n① 🎈🎈🎈🎈 ② 🎈🎈🎈🎈🎈 ③ 🎈🎈🎈🎈🎈🎈", 
      answer: "①", 
      explanation: "🎈🎈🎈 + 🎈 = 🎈🎈🎈🎈입니다!" 
    },
    14: { 
      question: "🌸🌸 + 🌸🌸 = ?\n① 🌸🌸🌸 ② 🌸🌸🌸🌸 ③ 🌸🌸🌸🌸🌸", 
      answer: "②", 
      explanation: "🌸🌸 + 🌸🌸 = 🌸🌸🌸🌸입니다!" 
    },
    15: { 
      question: "❤️ + ❤️❤️❤️ = ?\n① ❤️❤️❤️ ② ❤️❤️❤️❤️ ③ ❤️❤️❤️❤️❤️", 
      answer: "②", 
      explanation: "❤️ + ❤️❤️❤️ = ❤️❤️❤️❤️입니다!" 
    },
    16: { 
      question: "⭕ 이 모양은 무엇인가요?\n① 원 ② 삼각형 ③ 사각형", 
      answer: "①", 
      explanation: "⭕은 둥근 모양으로 원입니다!" 
    },
    17: { 
      question: "🔺 이 모양은 무엇인가요?\n① 원 ② 삼각형 ③ 사각형", 
      answer: "②", 
      explanation: "🔺은 세 모서리가 있는 삼각형입니다!" 
    },
    18: { 
      question: "⬜ 이 모양은 무엇인가요?\n① 원 ② 삼각형 ③ 사각형", 
      answer: "③", 
      explanation: "⬜은 네 모서리가 있는 사각형입니다!" 
    },
    19: { 
      question: "⭕ 이 모양은 무엇인가요?\n① 원 ② 삼각형 ③ 사각형", 
      answer: "①", 
      explanation: "⭕은 둥근 모양으로 원입니다!" 
    },
    20: { 
      question: "🔺 이 모양은 무엇인가요?\n① 원 ② 삼각형 ③ 사각형", 
      answer: "②", 
      explanation: "🔺은 세 모서리가 있는 삼각형입니다!" 
    },
    21: { 
      question: "🎈 공이 책상 위에 있습니다. 공의 위치는?\n① 위 ② 아래 ③ 앞", 
      answer: "①", 
      explanation: "공이 책상 위에 있습니다!" 
    },
    22: { 
      question: "🎈 공이 책상 아래에 있습니다. 공의 위치는?\n① 위 ② 아래 ③ 뒤", 
      answer: "②", 
      explanation: "공이 책상 아래에 있습니다!" 
    },
    23: { 
      question: "🎈 공이 책상 앞에 있습니다. 공의 위치는?\n① 앞 ② 뒤 ③ 위", 
      answer: "①", 
      explanation: "공이 책상 앞에 있습니다!" 
    },
    24: { 
      question: "🎈 공이 책상 뒤에 있습니다. 공의 위치는?\n① 앞 ② 뒤 ③ 아래", 
      answer: "②", 
      explanation: "공이 책상 뒤에 있습니다!" 
    },
    25: { 
      question: "🎈 공이 책상 위에 있습니다. 공의 위치는?\n① 위 ② 아래 ③ 앞", 
      answer: "①", 
      explanation: "공이 책상 위에 있습니다!" 
    }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: problem.question.includes("①") ? ["①", "②", "③"] : [problem.answer, "1", "2", "4"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 초등학교 1학년 문제 생성
function generateGrade1Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    51: { 
      question: "15를 읽어보세요.\n① 십오 ② 오십일 ③ 일십오", 
      answer: "①", 
      explanation: "15는 '십오'라고 읽습니다!" 
    },
    52: { 
      question: "23을 읽어보세요.\n① 이십삼 ② 삼십이 ③ 이십일", 
      answer: "①", 
      explanation: "23은 '이십삼'이라고 읽습니다!" 
    },
    53: { 
      question: "37을 읽어보세요.\n① 삼십칠 ② 칠십삼 ③ 삼십일", 
      answer: "①", 
      explanation: "37은 '삼십칠'이라고 읽습니다!" 
    },
    54: { 
      question: "42를 읽어보세요.\n① 사십이 ② 이십사 ③ 사십일", 
      answer: "①", 
      explanation: "42는 '사십이'라고 읽습니다!" 
    },
    55: { 
      question: "58을 읽어보세요.\n① 오십팔 ② 팔십오 ③ 오십일", 
      answer: "①", 
      explanation: "58은 '오십팔'이라고 읽습니다!" 
    },
    56: { 
      question: "67을 읽어보세요.\n① 육십칠 ② 칠십육 ③ 육십일", 
      answer: "①", 
      explanation: "67은 '육십칠'이라고 읽습니다!" 
    },
    57: { 
      question: "74를 읽어보세요.\n① 칠십사 ② 사십칠 ③ 칠십일", 
      answer: "①", 
      explanation: "74는 '칠십사'라고 읽습니다!" 
    },
    58: { 
      question: "86을 읽어보세요.\n① 팔십육 ② 육십팔 ③ 팔십일", 
      answer: "①", 
      explanation: "86은 '팔십육'이라고 읽습니다!" 
    },
    59: { 
      question: "93을 읽어보세요.\n① 구십삼 ② 삼십구 ③ 구십일", 
      answer: "①", 
      explanation: "93은 '구십삼'이라고 읽습니다!" 
    },
    60: { 
      question: "100을 읽어보세요.\n① 백 ② 일백 ③ 십십", 
      answer: "①", 
      explanation: "100은 '백'이라고 읽습니다!" 
    },
    61: { 
      question: "3 + 4 = ?\n① 7 ② 8 ③ 9", 
      answer: "①", 
      explanation: "3 + 4 = 7입니다!" 
    },
    62: { 
      question: "5 + 2 = ?\n① 7 ② 8 ③ 9", 
      answer: "①", 
      explanation: "5 + 2 = 7입니다!" 
    },
    63: { 
      question: "6 + 3 = ?\n① 9 ② 8 ③ 10", 
      answer: "①", 
      explanation: "6 + 3 = 9입니다!" 
    },
    64: { 
      question: "8 + 1 = ?\n① 9 ② 8 ③ 10", 
      answer: "①", 
      explanation: "8 + 1 = 9입니다!" 
    },
    65: { 
      question: "4 + 5 = ?\n① 9 ② 8 ③ 10", 
      answer: "①", 
      explanation: "4 + 5 = 9입니다!" 
    },
    66: { 
      question: "7 + 2 = ?\n① 9 ② 8 ③ 10", 
      answer: "①", 
      explanation: "7 + 2 = 9입니다!" 
    },
    67: { 
      question: "9 + 1 = ?\n① 10 ② 9 ③ 11", 
      answer: "①", 
      explanation: "9 + 1 = 10입니다!" 
    },
    68: { 
      question: "6 + 4 = ?\n① 10 ② 9 ③ 11", 
      answer: "①", 
      explanation: "6 + 4 = 10입니다!" 
    },
    69: { 
      question: "5 + 5 = ?\n① 10 ② 9 ③ 11", 
      answer: "①", 
      explanation: "5 + 5 = 10입니다!" 
    },
    70: { 
      question: "8 + 2 = ?\n① 10 ② 9 ③ 11", 
      answer: "①", 
      explanation: "8 + 2 = 10입니다!" 
    },
    71: { 
      question: "12 + 15 = ?\n① 27 ② 26 ③ 28", 
      answer: "①", 
      explanation: "12 + 15 = 27입니다!" 
    },
    72: { 
      question: "23 + 14 = ?\n① 37 ② 36 ③ 38", 
      answer: "①", 
      explanation: "23 + 14 = 37입니다!" 
    },
    73: { 
      question: "31 + 25 = ?\n① 56 ② 55 ③ 57", 
      answer: "①", 
      explanation: "31 + 25 = 56입니다!" 
    },
    74: { 
      question: "45 + 32 = ?\n① 77 ② 76 ③ 78", 
      answer: "①", 
      explanation: "45 + 32 = 77입니다!" 
    },
    75: { 
      question: "18 + 41 = ?\n① 59 ② 58 ③ 60", 
      answer: "①", 
      explanation: "18 + 41 = 59입니다!" 
    },
    76: { 
      question: "26 + 33 = ?\n① 59 ② 58 ③ 60", 
      answer: "①", 
      explanation: "26 + 33 = 59입니다!" 
    },
    77: { 
      question: "47 + 21 = ?\n① 68 ② 67 ③ 69", 
      answer: "①", 
      explanation: "47 + 21 = 68입니다!" 
    },
    78: { 
      question: "39 + 28 = ?\n① 67 ② 66 ③ 68", 
      answer: "①", 
      explanation: "39 + 28 = 67입니다!" 
    },
    79: { 
      question: "52 + 35 = ?\n① 87 ② 86 ③ 88", 
      answer: "①", 
      explanation: "52 + 35 = 87입니다!" 
    },
    80: { 
      question: "64 + 23 = ?\n① 87 ② 86 ③ 88", 
      answer: "①", 
      explanation: "64 + 23 = 87입니다!" 
    }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: problem.question.includes("①") ? ["①", "②", "③"] : [problem.answer, "10", "20", "30"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 초등학교 2학년 문제 생성
function generateGrade2Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    81: { question: "🍎 234개의 사과가 있습니다. 이 수를 읽어보세요.", answer: "234", explanation: "234는 '이백삼십사'라고 읽습니다!" },
    82: { question: "⭐ 567개의 별이 있습니다. 이 수를 읽어보세요.", answer: "567", explanation: "567은 '오백육십칠'이라고 읽습니다!" },
    83: { question: "🎈 1234개의 풍선이 있습니다. 이 수를 읽어보세요.", answer: "1234", explanation: "1234는 '일천이백삼십사'라고 읽습니다!" },
    84: { question: "🌸 2345개의 꽃이 있습니다. 이 수를 읽어보세요.", answer: "2345", explanation: "2345는 '이천삼백사십오'라고 읽습니다!" },
    85: { question: "❤️ 3456개의 하트가 있습니다. 이 수를 읽어보세요.", answer: "3456", explanation: "3456은 '삼천사백오십육'이라고 읽습니다!" },
    86: { question: "🍎 4567개의 사과가 있습니다. 이 수를 읽어보세요.", answer: "4567", explanation: "4567은 '사천오백육십칠'이라고 읽습니다!" },
    87: { question: "⭐ 5678개의 별이 있습니다. 이 수를 읽어보세요.", answer: "5678", explanation: "5678은 '오천육백칠십팔'이라고 읽습니다!" },
    88: { question: "🎈 6789개의 풍선이 있습니다. 이 수를 읽어보세요.", answer: "6789", explanation: "6789는 '육천칠백팔십구'라고 읽습니다!" },
    89: { question: "🌸 7890개의 꽃이 있습니다. 이 수를 읽어보세요.", answer: "7890", explanation: "7890은 '칠천팔백구십'이라고 읽습니다!" },
    90: { question: "❤️ 8901개의 하트가 있습니다. 이 수를 읽어보세요.", answer: "8901", explanation: "8901은 '팔천구백일'이라고 읽습니다!" },
    91: { question: "🍎 사과 123개가 있고, 234개를 더 가져왔어요. 모두 몇 개인가요?", answer: "357", explanation: "123 + 234 = 357이므로 모두 357개입니다!" },
    92: { question: "⭐ 별 345개가 있고, 456개를 더 가져왔어요. 모두 몇 개인가요?", answer: "801", explanation: "345 + 456 = 801이므로 모두 801개입니다!" },
    93: { question: "🎈 풍선 567개가 있고, 123개를 더 가져왔어요. 모두 몇 개인가요?", answer: "690", explanation: "567 + 123 = 690이므로 모두 690개입니다!" },
    94: { question: "🌸 꽃 234개가 있고, 567개를 더 가져왔어요. 모두 몇 개인가요?", answer: "801", explanation: "234 + 567 = 801이므로 모두 801개입니다!" },
    95: { question: "❤️ 하트 456개가 있고, 234개를 더 가져왔어요. 모두 몇 개인가요?", answer: "690", explanation: "456 + 234 = 690이므로 모두 690개입니다!" },
    96: { question: "🍎 사과 678개가 있고, 123개를 더 가져왔어요. 모두 몇 개인가요?", answer: "801", explanation: "678 + 123 = 801이므로 모두 801개입니다!" },
    97: { question: "⭐ 별 789개가 있고, 111개를 더 가져왔어요. 모두 몇 개인가요?", answer: "900", explanation: "789 + 111 = 900이므로 모두 900개입니다!" },
    98: { question: "🎈 풍선 345개가 있고, 555개를 더 가져왔어요. 모두 몇 개인가요?", answer: "900", explanation: "345 + 555 = 900이므로 모두 900개입니다!" },
    99: { question: "🌸 꽃 456개가 있고, 444개를 더 가져왔어요. 모두 몇 개인가요?", answer: "900", explanation: "456 + 444 = 900이므로 모두 900개입니다!" },
    100: { question: "❤️ 하트 567개가 있고, 333개를 더 가져왔어요. 모두 몇 개인가요?", answer: "900", explanation: "567 + 333 = 900이므로 모두 900개입니다!" },
    101: { question: "🍎 사과 2개가 3묶음 있어요. 모두 몇 개인가요?", answer: "6", explanation: "2 × 3 = 6이므로 모두 6개입니다!" },
    102: { question: "⭐ 별 3개가 4묶음 있어요. 모두 몇 개인가요?", answer: "12", explanation: "3 × 4 = 12이므로 모두 12개입니다!" },
    103: { question: "🎈 풍선 4개가 5묶음 있어요. 모두 몇 개인가요?", answer: "20", explanation: "4 × 5 = 20이므로 모두 20개입니다!" },
    104: { question: "🌸 꽃 5개가 6묶음 있어요. 모두 몇 개인가요?", answer: "30", explanation: "5 × 6 = 30이므로 모두 30개입니다!" },
    105: { question: "❤️ 하트 2개가 7묶음 있어요. 모두 몇 개인가요?", answer: "14", explanation: "2 × 7 = 14이므로 모두 14개입니다!" },
    106: { question: "🍎 사과 3개가 8묶음 있어요. 모두 몇 개인가요?", answer: "24", explanation: "3 × 8 = 24이므로 모두 24개입니다!" },
    107: { question: "⭐ 별 4개가 9묶음 있어요. 모두 몇 개인가요?", answer: "36", explanation: "4 × 9 = 36이므로 모두 36개입니다!" },
    108: { question: "🎈 풍선 5개가 2묶음 있어요. 모두 몇 개인가요?", answer: "10", explanation: "5 × 2 = 10이므로 모두 10개입니다!" },
    109: { question: "🌸 꽃 2개가 9묶음 있어요. 모두 몇 개인가요?", answer: "18", explanation: "2 × 9 = 18이므로 모두 18개입니다!" },
    110: { question: "❤️ 하트 3개가 7묶음 있어요. 모두 몇 개인가요?", answer: "21", explanation: "3 × 7 = 21이므로 모두 21개입니다!" }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: [problem.answer, "100", "200", "300"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 초등학교 3학년 문제 생성
function generateGrade3Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    111: { question: "🍎 사과 2개를 3명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "2/3", explanation: "2개를 3명이 나누면 한 명당 2/3개입니다!" },
    112: { question: "⭐ 별 3개를 4명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "3/4", explanation: "3개를 4명이 나누면 한 명당 3/4개입니다!" },
    113: { question: "🎈 풍선 1개를 2명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "1/2", explanation: "1개를 2명이 나누면 한 명당 1/2개입니다!" },
    114: { question: "🌸 꽃 4개를 5명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "4/5", explanation: "4개를 5명이 나누면 한 명당 4/5개입니다!" },
    115: { question: "❤️ 하트 2개를 5명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "2/5", explanation: "2개를 5명이 나누면 한 명당 2/5개입니다!" },
    116: { question: "🍎 사과 3개를 6명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "3/6", explanation: "3개를 6명이 나누면 한 명당 3/6개입니다!" },
    117: { question: "⭐ 별 5개를 8명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "5/8", explanation: "5개를 8명이 나누면 한 명당 5/8개입니다!" },
    118: { question: "🎈 풍선 1개를 3명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "1/3", explanation: "1개를 3명이 나누면 한 명당 1/3개입니다!" },
    119: { question: "🌸 꽃 4개를 7명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "4/7", explanation: "4개를 7명이 나누면 한 명당 4/7개입니다!" },
    120: { question: "❤️ 하트 3개를 9명이 똑같이 나누어 먹었어요. 한 명이 먹은 양은?", answer: "3/9", explanation: "3개를 9명이 나누면 한 명당 3/9개입니다!" },
    121: { question: "🍎 사과 123개가 4묶음 있어요. 모두 몇 개인가요?", answer: "492", explanation: "123 × 4 = 492이므로 모두 492개입니다!" },
    122: { question: "⭐ 별 234개가 5묶음 있어요. 모두 몇 개인가요?", answer: "1170", explanation: "234 × 5 = 1170이므로 모두 1170개입니다!" },
    123: { question: "🎈 풍선 345개가 6묶음 있어요. 모두 몇 개인가요?", answer: "2070", explanation: "345 × 6 = 2070이므로 모두 2070개입니다!" },
    124: { question: "🌸 꽃 456개가 7묶음 있어요. 모두 몇 개인가요?", answer: "3192", explanation: "456 × 7 = 3192이므로 모두 3192개입니다!" },
    125: { question: "❤️ 하트 567개가 8묶음 있어요. 모두 몇 개인가요?", answer: "4536", explanation: "567 × 8 = 4536이므로 모두 4536개입니다!" },
    126: { question: "🍎 사과 678개가 9묶음 있어요. 모두 몇 개인가요?", answer: "6102", explanation: "678 × 9 = 6102이므로 모두 6102개입니다!" },
    127: { question: "⭐ 별 789개가 2묶음 있어요. 모두 몇 개인가요?", answer: "1578", explanation: "789 × 2 = 1578이므로 모두 1578개입니다!" },
    128: { question: "🎈 풍선 234개가 3묶음 있어요. 모두 몇 개인가요?", answer: "702", explanation: "234 × 3 = 702이므로 모두 702개입니다!" },
    129: { question: "🌸 꽃 345개가 4묶음 있어요. 모두 몇 개인가요?", answer: "1380", explanation: "345 × 4 = 1380이므로 모두 1380개입니다!" },
    130: { question: "❤️ 하트 456개가 5묶음 있어요. 모두 몇 개인가요?", answer: "2280", explanation: "456 × 5 = 2280이므로 모두 2280개입니다!" }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: [problem.answer, "1/2", "1/3", "1/4"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 초등학교 4학년 문제 생성
function generateGrade4Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    141: { question: "🍎 사과 2/5개와 1/5개를 합하면 몇 개인가요?", answer: "3/5", explanation: "분모가 같으므로 분자만 더하면 됩니다. 2 + 1 = 3이므로 3/5입니다!" },
    142: { question: "⭐ 별 3/7개와 2/7개를 합하면 몇 개인가요?", answer: "5/7", explanation: "분모가 같으므로 분자만 더하면 됩니다. 3 + 2 = 5이므로 5/7입니다!" },
    143: { question: "🎈 풍선 4/9개와 3/9개를 합하면 몇 개인가요?", answer: "7/9", explanation: "분모가 같으므로 분자만 더하면 됩니다. 4 + 3 = 7이므로 7/9입니다!" },
    144: { question: "🌸 꽃 5/8개와 2/8개를 합하면 몇 개인가요?", answer: "7/8", explanation: "분모가 같으므로 분자만 더하면 됩니다. 5 + 2 = 7이므로 7/8입니다!" },
    145: { question: "❤️ 하트 6/11개와 4/11개를 합하면 몇 개인가요?", answer: "10/11", explanation: "분모가 같으므로 분자만 더하면 됩니다. 6 + 4 = 10이므로 10/11입니다!" },
    146: { question: "🍎 사과 3/6개와 2/6개를 합하면 몇 개인가요?", answer: "5/6", explanation: "분모가 같으므로 분자만 더하면 됩니다. 3 + 2 = 5이므로 5/6입니다!" },
    147: { question: "⭐ 별 4/10개와 5/10개를 합하면 몇 개인가요?", answer: "9/10", explanation: "분모가 같으므로 분자만 더하면 됩니다. 4 + 5 = 9이므로 9/10입니다!" },
    148: { question: "🎈 풍선 2/12개와 7/12개를 합하면 몇 개인가요?", answer: "9/12", explanation: "분모가 같으므로 분자만 더하면 됩니다. 2 + 7 = 9이므로 9/12입니다!" },
    149: { question: "🌸 꽃 1/4개와 2/4개를 합하면 몇 개인가요?", answer: "3/4", explanation: "분모가 같으므로 분자만 더하면 됩니다. 1 + 2 = 3이므로 3/4입니다!" },
    150: { question: "❤️ 하트 3/8개와 4/8개를 합하면 몇 개인가요?", answer: "7/8", explanation: "분모가 같으므로 분자만 더하면 됩니다. 3 + 4 = 7이므로 7/8입니다!" },
    151: { question: "🍎 사과 0.5개와 0.3개를 합하면 몇 개인가요?", answer: "0.8", explanation: "0.5 + 0.3 = 0.8입니다!" },
    152: { question: "⭐ 별 0.7개와 0.2개를 합하면 몇 개인가요?", answer: "0.9", explanation: "0.7 + 0.2 = 0.9입니다!" },
    153: { question: "🎈 풍선 0.4개와 0.6개를 합하면 몇 개인가요?", answer: "1.0", explanation: "0.4 + 0.6 = 1.0입니다!" },
    154: { question: "🌸 꽃 0.8개와 0.1개를 합하면 몇 개인가요?", answer: "0.9", explanation: "0.8 + 0.1 = 0.9입니다!" },
    155: { question: "❤️ 하트 0.6개와 0.4개를 합하면 몇 개인가요?", answer: "1.0", explanation: "0.6 + 0.4 = 1.0입니다!" },
    156: { question: "🍎 사과 0.9개와 0.1개를 합하면 몇 개인가요?", answer: "1.0", explanation: "0.9 + 0.1 = 1.0입니다!" },
    157: { question: "⭐ 별 0.3개와 0.7개를 합하면 몇 개인가요?", answer: "1.0", explanation: "0.3 + 0.7 = 1.0입니다!" },
    158: { question: "🎈 풍선 0.2개와 0.8개를 합하면 몇 개인가요?", answer: "1.0", explanation: "0.2 + 0.8 = 1.0입니다!" },
    159: { question: "🌸 꽃 0.5개와 0.5개를 합하면 몇 개인가요?", answer: "1.0", explanation: "0.5 + 0.5 = 1.0입니다!" },
    160: { question: "❤️ 하트 0.1개와 0.9개를 합하면 몇 개인가요?", answer: "1.0", explanation: "0.1 + 0.9 = 1.0입니다!" }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: [problem.answer, "1/2", "1/3", "1/4"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 초등학교 5학년 문제 생성
function generateGrade5Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    171: { question: "🍎 사과 2/4개를 약분하면?", answer: "1/2", explanation: "2/4 = 2/4 ÷ 2 = 1/2입니다!" },
    172: { question: "⭐ 별 4/8개를 약분하면?", answer: "1/2", explanation: "4/8 = 4/8 ÷ 4 = 1/2입니다!" },
    173: { question: "🎈 풍선 6/12개를 약분하면?", answer: "1/2", explanation: "6/12 = 6/12 ÷ 6 = 1/2입니다!" },
    174: { question: "🌸 꽃 8/16개를 약분하면?", answer: "1/2", explanation: "8/16 = 8/16 ÷ 8 = 1/2입니다!" },
    175: { question: "❤️ 하트 3/6개를 약분하면?", answer: "1/2", explanation: "3/6 = 3/6 ÷ 3 = 1/2입니다!" },
    176: { question: "🍎 사과 1/2개와 1/3개를 합하면 몇 개인가요?", answer: "5/6", explanation: "통분하면 1/2 = 3/6, 1/3 = 2/6이므로 3/6 + 2/6 = 5/6입니다!" },
    177: { question: "⭐ 별 2/3개와 1/4개를 합하면 몇 개인가요?", answer: "11/12", explanation: "통분하면 2/3 = 8/12, 1/4 = 3/12이므로 8/12 + 3/12 = 11/12입니다!" },
    178: { question: "🎈 풍선 1/4개와 1/6개를 합하면 몇 개인가요?", answer: "5/12", explanation: "통분하면 1/4 = 3/12, 1/6 = 2/12이므로 3/12 + 2/12 = 5/12입니다!" },
    179: { question: "🌸 꽃 2/5개와 1/3개를 합하면 몇 개인가요?", answer: "11/15", explanation: "통분하면 2/5 = 6/15, 1/3 = 5/15이므로 6/15 + 5/15 = 11/15입니다!" },
    180: { question: "❤️ 하트 3/4개와 1/5개를 합하면 몇 개인가요?", answer: "19/20", explanation: "통분하면 3/4 = 15/20, 1/5 = 4/20이므로 15/20 + 4/20 = 19/20입니다!" }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: [problem.answer, "1/2", "1/3", "1/4"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 초등학교 6학년 문제 생성
function generateGrade6Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    181: { question: "🍎 사과 1/2개를 1/3개씩 나누면 몇 묶음이 되나요?", answer: "1.5", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 1/2 ÷ 1/3 = 1/2 × 3/1 = 3/2 = 1.5입니다!" },
    182: { question: "⭐ 별 2/3개를 1/4개씩 나누면 몇 묶음이 되나요?", answer: "2.67", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 2/3 ÷ 1/4 = 2/3 × 4/1 = 8/3 = 2.67입니다!" },
    183: { question: "🎈 풍선 3/4개를 1/2개씩 나누면 몇 묶음이 되나요?", answer: "1.5", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1.5입니다!" },
    184: { question: "🌸 꽃 4/5개를 1/3개씩 나누면 몇 묶음이 되나요?", answer: "2.4", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 4/5 ÷ 1/3 = 4/5 × 3/1 = 12/5 = 2.4입니다!" },
    185: { question: "❤️ 하트 5/6개를 1/4개씩 나누면 몇 묶음이 되나요?", answer: "3.33", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 5/6 ÷ 1/4 = 5/6 × 4/1 = 20/6 = 3.33입니다!" },
    186: { question: "🍎 사과 1/3개를 2/5개씩 나누면 몇 묶음이 되나요?", answer: "0.83", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 1/3 ÷ 2/5 = 1/3 × 5/2 = 5/6 = 0.83입니다!" },
    187: { question: "⭐ 별 2/5개를 3/7개씩 나누면 몇 묶음이 되나요?", answer: "0.93", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 2/5 ÷ 3/7 = 2/5 × 7/3 = 14/15 = 0.93입니다!" },
    188: { question: "🎈 풍선 3/7개를 2/9개씩 나누면 몇 묶음이 되나요?", answer: "1.93", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 3/7 ÷ 2/9 = 3/7 × 9/2 = 27/14 = 1.93입니다!" },
    189: { question: "🌸 꽃 4/9개를 1/6개씩 나누면 몇 묶음이 되나요?", answer: "2.67", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 4/9 ÷ 1/6 = 4/9 × 6/1 = 24/9 = 2.67입니다!" },
    190: { question: "❤️ 하트 5/8개를 3/4개씩 나누면 몇 묶음이 되나요?", answer: "0.83", explanation: "분수의 나눗셈은 역수를 곱하는 것입니다. 5/8 ÷ 3/4 = 5/8 × 4/3 = 20/24 = 0.83입니다!" },
    191: { question: "🍎 사과 2개와 3개의 비율은?", answer: "0.67", explanation: "2:3의 비율은 2 ÷ 3 = 0.67입니다!" },
    192: { question: "⭐ 별 3개와 4개의 비율은?", answer: "0.75", explanation: "3:4의 비율은 3 ÷ 4 = 0.75입니다!" },
    193: { question: "🎈 풍선 4개와 5개의 비율은?", answer: "0.8", explanation: "4:5의 비율은 4 ÷ 5 = 0.8입니다!" },
    194: { question: "🌸 꽃 5개와 6개의 비율은?", answer: "0.83", explanation: "5:6의 비율은 5 ÷ 6 = 0.83입니다!" },
    195: { question: "❤️ 하트 6개와 7개의 비율은?", answer: "0.86", explanation: "6:7의 비율은 6 ÷ 7 = 0.86입니다!" },
    196: { question: "🍎 사과 7개와 8개의 비율은?", answer: "0.88", explanation: "7:8의 비율은 7 ÷ 8 = 0.88입니다!" },
    197: { question: "⭐ 별 8개와 9개의 비율은?", answer: "0.89", explanation: "8:9의 비율은 8 ÷ 9 = 0.89입니다!" },
    198: { question: "🎈 풍선 9개와 10개의 비율은?", answer: "0.9", explanation: "9:10의 비율은 9 ÷ 10 = 0.9입니다!" },
    199: { question: "🌸 꽃 10개와 11개의 비율은?", answer: "0.91", explanation: "10:11의 비율은 10 ÷ 11 = 0.91입니다!" },
    200: { question: "❤️ 하트 11개와 12개의 비율은?", answer: "0.92", explanation: "11:12의 비율은 11 ÷ 12 = 0.92입니다!" }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: [problem.answer, "1.0", "2.0", "3.0"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 중학교 1학년 문제 생성
function generateMiddle1Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    201: { question: "🍎 사과 3개와 -2개를 합하면 몇 개인가요?", answer: "1", explanation: "3 + (-2) = 1이므로 모두 1개입니다!" },
    202: { question: "⭐ 별 -4개와 5개를 합하면 몇 개인가요?", answer: "1", explanation: "-4 + 5 = 1이므로 모두 1개입니다!" },
    203: { question: "🎈 풍선 -2개와 -3개를 합하면 몇 개인가요?", answer: "-5", explanation: "-2 + (-3) = -5이므로 모두 -5개입니다!" },
    204: { question: "🌸 꽃 4개와 -6개를 합하면 몇 개인가요?", answer: "-2", explanation: "4 + (-6) = -2이므로 모두 -2개입니다!" },
    205: { question: "❤️ 하트 -1개와 7개를 합하면 몇 개인가요?", answer: "6", explanation: "-1 + 7 = 6이므로 모두 6개입니다!" },
    206: { question: "🍎 사과 5개와 -8개를 합하면 몇 개인가요?", answer: "-3", explanation: "5 + (-8) = -3이므로 모두 -3개입니다!" },
    207: { question: "⭐ 별 -3개와 -4개를 합하면 몇 개인가요?", answer: "-7", explanation: "-3 + (-4) = -7이므로 모두 -7개입니다!" },
    208: { question: "🎈 풍선 6개와 -9개를 합하면 몇 개인가요?", answer: "-3", explanation: "6 + (-9) = -3이므로 모두 -3개입니다!" },
    209: { question: "🌸 꽃 -5개와 8개를 합하면 몇 개인가요?", answer: "3", explanation: "-5 + 8 = 3이므로 모두 3개입니다!" },
    210: { question: "❤️ 하트 2개와 -7개를 합하면 몇 개인가요?", answer: "-5", explanation: "2 + (-7) = -5이므로 모두 -5개입니다!" },
    211: { question: "🍎 사과 -3개의 절댓값은?", answer: "3", explanation: "-3의 절댓값은 3입니다!" },
    212: { question: "⭐ 별 5개의 절댓값은?", answer: "5", explanation: "5의 절댓값은 5입니다!" },
    213: { question: "🎈 풍선 -7개의 절댓값은?", answer: "7", explanation: "-7의 절댓값은 7입니다!" },
    214: { question: "🌸 꽃 0개의 절댓값은?", answer: "0", explanation: "0의 절댓값은 0입니다!" },
    215: { question: "❤️ 하트 -9개의 절댓값은?", answer: "9", explanation: "-9의 절댓값은 9입니다!" },
    216: { question: "🍎 사과 4개의 절댓값은?", answer: "4", explanation: "4의 절댓값은 4입니다!" },
    217: { question: "⭐ 별 -6개의 절댓값은?", answer: "6", explanation: "-6의 절댓값은 6입니다!" },
    218: { question: "🎈 풍선 8개의 절댓값은?", answer: "8", explanation: "8의 절댓값은 8입니다!" },
    219: { question: "🌸 꽃 -2개의 절댓값은?", answer: "2", explanation: "-2의 절댓값은 2입니다!" },
    220: { question: "❤️ 하트 1개의 절댓값은?", answer: "1", explanation: "1의 절댓값은 1입니다!" }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: [problem.answer, "0", "1", "2"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 중학교 2학년 문제 생성
function generateMiddle2Problems(stageId: number): any[] {
  const problems = [];
  
  // 스테이지 ID에 따른 고정된 문제 생성
  const stageProblems = {
    221: { question: "🍎 사과 2개씩 x묶음과 3개를 합하면 7개가 됩니다. x = ?", answer: "2", explanation: "2x + 3 = 7에서 2x = 4, x = 2입니다!" },
    222: { question: "⭐ 별 3개씩 x묶음과 1개를 합하면 10개가 됩니다. x = ?", answer: "3", explanation: "3x + 1 = 10에서 3x = 9, x = 3입니다!" },
    223: { question: "🎈 풍선 4개씩 x묶음과 2개를 합하면 14개가 됩니다. x = ?", answer: "3", explanation: "4x + 2 = 14에서 4x = 12, x = 3입니다!" },
    224: { question: "🌸 꽃 5개씩 x묶음과 1개를 합하면 16개가 됩니다. x = ?", answer: "3", explanation: "5x + 1 = 16에서 5x = 15, x = 3입니다!" },
    225: { question: "❤️ 하트 2개씩 x묶음과 5개를 합하면 11개가 됩니다. x = ?", answer: "3", explanation: "2x + 5 = 11에서 2x = 6, x = 3입니다!" },
    226: { question: "🍎 사과 3개씩 x묶음과 4개를 합하면 13개가 됩니다. x = ?", answer: "3", explanation: "3x + 4 = 13에서 3x = 9, x = 3입니다!" },
    227: { question: "⭐ 별 4개씩 x묶음과 3개를 합하면 15개가 됩니다. x = ?", answer: "3", explanation: "4x + 3 = 15에서 4x = 12, x = 3입니다!" },
    228: { question: "🎈 풍선 5개씩 x묶음과 2개를 합하면 17개가 됩니다. x = ?", answer: "3", explanation: "5x + 2 = 17에서 5x = 15, x = 3입니다!" },
    229: { question: "🌸 꽃 2개씩 x묶음과 7개를 합하면 13개가 됩니다. x = ?", answer: "3", explanation: "2x + 7 = 13에서 2x = 6, x = 3입니다!" },
    230: { question: "❤️ 하트 3개씩 x묶음과 6개를 합하면 15개가 됩니다. x = ?", answer: "3", explanation: "3x + 6 = 15에서 3x = 9, x = 3입니다!" },
    231: { question: "🍎 사과 2개씩 x묶음과 3개씩 y묶음을 합하면 8개, 3개씩 x묶음과 2개씩 y묶음을 합하면 7개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    232: { question: "⭐ 별 3개씩 x묶음과 4개씩 y묶음을 합하면 11개, 2개씩 x묶음과 3개씩 y묶음을 합하면 8개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    233: { question: "🎈 풍선 4개씩 x묶음과 5개씩 y묶음을 합하면 14개, 3개씩 x묶음과 4개씩 y묶음을 합하면 11개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    234: { question: "🌸 꽃 5개씩 x묶음과 6개씩 y묶음을 합하면 17개, 4개씩 x묶음과 5개씩 y묶음을 합하면 14개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    235: { question: "❤️ 하트 2개씩 x묶음과 5개씩 y묶음을 합하면 12개, 3개씩 x묶음과 4개씩 y묶음을 합하면 11개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    236: { question: "🍎 사과 3개씩 x묶음과 6개씩 y묶음을 합하면 15개, 4개씩 x묶음과 5개씩 y묶음을 합하면 14개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    237: { question: "⭐ 별 4개씩 x묶음과 7개씩 y묶음을 합하면 18개, 5개씩 x묶음과 6개씩 y묶음을 합하면 17개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    238: { question: "🎈 풍선 5개씩 x묶음과 8개씩 y묶음을 합하면 21개, 6개씩 x묶음과 7개씩 y묶음을 합하면 20개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    239: { question: "🌸 꽃 2개씩 x묶음과 9개씩 y묶음을 합하면 20개, 3개씩 x묶음과 8개씩 y묶음을 합하면 19개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" },
    240: { question: "❤️ 하트 3개씩 x묶음과 10개씩 y묶음을 합하면 23개, 4개씩 x묶음과 9개씩 y묶음을 합하면 22개입니다. x = ?", answer: "1", explanation: "연립방정식을 풀면 x = 1입니다!" }
  };

  // 스테이지에 맞는 문제 가져오기
  const problem = stageProblems[stageId as keyof typeof stageProblems];
  if (problem) {
    problems.push({
      question: problem.question,
      options: [problem.answer, "1", "2", "3"],
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  }
  
  return problems;
}

// 중학교 3학년 문제 생성
function generateMiddle3Problems(stageId: number): any[] {
  const problems = [];
  
  if (stageId <= 310) {
    // 다항식, 곱셈과 인수분해
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = Math.floor(Math.random() * 5) + 1;
    const result = a + b + c;
    const objects = ['사과', '공', '별'];
    const object = objects[Math.floor(Math.random() * objects.length)];
    problems.push({
      question: `🍎 ${object} ${a}개씩 x²묶음과 ${b}개씩 x묶음, ${c}개를 합하면 x = 1일 때 몇 개인가요?`,
      options: [result.toString(), (result + 1).toString(), (result - 1).toString(), (result + 2).toString()],
      correctAnswer: result.toString(),
      explanation: `x = 1을 대입하면 ${a}(1)² + ${b}(1) + ${c} = ${a} + ${b} + ${c} = ${result}입니다!`
    });
  } else if (stageId <= 320) {
    // 이차방정식
    const x = Math.floor(Math.random() * 5) + 1;
    const a = 1;
    const b = -2 * x;
    const c = x * x;
    const objects = ['사과', '공', '별'];
    const object = objects[Math.floor(Math.random() * objects.length)];
    problems.push({
      question: `🍎 ${object} x² + ${b}x + ${c} = 0일 때 x의 값은?`,
      options: [x.toString(), (x + 1).toString(), (x - 1).toString(), (x + 2).toString()],
      correctAnswer: x.toString(),
      explanation: `x² + ${b}x + ${c} = 0은 (x - ${x})² = 0이므로 x = ${x}입니다!`
    });
  }
  
  return problems;
}

function generateOptions(type: string, numbers?: number[]): string[] {
  if (!numbers) {
    return ['1', '2', '3', '4'];
  }

  let correctAnswer: number;
  let options: string[] = [];

  switch (type) {
    case 'comparison':
      correctAnswer = Math.max(...numbers);
      options = numbers.map(n => n.toString());
      break;
    
    case 'addition':
      correctAnswer = numbers[0] + numbers[1];
      options = generateMathOptions(correctAnswer, 4);
      break;
    
    case 'subtraction':
      correctAnswer = numbers[0] - numbers[1];
      options = generateMathOptions(correctAnswer, 4);
      break;
    
    case 'multiplication':
      correctAnswer = numbers[0] * numbers[1];
      options = generateMathOptions(correctAnswer, 4);
      break;
    
    case 'division':
      correctAnswer = numbers[0] / numbers[1];
      options = generateMathOptions(correctAnswer, 4);
      break;
    
    case 'fraction_addition':
      correctAnswer = (numbers[0] + numbers[2]) / (numbers[1] + numbers[3]);
      options = generateFractionOptions(correctAnswer);
      break;
    
    case 'fraction_subtraction':
      correctAnswer = (numbers[0] - numbers[2]) / (numbers[1] - numbers[3]);
      options = generateFractionOptions(correctAnswer);
      break;
    
    case 'decimal_addition':
      correctAnswer = numbers[0] + numbers[1];
      options = generateDecimalOptions(correctAnswer);
      break;
    
    case 'counting':
      correctAnswer = numbers.length;
      options = generateMathOptions(correctAnswer, 4);
      break;
    
    case 'matching':
      correctAnswer = numbers[1]; // 두 번째 수가 정답
      options = numbers.map(n => n.toString());
      break;
    
    default:
      correctAnswer = 5;
      options = ['3', '4', '5', '6'];
  }

  return options;
}

// 수학 문제 옵션 생성
function generateMathOptions(correctAnswer: number, count: number): string[] {
  const options = new Set<string>();
  options.add(correctAnswer.toString());
  
  // 정답 주변의 숫자들로 옵션 생성
  while (options.size < count) {
    const offset = Math.floor(Math.random() * 4) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const option = correctAnswer + (offset * sign);
    if (option > 0) {
      options.add(option.toString());
    }
  }
  
  return Array.from(options).slice(0, count);
}

// 분수 옵션 생성
function generateFractionOptions(correctAnswer: number): string[] {
  const options = new Set<string>();
  
  // 정답을 분수로 표현
  if (correctAnswer === 1) {
    options.add('1');
    options.add('2/2');
    options.add('3/3');
    options.add('4/4');
  } else if (correctAnswer === 0.5) {
    options.add('1/2');
    options.add('2/4');
    options.add('3/6');
    options.add('4/8');
  } else if (correctAnswer === 0.33) {
    options.add('1/3');
    options.add('2/6');
    options.add('3/9');
    options.add('4/12');
  } else {
    options.add('1/2');
    options.add('1/3');
    options.add('2/3');
    options.add('1');
  }
  
  return Array.from(options).slice(0, 4);
}

// 소수 옵션 생성
function generateDecimalOptions(correctAnswer: number): string[] {
  const options = new Set<string>();
  options.add(correctAnswer.toFixed(1));
  
  while (options.size < 4) {
    const offset = (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1);
    const option = (correctAnswer + offset).toFixed(1);
    if (parseFloat(option) > 0) {
      options.add(option);
    }
  }
  
  return Array.from(options).slice(0, 4);
}

function generateCorrectAnswer(type: string, numbers?: number[]): string {
  if (!numbers) {
    return '5';
  }

  let correctAnswer: number;

  switch (type) {
    case 'comparison':
      correctAnswer = Math.max(...numbers);
      break;
    
    case 'addition':
      correctAnswer = numbers[0] + numbers[1];
      break;
    
    case 'subtraction':
      correctAnswer = numbers[0] - numbers[1];
      break;
    
    case 'multiplication':
      correctAnswer = numbers[0] * numbers[1];
      break;
    
    case 'division':
      correctAnswer = numbers[0] / numbers[1];
      break;
    
    case 'fraction_addition':
      correctAnswer = (numbers[0] + numbers[2]) / (numbers[1] + numbers[3]);
      break;
    
    case 'fraction_subtraction':
      correctAnswer = (numbers[0] - numbers[2]) / (numbers[1] - numbers[3]);
      break;
    
    case 'decimal_addition':
      correctAnswer = numbers[0] + numbers[1];
      break;
    
    case 'counting':
      correctAnswer = numbers.length;
      break;
    
    case 'matching':
      correctAnswer = numbers[1]; // 두 번째 수가 정답
      break;
    
    default:
      correctAnswer = 5;
  }

  // 분수나 소수인 경우 적절한 형태로 반환
  if (type.includes('fraction')) {
    if (correctAnswer === 1) return '1';
    if (correctAnswer === 0.5) return '1/2';
    if (correctAnswer === 0.33) return '1/3';
    return correctAnswer.toString();
  }
  
  if (type.includes('decimal')) {
    return correctAnswer.toFixed(1);
  }
  
  return correctAnswer.toString();
}

function generateExplanation(type: string, numbers?: number[]): string {
  if (!numbers) {
    return '정답입니다!';
  }

  switch (type) {
    case 'comparison':
      const max = Math.max(...numbers);
      return `${max}가 가장 큰 수입니다.`;
    
    case 'addition':
      const sum = numbers[0] + numbers[1];
      return `${numbers[0]} + ${numbers[1]} = ${sum}입니다.`;
    
    case 'subtraction':
      const diff = numbers[0] - numbers[1];
      return `${numbers[0]} - ${numbers[1]} = ${diff}입니다.`;
    
    case 'multiplication':
      const product = numbers[0] * numbers[1];
      return `${numbers[0]} × ${numbers[1]} = ${product}입니다.`;
    
    case 'division':
      const quotient = numbers[0] / numbers[1];
      return `${numbers[0]} ÷ ${numbers[1]} = ${quotient}입니다.`;
    
    case 'fraction_addition':
      const fracSum = (numbers[0] + numbers[2]) / (numbers[1] + numbers[3]);
      return `${numbers[0]}/${numbers[1]} + ${numbers[2]}/${numbers[3]} = ${fracSum}입니다.`;
    
    case 'fraction_subtraction':
      const fracDiff = (numbers[0] - numbers[2]) / (numbers[1] - numbers[3]);
      return `${numbers[0]}/${numbers[1]} - ${numbers[2]}/${numbers[3]} = ${fracDiff}입니다.`;
    
    case 'decimal_addition':
      const decimalSum = numbers[0] + numbers[1];
      return `${numbers[0]} + ${numbers[1]} = ${decimalSum}입니다.`;
    
    case 'counting':
      return `1부터 ${numbers.length}까지 세면 총 ${numbers.length}개입니다.`;
    
    case 'matching':
      return `${numbers[1]}이 정답입니다.`;
    
    default:
      return '정답입니다!';
  }
}
