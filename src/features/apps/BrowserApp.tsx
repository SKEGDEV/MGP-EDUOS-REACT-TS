import { useState } from 'react';
import { Plus, X, RefreshCw, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import clsx from 'clsx';

interface Tab {
  id: string;
  url: string;
  title: string;
}

const BrowserApp = ({ url: initialUrl = 'https://www.google.com/webhp?igu=1' }: { url?: string }) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'tab-1', url: initialUrl, title: 'Google' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [addressBar, setAddressBar] = useState(initialUrl);



  const addTab = () => {
    const newId = `tab-${Date.now()}`;
    const defaultUrl = 'https://www.google.com/webhp?igu=1';
    setTabs([...tabs, { id: newId, url: defaultUrl, title: 'New Tab' }]);
    setActiveTabId(newId);
    setAddressBar(defaultUrl);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Prevent closing last tab
    const newTabs = tabs.filter(t => t.id !== id);
    if (activeTabId === id) {
      const idx = tabs.findIndex(t => t.id === id);
      const nextTab = newTabs[Math.min(idx, newTabs.length - 1)];
      setActiveTabId(nextTab.id);
      setAddressBar(nextTab.url);
    }
    setTabs(newTabs);
  };

  const switchTab = (tab: Tab) => {
    setActiveTabId(tab.id);
    setAddressBar(tab.url);
  };

  const navigateTo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTabId) return;
    
    let finalUrl = addressBar;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }

    setTabs(tabs.map(t => t.id === activeTabId ? { ...t, url: finalUrl, title: new URL(finalUrl).hostname } : t));
    setAddressBar(finalUrl);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Tabs Header */}
      <div className="flex items-end px-2 pt-2 gap-1 bg-gray-200 dark:bg-gray-800 h-10">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => switchTab(tab)}
            className={clsx(
              'group flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] rounded-t-lg cursor-pointer transition-colors',
              activeTabId === tab.id ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100' : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'
            )}
          >
            <div className="flex-1 truncate text-sm select-none">{tab.title}</div>
            <button 
              onClick={(e) => closeTab(e, tab.id)}
              className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <button onClick={addTab} className="p-1 mb-1 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition-colors">
          <Plus size={16} />
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 border-b dark:border-gray-600">
        <button className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"><ChevronLeft size={18} /></button>
        <button className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"><ChevronRight size={18} /></button>
        <button className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"><RefreshCw size={16} /></button>
        <button onClick={addTab} className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"><Home size={16} /></button>
        
        <form onSubmit={navigateTo} className="flex-1 ml-2">
          <input 
            type="text" 
            value={addressBar}
            onChange={(e) => setAddressBar(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white px-4 py-1.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500"
          />
        </form>
      </div>

      {/* Web Content Container */}
      <div className="flex-1 relative w-full h-full bg-white dark:bg-black">
        {tabs.map((tab) => (
          <iframe 
            key={tab.id}
            src={tab.url} 
            className={clsx(
              "absolute inset-0 w-full h-full border-none",
              activeTabId === tab.id ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
            )} 
            title={tab.title}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowserApp;
