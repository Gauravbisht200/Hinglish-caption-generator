/**
 * FILE: src/components/video/VideoPreview.tsx
 * Placeholder for the video preview component
 */

import React from 'react';

export default function VideoPreview() {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
      {/* Mock Video Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      
      <div className="text-center space-y-4 z-10">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
        </div>
        <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Video Preview (Part 4)</p>
      </div>

      {/* Mock Caption Overlay */}
      <div className="absolute bottom-[15%] w-full text-center px-8">
        <span className="bg-black/45 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xl font-bold font-caption border border-white/10">
          Namaste <span className="text-[var(--active-word)]">dosto</span>, aaj hum...
        </span>
      </div>
    </div>
  );
}
