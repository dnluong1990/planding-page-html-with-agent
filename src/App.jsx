import React, { useState } from 'react';
import { MessageSquare, Eye } from 'lucide-react';
import { useChat } from './context/ChatContext.jsx';
import ChatPanel from './components/Chat/ChatPanel.jsx';
import PreviewPanel from './components/Preview/PreviewPanel.jsx';
import HomePage from './components/Landing/HomePage.jsx';

export default function App() {
  const { currentView } = useChat();
  const [mobileTab, setMobileTab] = useState('chat'); // 'chat' | 'preview'

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
          <span>Trò chuyện</span>
        </button>

        <button
          type="button"
          className={`mobile-tab ${mobileTab === 'preview' ? 'mobile-tab--active' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          <Eye size={16} />
          <span>Xem trước</span>
        </button>
      </nav>
    </div>
  );
}
