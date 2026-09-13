// === Message ===
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

// === Guided Flow ===
export type StepKey = 'industry' | 'brandName' | 'purpose' | 'style' | 'colors' | 'content';

export interface GuidedStep {
  id: number;
  key: StepKey;
  title: string;
  icon: string;
  question: string;
  placeholder: string;
  suggestions: string[];
}

export interface CollectedInfo {
  industry: string;
  brandName: string;
  slogan: string;
  purpose: string;
  style: string;
  colors: string;
  content: string;
}

// === App State ===
export type AppView = 'home' | 'chat';
export type Viewport = 'desktop' | 'tablet' | 'mobile';

export interface ChatState {
  currentView: AppView;
  messages: ChatMessage[];
  currentStep: number;
  totalSteps: number;
  isGuidedComplete: boolean;
  collectedInfo: CollectedInfo;
  generatedHTML: string;
  isGenerating: boolean;
  viewport: Viewport;
  isLoading: boolean;
  error: string | null;
}

// === Context Actions ===
export type ChatAction =
  | { type: 'SET_VIEW'; payload: AppView }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_INFO'; payload: { key: string; value: string } }
  | { type: 'SET_GENERATED_HTML'; payload: string }
  | { type: 'SET_VIEWPORT'; payload: Viewport }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET_CHAT' }
  | { type: 'COMPLETE_GUIDED' };

// === Context Value ===
export interface ChatContextValue extends ChatState {
  setView: (view: AppView) => void;
  addMessage: (message: Partial<ChatMessage> & { role: MessageRole; content: string }) => void;
  setStep: (step: number) => void;
  updateInfo: (key: string, value: string) => void;
  setGeneratedHTML: (html: string) => void;
  setViewport: (viewport: Viewport) => void;
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetChat: () => void;
  completeGuided: () => void;
}
