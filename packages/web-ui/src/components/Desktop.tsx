import React from 'react';
import { WindowManager } from './WindowManager';
import { Taskbar } from './Taskbar';

export const Desktop: React.FC = () => {
  const [startMenuOpen, setStartMenuOpen] = React.useState(false);

  return (
    <div
      onClick={() => setStartMenuOpen(false)}
      style={{
        minHeight: '100vh',
        background: '#008080',
        position: 'relative',
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
      }}
    >
      {/* Desktop Content */}
      <div style={{ paddingBottom: '48px' }}>
        <WindowManager />
      </div>

      {/* Taskbar - Fixed at bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <Taskbar startMenuOpen={startMenuOpen} setStartMenuOpen={setStartMenuOpen} />
      </div>
    </div>
  );
};
