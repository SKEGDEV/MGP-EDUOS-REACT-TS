import { useAppDispatch, useAppSelector, setTheme } from '@core';

const SettingsApp = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.os.theme);

  return (
    <div className="w-full h-full p-6 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">OS Settings</h2>
      
      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Theme Selection</h3>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(setTheme('jedi'))}
              className={`px-4 py-2 rounded-md font-bold transition-all ${
                currentTheme === 'jedi' 
                  ? 'bg-green-600 text-white shadow-[0_0_10px_rgba(74,222,128,0.5)]' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-500/20 hover:text-green-500'
              }`}
            >
              Jedi (Light Side)
            </button>
            <button
              onClick={() => dispatch(setTheme('sith'))}
              className={`px-4 py-2 rounded-md font-bold transition-all ${
                currentTheme === 'sith' 
                  ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(248,113,113,0.5)]' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500/20 hover:text-red-500'
              }`}
            >
              Sith (Dark Side)
            </button>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2">System Info</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Edu OS Version 1.0.0
            <br />
            Powered by React, Redux, and TanStack.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
