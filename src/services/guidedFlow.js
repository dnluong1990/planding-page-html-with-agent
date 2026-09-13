export const STEPS = [
  {
    id: 0,
    key: 'industry',
    title: 'Ngành nghề',
    icon: 'Building2',
    question: 'Chào bạn! 👋 Mình là Planding AI, sẽ giúp bạn tạo landing page chuyên nghiệp.\n\nĐầu tiên, bạn cho mình biết **ngành nghề hoặc loại hình doanh nghiệp** của bạn nhé?\n\n_Ví dụ: Nhà hàng, Spa & Làm đẹp, Công nghệ, Bất động sản, Giáo dục..._',
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
    id: 1,
    key: 'brandName',
    title: 'Thương hiệu',
    icon: 'Sparkles',
    question: 'Tuyệt vời! Bạn cho mình biết **tên thương hiệu** và **slogan** (nếu có) nhé?\n\n_Ví dụ: "Café Sài Gòn" - "Hương vị đậm đà, không gian thư giãn"_',
    placeholder: 'Tên thương hiệu - Slogan...',
    suggestions: []
  },
  {
    id: 2,
    key: 'purpose',
    title: 'Mục đích',
    icon: 'Target',
    question: 'Landing page này sẽ phục vụ **mục đích gì**?\n\n_Chọn hoặc mô tả mục đích chính:_',
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
    id: 3,
    key: 'style',
    title: 'Phong cách',
    icon: 'Palette',
    question: 'Bạn muốn landing page có **phong cách thiết kế** như thế nào?\n\n_Chọn hoặc mô tả phong cách mong muốn:_',
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
    id: 4,
    key: 'colors',
    title: 'Màu sắc',
    icon: 'Paintbrush',
    question: 'Về **màu sắc chủ đạo**, bạn muốn sử dụng tông màu nào?\n\n_Bạn có thể chọn gợi ý hoặc mô tả màu mong muốn. Để trống nếu muốn AI đề xuất phù hợp._',
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
    id: 5,
    key: 'content',
    title: 'Nội dung',
    icon: 'FileText',
    question: 'Cuối cùng, hãy mô tả **nội dung chính** bạn muốn có trên landing page:\n\n_Ví dụ: sản phẩm/dịch vụ nổi bật, thông tin liên hệ, ưu đãi, testimonials..._',
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
];

// Helper functions
export function getCurrentStep(stepIndex) {
  return STEPS[stepIndex] || null;
}

export function isGuidedFlowComplete(stepIndex) {
  return stepIndex >= STEPS.length;
}

export function getStepByKey(key) {
  return STEPS.find(step => step.key === key);
}

export function getProgress(stepIndex) {
  return Math.min((stepIndex / STEPS.length) * 100, 100);
}
