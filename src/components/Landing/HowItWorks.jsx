import React from 'react';
import { MessageSquare, Wand2, Rocket, ArrowRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext.jsx';

const STEPS_GUIDE = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Trò Chuyện Cùng AI',
    desc: 'Cung cấp ngành nghề, phong cách thiết kế, slogan và các nội dung mong muốn qua khung chat trực quan.'
  },
  {
    step: '02',
    icon: Wand2,
    title: 'AI Sinh Landing Page',
    desc: 'Công nghệ AI phân tích dữ liệu, tự động cấu trúc layout, phối màu, lựa chọn font chữ và ảnh chất lượng cao.'
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Tải Về & Xuất Bản',
    desc: 'Xem trước trang web đa màn hình, chỉnh sửa theo ý muốn qua chat, và tải file HTML trọn gói về dùng ngay.'
  }
];

export default function HowItWorks() {
  const { setView } = useChat();

  return (
    <section className="how-it-works">
      <div className="section-header">
        <span className="section-badge">Quy trình đơn giản</span>
        <h2 className="section-title">
          Cách hoạt động <span className="gradient-text">chỉ với 3 bước</span>
        </h2>
        <p className="section-subtitle">
          Quy trình mượt mà từ khi bắt đầu cho đến khi sở hữu landing page hoàn chỉnh.
        </p>
      </div>

      <div className="how-grid">
        {STEPS_GUIDE.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="how-card">
              <div className="how-step-num">{item.step}</div>
              <div className="how-icon-box">
                <Icon size={26} />
              </div>
              <h3 className="how-card-title">{item.title}</h3>
              <p className="how-card-desc">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="how-cta-box">
        <h3>Sẵn sàng tạo landing page đầu tiên của bạn?</h3>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setView('chat')}
          style={{ padding: '12px 32px', fontSize: '1rem' }}
        >
          <span>Khám phá ngay hôm nay</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
