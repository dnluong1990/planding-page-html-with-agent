import { MessageSquare, Zap, Eye, Download } from 'lucide-react';
import { getUIStrings } from '../../config/i18n';

export default function FeatureSection() {
  const t = getUIStrings();

  const features = [
    {
      icon: MessageSquare,
      title: t.featureChat,
      desc: t.featureChatDesc
    },
    {
      icon: Zap,
      title: t.featureFast,
      desc: t.featureFastDesc
    },
    {
      icon: Eye,
      title: t.featurePreview,
      desc: t.featurePreviewDesc
    },
    {
      icon: Download,
      title: t.featureExport,
      desc: t.featureExportDesc
    }
  ];

  return (
    <section className="feature-section">
      <div className="section-header">
        <span className="section-badge">{t.featureBadge}</span>
        <h2 className="section-title">
          {t.featureTitle} <span className="gradient-text">Planding</span>?
        </h2>
        <p className="section-subtitle">{t.featureSubtitle}</p>
      </div>

      <div className="feature-grid">
        {features.map((feature, idx) => {
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
