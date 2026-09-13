import { getLanguageConfig, type SupportedLanguage } from './languageConfig';

export interface UIStrings {
  // === Hero Section ===
  heroNavStart: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCTA: string;
  heroCtaSub: string;

  // === Features ===
  featureBadge: string;
  featureTitle: string;
  featureSubtitle: string;
  featureChat: string;
  featureChatDesc: string;
  featureFast: string;
  featureFastDesc: string;
  featurePreview: string;
  featurePreviewDesc: string;
  featureExport: string;
  featureExportDesc: string;

  // === How It Works ===
  howBadge: string;
  howTitle: string;
  howTitleHighlight: string;
  howSubtitle: string;
  howStep1: string;
  howStep1Desc: string;
  howStep2: string;
  howStep2Desc: string;
  howStep3: string;
  howStep3Desc: string;
  howCTA: string;
  howCTAButton: string;

  // === Footer ===
  footerTagline: string;
  footerLove: string;

  // === Chat ===
  chatBadge: string;
  chatReset: string;
  chatResetConfirm: string;
  chatInputPlaceholder: string;
  chatEditPlaceholder: string;
  chatGenerating: string;
  chatSuccess: string;
  chatEditSuccess: string;
  chatError: string;
  chatAIProcessing: string;

  // === Preview ===
  previewEmpty: string;
  previewEmptyDesc: string;
  previewLoading: string;
  previewLoadingDesc: string;
  previewDesktop: string;
  previewTablet: string;
  previewMobile: string;
  previewCopy: string;
  previewCopied: string;
  previewDownload: string;
  previewToastDownload: string;
  previewToastCopy: string;

  // === Mobile Tabs ===
  mobileTabChat: string;
  mobileTabPreview: string;
}

const VI: UIStrings = {
  heroNavStart: 'Bắt đầu miễn phí',
  heroBadge: 'Powered by AI',
  heroTitle: 'Tạo Landing Page Chuyên Nghiệp Chỉ Bằng',
  heroTitleHighlight: 'Cuộc Trò Chuyện',
  heroSubtitle:
    'Không cần biết thiết kế. Không cần kỹ năng lập trình. Chỉ cần nói cho trợ lý AI biết nhu cầu của bạn — một landing page ấn tượng sẽ sẵn sàng trong vài phút.',
  heroCTA: 'Bắt đầu tạo ngay',
  heroCtaSub: 'Miễn phí 100% • Không cần thẻ tín dụng • Xuất mã nguồn tức thì',
  featureBadge: 'Tính năng vượt trội',
  featureTitle: 'Tại sao nên chọn',
  featureSubtitle: 'Giải pháp nhanh chóng, trực quan và tối ưu nhất để có ngay trang bán hàng đẳng cấp.',
  featureChat: 'Chat Thông Minh Hướng Dẫn',
  featureChatDesc: 'AI dẫn dắt bạn qua 6 bước đơn giản để tìm hiểu về phong cách, thương hiệu và nội dung.',
  featureFast: 'Khởi Tạo Trong Vài Phút',
  featureFastDesc: 'Toàn bộ mã nguồn HTML5/CSS responsive sẽ được sinh ra ngay lập tức.',
  featurePreview: 'Xem Trước Đa Thiết Bị',
  featurePreviewDesc: 'Trực quan hóa kết quả trên Desktop, Tablet và Mobile theo thời gian thực.',
  featureExport: 'Tải Về & Triển Khai Dễ Dàng',
  featureExportDesc: 'Xuất file HTML trọn gói hoặc sao chép mã nguồn để đưa lên hosting.',
  howBadge: 'Quy trình đơn giản',
  howTitle: 'Cách hoạt động',
  howTitleHighlight: 'chỉ với 3 bước',
  howSubtitle: 'Quy trình mượt mà từ khi bắt đầu cho đến khi sở hữu landing page hoàn chỉnh.',
  howStep1: 'Trò Chuyện Cùng AI',
  howStep1Desc: 'Cung cấp ngành nghề, phong cách thiết kế và các nội dung mong muốn.',
  howStep2: 'AI Sinh Landing Page',
  howStep2Desc: 'AI phân tích dữ liệu, tự động cấu trúc layout, phối màu và lựa chọn ảnh.',
  howStep3: 'Tải Về & Xuất Bản',
  howStep3Desc: 'Xem trước đa màn hình, chỉnh sửa qua chat, và tải file HTML về dùng ngay.',
  howCTA: 'Sẵn sàng tạo landing page đầu tiên của bạn?',
  howCTAButton: 'Khám phá ngay hôm nay',
  footerTagline: 'Nền tảng kiến tạo Landing Page thông minh bằng trí tuệ nhân tạo.',
  footerLove: 'Được phát triển với ❤️ tại Việt Nam',
  chatBadge: 'Beta',
  chatReset: 'Tạo mới',
  chatResetConfirm: 'Bạn có chắc chắn muốn làm mới cuộc trò chuyện và bắt đầu tạo trang mới không?',
  chatInputPlaceholder: 'Nhập tin nhắn...',
  chatEditPlaceholder: 'Mô tả yêu cầu chỉnh sửa (VD: đổi màu nút CTA, thêm bảng giá...)...',
  chatGenerating:
    'Cảm ơn bạn! Mình đã thu thập đầy đủ thông tin cần thiết. ✨\n\nPlanding AI đang tiến hành thiết kế và sinh mã nguồn landing page hoàn chỉnh cho bạn. Quá trình này mất khoảng vài giây, bạn vui lòng đợi nhé... 🚀',
  chatSuccess: '🎉 Landing page của bạn đã được tạo thành công!',
  chatEditSuccess: '✨ Mình đã cập nhật landing page theo yêu cầu của bạn! Bạn hãy kiểm tra trên màn hình preview nhé.',
  chatError: '❌ Có lỗi xảy ra khi tạo landing page. Vui lòng thử lại.',
  chatAIProcessing: 'Planding AI đang xử lý...',
  previewEmpty: 'Landing page của bạn sẽ hiển thị trực tiếp tại đây',
  previewEmptyDesc: 'Hãy trả lời các câu hỏi hướng dẫn ở khung chat bên trái. Planding AI sẽ tự động tạo giao diện theo phong cách và màu sắc bạn chọn.',
  previewLoading: 'Planding AI đang kiến tạo Landing Page...',
  previewLoadingDesc: 'Đang tự động sinh HTML/CSS, bố cục layout và tối ưu giao diện.',
  previewDesktop: 'Máy tính',
  previewTablet: 'Tablet',
  previewMobile: 'Điện thoại',
  previewCopy: 'Sao chép',
  previewCopied: 'Đã chép',
  previewDownload: 'Tải HTML',
  previewToastDownload: '🎉 Đã tải file HTML về máy thành công!',
  previewToastCopy: '📋 Đã sao chép mã nguồn HTML vào bộ nhớ tạm!',
  mobileTabChat: 'Trò chuyện',
  mobileTabPreview: 'Xem trước'
};

const EN: UIStrings = {
  heroNavStart: 'Start for Free',
  heroBadge: 'Powered by AI',
  heroTitle: 'Create Professional Landing Pages With Just A',
  heroTitleHighlight: 'Conversation',
  heroSubtitle:
    'No design skills needed. No coding required. Just tell the AI what you want — a stunning landing page will be ready in minutes.',
  heroCTA: 'Start Building Now',
  heroCtaSub: '100% Free • No Credit Card • Instant Export',
  featureBadge: 'Key Features',
  featureTitle: 'Why Choose',
  featureSubtitle: 'The fastest, most intuitive solution to create professional landing pages.',
  featureChat: 'Smart Guided Chat',
  featureChatDesc: 'AI guides you through 6 simple steps to understand your style, brand, and content needs.',
  featureFast: 'Build in Minutes',
  featureFastDesc: 'Complete responsive HTML5/CSS source code generated instantly.',
  featurePreview: 'Multi-Device Preview',
  featurePreviewDesc: 'Visualize results on Desktop, Tablet, and Mobile in real-time.',
  featureExport: 'Easy Export & Deploy',
  featureExportDesc: 'Download the complete HTML file or copy source code to any hosting.',
  howBadge: 'Simple Process',
  howTitle: 'How It Works',
  howTitleHighlight: 'in Just 3 Steps',
  howSubtitle: 'A smooth workflow from start to owning your complete landing page.',
  howStep1: 'Chat with AI',
  howStep1Desc: 'Share your industry, design style, and desired content.',
  howStep2: 'AI Generates Your Page',
  howStep2Desc: 'AI analyzes data, structures layout, selects colors and imagery.',
  howStep3: 'Download & Publish',
  howStep3Desc: 'Preview on multiple screens, edit via chat, and download instantly.',
  howCTA: 'Ready to create your first landing page?',
  howCTAButton: 'Explore Now',
  footerTagline: 'Smart AI-powered Landing Page Builder.',
  footerLove: 'Built with ❤️ in Vietnam',
  chatBadge: 'Beta',
  chatReset: 'New Page',
  chatResetConfirm: 'Are you sure you want to start a new conversation and create a new page?',
  chatInputPlaceholder: 'Type a message...',
  chatEditPlaceholder: 'Describe your edit request (e.g., change CTA button color, add pricing table...)...',
  chatGenerating:
    'Thank you! I have gathered all necessary information. ✨\n\nPlanding AI is generating your complete landing page source code. This usually takes a few seconds, please wait... 🚀',
  chatSuccess: '🎉 Your landing page has been created successfully!',
  chatEditSuccess: '✨ Landing page updated according to your request! Check it out in the preview panel.',
  chatError: '❌ An error occurred while generating the landing page. Please try again.',
  chatAIProcessing: 'Planding AI is processing...',
  previewEmpty: 'Your landing page will appear directly here',
  previewEmptyDesc: 'Answer the guided questions in the chat panel on the left. Planding AI will build the page tailored to your preferences.',
  previewLoading: 'Planding AI is crafting your Landing Page...',
  previewLoadingDesc: 'Generating HTML/CSS, layout structure, and responsive design.',
  previewDesktop: 'Desktop',
  previewTablet: 'Tablet',
  previewMobile: 'Mobile',
  previewCopy: 'Copy',
  previewCopied: 'Copied',
  previewDownload: 'Download HTML',
  previewToastDownload: '🎉 HTML file downloaded successfully!',
  previewToastCopy: '📋 HTML source code copied to clipboard!',
  mobileTabChat: 'Chat',
  mobileTabPreview: 'Preview'
};

const TRANSLATIONS: Record<SupportedLanguage, UIStrings> = {
  vi: VI,
  en: EN,
  ja: EN,
  ko: EN,
  zh: EN,
  th: EN,
  fr: EN,
  de: EN,
  es: EN,
  pt: EN
};

export function getUIStrings(langCode?: SupportedLanguage): UIStrings {
  const code = langCode || getLanguageConfig().code;
  return TRANSLATIONS[code] || TRANSLATIONS.en;
}
