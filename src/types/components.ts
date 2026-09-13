import type { ReactNode } from 'react';
import type { ChatMessage, GuidedStep, Viewport } from './index';

// === Chat Components ===
export interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  suggestions?: string[];
}

export interface ChatMessageProps {
  message?: ChatMessage;
  isTyping?: boolean;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: GuidedStep[];
}

// === Preview Components ===
export interface PreviewToolbarProps {
  onExport: () => void;
  onCopy: () => Promise<boolean>;
  onFullscreen: () => void;
  isFullscreen?: boolean;
}

export interface DeviceFrameProps {
  viewport?: Viewport;
  children: ReactNode;
}
