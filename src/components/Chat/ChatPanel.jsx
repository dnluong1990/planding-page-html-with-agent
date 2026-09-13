import React, { useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, ArrowLeft, AlertCircle } from 'lucide-react';
import { useChat } from '../../context/ChatContext.jsx';
import { STEPS, getCurrentStep } from '../../services/guidedFlow.js';
import {
  buildSystemPrompt,
  buildGeneratePrompt,
  buildEditPrompt,
  extractHTMLFromResponse,
  extractChatExplanation
} from '../../services/promptBuilder.js';
import { callWithRetry } from '../../services/aiService.js';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import StepIndicator from './StepIndicator.jsx';

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

  const messagesEndRef = useRef(null);

  // Auto scroll xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Khởi tạo tin nhắn chào mừng và câu hỏi đầu tiên khi mới vào
  useEffect(() => {
    if (messages.length === 0) {
      const firstStep = STEPS[0];
      addMessage({
        role: 'assistant',
        content: firstStep.question
      });
      setStep(0);
    }
  }, []);

  // Xử lý gửi tin nhắn từ User
  const handleSendMessage = async (userText) => {
    if (!userText.trim() || isLoading) return;

    clearError();

    // 1. Thêm tin nhắn của User
    addMessage({
      role: 'user',
      content: userText
    });

    // 2. Nếu đang trong Guided Flow (Bước 0 đến 5)
    if (currentStep >= 0 && currentStep < STEPS.length) {
      const activeStep = STEPS[currentStep];
      const nextStepIndex = currentStep + 1;

      // Lưu thông tin bước hiện tại
      updateInfo(activeStep.key, userText);
      const updatedInfo = {
        ...collectedInfo,
        [activeStep.key]: userText
      };

      // Còn bước tiếp theo
      if (nextStepIndex < STEPS.length) {
        setStep(nextStepIndex);
        const nextStep = STEPS[nextStepIndex];

        // Mô phỏng AI suy nghĩ một chút cho mượt mà (350ms)
        setTimeout(() => {
          addMessage({
            role: 'assistant',
            content: nextStep.question
          });
        }, 350);
      } else {
        // Đã hoàn thành cả 6 bước -> Bắt đầu sinh Landing Page
        completeGuided();

        addMessage({
          role: 'assistant',
          content: 'Cảm ơn bạn! Mình đã thu thập đầy đủ thông tin cần thiết. ✨\n\nPlanding AI đang tiến hành thiết kế và sinh mã nguồn landing page hoàn chỉnh cho bạn. Quá trình này mất khoảng vài giây, bạn vui lòng đợi nhé... 🚀'
        });

        setLoading(true);

        try {
          const systemPrompt = buildSystemPrompt();
          const generatePrompt = buildGeneratePrompt(updatedInfo);

          // Gọi Gemini API
          const aiResponse = await callWithRetry(
            [{ role: 'user', content: generatePrompt }],
            systemPrompt
          );

          const extractedHTML = extractHTMLFromResponse(aiResponse);
          const explanation = extractChatExplanation(aiResponse);

          if (extractedHTML) {
            setGeneratedHTML(extractedHTML);

            const messageContent = explanation
              ? `${explanation}\n\n---\n🎉 **Landing page của bạn đã được tạo thành công!**\nBạn có thể xem trước giao diện ngay ở màn hình preview bên phải. Hãy thử chuyển đổi giữa các kích thước **Desktop, Tablet, Mobile** hoặc yêu cầu mình chỉnh sửa thêm nhé!`
              : '🎉 **Tuyệt vời! Landing page của bạn đã được tạo thành công.**\n\nBạn có thể xem trước giao diện ngay ở màn hình preview bên phải. Hãy thử chuyển đổi giữa các kích thước **Desktop, Tablet, Mobile** hoặc yêu cầu mình chỉnh sửa thêm nhé!';

            addMessage({
              role: 'assistant',
              content: messageContent
            });
          } else {
            setError('Không thể trích xuất mã HTML hợp lệ từ phản hồi của AI.');
            addMessage({
              role: 'assistant',
              content: '❌ AI đã phản hồi nhưng không tạo ra cấu trúc mã HTML hợp lệ. Bạn vui lòng bấm gửi lại để AI thử lại nhé!'
            });
          }
        } catch (err) {
          setError(err.message || 'Có lỗi xảy ra khi tạo landing page. Vui lòng thử lại.');
          addMessage({
            role: 'assistant',
            content: `❌ Rất tiếc, đã có lỗi xảy ra: ${err.message || 'Không thể kết nối đến AI'}. Bạn vui lòng bấm nút gửi lại hoặc kiểm tra API Key nhé!`
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

        const aiResponse = await callWithRetry(
          [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: editPrompt }
          ],
          systemPrompt
        );

        const updatedHTML = extractHTMLFromResponse(aiResponse);
        const editExplanation = extractChatExplanation(aiResponse);

        if (updatedHTML) {
          setGeneratedHTML(updatedHTML);

          const editMessage = editExplanation
            ? `${editExplanation}\n\n---\n✨ **Mình đã cập nhật landing page theo yêu cầu của bạn!** Bạn hãy kiểm tra trên màn hình preview nhé.`
            : '✨ **Mình đã cập nhật landing page theo yêu cầu của bạn!** Bạn hãy kiểm tra sự thay đổi trên màn hình preview nhé.';

          addMessage({
            role: 'assistant',
            content: editMessage
          });
        } else {
          addMessage({
            role: 'assistant',
            content: aiResponse
          });
        }
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi cập nhật landing page.');
        addMessage({
          role: 'assistant',
          content: `❌ Không thể cập nhật: ${err.message || 'Lỗi kết nối'}. Bạn hãy thử gửi lại yêu cầu nhé!`
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn làm mới cuộc trò chuyện và bắt đầu tạo trang mới không?')) {
      resetChat();
      const firstStep = STEPS[0];
      addMessage({
        role: 'assistant',
        content: firstStep.question
      });
      setStep(0);
    }
  };

  const currentStepObj = getCurrentStep(currentStep);
  const currentSuggestions = currentStep >= 0 && currentStepObj ? currentStepObj.suggestions : [];
  const currentPlaceholder = currentStep >= 0 && currentStepObj
    ? currentStepObj.placeholder
    : 'Mô tả yêu cầu chỉnh sửa (VD: đổi màu nút CTA, thêm bảng giá...)...';

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
            <span className="chat-badge">Beta</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-secondary chat-reset-btn"
          onClick={handleReset}
          title="Tạo landing page mới"
        >
          <RotateCcw size={14} />
          <span>Tạo mới</span>
        </button>
      </header>

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEPS.length}
        steps={STEPS}
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
