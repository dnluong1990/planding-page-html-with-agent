# Planding MVP — Chi tiết Components

## 1. Chat System

### ChatPanel (`src/components/Chat/ChatPanel.jsx`)
- Panel chat chính chiếm ~40% bên trái
- Header với logo Planding
- Khu vực hiển thị messages (scroll)
- Input area với nút gửi

### ChatMessage (`src/components/Chat/ChatMessage.jsx`)
- Render từng message
- Phân biệt user message vs AI message (avatar, màu nền, alignment)
- Hỗ trợ render markdown trong AI response
- Typing indicator animation khi AI đang xử lý

### ChatInput (`src/components/Chat/ChatInput.jsx`)
- Textarea auto-resize
- Nút gửi với icon + keyboard shortcut (Enter / Ctrl+Enter)
- Disabled state khi đang chờ AI response

### StepIndicator (`src/components/Chat/StepIndicator.jsx`)
- Thanh progress hiển thị bước hiện tại trong guided flow
- 6 bước với icon + label
- Highlight bước active, đánh dấu bước hoàn thành

---

## 2. Preview System

### PreviewPanel (`src/components/Preview/PreviewPanel.jsx`)
- Panel preview chiếm ~60% bên phải
- iframe sandbox render HTML/CSS từ AI
- Loading state với skeleton animation
- Empty state khi chưa generate

### DeviceFrame (`src/components/Preview/DeviceFrame.jsx`)
- Wrapper giả lập khung thiết bị (desktop/tablet/mobile)
- Responsive resize animation mượt
- Sizes: Desktop (100%), Tablet (768px), Mobile (375px)

### PreviewToolbar (`src/components/Preview/PreviewToolbar.jsx`)
- Nút chuyển viewport (Desktop / Tablet / Mobile)
- Nút Export/Download HTML
- Nút Copy HTML to clipboard
- Nút Fullscreen preview

---

## 3. AI Services

### aiService (`src/services/aiService.js`)
- Gọi Gemini API qua REST (không cần SDK nặng)
- System prompt thiết kế sẵn cho việc sinh landing page
- Xử lý streaming response
- Error handling + retry logic (max 3 retries)
- Rate limiting basic

### promptBuilder (`src/services/promptBuilder.js`)
- Xây dựng prompt dựa trên thông tin user đã cung cấp
- Template cho từng bước trong guided flow
- Prompt cuối cùng để sinh HTML/CSS landing page hoàn chỉnh
- Prompt cho việc chỉnh sửa (edit mode)

### guidedFlow (`src/services/guidedFlow.js`)
- Định nghĩa 6 bước trong guided flow:
  1. Ngành nghề / Loại hình doanh nghiệp
  2. Tên thương hiệu, slogan
  3. Mục đích landing page
  4. Phong cách thiết kế
  5. Màu sắc chủ đạo
  6. Nội dung chính
- Logic chuyển bước, validate input
- Câu hỏi mặc định + gợi ý cho từng bước
- Xác định khi nào đủ thông tin để generate

---

## 4. Context & State

### ChatContext (`src/context/ChatContext.jsx`)

**State:**
```javascript
{
  messages: [],           // Array of { role, content, timestamp }
  currentStep: 0,         // Bước hiện tại (0-5, -1 = free chat)
  collectedInfo: {        // Thông tin đã thu thập
    industry: '',
    brandName: '',
    slogan: '',
    purpose: '',
    style: '',
    colors: '',
    content: ''
  },
  generatedHTML: '',      // HTML/CSS đã generate
  isLoading: false,       // Đang chờ AI response
  viewport: 'desktop'    // desktop | tablet | mobile
}
```

**Actions:**
- `sendMessage(content)` — Gửi message, trigger AI response
- `setStep(step)` — Chuyển bước
- `updateInfo(key, value)` — Cập nhật thông tin thu thập
- `setGeneratedHTML(html)` — Set HTML preview
- `setViewport(viewport)` — Đổi viewport preview

---

## 5. Landing Page Intro (Optional)

### HeroSection (`src/components/Landing/HeroSection.jsx`)
- Hero section giới thiệu Planding
- CTA "Bắt đầu tạo Landing Page" → chuyển sang giao diện chat
- Animation gradient background
- Tagline: "Tạo landing page chuyên nghiệp chỉ bằng cuộc trò chuyện"

### FeatureSection (`src/components/Landing/FeatureSection.jsx`)
- 3-4 tính năng chính:
  - 💬 Chat thông minh — AI hướng dẫn từng bước
  - 👁️ Preview real-time — Xem kết quả ngay lập tức
  - 📱 Responsive — Tương thích mọi thiết bị
  - 📥 Export dễ dàng — Download HTML một click
- Cards với icon + mô tả
- Scroll animation

---

## 6. Utilities

### exportUtils (`src/utils/exportUtils.js`)
- `downloadHTML(html, filename)` — Tạo file HTML hoàn chỉnh (inline CSS, self-contained) và trigger download
- `copyToClipboard(html)` — Copy HTML to clipboard
- `generateFilename(brandName)` — Tạo tên file từ brand name
