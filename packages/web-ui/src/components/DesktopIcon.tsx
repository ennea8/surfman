import React from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onClick}
      style={{
        width: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        style={{
          fontSize: '48px',
          marginBottom: '4px',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          color: '#fff',
          fontSize: '11px',
          textAlign: 'center',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          fontFamily: 'MS Sans Serif, Arial, sans-serif',
          wordBreak: 'break-word',
        }}
      >
        {label}
      </div>
    </div>
  );
};
