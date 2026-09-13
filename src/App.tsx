import { useState } from 'react';
import { MessageSquare, Eye } from 'lucide-react';
import { useChat } from './context/ChatContext';
import ChatPanel from './components/Chat/ChatPanel';
import PreviewPanel from './components/Preview/PreviewPanel';
import HomePage from './components/Landing/HomePage';

import { getUIStrings } from './config/i18n';

export default function App() {
  const { currentView } = useChat();
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('chat');
  const t = getUIStrings();

  if (currentView === 'home') {
    return <HomePage />;
  }

  return (
    <div className="app-builder">
      {/* Chat Pane (~40% desktop) */}
      <div className={`chat-pane ${mobileTab === 'preview' ? 'hidden' : ''}`}>
        <ChatPanel />
      </div>

      {/* Preview Pane (~60% desktop) */}
      <div className={`preview-pane ${mobileTab === 'chat' ? 'hidden' : ''}`}>
        <PreviewPanel />
      </div>

      {/* Floating Mobile Tabs (Chỉ hiển thị trên mobile) */}
      <nav className="mobile-tabs">
        <button
          type="button"
          className={`mobile-tab ${mobileTab === 'chat' ? 'mobile-tab--active' : ''}`}
          onClick={() => setMobileTab('chat')}
        >
          <MessageSquare size={16} />
          <span>{t.mobileTabChat}</span>
        </button>

        <button
          type="button"
          className={`mobile-tab ${mobileTab === 'preview' ? 'mobile-tab--active' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          <Eye size={16} />
          <span>{t.mobileTabPreview}</span>
        </button>
      </nav>
    </div>
  );
}
