import type { AIProviderType } from '../../types/ai';
import { OpenAICompatibleProvider } from './OpenAICompatibleProvider';

export class OpenAIProvider extends OpenAICompatibleProvider {
  readonly type: AIProviderType = 'openai';
  readonly displayName = 'OpenAI';
}
