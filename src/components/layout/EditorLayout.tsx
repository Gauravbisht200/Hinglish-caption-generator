/**
 * FILE: src/components/layout/EditorLayout.tsx
 * Main 3-panel layout structure for the editor
 */

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Timeline from '@/components/timeline/Timeline';

interface EditorLayoutProps {
  children: React.ReactNode;
  projectName?: string;
}

export default function EditorLayout({ children, projectName }: EditorLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-[var(--app-background)] overflow-hidden">
      {/* Top: Fixed Header */}
      <Header projectName={projectName} />

      {/* Middle: Main Content Area (Video + Sidebar) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center: Video Preview Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 min-w-0 overflow-auto">
          {children}
        </main>

        {/* Right: Sidebar */}
        <Sidebar />
      </div>

      {/* Bottom: Fixed Height Timeline */}
      <div className="h-[256px] w-full shrink-0">
        <Timeline />
      </div>
    </div>
  );
}
