import React from 'react';

const TetrisApp: React.FC<{ url?: string }> = ({ url }) => {
  return (
    <div className="w-full h-full bg-black">
      <iframe src={url} className="w-full h-full border-none" title="Tetris Game" />
    </div>
  );
};

export default TetrisApp;
