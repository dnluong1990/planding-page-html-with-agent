import type { GuidedStep, StepKey } from '../types/index';
import { getGuidedFlowStrings } from '../config/guidedFlowI18n';

const STEP_KEYS: StepKey[] = ['industry', 'brandName', 'purpose', 'style', 'colors', 'content'];
const STEP_ICONS = ['Building2', 'Sparkles', 'Target', 'Palette', 'Paintbrush', 'FileText'];

export function getSteps(): GuidedStep[] {
  const flow = getGuidedFlowStrings();
  return flow.steps.map((step, idx) => ({
    id: idx,
    key: STEP_KEYS[idx] ?? 'industry',
    title: step.title,
    icon: STEP_ICONS[idx] ?? 'Sparkles',
    question: step.question,
    placeholder: step.placeholder,
    suggestions: step.suggestions
  }));
}

export const STEPS: GuidedStep[] = getSteps();

// Helper functions
export function getCurrentStep(stepIndex: number): GuidedStep | null {
  const steps = getSteps();
  return steps[stepIndex] ?? null;
}

export function isGuidedFlowComplete(stepIndex: number): boolean {
  return stepIndex >= STEP_KEYS.length;
}

export function getStepByKey(key: StepKey): GuidedStep | undefined {
  const steps = getSteps();
  return steps.find((step) => step.key === key);
}

export function getProgress(stepIndex: number): number {
  return Math.min((stepIndex / STEP_KEYS.length) * 100, 100);
}
