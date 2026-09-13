import type { AIProviderType, AIRequestOptions, AIResponse } from '../../types/ai';
import { BaseProvider } from './BaseProvider';

interface AnthropicContentBlock {
  type?: string;
  text?: string;
}

interface AnthropicResponseData {
  content?: AnthropicContentBlock[];
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
  };
  error?: {
    message?: string;
  };
}

export class AnthropicProvider extends BaseProvider {
  readonly type: AIProviderType = 'anthropic';
  readonly displayName = 'Anthropic Claude';

  private formatMessages(options: AIRequestOptions): Array<{ role: 'user' | 'assistant'; content: string }> {
    const formatted: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    for (const msg of options.messages) {
      if (msg.role === 'system') continue;
      formatted.push({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      });
    }

    if (formatted.length === 0 || formatted[0]?.role !== 'user') {
      formatted.unshift({ role: 'user', content: 'Bắt đầu khởi tạo trang landing page.' });
    }

    return formatted;
  }

  async call(options: AIRequestOptions): Promise<AIResponse> {
    const messages = this.formatMessages(options);
    const baseUrl = this.config.baseUrl?.replace(/\/$/, '') || 'https://api.anthropic.com/v1';
    const url = `${baseUrl}/messages`;

    const requestBody: {
      model: string;
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      max_tokens: number;
      temperature?: number;
      system?: string;
    } = {
      model: this.config.model,
      messages,
      max_tokens: options.maxOutputTokens ?? this.config.maxOutputTokens ?? 4096,
      temperature: options.temperature ?? this.config.temperature ?? 0.7
    };

    if (options.systemPrompt) {
      requestBody.system = options.systemPrompt;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
        'dangerously-allow-browser': 'true'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      let errorDetail = `Mã lỗi HTTP: ${response.status}`;
      try {
        const errorJson = (await response.json()) as AnthropicResponseData;
        if (errorJson.error?.message) {
          errorDetail = errorJson.error.message;
        }
      } catch {
        // Ignored
      }
      throw new Error(`Anthropic API Error: ${errorDetail}`);
    }

    const data = (await response.json()) as AnthropicResponseData;
    const text = data.content?.[0]?.text;

    if (!text) {
      throw new Error('Không nhận được nội dung phản hồi từ Anthropic Claude.');
    }

    const inputTokens = data.usage?.input_tokens ?? 0;
    const outputTokens = data.usage?.output_tokens ?? 0;

    return {
      text,
      provider: this.type,
      model: this.config.model,
      usage: {
        promptTokens: inputTokens,
        completionTokens: outputTokens,
        totalTokens: inputTokens + outputTokens
      }
    };
  }
}
