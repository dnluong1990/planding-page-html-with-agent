import type { AIProviderType } from '../../types/ai';
import { OpenAICompatibleProvider } from './OpenAICompatibleProvider';

export class DeepSeekProvider extends OpenAICompatibleProvider {
  readonly type: AIProviderType = 'deepseek';
  readonly displayName = 'DeepSeek';
}
