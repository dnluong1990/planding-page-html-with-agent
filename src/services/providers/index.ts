import type { AIProvider, AIProviderConfig, AIProviderType } from '../../types/ai';
import { getProviderConfig, PROVIDER_DEFAULTS } from '../../config/aiConfig';
import { GeminiProvider } from './GeminiProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { AnthropicProvider } from './AnthropicProvider';
import { GroqProvider } from './GroqProvider';
import { DeepSeekProvider } from './DeepSeekProvider';

export { PROVIDER_DEFAULTS };

// Factory function
export function createProvider(config: AIProviderConfig): AIProvider {
  switch (config.type) {
    case 'gemini':
      return new GeminiProvider(config);
    case 'openai':
      return new OpenAIProvider(config);
    case 'anthropic':
      return new AnthropicProvider(config);
    case 'groq':
      return new GroqProvider(config);
    case 'deepseek':
      return new DeepSeekProvider(config);
    default:
      throw new Error(`Provider không hỗ trợ: ${(config as { type: string }).type}`);
  }
}

// Singleton active provider
let activeProvider: AIProvider | null = null;

export function getActiveProvider(): AIProvider {
  if (!activeProvider) {
    const config = getProviderConfig();
    activeProvider = createProvider(config);
  }
  return activeProvider;
}

export function resetProvider(): void {
  activeProvider = null;
}

export function getSupportedProviders(): AIProviderType[] {
  return ['gemini', 'openai', 'anthropic', 'groq', 'deepseek'];
}
