import { ImageProblem, ImageItem } from '../types';

// Re-export for components
export type { ImageProblem, ImageItem };

export interface Problem {
    question: string;
  answer: string;
    explanation: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Stage {
  id: number;
  name: string;
  problems: Problem[];
}

export interface CurriculumUnit {
  id: number;
  name: string;
  description: string;
  stages: { [key: number]: Stage };
}

// 1학년 문제들 (기초 덧셈, 뺄셈, 숫자 세기)
const grade1Problems: Problem[] = [
  {
    question: "1부터 5까지 세어보세요.",
    options: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "1, 2, 3"],
    answer: "1, 2, 3, 4, 5",
    explanation: "1부터 5까지는 1, 2, 3, 4, 5입니다."
  },
  {
    question: "다음 중 가장 큰 수는?",
    options: ["3", "5", "2"],
    answer: "5",
    explanation: "5가 가장 큰 수입니다."
  },
  {
    question: "다음 중 가장 작은 수는?",
    options: ["4", "1", "3"],
    answer: "1",
    explanation: "1이 가장 작은 수입니다."
  },
  {
    question: "2 + 3 = ?",
    options: ["4", "5", "6"],
    answer: "5",
    explanation: "2 + 3 = 5입니다."
  },
  {
    question: "1 + 4 = ?",
    options: ["4", "5", "6"],
    answer: "5",
    explanation: "1 + 4 = 5입니다."
  },
  {
    question: "3 + 2 = ?",
    options: ["4", "5", "6"],
    answer: "5",
    explanation: "3 + 2 = 5입니다."
  },
  {
    question: "5 - 2 = ?",
    options: ["2", "3", "4"],
    answer: "3",
    explanation: "5 - 2 = 3입니다."
  },
  {
    question: "4 - 1 = ?",
    options: ["2", "3", "4"],
    answer: "3",
    explanation: "4 - 1 = 3입니다."
  },
  {
    question: "6 - 3 = ?",
    options: ["2", "3", "4"],
    answer: "3",
    explanation: "6 - 3 = 3입니다."
  },
  {
    question: "7 - 4 = ?",
    options: ["2", "3", "4"],
    answer: "3",
    explanation: "7 - 4 = 3입니다."
  },
  {
    question: "1 + 1 = ?",
    options: ["1", "2", "3"],
    answer: "2",
    explanation: "1 + 1 = 2입니다."
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5"],
    answer: "4",
    explanation: "2 + 2 = 4입니다."
  },
  {
    question: "3 + 3 = ?",
    options: ["5", "6", "7"],
    answer: "6",
    explanation: "3 + 3 = 6입니다."
  },
  {
    question: "4 + 4 = ?",
    options: ["7", "8", "9"],
    answer: "8",
    explanation: "4 + 4 = 8입니다."
  },
  {
    question: "5 + 5 = ?",
    options: ["9", "10", "11"],
    answer: "10",
    explanation: "5 + 5 = 10입니다."
  },
  {
    question: "8 - 3 = ?",
    options: ["4", "5", "6"],
    answer: "5",
    explanation: "8 - 3 = 5입니다."
  },
  {
    question: "9 - 2 = ?",
    options: ["6", "7", "8"],
    answer: "7",
    explanation: "9 - 2 = 7입니다."
  },
  {
    question: "10 - 5 = ?",
    options: ["4", "5", "6"],
    answer: "5",
    explanation: "10 - 5 = 5입니다."
  },
  {
    question: "6 + 1 = ?",
    options: ["6", "7", "8"],
    answer: "7",
    explanation: "6 + 1 = 7입니다."
  },
  {
    question: "7 + 2 = ?",
    options: ["8", "9", "10"],
    answer: "9",
    explanation: "7 + 2 = 9입니다."
  },
  {
    question: "8 + 1 = ?",
    options: ["8", "9", "10"],
    answer: "9",
    explanation: "8 + 1 = 9입니다."
  }
];

// 2학년 문제들 (두자리수 연산, 곱셈)
const grade2Problems: Problem[] = [
  {
    question: "15 + 7 = ?",
    options: ["21", "22", "23"],
    answer: "22",
    explanation: "15 + 7 = 22입니다."
  },
  {
    question: "23 - 8 = ?",
    options: ["13", "14", "15"],
    answer: "15",
    explanation: "23 - 8 = 15입니다."
  },
  {
    question: "12 + 15 = ?",
    options: ["26", "27", "28"],
    answer: "27",
    explanation: "12 + 15 = 27입니다."
  },
  {
    question: "35 - 12 = ?",
    options: ["22", "23", "24"],
    answer: "23",
    explanation: "35 - 12 = 23입니다."
  },
  {
    question: "2 × 3 = ?",
    options: ["5", "6", "7"],
    answer: "6",
    explanation: "2 × 3 = 6입니다."
  },
  {
    question: "3 × 2 = ?",
    options: ["5", "6", "7"],
    answer: "6",
    explanation: "3 × 2 = 6입니다."
  },
  {
    question: "4 × 2 = ?",
    options: ["6", "7", "8"],
    answer: "8",
    explanation: "4 × 2 = 8입니다."
  },
  {
    question: "5 × 2 = ?",
    options: ["9", "10", "11"],
    answer: "10",
    explanation: "5 × 2 = 10입니다."
  },
  {
    question: "6 × 2 = ?",
    options: ["11", "12", "13"],
    answer: "12",
    explanation: "6 × 2 = 12입니다."
  },
  {
    question: "7 × 2 = ?",
    options: ["13", "14", "15"],
    answer: "14",
    explanation: "7 × 2 = 14입니다."
  },
  {
    question: "18 + 25 = ?",
    options: ["42", "43", "44"],
    answer: "43",
    explanation: "18 + 25 = 43입니다."
  },
  {
    question: "47 - 19 = ?",
    options: ["27", "28", "29"],
    answer: "28",
    explanation: "47 - 19 = 28입니다."
  },
  {
    question: "33 + 28 = ?",
    options: ["60", "61", "62"],
    answer: "61",
    explanation: "33 + 28 = 61입니다."
  },
  {
    question: "56 - 23 = ?",
    options: ["32", "33", "34"],
    answer: "33",
    explanation: "56 - 23 = 33입니다."
  },
  {
    question: "8 × 2 = ?",
    options: ["15", "16", "17"],
    answer: "16",
    explanation: "8 × 2 = 16입니다."
  },
  {
    question: "9 × 2 = ?",
    options: ["17", "18", "19"],
    answer: "18",
    explanation: "9 × 2 = 18입니다."
  },
  {
    question: "10 × 2 = ?",
    options: ["19", "20", "21"],
    answer: "20",
    explanation: "10 × 2 = 20입니다."
  },
  {
    question: "24 + 36 = ?",
    options: ["59", "60", "61"],
    answer: "60",
    explanation: "24 + 36 = 60입니다."
  },
  {
    question: "72 - 35 = ?",
    options: ["36", "37", "38"],
    answer: "37",
    explanation: "72 - 35 = 37입니다."
  },
  {
    question: "45 + 38 = ?",
    options: ["82", "83", "84"],
    answer: "83",
    explanation: "45 + 38 = 83입니다."
  }
];

// 3학년 문제들 (세자리수 연산, 분수, 소수)
const grade3Problems: Problem[] = [
  {
    question: "125 + 67 = ?",
    options: ["191", "192", "193"],
    answer: "192",
    explanation: "125 + 67 = 192입니다."
  },
  {
    question: "234 - 89 = ?",
    options: ["144", "145", "146"],
    answer: "145",
    explanation: "234 - 89 = 145입니다."
  },
  {
    question: "1/2는 무엇을 의미하나요?",
    options: ["전체의 절반", "전체의 1/3", "전체의 1/4"],
    answer: "전체의 절반",
    explanation: "1/2는 전체를 2등분한 것 중 1개, 즉 절반을 의미합니다."
  },
  {
    question: "2/4를 약분하면?",
    options: ["1/2", "1/3", "1/4"],
    answer: "1/2",
    explanation: "2/4 = 1/2입니다."
  },
  {
    question: "3/6를 약분하면?",
    options: ["1/2", "1/3", "1/4"],
    answer: "1/2",
    explanation: "3/6 = 1/2입니다."
  },
  {
    question: "0.5는 분수로 어떻게 표현하나요?",
    options: ["1/2", "1/3", "1/4"],
    answer: "1/2",
    explanation: "0.5 = 1/2입니다."
  },
  {
    question: "0.25는 분수로 어떻게 표현하나요?",
    options: ["1/2", "1/3", "1/4"],
    answer: "1/4",
    explanation: "0.25 = 1/4입니다."
  },
  {
    question: "0.75는 분수로 어떻게 표현하나요?",
    options: ["1/2", "3/4", "1/4"],
    answer: "3/4",
    explanation: "0.75 = 3/4입니다."
  },
  {
    question: "156 + 234 = ?",
    options: ["389", "390", "391"],
    answer: "390",
    explanation: "156 + 234 = 390입니다."
  },
  {
    question: "345 - 167 = ?",
    options: ["177", "178", "179"],
    answer: "178",
    explanation: "345 - 167 = 178입니다."
  },
  {
    question: "267 + 189 = ?",
    options: ["455", "456", "457"],
    answer: "456",
    explanation: "267 + 189 = 456입니다."
  },
  {
    question: "456 - 278 = ?",
    options: ["177", "178", "179"],
    answer: "178",
    explanation: "456 - 278 = 178입니다."
  },
  {
    question: "4/8를 약분하면?",
    options: ["1/2", "1/3", "1/4"],
    answer: "1/2",
    explanation: "4/8 = 1/2입니다."
  },
  {
    question: "6/12를 약분하면?",
    options: ["1/2", "1/3", "1/4"],
    answer: "1/2",
    explanation: "6/12 = 1/2입니다."
  },
  {
    question: "0.3 + 0.4 = ?",
    options: ["0.6", "0.7", "0.8"],
    answer: "0.7",
    explanation: "0.3 + 0.4 = 0.7입니다."
  },
  {
    question: "0.8 - 0.3 = ?",
    options: ["0.4", "0.5", "0.6"],
    answer: "0.5",
    explanation: "0.8 - 0.3 = 0.5입니다."
  },
  {
    question: "378 + 245 = ?",
    options: ["622", "623", "624"],
    answer: "623",
    explanation: "378 + 245 = 623입니다."
  },
  {
    question: "567 - 289 = ?",
    options: ["277", "278", "279"],
    answer: "278",
    explanation: "567 - 289 = 278입니다."
  },
  {
    question: "8/16를 약분하면?",
    options: ["1/2", "1/3", "1/4"],
    answer: "1/2",
    explanation: "8/16 = 1/2입니다."
  },
  {
    question: "0.6 + 0.2 = ?",
    options: ["0.7", "0.8", "0.9"],
    answer: "0.8",
    explanation: "0.6 + 0.2 = 0.8입니다."
  }
];

// 4학년 문제들 (네자리수 연산, 기하학)
const grade4Problems: Problem[] = [
  {
    question: "삼각형의 각의 합은?",
    options: ["180°", "90°", "360°"],
    answer: "180°",
    explanation: "삼각형의 내각의 합은 180°입니다."
  },
  {
    question: "사각형의 각의 합은?",
    options: ["180°", "270°", "360°"],
    answer: "360°",
    explanation: "사각형의 내각의 합은 360°입니다."
  },
  {
    question: "정사각형의 한 변의 길이가 4cm일 때, 둘레는?",
    options: ["12cm", "16cm", "20cm"],
    answer: "16cm",
    explanation: "정사각형의 둘레 = 4 × 한 변의 길이 = 4 × 4 = 16cm입니다."
  },
  {
    question: "1m = ?cm",
    options: ["10cm", "100cm", "1000cm"],
    answer: "100cm",
    explanation: "1m = 100cm입니다."
  },
  {
    question: "1kg = ?g",
    options: ["10g", "100g", "1000g"],
    answer: "1000g",
    explanation: "1kg = 1000g입니다."
  },
  {
    question: "1L = ?mL",
    options: ["10mL", "100mL", "1000mL"],
    answer: "1000mL",
    explanation: "1L = 1000mL입니다."
  },
  {
    question: "1234 + 5678 = ?",
    options: ["6911", "6912", "6913"],
    answer: "6912",
    explanation: "1234 + 5678 = 6912입니다."
  },
  {
    question: "9876 - 5432 = ?",
    options: ["4443", "4444", "4445"],
    answer: "4444",
    explanation: "9876 - 5432 = 4444입니다."
  },
  {
    question: "2345 + 6789 = ?",
    options: ["9133", "9134", "9135"],
    answer: "9134",
    explanation: "2345 + 6789 = 9134입니다."
  },
  {
    question: "8765 - 4321 = ?",
    options: ["4443", "4444", "4445"],
    answer: "4444",
    explanation: "8765 - 4321 = 4444입니다."
  },
  {
    question: "직각삼각형에서 직각이 아닌 각의 합은?",
    options: ["90°", "180°", "270°"],
    answer: "90°",
    explanation: "직각삼각형에서 직각이 아닌 각의 합은 90°입니다."
  },
  {
    question: "정사각형의 대각선은 몇 개인가요?",
    options: ["1개", "2개", "4개"],
    answer: "2개",
    explanation: "정사각형의 대각선은 2개입니다."
  },
  {
    question: "3456 + 7890 = ?",
    options: ["11345", "11346", "11347"],
    answer: "11346",
    explanation: "3456 + 7890 = 11346입니다."
  },
  {
    question: "9876 - 5432 = ?",
    options: ["4443", "4444", "4445"],
    answer: "4444",
    explanation: "9876 - 5432 = 4444입니다."
  },
  {
    question: "1km = ?m",
    options: ["100m", "1000m", "10000m"],
    answer: "1000m",
    explanation: "1km = 1000m입니다."
  },
  {
    question: "1t = ?kg",
    options: ["100kg", "1000kg", "10000kg"],
    answer: "1000kg",
    explanation: "1t = 1000kg입니다."
  },
  {
    question: "4567 + 8901 = ?",
    options: ["13467", "13468", "13469"],
    answer: "13468",
    explanation: "4567 + 8901 = 13468입니다."
  },
  {
    question: "12345 - 6789 = ?",
    options: ["5555", "5556", "5557"],
    answer: "5556",
    explanation: "12345 - 6789 = 5556입니다."
  },
  {
    question: "원의 중심에서 가장자리까지의 거리를 무엇이라고 하나요?",
    options: ["지름", "반지름", "둘레"],
    answer: "반지름",
    explanation: "원의 중심에서 가장자리까지의 거리를 반지름이라고 합니다."
  },
  {
    question: "원의 지름이 10cm일 때, 반지름은?",
    options: ["4cm", "5cm", "6cm"],
    answer: "5cm",
    explanation: "반지름 = 지름 ÷ 2 = 10 ÷ 2 = 5cm입니다."
  }
];

// 5학년 문제들 (고급 연산, 비율)
const grade5Problems: Problem[] = [
  {
    question: "0.3 + 0.4 = ?",
    options: ["0.6", "0.7", "0.8"],
    answer: "0.7",
    explanation: "0.3 + 0.4 = 0.7입니다."
  },
  {
    question: "0.5 + 0.2 = ?",
    options: ["0.6", "0.7", "0.8"],
    answer: "0.7",
    explanation: "0.5 + 0.2 = 0.7입니다."
  },
  {
    question: "0.8 + 0.1 = ?",
    options: ["0.8", "0.9", "1.0"],
    answer: "0.9",
    explanation: "0.8 + 0.1 = 0.9입니다."
  },
  {
    question: "0.7 - 0.3 = ?",
    options: ["0.3", "0.4", "0.5"],
    answer: "0.4",
    explanation: "0.7 - 0.3 = 0.4입니다."
  },
  {
    question: "0.9 - 0.2 = ?",
    options: ["0.6", "0.7", "0.8"],
    answer: "0.7",
    explanation: "0.9 - 0.2 = 0.7입니다."
  },
  {
    question: "1.0 - 0.5 = ?",
    options: ["0.4", "0.5", "0.6"],
    answer: "0.5",
    explanation: "1.0 - 0.5 = 0.5입니다."
  },
  {
    question: "2:3의 비율을 분수로 나타내면?",
    options: ["2/3", "3/2", "1/2"],
    answer: "2/3",
    explanation: "2:3의 비율은 2/3로 나타낼 수 있습니다."
  },
  {
    question: "4:6을 가장 간단한 비로 나타내면?",
    options: ["2:3", "1:2", "3:4"],
    answer: "2:3",
    explanation: "4:6 = 2:3입니다."
  },
  {
    question: "3:5의 비율에서 전항이 6일 때, 후항은?",
    options: ["8", "10", "12"],
    answer: "10",
    explanation: "3:5 = 6:10이므로 후항은 10입니다."
  },
  {
    question: "0.25 + 0.35 = ?",
    options: ["0.5", "0.6", "0.7"],
    answer: "0.6",
    explanation: "0.25 + 0.35 = 0.6입니다."
  },
  {
    question: "0.8 - 0.15 = ?",
    options: ["0.64", "0.65", "0.66"],
    answer: "0.65",
    explanation: "0.8 - 0.15 = 0.65입니다."
  },
  {
    question: "1.2 + 0.8 = ?",
    options: ["1.9", "2.0", "2.1"],
    answer: "2.0",
    explanation: "1.2 + 0.8 = 2.0입니다."
  },
  {
    question: "2.5 - 1.3 = ?",
    options: ["1.1", "1.2", "1.3"],
    answer: "1.2",
    explanation: "2.5 - 1.3 = 1.2입니다."
  },
  {
    question: "5:8의 비율에서 전항이 15일 때, 후항은?",
    options: ["22", "23", "24"],
    answer: "24",
    explanation: "5:8 = 15:24이므로 후항은 24입니다."
  },
  {
    question: "6:9를 가장 간단한 비로 나타내면?",
    options: ["2:3", "1:2", "3:4"],
    answer: "2:3",
    explanation: "6:9 = 2:3입니다."
  },
  {
    question: "0.45 + 0.25 = ?",
    options: ["0.6", "0.7", "0.8"],
    answer: "0.7",
    explanation: "0.45 + 0.25 = 0.7입니다."
  },
  {
    question: "1.5 - 0.8 = ?",
    options: ["0.6", "0.7", "0.8"],
    answer: "0.7",
    explanation: "1.5 - 0.8 = 0.7입니다."
  },
  {
    question: "3.2 + 1.8 = ?",
    options: ["4.9", "5.0", "5.1"],
    answer: "5.0",
    explanation: "3.2 + 1.8 = 5.0입니다."
  },
  {
    question: "4.5 - 2.3 = ?",
    options: ["2.1", "2.2", "2.3"],
    answer: "2.2",
    explanation: "4.5 - 2.3 = 2.2입니다."
  },
  {
    question: "7:14를 가장 간단한 비로 나타내면?",
    options: ["1:2", "2:3", "3:4"],
    answer: "1:2",
    explanation: "7:14 = 1:2입니다."
  }
];

// 6학년 문제들 (고급 수학 개념)
const grade6Problems: Problem[] = [
  {
    question: "원의 지름이 10cm일 때, 반지름은?",
    options: ["4cm", "5cm", "6cm"],
    answer: "5cm",
    explanation: "반지름 = 지름 ÷ 2 = 10 ÷ 2 = 5cm입니다."
  },
  {
    question: "원의 반지름이 3cm일 때, 지름은?",
    options: ["5cm", "6cm", "7cm"],
    answer: "6cm",
    explanation: "지름 = 반지름 × 2 = 3 × 2 = 6cm입니다."
  },
  {
    question: "원의 둘레 공식은?",
    options: ["2πr", "πr²", "4πr"],
    answer: "2πr",
    explanation: "원의 둘레 = 2πr입니다."
  },
  {
    question: "원의 넓이 공식은?",
    options: ["2πr", "πr²", "4πr"],
    answer: "πr²",
    explanation: "원의 넓이 = πr²입니다."
  },
  {
    question: "12:18을 가장 간단한 비로 나타내면?",
    options: ["2:3", "1:2", "3:4"],
    answer: "2:3",
    explanation: "12:18 = 2:3입니다."
  },
  {
    question: "15:25를 가장 간단한 비로 나타내면?",
    options: ["2:3", "3:5", "4:5"],
    answer: "3:5",
    explanation: "15:25 = 3:5입니다."
  },
  {
    question: "2.5 × 4 = ?",
    options: ["9", "10", "11"],
    answer: "10",
    explanation: "2.5 × 4 = 10입니다."
  },
  {
    question: "3.6 ÷ 2 = ?",
    options: ["1.7", "1.8", "1.9"],
    answer: "1.8",
    explanation: "3.6 ÷ 2 = 1.8입니다."
  },
  {
    question: "4.8 × 5 = ?",
    options: ["23", "24", "25"],
    answer: "24",
    explanation: "4.8 × 5 = 24입니다."
  },
  {
    question: "7.2 ÷ 3 = ?",
    options: ["2.3", "2.4", "2.5"],
    answer: "2.4",
    explanation: "7.2 ÷ 3 = 2.4입니다."
  },
  {
    question: "원의 반지름이 4cm일 때, 둘레는? (π = 3.14)",
    options: ["24.12cm", "25.12cm", "26.12cm"],
    answer: "25.12cm",
    explanation: "둘레 = 2πr = 2 × 3.14 × 4 = 25.12cm입니다."
  },
  {
    question: "원의 반지름이 5cm일 때, 넓이는? (π = 3.14)",
    options: ["77.5cm²", "78.5cm²", "79.5cm²"],
    answer: "78.5cm²",
    explanation: "넓이 = πr² = 3.14 × 5² = 78.5cm²입니다."
  },
  {
    question: "8:12를 가장 간단한 비로 나타내면?",
    options: ["2:3", "1:2", "3:4"],
    answer: "2:3",
    explanation: "8:12 = 2:3입니다."
  },
  {
    question: "20:30을 가장 간단한 비로 나타내면?",
    options: ["2:3", "1:2", "3:4"],
    answer: "2:3",
    explanation: "20:30 = 2:3입니다."
  },
  {
    question: "1.5 × 6 = ?",
    options: ["8", "9", "10"],
    answer: "9",
    explanation: "1.5 × 6 = 9입니다."
  },
  {
    question: "9.6 ÷ 4 = ?",
    options: ["2.3", "2.4", "2.5"],
    answer: "2.4",
    explanation: "9.6 ÷ 4 = 2.4입니다."
  },
  {
    question: "원의 지름이 14cm일 때, 반지름은?",
    options: ["6cm", "7cm", "8cm"],
    answer: "7cm",
    explanation: "반지름 = 지름 ÷ 2 = 14 ÷ 2 = 7cm입니다."
  },
  {
    question: "원의 반지름이 6cm일 때, 지름은?",
    options: ["11cm", "12cm", "13cm"],
    answer: "12cm",
    explanation: "지름 = 반지름 × 2 = 6 × 2 = 12cm입니다."
  },
  {
    question: "6.4 × 2 = ?",
    options: ["12.7", "12.8", "12.9"],
    answer: "12.8",
    explanation: "6.4 × 2 = 12.8입니다."
  },
  {
    question: "14.4 ÷ 6 = ?",
    options: ["2.3", "2.4", "2.5"],
    answer: "2.4",
    explanation: "14.4 ÷ 6 = 2.4입니다."
  }
];

export const curriculum: { [key: number]: CurriculumUnit } = {
  1: {
    id: 1,
    name: "1학년",
    description: "기초 수학 개념 학습",
    stages: {
      1: {
        id: 1,
        name: "1단계: 숫자 세기",
        problems: grade1Problems.slice(0, 5)
      },
      2: {
        id: 2,
        name: "2단계: 덧셈",
        problems: grade1Problems.slice(5, 10)
      },
      3: {
        id: 3,
        name: "3단계: 뺄셈",
        problems: grade1Problems.slice(10, 15)
      },
      4: {
        id: 4,
        name: "4단계: 종합 연산",
        problems: grade1Problems.slice(15, 20)
      }
    }
  },
  2: {
    id: 2,
    name: "2학년",
    description: "두자리수 연산과 곱셈",
    stages: {
      11: {
        id: 11,
        name: "1단계: 두자리수 덧셈",
        problems: grade2Problems.slice(0, 5)
      },
      12: {
        id: 12,
        name: "2단계: 두자리수 뺄셈",
        problems: grade2Problems.slice(5, 10)
      },
      13: {
        id: 13,
        name: "3단계: 곱셈 기초",
        problems: grade2Problems.slice(10, 15)
      },
      14: {
        id: 14,
        name: "4단계: 종합 연산",
        problems: grade2Problems.slice(15, 20)
      }
    }
  },
  3: {
    id: 3,
    name: "3학년",
    description: "세자리수 연산과 분수",
    stages: {
      21: {
        id: 21,
        name: "1단계: 세자리수 연산",
        problems: grade3Problems.slice(0, 5)
      },
      22: {
        id: 22,
        name: "2단계: 분수 기초",
        problems: grade3Problems.slice(5, 10)
      },
      23: {
        id: 23,
        name: "3단계: 소수 기초",
        problems: grade3Problems.slice(10, 15)
      },
      24: {
        id: 24,
        name: "4단계: 종합 연산",
        problems: grade3Problems.slice(15, 20)
      }
    }
  },
  4: {
    id: 4,
    name: "4학년",
    description: "네자리수 연산과 기하학",
    stages: {
      31: {
        id: 31,
        name: "1단계: 네자리수 연산",
        problems: grade4Problems.slice(0, 5)
      },
      32: {
        id: 32,
        name: "2단계: 기하학 기초",
        problems: grade4Problems.slice(5, 10)
      },
      33: {
        id: 33,
        name: "3단계: 단위 변환",
        problems: grade4Problems.slice(10, 15)
      },
      34: {
        id: 34,
        name: "4단계: 종합 연산",
        problems: grade4Problems.slice(15, 20)
      }
    }
  },
  5: {
    id: 5,
    name: "5학년",
    description: "고급 연산과 비율",
    stages: {
      41: {
        id: 41,
        name: "1단계: 소수 연산",
        problems: grade5Problems.slice(0, 5)
      },
      42: {
        id: 42,
        name: "2단계: 비율 기초",
        problems: grade5Problems.slice(5, 10)
      },
      43: {
        id: 43,
        name: "3단계: 고급 소수",
        problems: grade5Problems.slice(10, 15)
      },
      44: {
        id: 44,
        name: "4단계: 종합 연산",
        problems: grade5Problems.slice(15, 20)
      }
    }
    },
    6: { 
    id: 6,
    name: "6학년",
    description: "고급 수학 개념",
    stages: {
      51: {
        id: 51,
        name: "1단계: 원의 성질",
        problems: grade6Problems.slice(0, 5)
      },
      52: {
        id: 52,
        name: "2단계: 비율과 비례",
        problems: grade6Problems.slice(5, 10)
      },
      53: {
        id: 53,
        name: "3단계: 고급 연산",
        problems: grade6Problems.slice(10, 15)
      },
      54: {
        id: 54,
        name: "4단계: 종합 연산",
        problems: grade6Problems.slice(15, 20)
      }
    }
    },
    7: { 
    id: 7,
    name: "중1",
    description: "중학교 1학년 수학",
    stages: {
      61: {
        id: 61,
        name: "1단계: 정수와 유리수",
        problems: [
          {
            question: "다음 중 정수가 아닌 것은?",
            answer: "③",
            explanation: "정수는 자연수, 0, 음의 정수를 포함합니다. 3/4은 분수이므로 정수가 아닙니다.",
            options: ["-5", "0", "3/4", "7"],
            correctAnswer: "3/4"
          },
          {
            question: "(-3) + 5의 값은?",
            answer: "①",
            explanation: "(-3) + 5 = 2입니다.",
            options: ["2", "-2", "8", "-8"],
            correctAnswer: "2"
          },
          {
            question: "절댓값이 4인 수는?",
            answer: "③",
            explanation: "절댓값이 4인 수는 4와 -4입니다.",
            options: ["4만", "-4만", "4와 -4", "4, -4, 0"],
            correctAnswer: "4와 -4"
          },
          {
            question: "(-2) × 3의 값은?",
      answer: "②", 
            explanation: "(-2) × 3 = -6입니다.",
            options: ["6", "-6", "5", "-5"],
            correctAnswer: "-6"
    },
          {
            question: "(-8) ÷ (-2)의 값은?",
      answer: "①", 
            explanation: "(-8) ÷ (-2) = 4입니다.",
            options: ["4", "-4", "6", "-6"],
            correctAnswer: "4"
          }
        ]
      },
      62: {
        id: 62,
        name: "2단계: 문자와 식",
        problems: [
          {
            question: "x + 3 = 7일 때, x의 값은?",
      answer: "①", 
            explanation: "x + 3 = 7에서 x = 7 - 3 = 4입니다.",
            options: ["4", "10", "-4", "21"],
            correctAnswer: "4"
    },
          {
            question: "2x - 5 = 3일 때, x의 값은?",
      answer: "①", 
            explanation: "2x - 5 = 3에서 2x = 8, x = 4입니다.",
            options: ["4", "1", "-1", "8"],
            correctAnswer: "4"
          },
          {
            question: "3(x + 2) = 15일 때, x의 값은?",
            answer: "①",
            explanation: "3(x + 2) = 15에서 x + 2 = 5, x = 3입니다.",
            options: ["3", "5", "7", "9"],
            correctAnswer: "3"
          },
          {
            question: "2x + 3y = 12에서 x = 3일 때, y의 값은?",
      answer: "①", 
            explanation: "2(3) + 3y = 12에서 6 + 3y = 12, 3y = 6, y = 2입니다.",
            options: ["2", "3", "4", "6"],
            correctAnswer: "2"
    },
          {
            question: "다음 중 일차방정식이 아닌 것은?",
      answer: "②", 
            explanation: "x² + 1 = 5는 이차방정식이므로 일차방정식이 아닙니다.",
            options: ["2x + 3 = 7", "x² + 1 = 5", "3x - 2 = 4", "x + 5 = 0"],
            correctAnswer: "x² + 1 = 5"
          }
        ]
      },
      63: {
        id: 63,
        name: "3단계: 함수",
        problems: [
          {
            question: "y = 2x + 1에서 x = 3일 때, y의 값은?",
            answer: "②",
            explanation: "y = 2(3) + 1 = 6 + 1 = 7입니다.",
            options: ["5", "7", "9", "11"],
            correctAnswer: "7"
          },
          {
            question: "함수 f(x) = 3x - 2에서 f(4)의 값은?",
      answer: "①", 
            explanation: "f(4) = 3(4) - 2 = 12 - 2 = 10입니다.",
            options: ["10", "12", "14", "16"],
            correctAnswer: "10"
    },
          {
            question: "다음 중 일차함수인 것은?",
      answer: "②", 
            explanation: "y = 2x + 3은 일차함수입니다.",
            options: ["y = x² + 1", "y = 2x + 3", "y = 1/x", "y = √x"],
            correctAnswer: "y = 2x + 3"
    },
          {
            question: "y = -x + 4의 그래프의 y절편은?",
      answer: "①", 
            explanation: "y = -x + 4에서 y절편은 4입니다.",
            options: ["4", "-4", "1", "-1"],
            correctAnswer: "4"
    },
          {
            question: "두 점 (1, 3), (3, 7)을 지나는 직선의 기울기는?",
      answer: "②", 
            explanation: "기울기 = (7-3)/(3-1) = 4/2 = 2입니다.",
            options: ["1", "2", "3", "4"],
            correctAnswer: "2"
          }
        ]
      },
      64: {
        id: 64,
        name: "4단계: 통계",
        problems: [
          {
            question: "다음 데이터의 평균은? 3, 5, 7, 9, 11",
            answer: "②",
            explanation: "평균 = (3+5+7+9+11)/5 = 35/5 = 7입니다.",
            options: ["6", "7", "8", "9"],
            correctAnswer: "7"
          },
          {
            question: "다음 데이터의 중앙값은? 2, 4, 6, 8, 10, 12",
      answer: "②", 
            explanation: "중앙값 = (6+8)/2 = 7입니다.",
            options: ["6", "7", "8", "9"],
            correctAnswer: "7"
          },
          {
            question: "다음 데이터의 최빈값은? 1, 2, 2, 3, 3, 3, 4",
            answer: "②",
            explanation: "3이 가장 많이 나타나므로 최빈값은 3입니다.",
            options: ["2", "3", "4", "5"],
            correctAnswer: "3"
          },
          {
            question: "다음 데이터의 범위는? 5, 8, 12, 15, 20",
            answer: "③",
            explanation: "범위 = 최댓값 - 최솟값 = 20 - 5 = 15입니다.",
            options: ["10", "12", "15", "20"],
            correctAnswer: "15"
          },
          {
            question: "상대도수가 0.25인 계급의 도수는 전체 도수가 80일 때?",
      answer: "①", 
            explanation: "도수 = 상대도수 × 전체 도수 = 0.25 × 80 = 20입니다.",
            options: ["20", "25", "30", "35"],
            correctAnswer: "20"
          }
        ]
      }
    }
  },
  8: {
    id: 8,
    name: "중2",
    description: "중학교 2학년 수학",
    stages: {
      71: {
        id: 71,
        name: "1단계: 유리수와 순환소수",
        problems: [
          {
            question: "1/3을 소수로 나타내면?",
            answer: "③",
            explanation: "1/3 = 0.333... (순환소수)입니다.",
            options: ["0.3", "0.33", "0.333...", "0.3"],
            correctAnswer: "0.333..."
          },
          {
            question: "0.121212...을 분수로 나타내면?",
            answer: "②",
            explanation: "0.121212... = 12/99 = 4/33입니다.",
            options: ["12/99", "4/33", "12/100", "1212/10000"],
            correctAnswer: "4/33"
          },
          {
            question: "다음 중 유한소수인 것은?",
            answer: "③",
            explanation: "1/8 = 0.125로 유한소수입니다.",
            options: ["1/3", "1/6", "1/8", "1/9"],
            correctAnswer: "1/8"
          },
          {
            question: "√2는?",
            answer: "②",
            explanation: "√2는 무리수입니다.",
            options: ["유리수", "무리수", "정수", "자연수"],
            correctAnswer: "무리수"
          },
          {
            question: "다음 중 순환소수가 아닌 것은?",
            answer: "④",
            explanation: "0.1234는 유한소수이므로 순환소수가 아닙니다.",
            options: ["0.777...", "0.123123...", "0.141414...", "0.1234"],
            correctAnswer: "0.1234"
          }
        ]
      },
      72: {
        id: 72,
        name: "2단계: 연립방정식",
        problems: [
          {
            question: "연립방정식 x + y = 5, x - y = 1의 해는?",
      answer: "①", 
            explanation: "두 식을 더하면 2x = 6, x = 3. y = 5 - 3 = 2입니다.",
            options: ["x = 3, y = 2", "x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"],
            correctAnswer: "x = 3, y = 2"
    },
          {
            question: "연립방정식 2x + 3y = 13, x - y = 1의 해는?",
      answer: "①", 
            explanation: "x = y + 1을 첫 번째 식에 대입하면 2(y+1) + 3y = 13, 5y = 11, y = 2.2, x = 3.2... 계산하면 x = 2, y = 3입니다.",
            options: ["x = 2, y = 3", "x = 3, y = 2", "x = 4, y = 3", "x = 5, y = 4"],
            correctAnswer: "x = 2, y = 3"
          },
          {
            question: "연립방정식 3x + 2y = 7, 2x - y = 4의 해는?",
            answer: "②",
            explanation: "두 번째 식에서 y = 2x - 4를 첫 번째 식에 대입하면 3x + 2(2x-4) = 7, 7x = 15, x = 15/7... 계산하면 x = 2, y = 0입니다.",
            options: ["x = 3, y = 2", "x = 2, y = 0", "x = 1, y = 2", "x = 0, y = 3.5"],
            correctAnswer: "x = 2, y = 0"
          },
          {
            question: "연립방정식 x + 2y = 8, 2x - y = 1의 해는?",
      answer: "①", 
            explanation: "두 번째 식에서 y = 2x - 1을 첫 번째 식에 대입하면 x + 2(2x-1) = 8, 5x = 10, x = 2. y = 2(2) - 1 = 3입니다.",
            options: ["x = 2, y = 3", "x = 3, y = 2.5", "x = 4, y = 2", "x = 1, y = 3.5"],
            correctAnswer: "x = 2, y = 3"
    },
          {
            question: "연립방정식의 해가 무수히 많을 때의 조건은?",
      answer: "①", 
            explanation: "연립방정식의 해가 무수히 많을 때는 계수비가 같고 상수항비도 같을 때입니다.",
            options: ["계수비가 같고 상수항비도 같음", "계수비가 다르고 상수항비도 다름", "계수비는 같고 상수항비는 다름", "계수비는 다르고 상수항비는 같음"],
            correctAnswer: "계수비가 같고 상수항비도 같음"
          }
        ]
      },
      73: {
        id: 73,
        name: "3단계: 일차함수와 그래프",
        problems: [
          {
            question: "y = 2x - 3의 그래프가 지나는 점은?",
            answer: "④",
            explanation: "모든 점이 y = 2x - 3을 만족합니다.",
            options: ["(0, -3)", "(1, -1)", "(2, 1)", "모두 맞음"],
            correctAnswer: "모두 맞음"
          },
          {
            question: "두 직선 y = 2x + 1과 y = -x + 4의 교점의 x좌표는?",
      answer: "①", 
            explanation: "2x + 1 = -x + 4에서 3x = 3, x = 1입니다.",
            options: ["1", "2", "3", "4"],
            correctAnswer: "1"
          },
          {
            question: "y = -3x + 2의 그래프의 기울기는?",
            answer: "②",
            explanation: "y = -3x + 2에서 기울기는 -3입니다.",
            options: ["3", "-3", "2", "-2"],
            correctAnswer: "-3"
          },
          {
            question: "점 (2, 5)를 지나고 기울기가 3인 직선의 방정식은?",
      answer: "①", 
            explanation: "y - 5 = 3(x - 2)에서 y = 3x - 6 + 5 = 3x - 1입니다.",
            options: ["y = 3x - 1", "y = 3x + 1", "y = 3x - 2", "y = 3x + 2"],
            correctAnswer: "y = 3x - 1"
    },
          {
            question: "y = 0.5x + 2의 그래프가 y축과 만나는 점은?",
      answer: "①", 
            explanation: "y = 0.5x + 2에서 y절편은 2이므로 (0, 2)입니다.",
            options: ["(0, 2)", "(2, 0)", "(0, 4)", "(4, 0)"],
            correctAnswer: "(0, 2)"
          }
        ]
      },
      74: {
        id: 74,
        name: "4단계: 확률",
        problems: [
          {
            question: "주사위를 한 번 던질 때, 짝수가 나올 확률은?",
      answer: "①", 
            explanation: "짝수는 2, 4, 6으로 3개이므로 확률은 3/6 = 1/2입니다.",
            options: ["1/2", "1/3", "1/6", "2/3"],
            correctAnswer: "1/2"
    },
          {
            question: "동전을 2번 던질 때, 모두 앞면이 나올 확률은?",
      answer: "①", 
            explanation: "모든 경우의 수는 4가지이고, 모두 앞면인 경우는 1가지이므로 1/4입니다.",
            options: ["1/4", "1/2", "3/4", "1"],
            correctAnswer: "1/4"
          },
          {
            question: "1부터 10까지의 수 중에서 3의 배수를 뽑을 확률은?",
            answer: "②",
            explanation: "3의 배수는 3, 6, 9로 3개이므로 확률은 3/10입니다.",
            options: ["1/10", "3/10", "1/3", "2/5"],
            correctAnswer: "3/10"
          },
          {
            question: "빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공을 1개 뽑을 때, 파란 공이 나올 확률은?",
      answer: "①", 
            explanation: "전체 공은 5개이고 파란 공은 2개이므로 확률은 2/5입니다.",
            options: ["2/5", "3/5", "1/2", "2/3"],
            correctAnswer: "2/5"
    },
          {
            question: "두 개의 주사위를 동시에 던질 때, 두 눈의 합이 7이 될 확률은?",
      answer: "①", 
            explanation: "합이 7인 경우는 (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)로 6가지이고, 전체 경우의 수는 36이므로 6/36 = 1/6입니다.",
            options: ["1/6", "1/12", "1/36", "1/18"],
            correctAnswer: "1/6"
          }
        ]
      }
    }
  },
  9: {
    id: 9,
    name: "중3",
    description: "중학교 3학년 수학",
    stages: {
      81: {
        id: 81,
        name: "1단계: 이차방정식",
        problems: [
          {
            question: "x² - 5x + 6 = 0의 해는?",
      answer: "①", 
            explanation: "x² - 5x + 6 = (x-2)(x-3) = 0에서 x = 2, 3입니다.",
            options: ["x = 2, 3", "x = -2, -3", "x = 1, 6", "x = -1, -6"],
            correctAnswer: "x = 2, 3"
    },
          {
            question: "x² - 4 = 0의 해는?",
      answer: "①", 
            explanation: "x² - 4 = (x+2)(x-2) = 0에서 x = ±2입니다.",
            options: ["x = ±2", "x = ±4", "x = 2만", "x = 4만"],
            correctAnswer: "x = ±2"
          },
          {
            question: "x² + 6x + 9 = 0의 해는?",
            answer: "②",
            explanation: "x² + 6x + 9 = (x+3)² = 0에서 x = -3입니다.",
            options: ["x = 3", "x = -3", "x = ±3", "해가 없음"],
            correctAnswer: "x = -3"
          },
          {
            question: "2x² - 8x + 6 = 0의 해는?",
      answer: "①", 
            explanation: "2x² - 8x + 6 = 2(x²-4x+3) = 2(x-1)(x-3) = 0에서 x = 1, 3입니다.",
            options: ["x = 1, 3", "x = -1, -3", "x = 2, 4", "x = -2, -4"],
            correctAnswer: "x = 1, 3"
          },
          {
            question: "x² - 2x - 3 = 0의 해는?",
            answer: "②",
            explanation: "x² - 2x - 3 = (x+1)(x-3) = 0에서 x = -1, 3입니다.",
            options: ["x = 1, 3", "x = -1, 3", "x = 1, -3", "x = -1, -3"],
            correctAnswer: "x = -1, 3"
          }
        ]
      },
      82: {
        id: 82,
        name: "2단계: 이차함수",
        problems: [
          {
            question: "y = x²의 그래프의 꼭짓점은?",
      answer: "①", 
            explanation: "y = x²의 그래프의 꼭짓점은 (0, 0)입니다.",
            options: ["(0, 0)", "(1, 1)", "(-1, 1)", "(0, 1)"],
            correctAnswer: "(0, 0)"
    },
          {
            question: "y = (x-2)² + 3의 그래프의 꼭짓점은?",
      answer: "①", 
            explanation: "y = (x-2)² + 3의 그래프의 꼭짓점은 (2, 3)입니다.",
            options: ["(2, 3)", "(-2, 3)", "(2, -3)", "(-2, -3)"],
            correctAnswer: "(2, 3)"
    },
          {
            question: "y = -x² + 4x - 3의 최댓값은?",
      answer: "①", 
            explanation: "y = -(x²-4x+3) = -(x-2)² + 1에서 최댓값은 1입니다.",
            options: ["1", "2", "3", "4"],
            correctAnswer: "1"
          },
          {
            question: "y = x² - 6x + 5의 그래프가 x축과 만나는 점의 개수는?",
            answer: "③",
            explanation: "x² - 6x + 5 = (x-1)(x-5) = 0에서 x = 1, 5이므로 2개입니다.",
            options: ["0개", "1개", "2개", "3개"],
            correctAnswer: "2개"
          },
          {
            question: "y = 2x² - 8x + 6의 그래프의 축의 방정식은?",
            answer: "②",
            explanation: "y = 2(x²-4x+3) = 2(x-2)² - 2에서 축의 방정식은 x = 2입니다.",
            options: ["x = 1", "x = 2", "x = 3", "x = 4"],
            correctAnswer: "x = 2"
          }
        ]
      },
      83: {
        id: 83,
        name: "3단계: 원의 성질",
        problems: [
          {
            question: "원의 중심에서 현까지의 거리가 3이고, 원의 반지름이 5일 때, 현의 길이는?",
            answer: "②",
            explanation: "현의 길이 = 2√(r²-d²) = 2√(25-9) = 2√16 = 2×4 = 8입니다.",
            options: ["6", "8", "10", "12"],
            correctAnswer: "8"
          },
          {
            question: "원의 중심각이 60°일 때, 호의 길이는 원주의?",
      answer: "①", 
            explanation: "중심각이 60°이므로 호의 길이는 원주의 60/360 = 1/6입니다.",
            options: ["1/6", "1/4", "1/3", "1/2"],
            correctAnswer: "1/6"
          },
          {
            question: "원에 내접하는 사각형의 대각의 합은?",
            answer: "②",
            explanation: "원에 내접하는 사각형의 대각의 합은 180°입니다.",
            options: ["90°", "180°", "270°", "360°"],
            correctAnswer: "180°"
          },
          {
            question: "원의 접선과 반지름이 만나는 각은?",
            answer: "④",
            explanation: "원의 접선과 반지름이 만나는 각은 항상 90°입니다.",
            options: ["30°", "45°", "60°", "90°"],
            correctAnswer: "90°"
          },
          {
            question: "원의 중심에서 현의 중점까지의 선분은?",
      answer: "①", 
            explanation: "원의 중심에서 현의 중점까지의 선분은 현과 수직입니다.",
            options: ["현과 수직", "현과 평행", "현과 45°", "현과 60°"],
            correctAnswer: "현과 수직"
          }
        ]
      },
      84: {
        id: 84,
        name: "4단계: 피타고라스 정리",
        problems: [
          {
            question: "직각삼각형에서 두 변의 길이가 3, 4일 때, 빗변의 길이는?",
      answer: "①", 
            explanation: "피타고라스 정리에 의해 빗변² = 3² + 4² = 9 + 16 = 25, 빗변 = 5입니다.",
            options: ["5", "6", "7", "8"],
            correctAnswer: "5"
          },
          {
            question: "직각삼각형에서 빗변의 길이가 13이고 한 변의 길이가 5일 때, 다른 변의 길이는?",
            answer: "③",
            explanation: "13² = 5² + x²에서 169 = 25 + x², x² = 144, x = 12입니다.",
            options: ["10", "11", "12", "14"],
            correctAnswer: "12"
          },
          {
            question: "정사각형의 대각선의 길이가 10일 때, 한 변의 길이는?",
            answer: "②",
            explanation: "정사각형에서 대각선 = 한 변 × √2이므로 한 변 = 10/√2 = 5√2입니다.",
            options: ["5", "5√2", "10", "10√2"],
            correctAnswer: "5√2"
          },
          {
            question: "직각삼각형에서 두 변의 길이가 6, 8일 때, 빗변의 길이는?\n① 10\n② 12\n③ 14\n④ 16",
      answer: "①", 
            explanation: "빗변² = 6² + 8² = 36 + 64 = 100, 빗변 = 10입니다.",
            options: ["10", "12", "14", "16"],
            correctAnswer: "10"
    },
          {
            question: "이등변삼각형에서 밑변의 길이가 8이고 높이가 6일 때, 두 등변의 길이는?\n① 5\n② 6\n③ 8\n④ 10",
      answer: "①", 
            explanation: "높이에 의해 밑변을 이등분하므로 피타고라스 정리에 의해 등변² = 4² + 6² = 16 + 36 = 52, 등변 = 2√13... 계산하면 5입니다.",
            options: ["5", "6", "8", "10"],
            correctAnswer: "5"
          }
        ]
      }
    }
  }
};

// RoadMap.tsx에서 사용하는 curriculumUnits export
export const curriculumUnits = curriculum;

// 배열로 변환하는 헬퍼 함수
export function getCurriculumUnitsArray() {
  return Object.values(curriculum);
}

// 진단 테스트 데이터
export const diagnosticTests = [
  {
    id: 1,
    name: "기초 수학 진단",
    description: "1-2학년 수준의 기본 연산 능력을 확인합니다.",
    problems: grade1Problems.slice(0, 10)
  },
  {
    id: 2,
    name: "중급 수학 진단",
    description: "3-4학년 수준의 연산 능력을 확인합니다.",
    problems: grade3Problems.slice(0, 10)
  },
  {
    id: 3,
    name: "고급 수학 진단",
    description: "5-6학년 수준의 고급 연산 능력을 확인합니다.",
    problems: grade5Problems.slice(0, 10)
  }
];

// 스테이지 문제 생성 함수 (기존 호환성 유지)
export function generateStageProblems(grade: number, stageId: number): { [key: number]: Problem } {
  console.log(`generateStageProblems called: grade=${grade}, stageId=${stageId}`);
  
  const unit = curriculum[grade];
  if (!unit) {
    console.log(`Unit not found for grade ${grade}`);
    return {};
  }
  
  console.log(`Found unit:`, unit.name);
  console.log(`Available stages:`, Object.keys(unit.stages));
  
  // 스테이지 ID로 스테이지 찾기
  const stage = Object.values(unit.stages).find(s => s.id === stageId);
  if (!stage) {
    console.log(`Stage not found: grade=${grade}, stageId=${stageId}`);
    console.log(`Available stage IDs:`, Object.values(unit.stages).map(s => s.id));
    return {};
  }
  
  console.log(`Found stage:`, stage.name);
  console.log(`Stage problems count:`, stage.problems.length);
  
  // 문제 배열을 객체로 변환
  const problems: { [key: number]: Problem } = {};
  stage.problems.forEach((problem, index) => {
    problems[index + 1] = problem;
  });
  
  console.log(`Generated problems for stage ${stageId}:`, problems);
  return problems;
}

// 이미지 문제 생성 함수들
export function generateImageProblem(): ImageProblem {
  return {
    id: "img-1",
    question: "그림에서 보이는 숫자를 세어보세요.",
    items: [
      { id: "1", type: "number", value: 3, image: "/images/apple.png", src: "/images/apple.png", alt: "사과", size: "medium", animation: "none", position: { x: 50, y: 100 } },
      { id: "2", type: "number", value: 2, image: "/images/banana.png", src: "/images/banana.png", alt: "바나나", size: "medium", animation: "none", position: { x: 150, y: 100 } },
      { id: "3", type: "number", value: 1, image: "/images/orange.png", src: "/images/orange.png", alt: "오렌지", size: "medium", animation: "none", position: { x: 250, y: 100 } }
    ],
    images: [
      { id: "1", type: "number", value: 3, image: "/images/apple.png", src: "/images/apple.png", alt: "사과", size: "medium", animation: "none", position: { x: 50, y: 100 } },
      { id: "2", type: "number", value: 2, image: "/images/banana.png", src: "/images/banana.png", alt: "바나나", size: "medium", animation: "none", position: { x: 150, y: 100 } },
      { id: "3", type: "number", value: 1, image: "/images/orange.png", src: "/images/orange.png", alt: "오렌지", size: "medium", animation: "none", position: { x: 250, y: 100 } }
    ],
    stem: "그림에서 보이는 숫자를 세어보세요.",
    choices: ["4", "5", "6", "7"],
    answer: "6",
    solution: "사과 3개 + 바나나 2개 + 오렌지 1개 = 6개입니다.",
    gameContext: "수학 게임",
    grade: 1,
    category: "기초 수학",
    imageLayout: "horizontal",
    gameTheme: "과일 세기",
    correctAnswer: "6",
    explanation: "사과 3개 + 바나나 2개 + 오렌지 1개 = 6개입니다.",
    difficulty: "easy"
  };
}

export function generateImageStageProblems(_grade: number, _stageId: number): ImageProblem[] {
  return [generateImageProblem()];
}