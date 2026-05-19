import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WindowState {
  id: string;
  appId: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: string | number; height: string | number };
}

interface OSState {
  theme: 'jedi' | 'sith' | 'unselected';
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;
  isAuthenticated: boolean;
}

const initialState: OSState = {
  theme: 'unselected',
  windows: [],
  activeWindowId: null,
  highestZIndex: 10,
  isAuthenticated: false,
};

export const osSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'jedi' | 'sith' | 'unselected'>) => {
      state.theme = action.payload;
      if (action.payload === 'jedi') {
        document.documentElement.classList.remove('dark');
      } else if (action.payload === 'sith') {
        document.documentElement.classList.add('dark');
      }
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    openWindow: (state, action: PayloadAction<Omit<WindowState, 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>>) => {
      const existingWindow = state.windows.find((w) => w.appId === action.payload.appId);
      state.highestZIndex += 1;
      if (existingWindow) {
        existingWindow.isOpen = true;
        existingWindow.isMinimized = false;
        existingWindow.zIndex = state.highestZIndex;
        state.activeWindowId = existingWindow.id;
      } else {
        state.windows.push({
          ...action.payload,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: state.highestZIndex,
        });
        state.activeWindowId = action.payload.id;
      }
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      state.windows = state.windows.filter((w) => w.id !== action.payload);
      if (state.activeWindowId === action.payload) {
        state.activeWindowId = null;
      }
    },
    focusWindow: (state, action: PayloadAction<string>) => {
      const win = state.windows.find((w) => w.id === action.payload);
      if (win && win.zIndex < state.highestZIndex) {
        state.highestZIndex += 1;
        win.zIndex = state.highestZIndex;
        state.activeWindowId = win.id;
      }
    },
    toggleMinimize: (state, action: PayloadAction<string>) => {
      const win = state.windows.find((w) => w.id === action.payload);
      if (win) {
        win.isMinimized = !win.isMinimized;
      }
    },
    toggleMaximize: (state, action: PayloadAction<string>) => {
      const win = state.windows.find((w) => w.id === action.payload);
      if (win) {
        win.isMaximized = !win.isMaximized;
      }
    },
    updateWindowPosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const win = state.windows.find((w) => w.id === action.payload.id);
      if (win) {
        win.position = action.payload.position;
      }
    },
    updateWindowSize: (state, action: PayloadAction<{ id: string; size: { width: string | number; height: string | number } }>) => {
      const win = state.windows.find((w) => w.id === action.payload.id);
      if (win) {
        win.size = action.payload.size;
      }
    },
  },
});

export const {
  setTheme,
  setAuthenticated,
  openWindow,
  closeWindow,
  focusWindow,
  toggleMinimize,
  toggleMaximize,
  updateWindowPosition,
  updateWindowSize,
} = osSlice.actions;

export default osSlice.reducer;
