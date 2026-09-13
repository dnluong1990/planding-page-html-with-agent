import React from 'react';
import {
  Building2,
  Sparkles,
  Target,
  Palette,
  Paintbrush,
  FileText,
  Check
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  Sparkles,
  Target,
  Palette,
  Paintbrush,
  FileText
};

export default function StepIndicator({ currentStep = 0, totalSteps = 6, steps = [] }) {
  // Nếu đã hoàn thành 6 bước (chuyển sang free chat mode)
  const isAllCompleted = currentStep < 0 || currentStep >= totalSteps;
  const activeStepObj = steps[currentStep] || steps[0];
  const progressPercent = isAllCompleted
    ? 100
    : Math.round(((currentStep) / totalSteps) * 100);

  return (
    <div className="step-indicator-wrapper">
      {/* Mobile progress bar view */}
      <div className="step-indicator-mobile">
        <div className="step-mobile-header">
          <span className="step-mobile-title">
            {isAllCompleted
              ? '✨ Đã hoàn thành thu thập thông tin'
              : `Bước ${currentStep + 1}/${totalSteps}: ${activeStepObj?.title || ''}`}
          </span>
          <span className="step-mobile-percent">{progressPercent}%</span>
        </div>
        <div className="step-mobile-track">
          <div
            className="step-mobile-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Desktop steps view */}
      <div className="step-indicator-desktop">
        {steps.map((step, index) => {
          const isCompleted = isAllCompleted || index < currentStep;
          const isActive = !isAllCompleted && index === currentStep;
          const IconComponent = ICON_MAP[step.icon] || Sparkles;

          let stateClass = 'step--upcoming';
          if (isCompleted) stateClass = 'step--completed';
          else if (isActive) stateClass = 'step--active';

          return (
            <React.Fragment key={step.id}>
              <div className={`step-item ${stateClass}`}>
                <div className="step-icon-badge">
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : <IconComponent size={14} />}
                </div>
                <span className="step-label">{step.title}</span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`step-connector ${
                    isCompleted ? 'step-connector--completed' : ''
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
