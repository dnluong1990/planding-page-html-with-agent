import { getLanguageConfig, type SupportedLanguage } from './languageConfig';

export interface StepI18n {
  title: string;
  question: string;
  placeholder: string;
  suggestions: string[];
}

export interface GuidedFlowStrings {
  steps: StepI18n[];
  completionMessage: string;
}

const VI_FLOW: GuidedFlowStrings = {
  steps: [
    {
      title: 'Ngành nghề',
      question:
        'Chào bạn! 👋 Mình là Planding AI, sẽ giúp bạn tạo landing page chuyên nghiệp.\n\nĐầu tiên, bạn cho mình biết **ngành nghề hoặc loại hình doanh nghiệp** của bạn nhé?\n\n_Ví dụ: Nhà hàng, Spa & Làm đẹp, Công nghệ, Bất động sản, Giáo dục..._',
      placeholder: 'Ví dụ: Quán cà phê, Phòng khám nha khoa...',
      suggestions: [
        'Nhà hàng / Quán ăn',
        'Spa & Làm đẹp',
        'Công nghệ / Phần mềm',
        'Bất động sản',
        'Giáo dục / Đào tạo',
        'Thời trang',
        'Y tế / Sức khỏe',
        'Du lịch / Khách sạn'
      ]
    },
    {
      title: 'Thương hiệu',
      question:
        'Tuyệt vời! Bạn cho mình biết **tên thương hiệu** và **slogan** (nếu có) nhé?\n\n_Ví dụ: "Café Sài Gòn" - "Hương vị đậm đà, không gian thư giãn"_',
      placeholder: 'Tên thương hiệu - Slogan...',
      suggestions: []
    },
    {
      title: 'Mục đích',
      question:
        'Landing page này sẽ phục vụ **mục đích gì**?\n\n_Chọn hoặc mô tả mục đích chính:_',
      placeholder: 'Mô tả mục đích...',
      suggestions: [
        'Giới thiệu sản phẩm/dịch vụ',
        'Thu thập thông tin khách hàng (Lead)',
        'Quảng bá chương trình khuyến mãi',
        'Ra mắt sản phẩm mới',
        'Đăng ký sự kiện',
        'Tuyển dụng nhân sự'
      ]
    },
    {
      title: 'Phong cách',
      question:
        'Bạn muốn landing page có **phong cách thiết kế** như thế nào?\n\n_Chọn hoặc mô tả phong cách mong muốn:_',
      placeholder: 'Mô tả phong cách...',
      suggestions: [
        'Hiện đại & Tối giản',
        'Sang trọng & Cao cấp',
        'Trẻ trung & Năng động',
        'Chuyên nghiệp & Doanh nghiệp',
        'Ấm áp & Thân thiện',
        'Sáng tạo & Nghệ thuật'
      ]
    },
    {
      title: 'Màu sắc',
      question:
        'Về **màu sắc chủ đạo**, bạn muốn sử dụng tông màu nào?\n\n_Bạn có thể chọn gợi ý hoặc mô tả màu mong muốn. Để trống nếu muốn AI đề xuất phù hợp._',
      placeholder: 'Ví dụ: Xanh dương đậm và trắng...',
      suggestions: [
        'Xanh dương - Chuyên nghiệp',
        'Đỏ & Cam - Năng động',
        'Xanh lá - Tươi mới',
        'Tím & Hồng - Sáng tạo',
        'Đen & Vàng - Sang trọng',
        'Để AI đề xuất phù hợp'
      ]
    },
    {
      title: 'Nội dung',
      question:
        'Cuối cùng, hãy mô tả **nội dung chính** bạn muốn có trên landing page:\n\n_Ví dụ: sản phẩm/dịch vụ nổi bật, thông tin liên hệ, ưu đãi, testimonials..._',
      placeholder: 'Mô tả nội dung muốn hiển thị...',
      suggestions: [
        'Hero banner + CTA',
        'Giới thiệu dịch vụ/sản phẩm',
        'Bảng giá',
        'Testimonials / Đánh giá',
        'Form liên hệ / Đăng ký',
        'Bản đồ & Thông tin liên hệ'
      ]
    }
  ],
  completionMessage:
    'Cảm ơn bạn! Mình đã thu thập đầy đủ thông tin cần thiết. ✨\n\nPlanding AI đang tiến hành thiết kế và sinh mã nguồn landing page hoàn chỉnh cho bạn. Quá trình này mất khoảng vài giây, bạn vui lòng đợi nhé... 🚀'
};

const EN_FLOW: GuidedFlowStrings = {
  steps: [
    {
      title: 'Industry',
      question:
        "Hello! 👋 I'm Planding AI, and I will help you build a professional landing page.\n\nFirst, what is your **industry or business type**?\n\n_e.g., Restaurant, Spa & Beauty, Tech, Real Estate, Education..._",
      placeholder: 'e.g., Coffee Shop, Dental Clinic...',
      suggestions: [
        'Restaurant / Food',
        'Spa & Beauty',
        'Technology / Software',
        'Real Estate',
        'Education / Training',
        'Fashion',
        'Health & Medical',
        'Travel / Hotel'
      ]
    },
    {
      title: 'Brand',
      question:
        'Great! What is your **brand name** and **slogan** (if any)?\n\n_e.g., "Saigon Café" - "Rich flavor, relaxed vibes"_',
      placeholder: 'Brand Name - Slogan...',
      suggestions: []
    },
    {
      title: 'Purpose',
      question:
        'What is the primary **goal or purpose** of this landing page?\n\n_Choose or describe your main objective:_',
      placeholder: 'Describe your purpose...',
      suggestions: [
        'Showcase products / services',
        'Collect customer leads',
        'Promote discount / sale campaign',
        'New product launch',
        'Event registration',
        'Hiring & Recruitment'
      ]
    },
    {
      title: 'Style',
      question:
        'What **design style** would you prefer for your landing page?\n\n_Choose or describe the style you like:_',
      placeholder: 'Describe design style...',
      suggestions: [
        'Modern & Minimalist',
        'Luxury & Premium',
        'Vibrant & Energetic',
        'Corporate & Professional',
        'Warm & Friendly',
        'Creative & Artistic'
      ]
    },
    {
      title: 'Colors',
      question:
        'Regarding **color scheme**, what primary colors would you like to use?\n\n_Choose a suggestion or describe your colors. Leave blank for AI recommended palette._',
      placeholder: 'e.g., Deep navy blue and crisp white...',
      suggestions: [
        'Blue - Professional',
        'Red & Orange - Energetic',
        'Green - Fresh & Eco',
        'Purple & Pink - Creative',
        'Black & Gold - Luxury',
        'Let AI recommend colors'
      ]
    },
    {
      title: 'Content',
      question:
        'Finally, what **main content sections** do you want on your landing page?\n\n_e.g., Hero banner, key services, pricing, testimonials, contact form..._',
      placeholder: 'Describe the sections you want...',
      suggestions: [
        'Hero banner + CTA',
        'Product / Service highlights',
        'Pricing table',
        'Testimonials / Reviews',
        'Contact / Lead form',
        'Map & Contact info'
      ]
    }
  ],
  completionMessage:
    'Thank you! I have gathered all necessary information. ✨\n\nPlanding AI is generating your complete landing page source code. This usually takes a few seconds, please wait... 🚀'
};

const FLOW_MAP: Record<SupportedLanguage, GuidedFlowStrings> = {
  vi: VI_FLOW,
  en: EN_FLOW,
  ja: EN_FLOW,
  ko: EN_FLOW,
  zh: EN_FLOW,
  th: EN_FLOW,
  fr: EN_FLOW,
  de: EN_FLOW,
  es: EN_FLOW,
  pt: EN_FLOW
};

export function getGuidedFlowStrings(langCode?: SupportedLanguage): GuidedFlowStrings {
  const code = langCode || getLanguageConfig().code;
  return FLOW_MAP[code] || FLOW_MAP.en;
}
