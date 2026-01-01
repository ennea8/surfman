import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  component: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  icon?: string;
  // Store original position/size for restore
  originalX?: number;
  originalY?: number;
  originalWidth?: number;
  originalHeight?: number;
}

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  addWindow: (window: Omit<WindowState, 'id' | 'zIndex' | 'originalX' | 'originalY' | 'originalWidth' | 'originalHeight'>) => void;
  removeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  nextZIndex: 1,
  
  addWindow: (windowData) =>
    set((state) => ({
      windows: [
        ...state.windows,
        {
          ...windowData,
          id: `window-${Date.now()}-${Math.random()}`,
          zIndex: state.nextZIndex,
          originalX: windowData.x,
          originalY: windowData.y,
          originalWidth: windowData.width,
          originalHeight: windowData.height,
        },
      ],
      nextZIndex: state.nextZIndex + 1,
    })),
  
  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),
  
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    })),
  
  maximizeWindow: (id) =>
    set((state) => {
      const window = state.windows.find(w => w.id === id);
      if (!window) return state;
      
      return {
        windows: state.windows.map((w) =>
          w.id === id 
            ? { 
                ...w, 
                isMaximized: !w.isMaximized,
                // Save original position if maximizing
                originalX: !w.isMaximized ? w.x : w.originalX,
                originalY: !w.isMaximized ? w.y : w.originalY,
                originalWidth: !w.isMaximized ? w.width : w.originalWidth,
                originalHeight: !w.isMaximized ? w.height : w.originalHeight,
                zIndex: state.nextZIndex
              } 
            : w
        ),
        nextZIndex: state.nextZIndex + 1,
      };
    }),
  
  restoreWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id 
          ? { 
              ...w, 
              isMinimized: false,
              zIndex: state.nextZIndex
            } 
          : w
      ),
      nextZIndex: state.nextZIndex + 1,
    })),
  
  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex } : w
      ),
      nextZIndex: state.nextZIndex + 1,
    })),
  
  updateWindowPosition: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    })),
  
  updateWindowSize: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    })),
}));
