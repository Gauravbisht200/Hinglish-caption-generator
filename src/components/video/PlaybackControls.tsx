/**
 * FILE: src/components/video/PlaybackControls.tsx
 * Controls for video playback and seeking
 */

'use client';

import React, { useEffect } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { mockProject } from '@/lib/mockData';

export default function PlaybackControls() {
  const { currentTime, setCurrentTime, isPlaying, setIsPlaying } = useEditorStore();

  // Keyboard shortcut: Space for play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, setIsPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  return (
    <div className="w-full max-w-4xl mt-4 bg-white border border-[var(--border)] rounded-xl p-3 shadow-sm flex items-center space-x-4">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-2 bg-[var(--accent-blue)] text-white rounded-full hover:bg-blue-700 transition-all shadow-sm"
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
      </button>

      <div className="flex-1 flex items-center space-x-3">
        <span className="text-xs font-mono font-bold text-[var(--primary-text)] w-12">
          {formatTime(currentTime).split('.')[0]}
        </span>
        
        <div className="flex-1 relative group h-6 flex items-center">
          <input
            type="range"
            min={0}
            max={mockProject.duration}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-[var(--secondary-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-blue)]"
          />
        </div>

        <span className="text-xs font-mono text-[var(--secondary-text)] w-12">
          {formatTime(mockProject.duration).split('.')[0]}
        </span>
      </div>

      <div className="flex items-center space-x-2 border-l border-[var(--border)] pl-4">
        <button className="p-1.5 text-[var(--secondary-text)] hover:bg-[var(--secondary-surface)] rounded-md transition-colors">
          <Volume2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-[var(--secondary-text)] hover:bg-[var(--secondary-surface)] rounded-md transition-colors">
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
