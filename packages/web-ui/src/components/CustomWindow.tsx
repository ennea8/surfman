import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import Draggable from 'react-draggable';
import { useWindowStore } from '../store/windowStore';

interface CustomWindowProps {
  windowId: string;
  title: string;
  icon?: string;
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex: number;
  isMaximized: boolean;
  children: ReactNode;
}

export const CustomWindow: React.FC<CustomWindowProps> = ({
  windowId,
  title,
  icon = '📄',
  width,
  height,
  x,
  y,
  zIndex,
  isMaximized,
  children,
}) => {
  const nodeRef = useRef(null);
  const { removeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition } = useWindowStore();

  const handleDragStop = (_e: any, data: any) => {
    updateWindowPosition(windowId, data.x, data.y);
  };

  console.log('CustomWindow render:', { windowId, title, x, y, width, height, zIndex });

  // When maximized, render without Draggable to avoid transform conflicts
  if (isMaximized) {
    return (
      <div
        onMouseDown={() => focusWindow(windowId)}
        style={{
          position: 'fixed',
          width: '100vw',
          height: 'calc(100vh - 48px)',
          zIndex,
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            background: '#c0c0c0',
            border: '2px outset #fff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Title Bar */}
          <div
            className="window-title-bar"
            style={{
              background: 'linear-gradient(to right, #000080, #1084d0)',
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'default',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px' }}>{icon}</span>
              <span
                style={{
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  fontFamily: 'MS Sans Serif, Arial, sans-serif',
                }}
              >
                {title}
              </span>
            </div>

            {/* Window Controls */}
            <div style={{ display: 'flex', gap: '2px' }}>
              <button
                onClick={() => minimizeWindow(windowId)}
                style={{
                  width: '16px',
                  height: '14px',
                  padding: 0,
                  border: '1px outset',
                  borderColor: '#fff #000 #000 #fff',
                  background: '#c0c0c0',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Minimize"
              >
                _
              </button>
              <button
                onClick={() => maximizeWindow(windowId)}
                style={{
                  width: '16px',
                  height: '14px',
                  padding: 0,
                  border: '1px outset',
                  borderColor: '#fff #000 #000 #fff',
                  background: '#c0c0c0',
                  cursor: 'pointer',
                  fontSize: '9px',
                  fontWeight: 'bold',
                }}
                title="Restore"
              >
                ❐
              </button>
              <button
                onClick={() => removeWindow(windowId)}
                style={{
                  width: '16px',
                  height: '14px',
                  padding: 0,
                  border: '1px outset',
                  borderColor: '#fff #000 #000 #fff',
                  background: '#c0c0c0',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              background: '#fff',
              padding: '8px',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-title-bar"
      position={{ x, y }}
      onStop={handleDragStop}
    >
      <div
        ref={nodeRef}
        onMouseDown={() => focusWindow(windowId)}
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          zIndex,
        }}
      >
        <div
          style={{
            background: '#c0c0c0',
            border: '2px outset #fff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Title Bar */}
          <div
            className="window-title-bar"
            style={{
              background: 'linear-gradient(to right, #000080, #1084d0)',
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: isMaximized ? 'default' : 'move',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px' }}>{icon}</span>
              <span
                style={{
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  fontFamily: 'MS Sans Serif, Arial, sans-serif',
                }}
              >
                {title}
              </span>
            </div>

            {/* Window Controls */}
            <div style={{ display: 'flex', gap: '2px' }}>
              <button
                onClick={() => minimizeWindow(windowId)}
                style={{
                  width: '16px',
                  height: '14px',
                  padding: 0,
                  border: '1px outset',
                  borderColor: '#fff #000 #000 #fff',
                  background: '#c0c0c0',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Minimize"
              >
                _
              </button>
              <button
                onClick={() => maximizeWindow(windowId)}
                style={{
                  width: '16px',
                  height: '14px',
                  padding: 0,
                  border: '1px outset',
                  borderColor: '#fff #000 #000 #fff',
                  background: '#c0c0c0',
                  cursor: 'pointer',
                  fontSize: '9px',
                  fontWeight: 'bold',
                }}
                title={isMaximized ? 'Restore' : 'Maximize'}
              >
                {isMaximized ? '❐' : '□'}
              </button>
              <button
                onClick={() => removeWindow(windowId)}
                style={{
                  width: '16px',
                  height: '14px',
                  padding: 0,
                  border: '1px outset',
                  borderColor: '#fff #000 #000 #fff',
                  background: '#c0c0c0',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              background: '#fff',
              padding: '8px',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
