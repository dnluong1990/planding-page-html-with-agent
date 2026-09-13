import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext.jsx';

export default function HeroSection() {
  const { setView } = useChat();

  return (
    <section className="hero">
      {/* Background with glowing orbs */}
      <div className="hero-bg">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
      </div>

      {/* Navigation */}
      <header className="hero-nav">
        <div className="hero-logo-wrapper">
          <span className="hero-logo">Planding</span>
          <span className="chat-badge" style={{ marginLeft: '8px' }}>AI Builder</span>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setView('chat')}
          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
        >
          Bắt đầu miễn phí
        </button>
      </header>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Powered by Gemini AI 3.6</span>
        </div>

        <h1 className="hero-title">
          Tạo Landing Page Chuyên Nghiệp Chỉ Bằng{' '}
          <span className="gradient-text">Cuộc Trò Chuyện</span>
        </h1>

        <p className="hero-subtitle">
          Không cần biết thiết kế. Không cần kỹ năng lập trình. Chỉ cần nói cho trợ lý AI biết nhu cầu của bạn — một landing page ấn tượng, chuẩn SEO và tối ưu chuyển đổi sẽ sẵn sàng trong vài phút.
        </p>

        <div className="hero-cta">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setView('chat')}
            style={{ fontSize: '1.1rem', padding: '14px 36px' }}
          >
            <span>Bắt đầu tạo ngay</span>
            <ArrowRight size={18} />
          </button>
          <span className="hero-cta-sub">Miễn phí 100% • Không cần thẻ tín dụng • Xuất mã nguồn tức thì</span>
        </div>
      </div>
    </section>
  );
}
