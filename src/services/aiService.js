const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.6-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

/**
 * Chuẩn hóa danh sách messages cho Gemini API (chỉ nhận role 'user' hoặc 'model')
 */
function formatMessagesForGemini(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [{ role: 'user', parts: [{ text: 'Xin chào!' }] }];
  }

  const formatted = [];
  for (const msg of messages) {
    // Bỏ qua system role vì đã truyền trong systemInstruction
    if (msg.role === 'system') continue;

    const role = msg.role === 'assistant' ? 'model' : 'user';
    const text = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);

    // Merge nếu 2 message liên tiếp có cùng role
    if (formatted.length > 0 && formatted[formatted.length - 1].role === role) {
      formatted[formatted.length - 1].parts[0].text += `\n\n${text}`;
    } else {
      formatted.push({
        role,
        parts: [{ text }]
      });
    }
  }

  // Đảm bảo message đầu tiên luôn là 'user'
  if (formatted.length === 0 || formatted[0].role !== 'user') {
    formatted.unshift({ role: 'user', parts: [{ text: 'Bắt đầu khởi tạo trang landing page.' }] });
  }

  return formatted;
}

/**
 * Gọi Gemini REST API
 * @param {Array} messages - Mảng messages [{role, content}]
 * @param {string} systemPrompt - Chỉ dẫn hệ thống
 * @returns {Promise<string>} - Nội dung văn bản phản hồi từ AI
 */
export async function callGeminiAPI(messages, systemPrompt) {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Chưa cấu hình VITE_GEMINI_API_KEY trong file .env');
  }

  const contents = formatMessagesForGemini(messages);

  const requestBody = {
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192
    }
  };

  if (systemPrompt) {
    requestBody.systemInstruction = {
      parts: [{ text: systemPrompt }]
    };
  }

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    let errorDetail = `Mã lỗi HTTP: ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson.error?.message) {
        errorDetail = errorJson.error.message;
      }
    } catch {
      // Ignored
    }
    throw new Error(`Gemini API Error: ${errorDetail}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Không nhận được nội dung phản hồi từ Gemini AI.');
  }

  return text;
}

/**
 * Gọi Gemini API kèm logic retry tối đa 3 lần với exponential delay
 */
export async function callWithRetry(messages, systemPrompt, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callGeminiAPI(messages, systemPrompt);
    } catch (error) {
      lastError = error;
      // Nếu là lỗi thiếu API key thì không cần retry
      if (error.message?.includes('Chưa cấu hình VITE_GEMINI_API_KEY')) {
        throw error;
      }

      if (attempt < maxRetries) {
        // Delay tăng dần: 1s, 2s...
        const waitTime = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}
