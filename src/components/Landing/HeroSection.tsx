import { Sparkles, ArrowRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { getUIStrings } from '../../config/i18n';

export default function HeroSection() {
  const { setView } = useChat();
  const t = getUIStrings();

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
          <span className="chat-badge" style={{ marginLeft: '8px' }}>
            AI Builder
          </span>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setView('chat')}
          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
        >
          {t.heroNavStart}
        </button>
      </header>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="hero-title">
          {t.heroTitle}{' '}
          <span className="gradient-text">{t.heroTitleHighlight}</span>
        </h1>

        <p className="hero-subtitle">{t.heroSubtitle}</p>

        <div className="hero-cta">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setView('chat')}
            style={{ fontSize: '1.1rem', padding: '14px 36px' }}
          >
            <span>{t.heroCTA}</span>
            <ArrowRight size={18} />
          </button>
          <span className="hero-cta-sub">{t.heroCtaSub}</span>
        </div>
      </div>
    </section>
  );
}
