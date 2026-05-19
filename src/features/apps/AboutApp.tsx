import React from 'react';

const AboutApp: React.FC<{ url?: string }> = ({ url }) => {
  return (
    <div className="w-full h-full bg-white">
      <iframe src={url} className="w-full h-full border-none" title="About Me" />
    </div>
  );
};

export default AboutApp;
