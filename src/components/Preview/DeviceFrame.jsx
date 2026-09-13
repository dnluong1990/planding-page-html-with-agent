import React from 'react';

export default function DeviceFrame({ viewport = 'desktop', children }) {
  return (
    <div className={`device-frame-wrapper device-frame-wrapper--${viewport}`}>
      <div className={`device-frame device-frame--${viewport}`}>
        {/* Notch trang trí mô phỏng điện thoại khi ở mobile mode */}
        {viewport === 'mobile' && (
          <div className="mobile-notch-bar">
            <div className="mobile-speaker" />
            <div className="mobile-camera" />
          </div>
        )}

        <div className="device-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
