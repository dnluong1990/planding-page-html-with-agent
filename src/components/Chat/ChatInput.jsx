import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Nhập tin nhắn...',
  suggestions = []
}) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      // Max height ~ 130px (khoảng 5 dòng)
      textareaRef.current.style.height = `${Math.min(scrollHeight, 130)}px`;
    }
  }, [text]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (disabled) return;
    onSend(suggestion);
  };

  return (
    <div className="chat-input-container">
      {/* Suggestions Chips */}
      {suggestions && suggestions.length > 0 && !disabled && (
        <div className="suggestions">
          {suggestions.map((item, index) => (
            <button
              key={index}
              type="button"
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Input wrapper */}
      <div className="chat-input-wrapper">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? 'Planding AI đang xử lý...' : placeholder}
          disabled={disabled}
          rows={1}
          className="chat-textarea"
        />
        <button
          type="button"
          className="chat-send-btn"
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          title="Gửi tin nhắn (Enter)"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
