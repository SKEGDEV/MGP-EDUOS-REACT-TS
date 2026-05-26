import React, { useState } from 'react';
import { useAppDispatch, useAppSelector, openWindow, focusWindow, toggleMinimize, toggleMaximize } from '@core';
import appsConfig from '@assets/config/apps.json';
import { Globe, Gamepad2, User, Settings, Search, Square } from 'lucide-react';
import clsx from 'clsx';

// Helper to map icon string to Lucide icon component
const getIcon = (name: string, size: number = 32) => {
  switch (name) {
    case 'globe': return <Globe size={size} />;
    case 'gamepad-2': return <Gamepad2 size={size} />;
    case 'user': return <User size={size} />;
    case 'settings': return <Settings size={size} />;
    default: return <Square size={size} />;
  }
};

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.os.theme);
  const windows = useAppSelector((state) => state.os.windows);

  if (!isOpen) return null;

  const handleAppClick = (app: any) => {
    const existingWindow = windows.find((w) => w.appId === app.id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        dispatch(toggleMinimize(existingWindow.id));
      }
      dispatch(focusWindow(existingWindow.id));
    } else {
      // Default restored size: 80% of screen, max 1024x768
      const width = Math.min(1024, window.innerWidth * 0.8);
      const height = Math.min(768, window.innerHeight * 0.8);

      const newWinId = `win-${app.id}-${Date.now()}`;
      dispatch(openWindow({
        id: newWinId,
        appId: app.id,
        position: { x: window.innerWidth / 2 - width / 2, y: window.innerHeight / 2 - height / 2 },
        size: { width: `${width}px`, height: `${height}px` }
      }));

      if (app.windowSizeDefault === '100%') {
        dispatch(toggleMaximize(newWinId));
      }
    }
    onClose();
  };

  const filteredApps = appsConfig.filter((app) => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const themeClasses = theme === 'jedi'
    ? 'bg-black/70 border-green-500/50 shadow-[0_0_25px_rgba(74,222,128,0.3)]'
    : theme === 'sith'
      ? 'bg-black/90 border-red-500/50 shadow-[0_0_25px_rgba(248,113,113,0.3)]'
      : 'bg-gray-900/90 border-gray-600 shadow-xl';

  return (
    <div 
      className={clsx(
        'absolute bottom-14 left-4 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-5rem)] rounded-xl backdrop-blur-xl border flex flex-col overflow-hidden z-[9998] transition-all duration-300 animate-in slide-in-from-bottom-5',
        themeClasses
      )}
    >
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white outline-none focus:bg-white/20 transition-all"
            autoFocus
          />
        </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-white/50 text-sm font-semibold mb-4 uppercase tracking-wider px-2">All Applications</h3>
        <div className="grid grid-cols-3 gap-2">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-white/10 transition-all group"
            >
              <div className={clsx(
                'mb-3 transition-transform group-hover:scale-110',
                theme === 'jedi' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 
                theme === 'sith' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' : 'text-blue-400'
              )}>
                {getIcon(app.icon, 36)}
              </div>
              <span className="text-white text-xs font-medium text-center line-clamp-2">
                {app.name}
              </span>
            </button>
          ))}
          {filteredApps.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-400">
              No applications found
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
          {theme === 'jedi' ? 'JK' : theme === 'sith' ? 'SL' : 'U'}
        </div>
        <div className="flex-1 text-white text-sm font-medium">
          {theme === 'jedi' ? 'Jedi Knight' : theme === 'sith' ? 'Sith Lord' : 'User'}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
