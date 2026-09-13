// === Provider Types ===
export type AIProviderType = 'gemini' | 'openai' | 'anthropic' | 'groq' | 'deepseek';

export interface AIProviderConfig {
  type: AIProviderType;
  apiKey: string;
  model: string;
  baseUrl?: string;
  maxOutputTokens?: number;
  temperature?: number;
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIRequestOptions {
  messages: AIMessage[];
  systemPrompt?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface AIResponse {
  text: string;
  provider: AIProviderType;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

// === Provider Interface ===
export interface AIProvider {
  readonly type: AIProviderType;
  readonly displayName: string;
  call(options: AIRequestOptions): Promise<AIResponse>;
  validateConfig(): void;
}

// === Provider Defaults ===
export interface ProviderDefaults {
  model: string;
  baseUrl: string;
  displayName: string;
  maxOutputTokens: number;
  temperature: number;
}
