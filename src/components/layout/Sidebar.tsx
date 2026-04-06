/**
 * FILE: src/components/layout/Sidebar.tsx
 * Right sidebar container for editor controls
 */

import React from 'react';
import { Settings2, Type, Palette, Layout } from 'lucide-react';

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

      {/* Sidebar Tabs (Icons only for now) */}
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
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-[var(--secondary-surface)] rounded animate-pulse" />
          <div className="h-32 w-full bg-[var(--secondary-surface)] rounded-xl animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-[var(--secondary-surface)] rounded animate-pulse" />
          <div className="h-48 w-full bg-[var(--secondary-surface)] rounded-xl animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-[var(--secondary-surface)] rounded animate-pulse" />
          <div className="h-24 w-full bg-[var(--secondary-surface)] rounded-xl animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
