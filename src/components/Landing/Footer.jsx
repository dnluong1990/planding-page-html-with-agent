import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo gradient-text">Planding</span>
          <p className="footer-tagline">
            Nền tảng kiến tạo Landing Page thông minh bằng trí tuệ nhân tạo.
          </p>
        </div>

        <div className="footer-meta">
          <p className="footer-love">
            Được phát triển với <Heart size={14} color="#e17055" fill="#e17055" /> tại Việt Nam
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Planding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
