import { useState } from 'react';
import { Layout, Sparkles, Wand2 } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { downloadHTML, copyToClipboard } from '../../utils/exportUtils';
import { getUIStrings } from '../../config/i18n';
import PreviewToolbar from './PreviewToolbar';
import DeviceFrame from './DeviceFrame';

export default function PreviewPanel() {
  const { generatedHTML, isLoading, viewport, collectedInfo } = useChat();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const t = getUIStrings();

  const showToast = (msg: string): void => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleExport = (): void => {
    if (!generatedHTML) return;
    const brandName = collectedInfo.brandName || 'planding';
    downloadHTML(generatedHTML, brandName);
    showToast(t.previewToastDownload);
  };

  const handleCopy = async (): Promise<boolean> => {
    if (!generatedHTML) return false;
    const success = await copyToClipboard(generatedHTML);
    if (success) {
      showToast(t.previewToastCopy);
    }
    return success;
  };

  const toggleFullscreen = (): void => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <section className={`preview-panel ${isFullscreen ? 'preview-panel--fullscreen' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="preview-toast animate-slide-up">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Toolbar */}
      <PreviewToolbar
        onExport={handleExport}
        onCopy={handleCopy}
        onFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Preview Content Area */}
      <div className="preview-content">
        {isLoading ? (
          // Loading Skeleton State
          <div className="preview-loading">
            <div className="preview-loading-header">
              <div className="preview-loading-spinner">
                <Wand2 size={24} className="animate-pulse" />
              </div>
              <div>
                <h4 className="preview-loading-title">{t.previewLoading}</h4>
                <p className="preview-loading-subtitle">{t.previewLoadingDesc}</p>
              </div>
            </div>

            <div className="skeleton skeleton--nav" />
            <div className="skeleton skeleton--hero" />
            <div className="skeleton-grid">
              <div className="skeleton skeleton--card" />
              <div className="skeleton skeleton--card" />
              <div className="skeleton skeleton--card" />
            </div>
            <div className="skeleton skeleton--block" />
          </div>
        ) : !generatedHTML ? (
          // Empty State khi chưa tạo trang
          <div className="preview-empty">
            <div className="preview-empty-icon-box">
              <Layout className="preview-empty-icon" size={64} strokeWidth={1.5} />
              <Sparkles className="preview-empty-sparkle" size={24} />
            </div>
            <h3 className="preview-empty-title">{t.previewEmpty}</h3>
            <p className="preview-empty-desc">{t.previewEmptyDesc}</p>
            <div className="preview-empty-features">
              <span>⚡ {t.featureFast}</span>
              <span>📱 {t.featurePreview}</span>
              <span>📥 {t.featureExport}</span>
            </div>
          </div>
        ) : (
          // Live Preview State với iframe sandbox
          <DeviceFrame viewport={viewport}>
            <iframe
              title="Planding Live Preview"
              srcDoc={generatedHTML}
              sandbox="allow-scripts allow-same-origin"
              className="preview-iframe"
            />
          </DeviceFrame>
        )}
      </div>
    </section>
  );
}
