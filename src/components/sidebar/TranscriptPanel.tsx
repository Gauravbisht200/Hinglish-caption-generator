/**
 * FILE: src/components/sidebar/TranscriptPanel.tsx
 * Lists all subtitles and allows selection/seeking
 */

'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import { formatTime, cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

export default function TranscriptPanel() {
  const { subtitles, selectedSubtitleId, selectSubtitle, setCurrentTime } = useEditorStore();

  const handleItemClick = (id: string, startTime: number) => {
    selectSubtitle(id);
    setCurrentTime(startTime);
  };

  return (
    <CollapsibleSection title="Transcript" defaultOpen={true}>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {subtitles.length === 0 ? (
          <div className="text-center py-8 text-[var(--secondary-text)]">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs">No subtitles yet</p>
          </div>
        ) : (
          subtitles.map((subtitle) => (
            <button
              key={subtitle.id}
              onClick={() => handleItemClick(subtitle.id, subtitle.startTime)}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-all group",
                selectedSubtitleId === subtitle.id
                  ? "bg-[var(--accent-blue-soft)] border-[var(--accent-blue)]"
                  : "bg-white border-[var(--border)] hover:border-[var(--accent-blue)]/50"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold text-[var(--accent-blue)]">
                  {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
                </span>
              </div>
              <p className="text-sm text-[var(--primary-text)] line-clamp-2 leading-snug">
                {subtitle.text}
              </p>
            </button>
          ))
        )}
      </div>
    </CollapsibleSection>
  );
}
