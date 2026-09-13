import React from 'react';
import { MessageSquare, Zap, Eye, Download } from 'lucide-react';

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Chat Thông Minh Hướng Dẫn',
    desc: 'AI dẫn dắt bạn qua 6 bước đơn giản để tìm hiểu về phong cách, thương hiệu, mục đích và nội dung mà không cần kiến thức thiết kế.'
  },
  {
    icon: Zap,
    title: 'Khởi Tạo Trong Vài Phút',
    desc: 'Chỉ cần một cú click sau khi trò chuyện, toàn bộ mã nguồn HTML5/CSS responsive, tự chứa và chuẩn SEO sẽ được sinh ra ngay lập tức.'
  },
  {
    icon: Eye,
    title: 'Xem Trước Đa Thiết Bị',
    desc: 'Trực quan hóa kết quả tức thì trên màn hình Máy tính (Desktop), Máy tính bảng (Tablet) và Điện thoại (Mobile) theo thời gian thực.'
  },
  {
    icon: Download,
    title: 'Tải Về & Triển Khai Dễ Dàng',
    desc: 'Xuất file HTML trọn gói với một click hoặc sao chép mã nguồn để đưa lên bất kỳ dịch vụ hosting nào (Netlify, Vercel, cPanel...).'
  }
];

export default function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="section-header">
        <span className="section-badge">Tính năng vượt trội</span>
        <h2 className="section-title">
          Tại sao nên chọn <span className="gradient-text">Planding</span>?
        </h2>
        <p className="section-subtitle">
          Giải pháp nhanh chóng, trực quan và tối ưu nhất để doanh nghiệp vừa và nhỏ, cá nhân kinh doanh có ngay trang bán hàng đẳng cấp.
        </p>
      </div>

      <div className="feature-grid">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                <Icon size={24} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
