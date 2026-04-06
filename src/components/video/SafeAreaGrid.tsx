/**
 * FILE: src/components/video/SafeAreaGrid.tsx
 * 3x3 grid overlay for video safe areas and positioning guides
 */

'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';

export default function SafeAreaGrid() {
  const { globalPosition } = useEditorStore();

  if (!globalPosition.snapToGrid) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Vertical Lines */}
      <div className="absolute left-1/3 top-0 bottom-0 border-l border-dashed border-white/20" />
      <div className="absolute left-2/3 top-0 bottom-0 border-l border-dashed border-white/20" />
      
      {/* Horizontal Lines */}
      <div className="absolute top-1/3 left-0 right-0 border-t border-dashed border-white/20" />
      <div className="absolute top-2/3 left-0 right-0 border-t border-dashed border-white/20" />
      
      {/* Center Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/40" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/40" />
      </div>
    </div>
  );
}
