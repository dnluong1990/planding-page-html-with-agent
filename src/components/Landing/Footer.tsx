import { Heart } from 'lucide-react';
import { getUIStrings } from '../../config/i18n';

export default function Footer() {
  const t = getUIStrings();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo gradient-text">Planding</span>
          <p className="footer-tagline">{t.footerTagline}</p>
        </div>

        <div className="footer-meta">
          <p className="footer-love">
            {t.footerLove} <Heart size={14} color="#e17055" fill="#e17055" />
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Planding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
