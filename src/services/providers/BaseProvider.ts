import type { AIProvider, AIProviderType, AIProviderConfig, AIRequestOptions, AIResponse } from '../../types/ai';

export abstract class BaseProvider implements AIProvider {
  abstract readonly type: AIProviderType;
  abstract readonly displayName: string;

  protected config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.validateConfig();
  }

  // Mỗi provider override method này
  abstract call(options: AIRequestOptions): Promise<AIResponse>;

  // Validate API key tồn tại
  validateConfig(): void {
    if (!this.config.apiKey) {
      throw new Error(`Chưa cấu hình API key cho provider ${this.displayName}.`);
    }
  }

  // Retry logic chung cho tất cả providers
  async callWithRetry(options: AIRequestOptions, maxRetries: number = 3): Promise<AIResponse> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.call(options);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Không retry nếu lỗi cấu hình
        if (lastError.message.includes('Chưa cấu hình')) {
          throw lastError;
        }

        if (attempt < maxRetries) {
          const waitTime = attempt * 1000;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }

    throw lastError ?? new Error('Không thể kết nối đến AI provider.');
  }
}
