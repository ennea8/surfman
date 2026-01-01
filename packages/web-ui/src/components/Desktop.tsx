import React from 'react';
import { Taskbar } from './Taskbar';
import { WindowManager } from './WindowManager';
import { DesktopIcon } from './DesktopIcon';
import { useWindowStore } from '../store/windowStore';

export const Desktop: React.FC = () => {
  const [startMenuOpen, setStartMenuOpen] = React.useState(false);
  const { addWindow } = useWindowStore();

  const openDesktopWindow = (
    component: string,
    title: string,
    icon: string,
    width: number = 700,
    height: number = 500
  ) => {
    addWindow({
      title,
      component,
      icon,
      x: 50 + Math.random() * 150,
      y: 50 + Math.random() * 100,
      width,
      height,
      isMinimized: false,
      isMaximized: false,
    });
  };

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
        {/* Desktop Icons */}
        <div
          style={{
            padding: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignContent: 'flex-start',
          }}
        >
          <DesktopIcon
            icon="🔍"
            label="API Tester"
            onClick={() => openDesktopWindow('apiTester', 'API Tester', '🔍', 800, 600)}
          />
          <DesktopIcon
            icon="📋"
            label="Account Info"
            onClick={() =>
              openDesktopWindow('accountManager', 'Account Info', '📋', 600, 500)
            }
          />
          <DesktopIcon
            icon="🧮"
            label="PDA Calculator"
            onClick={() => openDesktopWindow('pdaCalculator', 'PDA Calculator', '🧮', 600, 550)}
          />
        </div>

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
