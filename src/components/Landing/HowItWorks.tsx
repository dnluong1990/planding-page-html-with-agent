import { MessageSquare, Wand2, Rocket, ArrowRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { getUIStrings } from '../../config/i18n';

export default function HowItWorks() {
  const { setView } = useChat();
  const t = getUIStrings();

  const stepsGuide = [
    {
      step: '01',
      icon: MessageSquare,
      title: t.howStep1,
      desc: t.howStep1Desc
    },
    {
      step: '02',
      icon: Wand2,
      title: t.howStep2,
      desc: t.howStep2Desc
    },
    {
      step: '03',
      icon: Rocket,
      title: t.howStep3,
      desc: t.howStep3Desc
    }
  ];

  return (
    <section className="how-it-works">
      <div className="section-header">
        <span className="section-badge">{t.howBadge}</span>
        <h2 className="section-title">
          {t.howTitle} <span className="gradient-text">{t.howTitleHighlight}</span>
        </h2>
        <p className="section-subtitle">{t.howSubtitle}</p>
      </div>

      <div className="how-grid">
        {stepsGuide.map((item, idx) => {
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
        <h3>{t.howCTA}</h3>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setView('chat')}
          style={{ padding: '12px 32px', fontSize: '1rem' }}
        >
          <span>{t.howCTAButton}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
