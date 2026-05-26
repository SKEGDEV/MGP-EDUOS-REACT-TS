import React from 'react';
import { Rnd } from 'react-rnd';
import { Minus, Square, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@core';
import { closeWindow, focusWindow, toggleMinimize, toggleMaximize, updateWindowPosition, updateWindowSize } from '@core';


interface WindowProps {
  id: string;
  appId: string;
  title: string;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ id, title, children }) => {
  const dispatch = useAppDispatch();
  const windowState = useAppSelector((state) => state.os.windows.find((w) => w.id === id));
  const activeWindowId = useAppSelector((state) => state.os.activeWindowId);
  const theme = useAppSelector((state) => state.os.theme);

  if (!windowState) return null;

  const isActive = activeWindowId === id;
  const isMaximized = windowState.isMaximized;
  const [isDragging, setIsDragging] = React.useState(false);

  const [maxDimensions, setMaxDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight - 48
  });

  React.useEffect(() => {
    const handleResize = () => {
      setMaxDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 48
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeColor = theme === 'jedi' ? '#16a34a' : '#dc2626'; // green-600 or red-600
  const themeBgColor = theme === 'jedi' ? '#0f172a' : '#1e1b4b'; // dark blue or dark purple


  return (
    <Rnd
      size={isMaximized ? { width: maxDimensions.width, height: maxDimensions.height } : windowState.size}
      position={isMaximized ? { x: 0, y: 0 } : windowState.position}
      onDragStart={() => setIsDragging(true)}
      onResizeStart={() => setIsDragging(true)}
      onDragStop={(_e, d) => {
        setIsDragging(false);
        if (!isMaximized) dispatch(updateWindowPosition({ id, position: { x: d.x, y: d.y } }));
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setIsDragging(false);
        if (!isMaximized) {
          dispatch(updateWindowSize({ id, size: { width: ref.style.width, height: ref.style.height } }));
          dispatch(updateWindowPosition({ id, position }));
        }
      }}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      minWidth={300}
      minHeight={200}
      bounds="window"
      dragHandleClassName="window-titlebar"
      onMouseDown={() => dispatch(focusWindow(id))}
      style={{ 
        zIndex: windowState.zIndex,
        backgroundColor: themeBgColor,
        border: `2px solid ${themeColor}`,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        display: windowState.isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        boxShadow: isActive ? `0 0 20px ${themeColor}` : 'none'
      }}
    >
      {/* Titlebar */}
      <div 
        className="window-titlebar cursor-move select-none"
        style={{
          backgroundColor: themeColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          borderBottom: '1px solid #000'
        }}
        onDoubleClick={(e) => { e.stopPropagation(); dispatch(toggleMaximize(id)); }}
      >
        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.875rem' }}>{title}</span>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); dispatch(toggleMinimize(id)); }} className="p-1 rounded text-white bg-black/30 hover:bg-black/50 transition-colors">
            <Minus size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); dispatch(toggleMaximize(id)); }} className="p-1 rounded text-white bg-black/30 hover:bg-black/50 transition-colors">
            <Square size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); dispatch(closeWindow(id)); }} className="p-1 rounded text-white bg-red-600 hover:bg-red-500 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
        {/* Render an overlay to prevent iframe stealing focus while dragging */}
        {isDragging && <div className="absolute inset-0 z-50 bg-transparent" />}
        <div style={{ width: '100%', height: '100%', pointerEvents: isDragging ? 'none' : 'auto' }}>
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
