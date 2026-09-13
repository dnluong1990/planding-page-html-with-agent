import type { AIProviderType, AIRequestOptions, AIResponse } from '../../types/ai';
import { BaseProvider } from './BaseProvider';

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
}

interface GeminiResponseData {
  candidates?: GeminiCandidate[];
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
  error?: {
    message?: string;
  };
}

export class GeminiProvider extends BaseProvider {
  readonly type: AIProviderType = 'gemini';
  readonly displayName = 'Google Gemini';

  override validateConfig(): void {
    super.validateConfig();
    if (this.config.apiKey === 'your_gemini_api_key_here') {
      throw new Error('Chưa cấu hình VITE_GEMINI_API_KEY trong file .env');
    }
  }

  private formatMessages(options: AIRequestOptions): GeminiContent[] {
    const formatted: GeminiContent[] = [];

    for (const msg of options.messages) {
      if (msg.role === 'system') continue;

      const role: 'user' | 'model' = msg.role === 'assistant' ? 'model' : 'user';
      const text = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);

      if (formatted.length > 0 && formatted[formatted.length - 1]?.role === role) {
        const lastPart = formatted[formatted.length - 1]?.parts[0];
        if (lastPart) {
          lastPart.text += `\n\n${text}`;
        }
      } else {
        formatted.push({
          role,
          parts: [{ text }]
        });
      }
    }

    if (formatted.length === 0 || formatted[0]?.role !== 'user') {
      formatted.unshift({ role: 'user', parts: [{ text: 'Bắt đầu khởi tạo trang landing page.' }] });
    }

    return formatted;
  }

  async call(options: AIRequestOptions): Promise<AIResponse> {
    const contents = this.formatMessages(options);
    const baseUrl = this.config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';
    const url = `${baseUrl}/models/${this.config.model}:generateContent?key=${this.config.apiKey}`;

    const requestBody: {
      contents: GeminiContent[];
      generationConfig: {
        temperature: number;
        topP: number;
        topK: number;
        maxOutputTokens: number;
      };
      systemInstruction?: {
        parts: GeminiPart[];
      };
    } = {
      contents,
      generationConfig: {
        temperature: options.temperature ?? this.config.temperature ?? 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: options.maxOutputTokens ?? this.config.maxOutputTokens ?? 8192
      }
    };

    if (options.systemPrompt) {
      requestBody.systemInstruction = {
        parts: [{ text: options.systemPrompt }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      let errorDetail = `Mã lỗi HTTP: ${response.status}`;
      try {
        const errorJson = (await response.json()) as GeminiResponseData;
        if (errorJson.error?.message) {
          errorDetail = errorJson.error.message;
        }
      } catch {
        // Ignored
      }
      throw new Error(`Gemini API Error: ${errorDetail}`);
    }

    const data = (await response.json()) as GeminiResponseData;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Không nhận được nội dung phản hồi từ Gemini AI.');
    }

    return {
      text,
      provider: this.type,
      model: this.config.model,
      usage: {
        promptTokens: data.usageMetadata?.promptTokenCount,
        completionTokens: data.usageMetadata?.candidatesTokenCount,
        totalTokens: data.usageMetadata?.totalTokenCount
      }
    };
  }
}
