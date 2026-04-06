/**
 * FILE: src/components/layout/Sidebar.tsx
 * Right sidebar container for editor controls
 */

import React from 'react';
import { Settings2, Type, Palette, Layout } from 'lucide-react';
import TranscriptPanel from '@/components/sidebar/TranscriptPanel';
import TimingPanel from '@/components/sidebar/TimingPanel';
import StylePanel from '@/components/sidebar/StylePanel';
import PositionPanel from '@/components/sidebar/PositionPanel';
import ExportPanel from '@/components/sidebar/ExportPanel';

export default function Sidebar() {
  return (
    <aside className="w-[384px] h-full bg-white border-l border-[var(--border)] flex flex-col shrink-0 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="font-bold text-[var(--primary-text)] flex items-center">
          <Settings2 className="w-4 h-4 mr-2 text-[var(--accent-blue)]" />
          Edit Controls
        </h3>
      </div>

      {/* Sidebar Tabs */}
      <div className="flex border-b border-[var(--border)]">
        <button className="flex-1 py-3 flex justify-center border-b-2 border-[var(--accent-blue)] text-[var(--accent-blue)]">
          <Type className="w-5 h-5" />
        </button>
        <button className="flex-1 py-3 flex justify-center text-[var(--secondary-text)] hover:bg-[var(--secondary-surface)]">
          <Palette className="w-5 h-5" />
        </button>
        <button className="flex-1 py-3 flex justify-center text-[var(--secondary-text)] hover:bg-[var(--secondary-surface)]">
          <Layout className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <TranscriptPanel />
        <TimingPanel />
        <StylePanel />
        <PositionPanel />
        <ExportPanel />
      </div>
    </aside>
  );
}
