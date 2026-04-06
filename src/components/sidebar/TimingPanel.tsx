/**
 * FILE: src/components/sidebar/TimingPanel.tsx
 * Controls for editing subtitle timing
 */

'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatTime } from '@/lib/utils';
import { Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function TimingPanel() {
  const { subtitles, selectedSubtitleId, updateSubtitleTiming } = useEditorStore();
  
  const selectedSubtitle = subtitles.find(s => s.id === selectedSubtitleId);

  if (!selectedSubtitle) {
    return (
      <CollapsibleSection title="Timing" defaultOpen={true}>
        <div className="py-8 text-center border-2 border-dashed border-[var(--border)] rounded-xl">
          <Clock className="w-8 h-8 mx-auto mb-2 text-[var(--secondary-text)] opacity-20" />
          <p className="text-xs text-[var(--secondary-text)]">Select a subtitle to edit timing</p>
        </div>
      </CollapsibleSection>
    );
  }

  const handleNudge = (type: 'start' | 'end', amount: number) => {
    const newStart = type === 'start' ? Math.max(0, selectedSubtitle.startTime + amount) : selectedSubtitle.startTime;
    const newEnd = type === 'end' ? Math.max(newStart + 0.1, selectedSubtitle.endTime + amount) : selectedSubtitle.endTime;
    updateSubtitleTiming(selectedSubtitle.id, newStart, newEnd);
  };

  const duration = selectedSubtitle.endTime - selectedSubtitle.startTime;

  return (
    <CollapsibleSection title="Timing" defaultOpen={true}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input 
              label="Start Time" 
              value={formatTime(selectedSubtitle.startTime)} 
              readOnly 
              className="font-mono bg-[var(--secondary-surface)]"
            />
            <div className="flex gap-1">
              <Button size="sm" variant="secondary" className="flex-1 px-0" onClick={() => handleNudge('start', -0.1)}>
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="secondary" className="flex-1 px-0" onClick={() => handleNudge('start', 0.1)}>
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Input 
              label="End Time" 
              value={formatTime(selectedSubtitle.endTime)} 
              readOnly 
              className="font-mono bg-[var(--secondary-surface)]"
            />
            <div className="flex gap-1">
              <Button size="sm" variant="secondary" className="flex-1 px-0" onClick={() => handleNudge('end', -0.1)}>
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="secondary" className="flex-1 px-0" onClick={() => handleNudge('end', 0.1)}>
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[var(--secondary-surface)] rounded-lg flex justify-between items-center">
          <span className="text-xs font-medium text-[var(--secondary-text)]">Duration</span>
          <span className="text-sm font-bold font-mono text-[var(--primary-text)]">{duration.toFixed(3)}s</span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--secondary-text)] px-1">Nudge Both (Shift)</label>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => {
              handleNudge('start', -0.25);
              handleNudge('end', -0.25);
            }}>
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => {
              handleNudge('start', 0.25);
              handleNudge('end', 0.25);
            }}>
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
