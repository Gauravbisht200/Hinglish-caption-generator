/**
 * FILE: src/components/timeline/Timeline.tsx
 * Functional timeline with subtitle tracks and seeking
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { formatTime, cn } from '@/lib/utils';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  ZoomIn, 
  ZoomOut,
  Clock
} from 'lucide-react';
import TimelineTrack from './TimelineTrack';
import { mockProject } from '@/lib/mockData';

export default function Timeline() {
  const { 
    currentTime, 
    setCurrentTime, 
    isPlaying, 
    setIsPlaying,
    zoom,
    setZoom,
  } = useEditorStore();

  const timelineRef = useRef<HTMLDivElement>(null);
  const pixelsPerSecond = 100 * zoom;
  const totalWidth = mockProject.duration * pixelsPerSecond;

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
    // Offset for the track label width (96px/24rem)
    const adjustedX = x - 96; 
    if (adjustedX < 0) return;
    
    const newTime = adjustedX / pixelsPerSecond;
    setCurrentTime(Math.min(Math.max(0, newTime), mockProject.duration));
  };

  // Auto-scroll timeline to keep playhead in view
  useEffect(() => {
    if (!timelineRef.current || isPlaying === false) return;
    const playheadPos = (currentTime * pixelsPerSecond) + 96;
    const scrollLeft = timelineRef.current.scrollLeft;
    const width = timelineRef.current.clientWidth;

    if (playheadPos > scrollLeft + width * 0.8 || playheadPos < scrollLeft) {
      timelineRef.current.scrollTo({
        left: playheadPos - width * 0.2,
        behavior: 'smooth'
      });
    }
  }, [currentTime, pixelsPerSecond, isPlaying]);

  return (
    <div className="h-full bg-white border-t border-[var(--border)] flex flex-col select-none">
      {/* Timeline Toolbar */}
      <div className="h-12 border-b border-[var(--border)] flex items-center justify-between px-4 shrink-0 bg-white z-20">
        <div className="flex items-center space-x-6">
          <h3 className="text-sm font-bold text-[var(--primary-text)]">Timeline</h3>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
              className="p-1.5 hover:bg-[var(--secondary-surface)] rounded-md text-[var(--secondary-text)] transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                "p-2 rounded-full shadow-sm transition-all transform active:scale-95",
                isPlaying ? "bg-[var(--warning)] text-white" : "bg-[var(--accent-blue)] text-white"
              )}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button 
              onClick={() => setCurrentTime(Math.min(mockProject.duration, currentTime + 5))}
              className="p-1.5 hover:bg-[var(--secondary-surface)] rounded-md text-[var(--secondary-text)] transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-[var(--primary-text)]">
            <Clock className="w-4 h-4 text-[var(--secondary-text)]" />
            <span className="text-sm font-mono font-bold w-24">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[var(--secondary-surface)] p-1 rounded-lg">
            <button 
              onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
              className="p-1 hover:bg-white rounded shadow-sm transition-all"
            >
              <ZoomOut className="w-4 h-4 text-[var(--secondary-text)]" />
            </button>
            <span className="text-[10px] font-bold text-[var(--secondary-text)] w-8 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(Math.min(3, zoom + 0.2))}
              className="p-1 hover:bg-white rounded shadow-sm transition-all"
            >
              <ZoomIn className="w-4 h-4 text-[var(--secondary-text)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Tracks Area */}
      <div 
        ref={timelineRef}
        className="flex-1 bg-[var(--app-background)] relative overflow-x-auto overflow-y-hidden custom-scrollbar"
        onClick={handleTimelineClick}
      >
        <div 
          className="h-full relative" 
          style={{ width: `${totalWidth + 96}px` }}
        >
          {/* Time Rulers */}
          <div className="h-6 border-b border-[var(--border)] bg-white/50 flex items-end ml-24">
            {Array.from({ length: Math.ceil(mockProject.duration) }).map((_, i) => (
              <div 
                key={i} 
                className="absolute border-l border-[var(--border)] h-2"
                style={{ left: `${i * pixelsPerSecond}px` }}
              >
                {i % 5 === 0 && (
                  <span className="absolute -top-5 left-1 text-[9px] font-mono text-[var(--secondary-text)]">
                    {formatTime(i)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Thumbnail Track (Placeholder) */}
          <div className="h-12 bg-gray-200/50 border-b border-[var(--border)] ml-24 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 font-medium">Video Thumbnails</span>
          </div>

          {/* Subtitle Track */}
          <TimelineTrack pixelsPerSecond={pixelsPerSecond} />

          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-[var(--accent-blue)] z-30 pointer-events-none transition-transform duration-75 ease-linear"
            style={{ transform: `translateX(${(currentTime * pixelsPerSecond) + 96}px)` }}
          >
            <div className="absolute top-0 -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--accent-blue)]" />
            <div className="absolute top-0 -left-[1px] w-[4px] h-full bg-[var(--accent-blue)]/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
