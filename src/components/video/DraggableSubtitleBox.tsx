/**
 * FILE: src/components/video/DraggableSubtitleBox.tsx
 * Draggable caption overlay that syncs with video position and styling
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useEditorStore } from '@/store/editorStore';
import { cn } from '@/lib/utils';

export default function DraggableSubtitleBox() {
  const { 
    subtitles, 
    currentTime, 
    globalStyle, 
    globalPosition, 
    updateGlobalPosition 
  } = useEditorStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find the subtitle segment that should be visible at the current time
  const activeSubtitle = subtitles.find(
    s => currentTime >= s.startTime && currentTime <= s.endTime
  );

  if (!activeSubtitle) return null;

  // Calculate position styles
  const positionStyle: React.CSSProperties = {
    left: `${globalPosition.x}%`,
    top: `${globalPosition.y}%`,
    transform: 'translate(-50%, -50%)',
  };

  const handleDragEnd = (_: any, info: any) => {
    const videoElement = document.getElementById('video-container');
    if (!videoElement) return;

    const rect = videoElement.getBoundingClientRect();
    
    // Calculate new percentages based on drag offset
    // This is a simplified calculation for the demo
    const newX = Math.min(Math.max(0, globalPosition.x + (info.offset.x / rect.width) * 100), 100);
    const newY = Math.min(Math.max(0, globalPosition.y + (info.offset.y / rect.height) * 100), 100);

    updateGlobalPosition({
      x: Math.round(newX),
      y: Math.round(newY)
    });
  };

  // Find which word is currently being spoken
  const getCurrentWordIndex = (words: any[], time: number): number => {
    return words.findIndex(word => time >= word.start && time <= word.end);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={positionStyle}
      className="absolute z-30 cursor-move group"
      initial={false}
    >
      {/* Drag Handles (Visible on Hover) */}
      <div className="absolute -inset-2 border-2 border-[var(--accent-blue)] border-dashed rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div
        style={{
          fontFamily: globalStyle.fontFamily,
          fontSize: `${globalStyle.fontSize}px`,
          fontWeight: globalStyle.fontWeight,
          color: globalStyle.textColor,
          backgroundColor: `${globalStyle.backgroundColor}${Math.round(globalStyle.backgroundOpacity * 255).toString(16).padStart(2, '0')}`,
          padding: `${globalStyle.padding}px`,
          borderRadius: `${globalStyle.borderRadius}px`,
          textAlign: globalStyle.textAlign,
          lineHeight: globalStyle.lineHeight,
          maxWidth: `${globalStyle.maxWidth}vw`,
        }}
        className="shadow-lg backdrop-blur-[2px] whitespace-pre-wrap transition-all duration-200"
      >
        {activeSubtitle.words && activeSubtitle.words.length > 0 ? (
          activeSubtitle.words.map((word, index) => {
            const currentWordIdx = getCurrentWordIndex(activeSubtitle.words, currentTime);
            
            let isActive = false;
            if (globalStyle.highlightMode === 'current') {
              isActive = index === currentWordIdx;
            } else {
              // Accumulative mode: highlight all words up to the current one
              isActive = currentTime >= word.start;
            }

            return (
              <span
                key={`${activeSubtitle.id}-word-${index}`}
                style={{
                  color: isActive ? globalStyle.activeWordColor : globalStyle.textColor,
                  transition: 'color 0.1s ease-in-out',
                }}
              >
                {word.word}{' '}
              </span>
            );
          })
        ) : (
          activeSubtitle.text
        )}
      </div>
    </motion.div>
  );
}
