import React, { useState } from 'react';
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
import { useChat } from '../../context/ChatContext.jsx';

export default function PreviewToolbar({
  onExport,
  onCopy,
  onFullscreen,
  isFullscreen = false
}) {
  const { viewport, setViewport, generatedHTML } = useChat();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
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
          title="Kích thước Máy tính (100%)"
        >
          <Monitor size={16} />
          <span className="viewport-label">Máy tính</span>
        </button>

        <button
          type="button"
          className={`viewport-btn ${viewport === 'tablet' ? 'viewport-btn--active' : ''}`}
          onClick={() => setViewport('tablet')}
          title="Kích thước Máy tính bảng (768px)"
        >
          <Tablet size={16} />
          <span className="viewport-label">Tablet</span>
        </button>

        <button
          type="button"
          className={`viewport-btn ${viewport === 'mobile' ? 'viewport-btn--active' : ''}`}
          onClick={() => setViewport('mobile')}
          title="Kích thước Điện thoại (375px)"
        >
          <Smartphone size={16} />
          <span className="viewport-label">Điện thoại</span>
        </button>
      </div>

      {/* Action buttons */}
      <div className="preview-actions">
        <button
          type="button"
          className="btn-secondary preview-action-btn"
          onClick={handleCopy}
          disabled={!hasCode}
          title="Sao chép toàn bộ mã nguồn HTML"
        >
          {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
          <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
        </button>

        <button
          type="button"
          className="btn-primary preview-action-btn preview-action-btn--primary"
          onClick={onExport}
          disabled={!hasCode}
          title="Tải về file HTML hoàn chỉnh"
        >
          <Download size={14} />
          <span>Tải HTML</span>
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
