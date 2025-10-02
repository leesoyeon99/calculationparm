// 🤖 AI 기반 고품질 문제 생성 서비스
// 실제 AI API를 연동하여 교재 수준의 문제를 생성

// 임시로 비활성화 - HighQualityProblem 타입이 정의되지 않음
/*

// AI API 설정
interface AIConfig {
  provider: 'openai' | 'claude' | 'gemini' | 'local';
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

// AI API 호출 함수
export class AIProblemGenerator {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  // 🎯 고품질 문제 생성
  async generateHighQualityProblem(
    grade: string,
    unit: string,
    difficulty: 'easy' | 'medium' | 'hard' | 'expert' = 'medium'
  ): Promise<HighQualityProblem> {
    const prompt = this.buildPrompt(grade, unit, difficulty);
    
    try {
      const response = await this.callAI(prompt);
      return this.parseResponse(response);
    } catch (error) {
      console.error('AI 문제 생성 실패:', error);
      throw new Error('고품질 문제 생성에 실패했습니다.');
    }
  }

  // 📝 프롬프트 구성
  private buildPrompt(grade: string, unit: string, difficulty: string): string {
    return `
당신은 20년 경력의 수학교육 전문가이자 교과서 집필진입니다.
다음 조건에 맞는 교재 수준의 고품질 수학 문제를 생성해주세요:

**학년**: ${grade}
**단원**: ${unit}
**난이도**: ${difficulty}

**요구사항**:
1. 실제 교과서 수준의 문제 품질
2. 단계별 사고 과정이 필요한 문제
3. 실생활 맥락이 자연스럽게 포함된 문제
4. 오개념을 유발할 수 있는 함정 요소 포함
5. 다양한 해결 방법이 가능한 개방적 문제
6. 수학적 사고력을 요구하는 문제

**출력 형식 (JSON)**:
{
  "id": "고유 식별자",
  "grade": "학년",
  "unit": "단원",
  "difficulty": "난이도",
  "context": {
    "realWorldSituation": "실생활 상황",
    "characters": ["등장인물들"],
    "setting": "배경 설정",
    "background": "상황 설명"
  },
  "mathematicalContent": {
    "concepts": ["핵심 개념들"],
    "skills": ["필요 기술들"],
    "misconceptions": ["오개념 요소들"],
    "prerequisites": ["선수 학습 내용들"]
  },
  "problemType": {
    "format": "multiple_choice",
    "cognitiveLevel": "apply"
  },
  "stem": "문제 본문 (상황 설정 + 문제)",
  "choices": [
    {
      "id": "①",
      "text": "선택지 내용",
      "isCorrect": true,
      "rationale": "선택 근거",
      "commonMistake": "일반적인 실수"
    }
  ],
  "answer": "정답",
  "solution": {
    "stepByStep": ["단계별 해설"],
    "keyPoints": ["핵심 포인트들"],
    "alternativeMethods": ["대안 해결 방법들"]
  },
  "educational": {
    "learningObjectives": ["학습 목표들"],
    "assessmentCriteria": ["평가 기준들"],
    "teacherNotes": "교사용 가이드",
    "studentHints": ["학생용 힌트들"]
  },
  "visual": {
    "diagrams": ["도형들"],
    "charts": ["차트들"],
    "images": ["이미지들"],
    "interactive": true
  }
}

**중요**: JSON 형식으로만 응답하고, 다른 설명은 포함하지 마세요.
`;
  }

  // 🤖 AI API 호출
  private async callAI(prompt: string): Promise<string> {
    switch (this.config.provider) {
      case 'openai':
        return await this.callOpenAI(prompt);
      case 'claude':
        return await this.callClaude(prompt);
      case 'gemini':
        return await this.callGemini(prompt);
      case 'local':
        return await this.callLocalAI(prompt);
      default:
        throw new Error('지원하지 않는 AI 제공업체입니다.');
    }
  }

  // OpenAI API 호출
  private async callOpenAI(prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: '당신은 수학교육 전문가입니다. JSON 형식으로만 응답하세요.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API 오류: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Claude API 호출
  private async callClaude(prompt: string): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.config.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API 오류: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  // Gemini API 호출
  private async callGemini(prompt: string): Promise<string> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: this.config.temperature,
          maxOutputTokens: this.config.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API 오류: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // 로컬 AI 모델 호출 (Ollama 등)
  private async callLocalAI(prompt: string): Promise<string> {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: this.config.temperature,
          num_predict: this.config.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`로컬 AI 오류: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }

  // 응답 파싱
  private parseResponse(response: string): HighQualityProblem {
    try {
      // JSON 추출 (```json ... ``` 형태일 경우)
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : response;
      
      const parsed = JSON.parse(jsonString);
      return parsed as HighQualityProblem;
    } catch (error) {
      console.error('응답 파싱 실패:', error);
      throw new Error('AI 응답을 파싱할 수 없습니다.');
    }
  }
}

// 🎯 사용 예시
export const createProblemGenerator = (): AIProblemGenerator => {
  const config: AIConfig = {
    provider: 'openai', // 또는 'claude', 'gemini', 'local'
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: 'gpt-4', // 또는 'claude-3-sonnet', 'gemini-pro', 'llama2'
    temperature: 0.7,
    maxTokens: 2000
  };

  return new AIProblemGenerator(config);
};

// 🎨 고품질 문제 생성 훅
export const useHighQualityProblemGenerator = () => {
  const generator = createProblemGenerator();

  const generateProblem = async (
    grade: string,
    unit: string,
    difficulty: 'easy' | 'medium' | 'hard' | 'expert' = 'medium'
  ) => {
    try {
      const problem = await generator.generateHighQualityProblem(grade, unit, difficulty);
      return problem;
    } catch (error) {
      console.error('문제 생성 실패:', error);
      throw error;
    }
  };

  return { generateProblem };
};
*/

// export default AIProblemGenerator;
