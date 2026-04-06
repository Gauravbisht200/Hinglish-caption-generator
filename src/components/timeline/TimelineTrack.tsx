/**
 * FILE: src/components/timeline/TimelineTrack.tsx
 * Container for subtitle blocks in the timeline
 */

'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import SubtitleBlock from './SubtitleBlock';

interface TimelineTrackProps {
  pixelsPerSecond: number;
}

export default function TimelineTrack({ pixelsPerSecond }: TimelineTrackProps) {
  const { subtitles } = useEditorStore();

  return (
    <div className="h-24 bg-[var(--secondary-surface)] relative border-b border-[var(--border)]">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-white/50 border-r border-[var(--border)] z-10 flex items-center justify-center">
        <span className="text-[10px] font-bold text-[var(--secondary-text)] uppercase tracking-wider">Captions</span>
      </div>
      
      <div className="ml-24 h-full relative">
        {subtitles.map((subtitle) => (
          <SubtitleBlock 
            key={subtitle.id} 
            subtitle={subtitle} 
            pixelsPerSecond={pixelsPerSecond} 
          />
        ))}
      </div>
    </div>
  );
}
