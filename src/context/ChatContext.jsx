import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  // Current view: 'home' | 'chat'
  currentView: 'home',

  // Chat messages: array of { id, role: 'user' | 'assistant' | 'system', content, timestamp }
  messages: [],

  // Guided flow
  currentStep: 0, // 0-5 cho guided flow, -1 cho free chat sau khi generate
  totalSteps: 6,
  isGuidedComplete: false,

  // Thông tin thu thập từ guided flow
  collectedInfo: {
    industry: '', // Ngành nghề
    brandName: '', // Tên thương hiệu
    slogan: '', // Slogan
    purpose: '', // Mục đích landing page
    style: '', // Phong cách thiết kế
    colors: '', // Màu sắc chủ đạo
    content: '' // Nội dung chính
  },

  // Generated output
  generatedHTML: '', // HTML/CSS landing page đã generate
  isGenerating: false, // Đang gọi AI generate

  // Preview
  viewport: 'desktop', // 'desktop' | 'tablet' | 'mobile'

  // Loading & Error
  isLoading: false, // Đang chờ AI response
  error: null // Error message nếu có
};

// Action types
export const ACTIONS = {
  SET_VIEW: 'SET_VIEW',
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_STEP: 'SET_STEP',
  UPDATE_INFO: 'UPDATE_INFO',
  SET_GENERATED_HTML: 'SET_GENERATED_HTML',
  SET_VIEWPORT: 'SET_VIEWPORT',
  SET_LOADING: 'SET_LOADING',
  SET_GENERATING: 'SET_GENERATING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_CHAT: 'RESET_CHAT',
  COMPLETE_GUIDED: 'COMPLETE_GUIDED'
};

// Reducer function
function chatReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_VIEW:
      return {
        ...state,
        currentView: action.payload
      };

    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.payload
      };

    case ACTIONS.UPDATE_INFO:
      return {
        ...state,
        collectedInfo: {
          ...state.collectedInfo,
          [action.payload.key]: action.payload.value
        }
      };

    case ACTIONS.SET_GENERATED_HTML:
      return {
        ...state,
        generatedHTML: action.payload
      };

    case ACTIONS.SET_VIEWPORT:
      return {
        ...state,
        viewport: action.payload
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: Boolean(action.payload)
      };

    case ACTIONS.SET_GENERATING:
      return {
        ...state,
        isGenerating: Boolean(action.payload)
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ACTIONS.COMPLETE_GUIDED:
      return {
        ...state,
        isGuidedComplete: true,
        currentStep: -1
      };

    case ACTIONS.RESET_CHAT:
      return {
        ...initialState,
        currentView: state.currentView
      };

    default:
      return state;
  }
}

// Create Context
export const ChatContext = createContext(null);

// Provider Component
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Helper actions
  const setView = (view) => dispatch({ type: ACTIONS.SET_VIEW, payload: view });
  const addMessage = (message) => {
    const formattedMessage = {
      id: message.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: message.role || 'user',
      content: message.content || '',
      timestamp: message.timestamp || new Date().toISOString()
    };
    dispatch({ type: ACTIONS.ADD_MESSAGE, payload: formattedMessage });
  };
  const setStep = (step) => dispatch({ type: ACTIONS.SET_STEP, payload: step });
  const updateInfo = (key, value) => dispatch({ type: ACTIONS.UPDATE_INFO, payload: { key, value } });
  const setGeneratedHTML = (html) => dispatch({ type: ACTIONS.SET_GENERATED_HTML, payload: html });
  const setViewport = (viewport) => dispatch({ type: ACTIONS.SET_VIEWPORT, payload: viewport });
  const setLoading = (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  const setGenerating = (generating) => dispatch({ type: ACTIONS.SET_GENERATING, payload: generating });
  const setError = (error) => dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  const clearError = () => dispatch({ type: ACTIONS.CLEAR_ERROR });
  const resetChat = () => dispatch({ type: ACTIONS.RESET_CHAT });
  const completeGuided = () => dispatch({ type: ACTIONS.COMPLETE_GUIDED });

  const value = {
    ...state,
    setView,
    addMessage,
    setStep,
    updateInfo,
    setGeneratedHTML,
    setViewport,
    setLoading,
    setGenerating,
    setError,
    clearError,
    resetChat,
    completeGuided
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

// Custom Hook
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
