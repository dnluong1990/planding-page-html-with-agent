import type { AIProviderType } from '../../types/ai';
import { OpenAICompatibleProvider } from './OpenAICompatibleProvider';

export class GroqProvider extends OpenAICompatibleProvider {
  readonly type: AIProviderType = 'groq';
  readonly displayName = 'Groq';
}
