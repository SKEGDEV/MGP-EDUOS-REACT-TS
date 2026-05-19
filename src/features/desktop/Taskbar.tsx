import { useAppDispatch, useAppSelector, focusWindow, toggleMinimize } from '@core';
import appsConfig from '@assets/config/apps.json';
import clsx from 'clsx';
import { Globe, Gamepad2, User, Settings, Power, Square, LayoutGrid } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

// Helper to map icon string to Lucide icon component
const getIcon = (name: string) => {
  switch (name) {
    case 'globe': return <Globe size={24} />;
    case 'gamepad-2': return <Gamepad2 size={24} />;
    case 'user': return <User size={24} />;
    case 'settings': return <Settings size={24} />;
    default: return <Square size={24} />;
  }
};

interface TaskbarProps {
  onToggleStartMenu: () => void;
  isStartMenuOpen: boolean;
}

const Taskbar = ({ onToggleStartMenu, isStartMenuOpen }: TaskbarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const windows = useAppSelector((state) => state.os.windows);
  const activeWindowId = useAppSelector((state) => state.os.activeWindowId);
  const theme = useAppSelector((state) => state.os.theme);

  const handleWindowClick = (winId: string) => {
    const existingWindow = windows.find((w) => w.id === winId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        dispatch(toggleMinimize(existingWindow.id));
        dispatch(focusWindow(existingWindow.id));
      } else if (activeWindowId === existingWindow.id) {
        dispatch(toggleMinimize(existingWindow.id));
      } else {
        dispatch(focusWindow(existingWindow.id));
      }
    }
  };

  const handleLogout = () => {
    navigate({ to: '/' });
  };

  const themeClasses = theme === 'jedi'
    ? 'bg-black/60 border-t border-green-500/50 shadow-[0_-5px_15px_rgba(74,222,128,0.2)]'
    : theme === 'sith'
      ? 'bg-black/80 border-t border-red-500/50 shadow-[0_-5px_15px_rgba(248,113,113,0.2)]'
      : 'bg-gray-900/80 border-t border-gray-600';

  return (
    <div className={clsx('absolute bottom-0 left-0 w-full h-12 backdrop-blur-lg flex items-center justify-between px-4 z-[9999]', themeClasses)}>
      <div className="flex items-center gap-2">
        {/* Start Button */}
        <button
          onClick={onToggleStartMenu}
          className={clsx(
            'p-2 rounded-lg transition-all duration-200 group mr-2',
            isStartMenuOpen ? 'bg-white/20' : 'hover:bg-white/10',
            theme === 'jedi' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' : theme === 'sith' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' : 'text-blue-400'
          )}
          title="Start Menu"
        >
          <LayoutGrid size={24} className="group-hover:scale-110 transition-transform" />
        </button>

        <div className="w-px h-6 bg-white/20 mx-1"></div>

        {/* Open Windows */}
        {windows.map((win) => {
          const appConfig = appsConfig.find((a) => a.id === win.appId);
          if (!appConfig) return null;
          
          const isActive = win.id === activeWindowId && !win.isMinimized;

          return (
            <button
              key={win.id}
              onClick={() => handleWindowClick(win.id)}
              className={clsx(
                'p-2 rounded-lg transition-all duration-200 group relative',
                isActive ? 'bg-white/20' : 'hover:bg-white/10',
                theme === 'jedi' && isActive ? 'text-green-400' : theme === 'sith' && isActive ? 'text-red-400' : 'text-gray-300'
              )}
              title={appConfig.name}
            >
              {getIcon(appConfig.icon)}
              {!win.isMinimized && (
                <div className={clsx(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                  theme === 'jedi' ? 'bg-green-400' : theme === 'sith' ? 'bg-red-500' : 'bg-white'
                )} />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-white text-sm font-mono tracking-wider">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
          <Power size={20} />
        </button>
      </div>
    </div>
  );
};

export default Taskbar;
