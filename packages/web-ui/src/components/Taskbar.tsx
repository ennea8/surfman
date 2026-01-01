import React from 'react';
import { Button, MenuList, MenuListItem, Separator } from 'react95';
import styled from 'styled-components';
import { useWindowStore } from '../store/windowStore';
import { useNetworkStore } from '../store/networkStore';

const TaskbarButton = styled(Button)`
  margin-right: 4px;
`;

interface TaskbarProps {
  startMenuOpen: boolean;
  setStartMenuOpen: (open: boolean) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ startMenuOpen, setStartMenuOpen }) => {
  const { windows, addWindow, minimizeWindow } = useWindowStore();
  const { networkType, setNetworkType } = useNetworkStore();

  const openWindow = (component: string, title: string) => {
    console.log('Opening window:', { component, title });
    const newWindow = {
      title,
      component,
      x: 100 + windows.length * 20,
      y: 100 + windows.length * 20,
      width: 600,
      height: 400,
      isMinimized: false,
      isMaximized: false,
    };
    console.log('New window config:', newWindow);
    addWindow(newWindow);
    setStartMenuOpen(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        height: '48px',
        background: '#c0c0c0',
        border: '2px solid',
        borderColor: '#fff #000 #000 #fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        gap: '8px',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setStartMenuOpen(!startMenuOpen);
              }}
              active={startMenuOpen}
              style={{ fontWeight: 'bold' }}
            >
              <span style={{ marginRight: 4 }}>🌊</span>
              Start
            </Button>
            {startMenuOpen && (
              <MenuList
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '100%',
                  marginBottom: 2,
                  width: 200,
                }}
              >
                <MenuListItem onClick={(e) => {
                  e.stopPropagation();
                  openWindow('network', 'Network Operations');
                }}>
                  <span style={{ marginRight: 8 }}>🌐</span>
                  Network
                </MenuListItem>
                <MenuListItem onClick={(e) => {
                  e.stopPropagation();
                  openWindow('accounts', 'Account Manager');
                }}>
                  <span style={{ marginRight: 8 }}>📦</span>
                  Accounts
                </MenuListItem>
                <MenuListItem onClick={(e) => {
                  e.stopPropagation();
                  openWindow('cheatcodes', 'Cheatcodes');
                }}>
                  <span style={{ marginRight: 8 }}>🔧</span>
                  Cheatcodes
                </MenuListItem>
                <Separator />
                <MenuListItem onClick={() => setStartMenuOpen(false)}>
                  <span style={{ marginRight: 8 }}>⚙️</span>
                  Settings
                </MenuListItem>
              </MenuList>
            )}
          </div>

          <div style={{ display: 'flex', gap: 4 }}>
            {windows
              .filter((w) => !w.isMinimized)
              .map((win) => (
                <TaskbarButton
                  key={win.id}
                  onClick={() => minimizeWindow(win.id)}
                  variant="thin"
                >
                  {win.title}
                </TaskbarButton>
              ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select
              value={networkType}
              onChange={(e) => {
                console.log('Network changed to:', e.target.value);
                setNetworkType(e.target.value as any);
              }}
              style={{
                padding: '2px 4px',
                border: '1px solid #000',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              <option value="localnet">Localnet</option>
              <option value="devnet">Devnet</option>
              <option value="testnet">Testnet</option>
              <option value="mainnet">Mainnet</option>
            </select>
            <span style={{ fontSize: '11px' }}>{new Date().toLocaleTimeString()}</span>
          </div>
      </div>
    </div>
  );
};
