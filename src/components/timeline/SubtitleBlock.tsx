/**
 * FILE: src/components/timeline/SubtitleBlock.tsx
 * Individual subtitle block on the timeline
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { cn } from '@/lib/utils';
import { SubtitleSegment } from '@/lib/types';

interface SubtitleBlockProps {
  subtitle: SubtitleSegment;
  pixelsPerSecond: number;
}

export default function SubtitleBlock({ subtitle, pixelsPerSecond }: SubtitleBlockProps) {
  const { selectedSubtitleId, selectSubtitle, setCurrentTime, updateSubtitleTiming } = useEditorStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'left' | 'right' | null>(null);
  const startXRef = useRef(0);
  const startTimesRef = useRef({ start: 0, end: 0 });

  const left = subtitle.startTime * pixelsPerSecond;
  const width = (subtitle.endTime - subtitle.startTime) * pixelsPerSecond;
  const isSelected = selectedSubtitleId === subtitle.id;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startTimesRef.current = { start: subtitle.startTime, end: subtitle.endTime };
    selectSubtitle(subtitle.id);
  };

  const handleLeftResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing('left');
    startXRef.current = e.clientX;
    startTimesRef.current = { start: subtitle.startTime, end: subtitle.endTime };
    selectSubtitle(subtitle.id);
  };

  const handleRightResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing('right');
    startXRef.current = e.clientX;
    startTimesRef.current = { start: subtitle.startTime, end: subtitle.endTime };
    selectSubtitle(subtitle.id);
  };

  useEffect(() => {
    if (!isDragging && !isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startXRef.current;
      const deltaTime = deltaX / pixelsPerSecond;

      if (isDragging) {
        const newStart = Math.max(0, startTimesRef.current.start + deltaTime);
        const duration = startTimesRef.current.end - startTimesRef.current.start;
        updateSubtitleTiming(subtitle.id, newStart, newStart + duration);
        setCurrentTime(newStart);
      } else if (isResizing === 'left') {
        const newStart = Math.max(0, Math.min(startTimesRef.current.start + deltaTime, startTimesRef.current.end - 0.1));
        updateSubtitleTiming(subtitle.id, newStart, startTimesRef.current.end);
        setCurrentTime(newStart);
      } else if (isResizing === 'right') {
        const newEnd = Math.max(startTimesRef.current.start + 0.1, startTimesRef.current.end + deltaTime);
        updateSubtitleTiming(subtitle.id, startTimesRef.current.start, newEnd);
        setCurrentTime(newEnd);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, pixelsPerSecond, subtitle.id, updateSubtitleTiming, setCurrentTime]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectSubtitle(subtitle.id);
    setCurrentTime(subtitle.startTime);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{ 
        left: `${left}px`, 
        width: `${width}px` 
      }}
      className={cn(
        "absolute h-12 top-2 rounded-md border-2 transition-all cursor-pointer overflow-hidden px-2 flex items-center group",
        isSelected 
          ? "bg-[var(--accent-blue)] border-blue-400 text-white z-10 shadow-lg" 
          : "bg-white border-[var(--border)] text-[var(--primary-text)] hover:border-[var(--accent-blue)]/50",
        (isDragging || isResizing) && "opacity-80 scale-[1.02] z-20"
      )}
    >
      <p className="text-[10px] font-medium truncate select-none">
        {subtitle.text}
      </p>
      
      {isSelected && (
        <>
          <div 
            className="absolute left-0 top-0 w-2 h-full bg-white/30 cursor-ew-resize hover:bg-white/50 z-20"
            onMouseDown={handleLeftResizeStart}
          />
          <div 
            className="absolute right-0 top-0 w-2 h-full bg-white/30 cursor-ew-resize hover:bg-white/50 z-20"
            onMouseDown={handleRightResizeStart}
          />
        </>
      )}
    </div>
  );
}
