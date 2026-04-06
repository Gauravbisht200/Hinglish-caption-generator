/**
 * FILE: src/components/video/VideoPreview.tsx
 * Interactive video player with caption overlay and store synchronization
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import DraggableSubtitleBox from './DraggableSubtitleBox';
import SafeAreaGrid from './SafeAreaGrid';
import PlaybackControls from './PlaybackControls';
import { mockProject } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { 
    currentTime, 
    setCurrentTime, 
    isPlaying, 
    setIsPlaying,
    globalPosition
  } = useEditorStore();

  // Sync video playback with store isPlaying state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Sync video time when store currentTime changes (e.g., from timeline or transcript)
  useEffect(() => {
    if (!videoRef.current) return;
    // Only sync if the difference is significant to avoid loops
    if (Math.abs(videoRef.current.currentTime - currentTime) > 0.1) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        id="video-container"
        className="w-full max-w-4xl aspect-video bg-black rounded-xl shadow-2xl relative overflow-hidden group border border-[var(--border)]"
      >
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src={mockProject.videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onClick={() => setIsPlaying(!isPlaying)}
        />

        {/* Safe Area Grid Overlay */}
        <SafeAreaGrid />

        {/* Grid Overlay (Visible when dragging or as a guide) */}
        <div className="absolute inset-0 pointer-events-none opacity-10 transition-opacity group-hover:opacity-20">
          <div className="w-full h-full grid grid-cols-12 grid-rows-12">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/30" />
            ))}
          </div>
        </div>

        {/* Draggable Caption Overlay */}
        <DraggableSubtitleBox />

        {/* Play/Pause Overlay Indicator */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-white border-b-[12px] border-b-transparent ml-1" />
            </div>
          </div>
        )}

        {/* Safe Area Guides (Optional) */}
        <div className="absolute inset-[10%] border border-white/10 rounded-lg pointer-events-none border-dashed" />
      </div>

      {/* Playback Controls */}
      <PlaybackControls />
    </div>
  );
}
