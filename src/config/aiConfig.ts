// 🤖 AI 설정 파일
// 환경변수에서 AI API 설정을 가져오는 설정 파일

export interface AIConfig {
  provider: 'openai' | 'claude' | 'gemini' | 'local';
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

// 환경변수에서 AI 설정 가져오기
export const getAIConfig = (): AIConfig => {
  const provider = (process.env.REACT_APP_AI_PROVIDER || 'openai') as AIConfig['provider'];
  
  let apiKey = '';
  let model = '';
  
  switch (provider) {
    case 'openai':
      apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
      model = process.env.REACT_APP_AI_MODEL || 'gpt-4';
      break;
    case 'claude':
      apiKey = process.env.REACT_APP_CLAUDE_API_KEY || '';
      model = process.env.REACT_APP_AI_MODEL || 'claude-3-sonnet-20240229';
      break;
    case 'gemini':
      apiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
      model = process.env.REACT_APP_AI_MODEL || 'gemini-pro';
      break;
    case 'local':
      apiKey = 'local';
      model = process.env.REACT_APP_AI_MODEL || 'llama2';
      break;
  }

  return {
    provider,
    apiKey,
    model,
    temperature: parseFloat(process.env.REACT_APP_AI_TEMPERATURE || '0.7'),
    maxTokens: parseInt(process.env.REACT_APP_AI_MAX_TOKENS || '2000')
  };
};

// 기본 설정
export const defaultAIConfig: AIConfig = {
  provider: 'openai',
  apiKey: '',
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000
};

// 설정 검증
export const validateAIConfig = (config: AIConfig): boolean => {
  if (!config.apiKey && config.provider !== 'local') {
    console.error('AI API 키가 설정되지 않았습니다.');
    return false;
  }
  
  if (!config.model) {
    console.error('AI 모델이 설정되지 않았습니다.');
    return false;
  }
  
  return true;
};

export default getAIConfig;

