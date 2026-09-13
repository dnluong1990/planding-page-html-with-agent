import { useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft, AlertCircle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { getSteps, getCurrentStep } from '../../services/guidedFlow';
import {
  buildSystemPrompt,
  buildGeneratePrompt,
  buildEditPrompt,
  extractHTMLFromResponse,
  extractChatExplanation
} from '../../services/promptBuilder';
import { callAIWithRetry } from '../../services/aiService';
import { getUIStrings } from '../../config/i18n';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import StepIndicator from './StepIndicator';

export default function ChatPanel() {
  const {
    messages,
    currentStep,
    collectedInfo,
    generatedHTML,
    isLoading,
    error,
    addMessage,
    setStep,
    updateInfo,
    setGeneratedHTML,
    setLoading,
    setError,
    clearError,
    resetChat,
    completeGuided,
    setView
  } = useChat();

  const t = getUIStrings();
  const currentSteps = getSteps();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll xuống tin nhắn mới nhất
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Khởi tạo tin nhắn chào mừng và câu hỏi đầu tiên khi mới vào
  useEffect(() => {
    if (messages.length === 0) {
      const firstStep = getCurrentStep(0);
      if (firstStep) {
        addMessage({
          role: 'assistant',
          content: firstStep.question
        });
        setStep(0);
      }
    }
  }, []);

  // Xử lý gửi tin nhắn từ User
  const handleSendMessage = async (userText: string): Promise<void> => {
    if (!userText.trim() || isLoading) return;

    clearError();

    // 1. Thêm tin nhắn của User
    addMessage({
      role: 'user',
      content: userText
    });

    // 2. Nếu đang trong Guided Flow (Bước 0 đến 5)
    if (currentStep >= 0 && currentStep < currentSteps.length) {
      const activeStep = getCurrentStep(currentStep);
      if (!activeStep) return;

      const nextStepIndex = currentStep + 1;

      // Lưu thông tin bước hiện tại
      updateInfo(activeStep.key, userText);
      const updatedInfo = {
        ...collectedInfo,
        [activeStep.key]: userText
      };

      // Còn bước tiếp theo
      if (nextStepIndex < currentSteps.length) {
        setStep(nextStepIndex);
        const nextStep = getCurrentStep(nextStepIndex);

        // Mô phỏng AI suy nghĩ một chút cho mượt mà (350ms)
        setTimeout(() => {
          if (nextStep) {
            addMessage({
              role: 'assistant',
              content: nextStep.question
            });
          }
        }, 350);
      } else {
        // Đã hoàn thành cả 6 bước -> Bắt đầu sinh Landing Page
        completeGuided();

        addMessage({
          role: 'assistant',
          content: t.chatGenerating
        });

        setLoading(true);

        try {
          const systemPrompt = buildSystemPrompt();
          const generatePrompt = buildGeneratePrompt(updatedInfo);

          // Gọi AI Provider qua aiService
          const response = await callAIWithRetry({
            messages: [{ role: 'user', content: generatePrompt }],
            systemPrompt
          });

          const extractedHTML = extractHTMLFromResponse(response.text);
          const explanation = extractChatExplanation(response.text);

          if (extractedHTML) {
            setGeneratedHTML(extractedHTML);

            const messageContent = explanation
              ? `${explanation}\n\n---\n${t.chatSuccess}`
              : t.chatSuccess;

            addMessage({
              role: 'assistant',
              content: messageContent
            });
          } else {
            setError(t.chatError);
            addMessage({
              role: 'assistant',
              content: t.chatError
            });
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : t.chatError;
          setError(errorMessage);
          addMessage({
            role: 'assistant',
            content: `❌ ${errorMessage}`
          });
        } finally {
          setLoading(false);
        }
      }
    } else {
      // 3. Đang trong chế độ Free Chat (Chỉnh sửa trang sau khi đã generate)
      setLoading(true);

      try {
        const systemPrompt = buildSystemPrompt();
        const editPrompt = buildEditPrompt(generatedHTML, userText);

        const response = await callAIWithRetry({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: editPrompt }
          ],
          systemPrompt
        });

        const updatedHTML = extractHTMLFromResponse(response.text);
        const editExplanation = extractChatExplanation(response.text);

        if (updatedHTML) {
          setGeneratedHTML(updatedHTML);

          const editMessage = editExplanation
            ? `${editExplanation}\n\n---\n${t.chatEditSuccess}`
            : t.chatEditSuccess;

          addMessage({
            role: 'assistant',
            content: editMessage
          });
        } else {
          // Cố gắng trích xuất phần text giải thích (không chứa HTML)
          const explanation = extractChatExplanation(response.text);
          const safeContent = explanation || t.chatEditSuccess;

          addMessage({
            role: 'assistant',
            content: safeContent
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : t.chatError;
        setError(errorMessage);
        addMessage({
          role: 'assistant',
          content: `❌ ${errorMessage}`
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = (): void => {
    if (window.confirm(t.chatResetConfirm)) {
      resetChat();
      const firstStep = getCurrentStep(0);
      if (firstStep) {
        addMessage({
          role: 'assistant',
          content: firstStep.question
        });
        setStep(0);
      }
    }
  };

  const currentStepObj = getCurrentStep(currentStep);
  const currentSuggestions = currentStep >= 0 && currentStepObj ? currentStepObj.suggestions : [];
  const currentPlaceholder =
    currentStep >= 0 && currentStepObj ? currentStepObj.placeholder : t.chatEditPlaceholder;

  return (
    <aside className="chat-panel">
      {/* Header */}
      <header className="chat-header glass">
        <div className="chat-header-brand">
          <button
            type="button"
            className="chat-back-btn"
            onClick={() => setView('home')}
            title="Quay lại trang chủ"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="chat-title-group">
            <span className="chat-logo gradient-text">Planding AI</span>
            <span className="chat-badge">{t.chatBadge}</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-secondary chat-reset-btn"
          onClick={handleReset}
          title={t.chatReset}
        >
          <RotateCcw size={14} />
          <span>{t.chatReset}</span>
        </button>
      </header>

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        totalSteps={currentSteps.length}
        steps={currentSteps}
      />

      {/* Error alert nếu có */}
      {error && (
        <div className="chat-error-banner">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator khi đang xử lý AI */}
        {isLoading && <ChatMessage isTyping={true} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bottom Area */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading}
        placeholder={currentPlaceholder}
        suggestions={currentSuggestions}
      />
    </aside>
  );
}
