import React, { useState } from 'react';
import { Layout, Sparkles, Wand2 } from 'lucide-react';
import { useChat } from '../../context/ChatContext.jsx';
import { downloadHTML, copyToClipboard } from '../../utils/exportUtils.js';
import PreviewToolbar from './PreviewToolbar.jsx';
import DeviceFrame from './DeviceFrame.jsx';

export default function PreviewPanel() {
  const { generatedHTML, isLoading, viewport, collectedInfo } = useChat();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleExport = () => {
    if (!generatedHTML) return;
    const brandName = collectedInfo?.brandName || 'planding';
    downloadHTML(generatedHTML, brandName);
    showToast('🎉 Đã tải file HTML về máy thành công!');
  };

  const handleCopy = async () => {
    if (!generatedHTML) return false;
    const success = await copyToClipboard(generatedHTML);
    if (success) {
      showToast('📋 Đã sao chép mã nguồn HTML vào bộ nhớ tạm!');
    }
    return success;
  };

  const toggleFullscreen = () => {
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
                <h4 className="preview-loading-title">Planding AI đang kiến tạo Landing Page...</h4>
                <p className="preview-loading-subtitle">Đang tự động sinh HTML/CSS, bố cục layout và tối ưu giao diện.</p>
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
            <h3 className="preview-empty-title">Landing page của bạn sẽ hiển thị trực tiếp tại đây</h3>
            <p className="preview-empty-desc">
              Hãy trả lời các câu hỏi hướng dẫn ở khung chat bên trái. Planding AI sẽ tự động tạo giao diện theo phong cách và màu sắc bạn chọn.
            </p>
            <div className="preview-empty-features">
              <span>⚡ Xem trước tức thì</span>
              <span>📱 Responsive mọi thiết bị</span>
              <span>📥 Tải trọn gói 1 click</span>
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
