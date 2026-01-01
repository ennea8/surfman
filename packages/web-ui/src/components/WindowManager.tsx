import React from 'react';
import { useWindowStore } from '../store/windowStore';
import { CustomWindow } from './CustomWindow';
import { NetworkWindowContent } from './windows/NetworkWindowContent';
import { AccountsWindowContent } from './windows/AccountsWindowContent';
import { CheatcodesWindowContent } from './windows/CheatcodesWindowContent';
import { ApiTesterWindowContent } from './windows/ApiTesterWindowContent';
import { AccountManagerWindowContent } from './windows/AccountManagerWindowContent';
import { PdaCalculatorWindowContent } from './windows/PdaCalculatorWindowContent';

const windowComponents: Record<string, React.FC<{ windowId: string }>> = {
  network: NetworkWindowContent,
  accounts: AccountsWindowContent,
  cheatcodes: CheatcodesWindowContent,
  apiTester: ApiTesterWindowContent,
  accountManager: AccountManagerWindowContent,
  pdaCalculator: PdaCalculatorWindowContent,
};

const windowIcons: Record<string, string> = {
  network: '🌐',
  accounts: '📦',
  cheatcodes: '🔧',
  apiTester: '🔍',
  accountManager: '📋',
  pdaCalculator: '🧮',
};

export const WindowManager: React.FC = () => {
  const { windows } = useWindowStore();

  console.log('WindowManager rendering, windows:', windows);

  return (
    <>
      {windows.map((win) => {
        console.log('Rendering window:', win);
        if (win.isMinimized) {
          console.log('Window is minimized, skipping:', win.id);
          return null;
        }
        
        const WindowComponent = windowComponents[win.component];
        if (!WindowComponent) {
          console.error('No component found for:', win.component);
          return null;
        }

        console.log('Rendering CustomWindow for:', win.title);
        return (
          <CustomWindow
            key={win.id}
            windowId={win.id}
            title={win.title}
            icon={windowIcons[win.component]}
            width={win.width}
            height={win.height}
            x={win.x}
            y={win.y}
            zIndex={win.zIndex}
            isMaximized={win.isMaximized}
          >
            <WindowComponent windowId={win.id} />
          </CustomWindow>
        );
      })}
    </>
  );
};
