// 요리 게임용 레시피 데이터

export interface CookingIngredient {
  id: string;
  name: string;
  emoji: string;
  amount: number;
  unit: string;
}

export interface CookingMathProblem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 1 | 2 | 3;
}

export interface CookingRecipe {
  id: string;
  name: string;
  emoji: string;
  description: string;
  ingredients: CookingIngredient[];
  mathProblem: CookingMathProblem;
  difficulty: 1 | 2 | 3;
  timeLimit: number; // 초
  scoreReward: number;
}

// 쉬운 레시피 (난이도 1)
const easyRecipes: CookingRecipe[] = [
  {
    id: 'easy_1',
    name: '수학 쿠키',
    emoji: '🍪',
    description: '달콤한 수학 쿠키를 만들어보세요!',
    difficulty: 1,
    timeLimit: 90,
    scoreReward: 100,
    ingredients: [
      { id: 'flour', name: '밀가루', emoji: '🌾', amount: 2, unit: '컵' },
      { id: 'sugar', name: '설탕', emoji: '🍬', amount: 1, unit: '컵' },
      { id: 'butter', name: '버터', emoji: '🧈', amount: 3, unit: '큰술' }
    ],
    mathProblem: {
      question: '재료의 총 개수는? 밀가루 2컵 + 설탕 1컵 + 버터 3큰술',
      options: ['5', '6', '7', '8'],
      correct: 1,
      explanation: '2 + 1 + 3 = 6입니다!',
      difficulty: 1
    }
  },
  {
    id: 'easy_2',
    name: '과일 샐러드',
    emoji: '🥗',
    description: '신선한 과일 샐러드를 만들어보세요!',
    difficulty: 1,
    timeLimit: 90,
    scoreReward: 100,
    ingredients: [
      { id: 'apple', name: '사과', emoji: '🍎', amount: 3, unit: '개' },
      { id: 'banana', name: '바나나', emoji: '🍌', amount: 2, unit: '개' },
      { id: 'grape', name: '포도', emoji: '🍇', amount: 5, unit: '송이' }
    ],
    mathProblem: {
      question: '과일의 총 개수는? 사과 3개 + 바나나 2개 + 포도 5송이',
      options: ['8', '9', '10', '11'],
      correct: 2,
      explanation: '3 + 2 + 5 = 10입니다!',
      difficulty: 1
    }
  },
  {
    id: 'easy_3',
    name: '초코 머핀',
    emoji: '🧁',
    description: '달콤한 초코 머핀을 구워보세요!',
    difficulty: 1,
    timeLimit: 90,
    scoreReward: 100,
    ingredients: [
      { id: 'flour2', name: '밀가루', emoji: '🌾', amount: 4, unit: '컵' },
      { id: 'choco', name: '초콜릿', emoji: '🍫', amount: 2, unit: '개' },
      { id: 'egg', name: '계란', emoji: '🥚', amount: 2, unit: '개' }
    ],
    mathProblem: {
      question: '재료의 총 개수는? 4 + 2 + 2 = ?',
      options: ['6', '7', '8', '9'],
      correct: 2,
      explanation: '4 + 2 + 2 = 8입니다!',
      difficulty: 1
    }
  }
];

// 중간 레시피 (난이도 2)
const mediumRecipes: CookingRecipe[] = [
  {
    id: 'medium_1',
    name: '수학 파이',
    emoji: '🥧',
    description: '맛있는 수학 파이를 만들어보세요!',
    difficulty: 2,
    timeLimit: 120,
    scoreReward: 200,
    ingredients: [
      { id: 'apple2', name: '사과', emoji: '🍎', amount: 6, unit: '개' },
      { id: 'cinnamon', name: '시나몬', emoji: '🌰', amount: 2, unit: '작은술' },
      { id: 'dough', name: '반죽', emoji: '🍞', amount: 1, unit: '장' }
    ],
    mathProblem: {
      question: '사과를 반으로 자르면 몇 조각? (사과 6개 ÷ 2)',
      options: ['2', '3', '4', '6'],
      correct: 1,
      explanation: '6 ÷ 2 = 3입니다!',
      difficulty: 2
    }
  },
  {
    id: 'medium_2',
    name: '피자',
    emoji: '🍕',
    description: '치즈 가득한 피자를 만들어보세요!',
    difficulty: 2,
    timeLimit: 120,
    scoreReward: 200,
    ingredients: [
      { id: 'cheese', name: '치즈', emoji: '🧀', amount: 4, unit: '장' },
      { id: 'tomato', name: '토마토', emoji: '🍅', amount: 3, unit: '개' },
      { id: 'pepperoni', name: '페퍼로니', emoji: '🥓', amount: 8, unit: '조각' }
    ],
    mathProblem: {
      question: '치즈 4장을 2명이 똑같이 나눠 먹으면 한 명당?',
      options: ['1장', '2장', '3장', '4장'],
      correct: 1,
      explanation: '4 ÷ 2 = 2장입니다!',
      difficulty: 2
    }
  },
  {
    id: 'medium_3',
    name: '케이크',
    emoji: '🎂',
    description: '생일 케이크를 만들어보세요!',
    difficulty: 2,
    timeLimit: 120,
    scoreReward: 200,
    ingredients: [
      { id: 'flour3', name: '밀가루', emoji: '🌾', amount: 3, unit: '컵' },
      { id: 'cream', name: '생크림', emoji: '🥛', amount: 2, unit: '컵' },
      { id: 'strawberry', name: '딸기', emoji: '🍓', amount: 12, unit: '개' }
    ],
    mathProblem: {
      question: '딸기 12개를 4명이 똑같이 나눠 먹으면 한 명당?',
      options: ['2개', '3개', '4개', '6개'],
      correct: 1,
      explanation: '12 ÷ 4 = 3개입니다!',
      difficulty: 2
    }
  }
];

// 어려운 레시피 (난이도 3)
const hardRecipes: CookingRecipe[] = [
  {
    id: 'hard_1',
    name: '프랑스 마카롱',
    emoji: '🍡',
    description: '고급 프랑스 마카롱을 만들어보세요!',
    difficulty: 3,
    timeLimit: 150,
    scoreReward: 300,
    ingredients: [
      { id: 'almond', name: '아몬드 가루', emoji: '🥜', amount: 120, unit: 'g' },
      { id: 'sugar3', name: '설탕', emoji: '🍬', amount: 150, unit: 'g' },
      { id: 'egg_white', name: '달걀 흰자', emoji: '🥚', amount: 90, unit: 'g' }
    ],
    mathProblem: {
      question: '총 재료의 무게는? 120g + 150g + 90g = ?',
      options: ['340g', '350g', '360g', '370g'],
      correct: 2,
      explanation: '120 + 150 + 90 = 360g입니다!',
      difficulty: 3
    }
  },
  {
    id: 'hard_2',
    name: '티라미수',
    emoji: '🍰',
    description: '이탈리아 디저트 티라미수를 만들어보세요!',
    difficulty: 3,
    timeLimit: 150,
    scoreReward: 300,
    ingredients: [
      { id: 'mascarpone', name: '마스카포네', emoji: '🧈', amount: 250, unit: 'g' },
      { id: 'coffee', name: '에스프레소', emoji: '☕', amount: 3, unit: '샷' },
      { id: 'cocoa', name: '코코아 가루', emoji: '🍫', amount: 2, unit: '큰술' }
    ],
    mathProblem: {
      question: '에스프레소 3샷 × 코코아 2큰술 = ?',
      options: ['5', '6', '7', '8'],
      correct: 1,
      explanation: '3 × 2 = 6입니다!',
      difficulty: 3
    }
  },
  {
    id: 'hard_3',
    name: '크루아상',
    emoji: '🥐',
    description: '프랑스식 크루아상을 만들어보세요!',
    difficulty: 3,
    timeLimit: 150,
    scoreReward: 300,
    ingredients: [
      { id: 'flour4', name: '밀가루', emoji: '🌾', amount: 500, unit: 'g' },
      { id: 'butter3', name: '버터', emoji: '🧈', amount: 250, unit: 'g' },
      { id: 'milk', name: '우유', emoji: '🥛', amount: 150, unit: 'ml' }
    ],
    mathProblem: {
      question: '버터는 밀가루의 절반입니다. 500g의 절반은?',
      options: ['200g', '250g', '300g', '350g'],
      correct: 1,
      explanation: '500 ÷ 2 = 250g입니다!',
      difficulty: 3
    }
  }
];

// 모든 레시피
export const allRecipes = [
  ...easyRecipes,
  ...mediumRecipes,
  ...hardRecipes
];

// 난이도별 레시피
export const recipesByDifficulty = {
  1: easyRecipes,
  2: mediumRecipes,
  3: hardRecipes
};

// 랜덤 레시피 가져오기
export const getRandomRecipe = (difficulty?: 1 | 2 | 3): CookingRecipe => {
  let recipes: CookingRecipe[];
  
  if (difficulty) {
    recipes = recipesByDifficulty[difficulty];
  } else {
    recipes = allRecipes;
  }
  
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
};

// 여러 레시피 가져오기
export const getRandomRecipes = (count: number, difficulty?: 1 | 2 | 3): CookingRecipe[] => {
  let recipes: CookingRecipe[];
  
  if (difficulty) {
    recipes = recipesByDifficulty[difficulty];
  } else {
    recipes = allRecipes;
  }
  
  const shuffled = [...recipes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

