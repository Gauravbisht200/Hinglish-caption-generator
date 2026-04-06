/**
 * FILE: src/components/timeline/Timeline.tsx
 * Placeholder for the timeline component
 */

import React from 'react';
import { Play, SkipBack, SkipForward, ZoomIn, ZoomOut } from 'lucide-react';

export default function Timeline() {
  return (
    <div className="h-full bg-white border-t border-[var(--border)] flex flex-col">
      {/* Timeline Toolbar */}
      <div className="h-12 border-b border-[var(--border)] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="p-1.5 hover:bg-[var(--secondary-surface)] rounded-md text-[var(--secondary-text)]">
              <SkipBack className="w-4 h-4" />
            </button>
            <button className="p-2 bg-[var(--accent-blue)] text-white rounded-full shadow-sm hover:bg-blue-700">
              <Play className="w-4 h-4 fill-current" />
            </button>
            <button className="p-1.5 hover:bg-[var(--secondary-surface)] rounded-md text-[var(--secondary-text)]">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm font-mono font-bold text-[var(--primary-text)]">00:00:12.45</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[var(--secondary-surface)] p-1 rounded-lg">
            <button className="p-1 hover:bg-white rounded shadow-sm transition-all">
              <ZoomOut className="w-4 h-4 text-[var(--secondary-text)]" />
            </button>
            <div className="w-24 h-1 bg-[var(--border)] rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[var(--accent-blue)]" />
            </div>
            <button className="p-1 hover:bg-white rounded shadow-sm transition-all">
              <ZoomIn className="w-4 h-4 text-[var(--secondary-text)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Tracks Area */}
      <div className="flex-1 bg-[var(--app-background)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[var(--secondary-text)] font-medium text-sm opacity-50">Timeline Tracks (Part 5)</p>
        </div>
        
        {/* Mock Playhead */}
        <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-[var(--accent-blue)] z-10">
          <div className="absolute top-0 -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--accent-blue)]" />
        </div>
      </div>
    </div>
  );
}
