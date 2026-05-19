import { useState } from 'react';
import { useAppSelector } from '@core';
import jediWallpaper from '@assets/images/jedi_wallpaper.png';
import sithWallpaper from '@assets/images/sith_wallpaper.png';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import WindowManager from '../windows/WindowManager';

const Desktop = () => {
  const theme = useAppSelector((state) => state.os.theme);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const bgImage = theme === 'jedi' ? jediWallpaper : sithWallpaper;

  return (
    <div 
      className="h-screen w-full overflow-hidden bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
      onClick={() => setIsStartMenuOpen(false)}
    >
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      
      {/* OS Windows */}
      <div onClick={(e) => e.stopPropagation()}>
        <WindowManager />
      </div>

      {/* Start Menu */}
      <div onClick={(e) => e.stopPropagation()}>
        <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      </div>

      {/* OS Taskbar */}
      <div onClick={(e) => e.stopPropagation()}>
        <Taskbar onToggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)} isStartMenuOpen={isStartMenuOpen} />
      </div>
    </div>
  );
};

export default Desktop;
