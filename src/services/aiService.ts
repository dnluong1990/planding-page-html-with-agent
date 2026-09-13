import type { AIRequestOptions, AIResponse } from '../types/ai';
import { getActiveProvider } from './providers';
import { BaseProvider } from './providers/BaseProvider';

/**
 * Gọi AI provider đang active
 */
export async function callAI(options: AIRequestOptions): Promise<AIResponse> {
  const provider = getActiveProvider();
  return provider.call(options);
}

/**
 * Gọi AI provider kèm retry logic
 */
export async function callAIWithRetry(
  options: AIRequestOptions,
  maxRetries: number = 3
): Promise<AIResponse> {
  const provider = getActiveProvider();

  if (provider instanceof BaseProvider) {
    return provider.callWithRetry(options, maxRetries);
  }

  // Fallback retry nếu provider không extends BaseProvider
  return provider.call(options);
}

/**
 * Backward-compatible helper cho components cũ đang gọi callWithRetry(messages, systemPrompt, maxRetries)
 */
export async function callWithRetry(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  systemPrompt?: string,
  maxRetries: number = 3
): Promise<string> {
  const response = await callAIWithRetry(
    {
      messages,
      systemPrompt
    },
    maxRetries
  );
  return response.text;
}

// Re-export cho backward compatibility và access
export { getActiveProvider, resetProvider } from './providers';
