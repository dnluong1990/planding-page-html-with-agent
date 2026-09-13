import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type {
  ChatState,
  ChatAction,
  ChatContextValue,
  ChatMessage,
  MessageRole,
  AppView,
  Viewport
} from '../types/index';

// Initial state
const initialState: ChatState = {
  currentView: 'home',
  messages: [],
  currentStep: 0,
  totalSteps: 6,
  isGuidedComplete: false,
  collectedInfo: {
    industry: '',
    brandName: '',
    slogan: '',
    purpose: '',
    style: '',
    colors: '',
    content: ''
  },
  generatedHTML: '',
  isGenerating: false,
  viewport: 'desktop',
  isLoading: false,
  error: null
};

// Reducer function
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      };

    case 'UPDATE_INFO':
      return {
        ...state,
        collectedInfo: {
          ...state.collectedInfo,
          [action.payload.key]: action.payload.value
        }
      };

    case 'SET_GENERATED_HTML':
      return {
        ...state,
        generatedHTML: action.payload
      };

    case 'SET_VIEWPORT':
      return {
        ...state,
        viewport: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: Boolean(action.payload)
      };

    case 'SET_GENERATING':
      return {
        ...state,
        isGenerating: Boolean(action.payload)
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    case 'COMPLETE_GUIDED':
      return {
        ...state,
        isGuidedComplete: true,
        currentStep: -1
      };

    case 'RESET_CHAT':
      return {
        ...initialState,
        currentView: state.currentView
      };

    default:
      return state;
  }
}

// Create Context
export const ChatContext = createContext<ChatContextValue | null>(null);

// Provider Component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Helper actions
  const setView = (view: AppView) => dispatch({ type: 'SET_VIEW', payload: view });
  const addMessage = (message: Partial<ChatMessage> & { role: MessageRole; content: string }) => {
    const formattedMessage: ChatMessage = {
      id: message.id || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      role: message.role,
      content: message.content,
      timestamp: message.timestamp || new Date().toISOString()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: formattedMessage });
  };
  const setStep = (step: number) => dispatch({ type: 'SET_STEP', payload: step });
  const updateInfo = (key: string, value: string) =>
    dispatch({ type: 'UPDATE_INFO', payload: { key, value } });
  const setGeneratedHTML = (html: string) =>
    dispatch({ type: 'SET_GENERATED_HTML', payload: html });
  const setViewport = (viewport: Viewport) =>
    dispatch({ type: 'SET_VIEWPORT', payload: viewport });
  const setLoading = (loading: boolean) =>
    dispatch({ type: 'SET_LOADING', payload: loading });
  const setGenerating = (generating: boolean) =>
    dispatch({ type: 'SET_GENERATING', payload: generating });
  const setError = (error: string | null) =>
    dispatch({ type: 'SET_ERROR', payload: error });
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });
  const resetChat = () => dispatch({ type: 'RESET_CHAT' });
  const completeGuided = () => dispatch({ type: 'COMPLETE_GUIDED' });

  const value: ChatContextValue = {
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

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// Custom Hook
export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
