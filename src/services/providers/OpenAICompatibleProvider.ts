import type { AIRequestOptions, AIResponse } from '../../types/ai';
import { BaseProvider } from './BaseProvider';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIChoice {
  message?: {
    content?: string;
  };
}

interface OpenAIResponseData {
  choices?: OpenAIChoice[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  error?: {
    message?: string;
  };
}

export abstract class OpenAICompatibleProvider extends BaseProvider {
  protected formatMessages(options: AIRequestOptions): OpenAIMessage[] {
    const messages: OpenAIMessage[] = [];
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }
    for (const msg of options.messages) {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }
    return messages;
  }

  async call(options: AIRequestOptions): Promise<AIResponse> {
    const messages = this.formatMessages(options);
    const baseUrl = this.config.baseUrl?.replace(/\/$/, '') || 'https://api.openai.com/v1';
    const url = `${baseUrl}/chat/completions`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: options.temperature ?? this.config.temperature ?? 0.7,
        max_tokens: options.maxOutputTokens ?? this.config.maxOutputTokens ?? 4096
      })
    });

    if (!response.ok) {
      let errorDetail = `Mã lỗi HTTP: ${response.status}`;
      try {
        const errorJson = (await response.json()) as OpenAIResponseData;
        if (errorJson.error?.message) {
          errorDetail = errorJson.error.message;
        }
      } catch {
        // Ignored
      }
      throw new Error(`${this.displayName} API Error: ${errorDetail}`);
    }

    const data = (await response.json()) as OpenAIResponseData;
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error(`Không nhận được nội dung phản hồi từ ${this.displayName}.`);
    }

    return {
      text,
      provider: this.type,
      model: this.config.model,
      usage: {
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
        totalTokens: data.usage?.total_tokens
      }
    };
  }
}
