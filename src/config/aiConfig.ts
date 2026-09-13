import type { AIProviderConfig, AIProviderType, ProviderDefaults } from '../types/ai';

export const PROVIDER_DEFAULTS: Record<AIProviderType, ProviderDefaults> = {
  gemini: {
    model: 'gemini-3.6-flash',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    displayName: 'Google Gemini',
    maxOutputTokens: 8192,
    temperature: 0.7
  },
  openai: {
    model: 'gpt-4o',
    baseUrl: 'https://api.openai.com/v1',
    displayName: 'OpenAI',
    maxOutputTokens: 4096,
    temperature: 0.7
  },
  anthropic: {
    model: 'claude-sonnet-4-20250514',
    baseUrl: 'https://api.anthropic.com/v1',
    displayName: 'Anthropic Claude',
    maxOutputTokens: 4096,
    temperature: 0.7
  },
  groq: {
    model: 'llama-3.3-70b-versatile',
    baseUrl: 'https://api.groq.com/openai/v1',
    displayName: 'Groq',
    maxOutputTokens: 4096,
    temperature: 0.7
  },
  deepseek: {
    model: 'deepseek-chat',
    baseUrl: 'https://api.deepseek.com',
    displayName: 'DeepSeek',
    maxOutputTokens: 4096,
    temperature: 0.7
  }
};

export function getProviderConfig(): AIProviderConfig {
  const providerType = (import.meta.env.VITE_AI_PROVIDER || 'gemini') as AIProviderType;
  const defaults = PROVIDER_DEFAULTS[providerType];

  if (!defaults) {
    throw new Error(`Provider "${providerType}" không được hỗ trợ.`);
  }

  // Đọc API key + model theo provider type
  switch (providerType) {
    case 'gemini':
      return {
        type: 'gemini',
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
        model: import.meta.env.VITE_GEMINI_MODEL || defaults.model,
        baseUrl: defaults.baseUrl,
        maxOutputTokens: defaults.maxOutputTokens,
        temperature: defaults.temperature
      };
    case 'openai':
      return {
        type: 'openai',
        apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
        model: import.meta.env.VITE_OPENAI_MODEL || defaults.model,
        baseUrl: defaults.baseUrl,
        maxOutputTokens: defaults.maxOutputTokens,
        temperature: defaults.temperature
      };
    case 'anthropic':
      return {
        type: 'anthropic',
        apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
        model: import.meta.env.VITE_ANTHROPIC_MODEL || defaults.model,
        baseUrl: import.meta.env.VITE_ANTHROPIC_BASE_URL || defaults.baseUrl,
        maxOutputTokens: defaults.maxOutputTokens,
        temperature: defaults.temperature
      };
    case 'groq':
      return {
        type: 'groq',
        apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
        model: import.meta.env.VITE_GROQ_MODEL || defaults.model,
        baseUrl: defaults.baseUrl,
        maxOutputTokens: defaults.maxOutputTokens,
        temperature: defaults.temperature
      };
    case 'deepseek':
      return {
        type: 'deepseek',
        apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
        model: import.meta.env.VITE_DEEPSEEK_MODEL || defaults.model,
        baseUrl: defaults.baseUrl,
        maxOutputTokens: defaults.maxOutputTokens,
        temperature: defaults.temperature
      };
    default:
      throw new Error(`Provider "${String(providerType)}" không được hỗ trợ.`);
  }
}

export function getProviderDisplayName(providerType?: AIProviderType): string {
  const type = providerType || (import.meta.env.VITE_AI_PROVIDER as AIProviderType) || 'gemini';
  return PROVIDER_DEFAULTS[type]?.displayName || 'AI Provider';
}

