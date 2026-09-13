import { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Copy,
  Maximize2,
  Minimize2,
  Check
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import type { PreviewToolbarProps } from '../../types/components';
import { getUIStrings } from '../../config/i18n';

export default function PreviewToolbar({
  onExport,
  onCopy,
  onFullscreen,
  isFullscreen = false
}: PreviewToolbarProps) {
  const { viewport, setViewport, generatedHTML } = useChat();
  const [copied, setCopied] = useState<boolean>(false);
  const t = getUIStrings();

  const handleCopy = async (): Promise<void> => {
    if (!generatedHTML) return;
    const success = await onCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasCode = Boolean(generatedHTML);

  return (
    <div className="preview-toolbar">
      {/* Viewport switcher */}
      <div className="viewport-buttons">
        <button
          type="button"
          className={`viewport-btn ${viewport === 'desktop' ? 'viewport-btn--active' : ''}`}
          onClick={() => setViewport('desktop')}
          title={t.previewDesktop}
        >
          <Monitor size={16} />
          <span className="viewport-label">{t.previewDesktop}</span>
        </button>

        <button
          type="button"
          className={`viewport-btn ${viewport === 'tablet' ? 'viewport-btn--active' : ''}`}
          onClick={() => setViewport('tablet')}
          title={t.previewTablet}
        >
          <Tablet size={16} />
          <span className="viewport-label">{t.previewTablet}</span>
        </button>

        <button
          type="button"
          className={`viewport-btn ${viewport === 'mobile' ? 'viewport-btn--active' : ''}`}
          onClick={() => setViewport('mobile')}
          title={t.previewMobile}
        >
          <Smartphone size={16} />
          <span className="viewport-label">{t.previewMobile}</span>
        </button>
      </div>

      {/* Action buttons */}
      <div className="preview-actions">
        <button
          type="button"
          className="btn-secondary preview-action-btn"
          onClick={handleCopy}
          disabled={!hasCode}
          title={t.previewCopy}
        >
          {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
          <span>{copied ? t.previewCopied : t.previewCopy}</span>
        </button>

        <button
          type="button"
          className="btn-primary preview-action-btn preview-action-btn--primary"
          onClick={onExport}
          disabled={!hasCode}
          title={t.previewDownload}
        >
          <Download size={14} />
          <span>{t.previewDownload}</span>
        </button>

        <button
          type="button"
          className="btn-icon preview-fullscreen-btn"
          onClick={onFullscreen}
          title={isFullscreen ? 'Thu nhỏ preview' : 'Toàn màn hình preview'}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );
}
