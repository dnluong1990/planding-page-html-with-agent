import React from 'react';
import { Bot, User } from 'lucide-react';

/**
 * Helper render text markdown đơn giản (bold, italic, code inline, xuống dòng)
 */
function renderFormattedContent(text) {
  if (!text) return null;

  // Tách dòng
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    // Nếu dòng trống
    if (!line.trim()) {
      return <div key={lineIdx} style={{ height: '0.6rem' }} />;
    }

    // Xử lý các token inline (bold **...**, italic _..._, inline code `...`)
    const parts = [];
    const regex = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }

      const raw = match[0];
      if (raw.startsWith('**') && raw.endsWith('**')) {
        parts.push(<strong key={`${lineIdx}-${match.index}`}>{raw.slice(2, -2)}</strong>);
      } else if (raw.startsWith('_') && raw.endsWith('_')) {
        parts.push(<em key={`${lineIdx}-${match.index}`}>{raw.slice(1, -1)}</em>);
      } else if (raw.startsWith('`') && raw.endsWith('`')) {
        parts.push(
          <code
            key={`${lineIdx}-${match.index}`}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9em'
            }}
          >
            {raw.slice(1, -1)}
          </code>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return (
      <p key={lineIdx} style={{ margin: '0 0 0.35rem 0' }}>
        {parts}
      </p>
    );
  });
}

function formatTime(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function ChatMessage({ message, isTyping = false }) {
  if (isTyping) {
    return (
      <div className="message-wrapper message-wrapper--ai">
        <div className="message-avatar">
          <Bot size={18} />
        </div>
        <div className="message message--ai">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  const isUser = message.role === 'user';

  return (
    <div className={`message-wrapper ${isUser ? 'message-wrapper--user' : 'message-wrapper--ai'}`}>
      {!isUser && (
        <div className="message-avatar" title="Planding AI">
          <Bot size={18} />
        </div>
      )}

      <div className="message-bubble-container">
        <div className={`message ${isUser ? 'message--user' : 'message--ai'}`}>
          <div className="message-content">
            {renderFormattedContent(message.content)}
          </div>
        </div>
        {message.timestamp && (
          <div className={`message-time ${isUser ? 'message-time--user' : 'message-time--ai'}`}>
            {formatTime(message.timestamp)}
          </div>
        )}
      </div>

      {isUser && (
        <div className="message-avatar message-avatar--user" title="Bạn">
          <User size={18} />
        </div>
      )}
    </div>
  );
}
