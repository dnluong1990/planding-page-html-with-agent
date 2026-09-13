# 🚀 Planding — AI-Powered Landing Page Generator

> **Nền tảng kiến tạo Landing Page chuyên nghiệp, chuẩn SEO và tối ưu chuyển đổi chỉ bằng giao tiếp hội thoại với AI.**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![AI Providers](https://img.shields.io/badge/AI_Providers-Gemini_|_OpenAI_|_Claude_|_Groq_|_DeepSeek-FF6F00)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Giới thiệu (Overview)

**Planding** là ứng dụng web hiện đại giúp các cá nhân, doanh nghiệp vừa và nhỏ, marketer hoặc lập trình viên xây dựng các trang landing page đẳng cấp thế giới trong vài phút. Không yêu cầu kỹ năng thiết kế UI/UX hay lập trình, bạn chỉ cần trò chuyện với trợ lý AI, hệ thống sẽ tự động tổng hợp thông tin, phối màu, cấu trúc giao diện và sinh toàn bộ mã nguồn HTML5/CSS tự chứa (self-contained), responsive 100% và chuẩn SEO.

---

## ✨ Tính năng nổi bật (Key Features)

### 💬 1. Trò chuyện định hướng thông minh (Guided Chat Flow)
- Trợ lý AI dẫn dắt bạn qua **6 bước** thu thập thông tin chuẩn mực: *Ngành nghề*, *Tên thương hiệu & Slogan*, *Mục đích landing page*, *Phong cách thiết kế*, *Màu sắc chủ đạo*, và *Nội dung chính*.
- Mỗi bước đều có gợi ý sẵn (suggestion chips) giúp tương tác nhanh chóng và mượt mà.

### ✏️ 2. Chỉnh sửa tự do bằng ngôn ngữ tự nhiên (Free Chat Edit Mode)
- Sau khi trang được khởi tạo, bạn có thể tiếp tục trò chuyện tự do để yêu cầu chỉnh sửa (ví dụ: *"Đổi màu nút CTA sang màu cam"*, *"Thêm bảng giá 3 gói dịch vụ"*, *"Thay đổi tiêu đề chính"...*).
- AI cập nhật trực tiếp mã nguồn HTML/CSS và phản hồi tức thì.

### 🤖 3. Hỗ trợ đa nhà cung cấp AI (Multi-Provider AI Architecture)
- Kiến trúc Provider Pattern độc lập, dễ dàng chuyển đổi nhà cung cấp chỉ bằng 1 biến môi trường:
  - **Google Gemini** (Mặc định `gemini-3.6-flash`)
  - **OpenAI** (`gpt-4o`)
  - **Anthropic Claude** (`claude-sonnet-4-20250514`, hỗ trợ CORS proxy)
  - **Groq** (`llama-3.3-70b-versatile` — tốc độ siêu tốc)
  - **DeepSeek** (`deepseek-chat`)
- Tích hợp cơ chế tự động **Retry với exponential backoff** khi kết nối mạng gián đoạn.

### 📱 4. Xem trước đa màn hình theo thời gian thực (Multi-Device Live Preview)
- Tích hợp khung preview trực quan với iframe sandbox an toàn.
- Dễ dàng chuyển đổi linh hoạt giữa 3 chế độ hiển thị:
  - 🖥️ **Desktop (Máy tính):** 100% chiều rộng.
  - 💻 **Tablet (Máy tính bảng):** 768px.
  - 📱 **Mobile (Điện thoại):** 375px kèm khung mô phỏng viền thiết bị và camera/loa thời thượng.
- Hỗ trợ chế độ phóng to toàn màn hình (Fullscreen preview).

### ⚡ 5. Xuất bản & Tải về 1-Click (Instant Export)
- **Tải file HTML:** Tự động tạo và tải file `.html` hoàn chỉnh, tự chứa mã CSS bên trong thẻ `<style>`, sẵn sàng mở trực tiếp trên trình duyệt hoặc upload lên bất kỳ dịch vụ hosting nào (GitHub Pages, Netlify, Vercel, cPanel...).
- **Sao chép mã nguồn:** Copy toàn bộ mã HTML vào Clipboard chỉ với một cú nhấp chuột.

### 🌐 6. Cấu hình đa ngôn ngữ (Internationalization - i18n)
- Hỗ trợ thiết lập ngôn ngữ đầu ra thông qua biến `VITE_LANGUAGE` (hỗ trợ Tiếng Việt `vi`, Tiếng Anh `en` và mở rộng 10 ngôn ngữ).
- Tự động đồng bộ từ UI strings, câu hỏi hướng dẫn, prompt gửi đến AI cho đến thẻ `<html lang="...">` của trang đích được tạo ra.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Ngôn ngữ:** TypeScript (Strict Mode, 100% type-safe, không sử dụng `any`).
- **Framework UI:** React 18 (Hooks, Context API, Reducer Pattern).
- **Build Tool & Dev Server:** Vite 6.
- **Styling:** Vanilla CSS hiện đại (CSS Variables, Glassmorphism, BEM methodology, Responsive Mobile-First).
- **Bộ icon:** Lucide React.
- **REST APIs:** Gemini API, OpenAI Chat Completions API, Anthropic Messages API.

---

## 📁 Cấu trúc dự án (Project Structure)

```
planding-project/
├── .agents/                 ← Hướng dẫn và quy tắc cho AI coding assistant
├── .env.example             ← File mẫu cấu hình biến môi trường
├── index.html               ← Entry HTML template
├── package.json             ← Scripts và dependencies
├── tsconfig.json            ← Cấu hình TypeScript compiler (Strict mode)
├── vite.config.ts           ← Cấu hình Vite dev server
├── tasks/                   ← Quản lý danh sách checklist các tasks phát triển
└── src/
    ├── main.tsx             ← Entry point của ứng dụng React
    ├── App.tsx              ← Điều hướng màn hình (Home vs Builder) và mobile tabs
    ├── index.css            ← Design system, CSS variables, dark theme & responsive layout
    ├── types/               ← Định nghĩa Interfaces & Types chặt chẽ
    │   ├── index.ts         ← ChatMessage, ChatState, ChatAction, GuidedStep
    │   ├── ai.ts            ← AIProvider, AIProviderConfig, AIRequestOptions, AIResponse
    │   └── components.ts    ← Props interfaces cho toàn bộ components
    ├── config/              ← Cấu hình hệ thống
    │   ├── aiConfig.ts      ← Đọc cấu hình provider & model từ .env
    │   ├── languageConfig.ts← Định nghĩa danh sách 10 ngôn ngữ hỗ trợ
    │   ├── i18n.ts          ← Bản dịch UI strings đa ngôn ngữ (vi, en)
    │   └── guidedFlowI18n.ts← Bản dịch câu hỏi và gợi ý 6 bước guided flow
    ├── services/            ← Logic xử lý nghiệp vụ & AI
    │   ├── aiService.ts     ← Facade gọi AI provider với cơ chế retry
    │   ├── promptBuilder.ts ← Tạo prompt thiết kế chuẩn và trích xuất HTML sạch
    │   ├── guidedFlow.ts    ← Cấu trúc câu hỏi định hướng theo ngôn ngữ
    │   └── providers/       ← Triển khai Provider Pattern cho 5 AI engines
    │       ├── BaseProvider.ts               ← Lớp trừu tượng và retry logic
    │       ├── OpenAICompatibleProvider.ts   ← Lớp cơ sở cho Groq / DeepSeek
    │       ├── GeminiProvider.ts             ← Tích hợp Google Gemini
    │       ├── OpenAIProvider.ts             ← Tích hợp OpenAI GPT
    │       ├── AnthropicProvider.ts          ← Tích hợp Claude
    │       ├── GroqProvider.ts               ← Tích hợp Groq
    │       ├── DeepSeekProvider.ts           ← Tích hợp DeepSeek
    │       └── index.ts                      ← Factory function createProvider()
    ├── context/             ← State management
    │   └── ChatContext.tsx  ← Quản lý trạng thái chat, tiến trình và preview
    ├── components/          ← Giao diện người dùng
    │   ├── Landing/         ← Trang giới thiệu (Home Page)
    │   │   ├── HomePage.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── FeatureSection.tsx
    │   │   ├── HowItWorks.tsx
    │   │   └── Footer.tsx
    │   ├── Chat/            ← Khung trò chuyện (Chat Panel)
    │   │   ├── ChatPanel.tsx
    │   │   ├── ChatMessage.tsx
    │   │   ├── ChatInput.tsx
    │   │   └── StepIndicator.tsx
    │   └── Preview/         ← Màn hình xem trước (Preview Panel)
    │       ├── PreviewPanel.tsx
    │       ├── PreviewToolbar.tsx
    │       └── DeviceFrame.tsx
    └── utils/               ← Tiện ích hỗ trợ
        └── exportUtils.ts   ← Trình xuất HTML, tải file và copy clipboard
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy (Getting Started)

### 1. Yêu cầu hệ thống
- **Node.js:** Phiên bản 18.0.0 trở lên.
- **npm** hoặc **yarn** / **pnpm**.

### 2. Cài đặt

```bash
# 1. Clone mã nguồn dự án
git clone https://github.com/dnluong1990/planding-page-html-with-agent.git
cd planding-page-html-with-agent

# 2. Cài đặt các thư viện phụ thuộc
npm install
```

### 3. Thiết lập biến môi trường

Tạo file `.env` tại thư mục gốc bằng cách sao chép từ `.env.example`:

```bash
cp .env.example .env
```

Mở file `.env` và điền API Key tương ứng với AI Provider bạn muốn sử dụng (ví dụ Google Gemini):

```env
# Chọn provider: gemini | openai | anthropic | groq | deepseek
VITE_AI_PROVIDER=gemini

# Cấu hình ngôn ngữ (mặc định: vi)
VITE_LANGUAGE=vi

# Khóa API Google Gemini
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
VITE_GEMINI_MODEL=gemini-3.6-flash
```

> **Gợi ý:** Bạn có thể lấy API Key miễn phí của Google Gemini tại [Google AI Studio](https://aistudio.google.com/).

### 4. Các lệnh thực thi (Scripts)

| Lệnh | Mục đích |
|------|----------|
| `npm run dev` | Khởi chạy máy chủ phát triển cục bộ (mặc định tại `http://localhost:3000`) |
| `npm run type-check` | Kiểm tra tính toàn vẹn kiểu dữ liệu TypeScript (Strict Mode) |
| `npm run build` | Kiểm tra kiểu và đóng gói ứng dụng production vào thư mục `dist/` |
| `npm run preview` | Xem trước bản đóng gói production tại local |

---

## ⚙️ Bảng tham chiếu biến môi trường (Environment Variables)

| Tên biến | Bắt buộc | Giá trị mẫu / Mặc định | Ý nghĩa |
|----------|----------|------------------------|---------|
| `VITE_AI_PROVIDER` | Có | `gemini` | Chọn nhà cung cấp AI (`gemini`, `openai`, `anthropic`, `groq`, `deepseek`) |
| `VITE_LANGUAGE` | Không | `vi` | Ngôn ngữ ứng dụng và nội dung landing page (`vi`, `en`, ...) |
| `VITE_GEMINI_API_KEY` | Nếu dùng Gemini | `AIzaSy...` | API Key của Google Gemini |
| `VITE_GEMINI_MODEL` | Không | `gemini-3.6-flash` | Model Gemini sử dụng |
| `VITE_OPENAI_API_KEY` | Nếu dùng OpenAI | `sk-...` | API Key của OpenAI |
| `VITE_OPENAI_MODEL` | Không | `gpt-4o` | Model OpenAI sử dụng |
| `VITE_ANTHROPIC_API_KEY` | Nếu dùng Claude | `sk-ant-...` | API Key của Anthropic |
| `VITE_ANTHROPIC_MODEL` | Không | `claude-sonnet-4-20250514` | Model Claude sử dụng |
| `VITE_ANTHROPIC_BASE_URL`| Không | `https://api.anthropic.com/v1` | URL endpoint (nếu dùng reverse proxy giải quyết CORS) |
| `VITE_GROQ_API_KEY` | Nếu dùng Groq | `gsk_...` | API Key của Groq Cloud |
| `VITE_GROQ_MODEL` | Không | `llama-3.3-70b-versatile`| Model Groq sử dụng |
| `VITE_DEEPSEEK_API_KEY` | Nếu dùng DeepSeek | `sk-...` | API Key của DeepSeek |
| `VITE_DEEPSEEK_MODEL` | Không | `deepseek-chat` | Model DeepSeek sử dụng |

---

## 📄 Giấy phép (License)

Dự án được phân phối dưới giấy phép [MIT License](LICENSE).
Tự do sử dụng, chỉnh sửa và phân phối cho mục đích cá nhân hoặc thương mại.
