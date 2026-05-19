import { useAppSelector } from '@core';
import Window from './Window';
import appsConfig from '@assets/config/apps.json';

// We could dynamically import these, but for simplicity we import them here
import BrowserApp from '../apps/BrowserApp';
import TetrisApp from '../apps/TetrisApp';
import AboutApp from '../apps/AboutApp';
import SettingsApp from '../apps/SettingsApp';

const getAppContent = (appId: string, url?: string) => {
  switch (appId) {
    case 'browser': return <BrowserApp url={url} />;
    case 'tetris': return <TetrisApp url={url} />;
    case 'about': return <AboutApp url={url} />;
    case 'settings': return <SettingsApp />;
    default: return <div className="p-4 text-white">App not found</div>;
  }
};

const WindowManager = () => {
  const windows = useAppSelector((state) => state.os.windows);

  return (
    <>
      {windows.map((win) => {
        const appConfig = appsConfig.find((a) => a.id === win.appId);
        if (!appConfig) return null;

        return (
          <Window key={win.id} id={win.id} appId={win.appId} title={appConfig.name}>
            {getAppContent(win.appId, appConfig.url)}
          </Window>
        );
      })}
    </>
  );
};

export default WindowManager;
