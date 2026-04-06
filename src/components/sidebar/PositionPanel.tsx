/**
 * FILE: src/components/sidebar/PositionPanel.tsx
 * Controls for caption positioning
 */

'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { LayoutGrid, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function PositionPanel() {
  const { globalPosition, updateGlobalPosition } = useEditorStore();

  const presets = [
    { id: 'top-left', x: 10, y: 10, icon: <AlignLeft className="w-4 h-4 rotate-180" /> },
    { id: 'top-center', x: 50, y: 10, icon: <AlignCenter className="w-4 h-4 rotate-180" /> },
    { id: 'top-right', x: 90, y: 10, icon: <AlignRight className="w-4 h-4 rotate-180" /> },
    { id: 'center-left', x: 10, y: 50, icon: <AlignLeft className="w-4 h-4" /> },
    { id: 'center', x: 50, y: 50, icon: <AlignCenter className="w-4 h-4" /> },
    { id: 'center-right', x: 90, y: 50, icon: <AlignRight className="w-4 h-4" /> },
    { id: 'bottom-left', x: 10, y: 90, icon: <AlignLeft className="w-4 h-4" /> },
    { id: 'bottom-center', x: 50, y: 90, icon: <AlignCenter className="w-4 h-4" /> },
    { id: 'bottom-right', x: 90, y: 90, icon: <AlignRight className="w-4 h-4" /> },
  ];

  return (
    <CollapsibleSection title="Position" defaultOpen={false}>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--secondary-text)] px-1">Presets</label>
          <div className="grid grid-cols-3 gap-2 bg-[var(--secondary-surface)] p-2 rounded-xl">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => updateGlobalPosition({ x: preset.x, y: preset.y, anchor: preset.id as any })}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg border transition-all",
                  globalPosition.anchor === preset.id
                    ? "bg-white border-[var(--accent-blue)] text-[var(--accent-blue)] shadow-sm"
                    : "bg-transparent border-transparent text-[var(--secondary-text)] hover:bg-white/50"
                )}
              >
                {preset.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="X Position (%)" 
            type="number" 
            value={globalPosition.x}
            onChange={(e) => updateGlobalPosition({ x: parseInt(e.target.value) })}
          />
          <Input 
            label="Y Position (%)" 
            type="number" 
            value={globalPosition.y}
            onChange={(e) => updateGlobalPosition({ y: parseInt(e.target.value) })}
          />
        </div>

        <div className="flex items-center space-x-2 px-1">
          <input 
            type="checkbox" 
            id="snap-grid"
            checked={globalPosition.snapToGrid}
            onChange={(e) => updateGlobalPosition({ snapToGrid: e.target.checked })}
            className="w-4 h-4 rounded border-[var(--border)] text-[var(--accent-blue)] focus:ring-[var(--accent-blue)]"
          />
          <label htmlFor="snap-grid" className="text-xs font-medium text-[var(--primary-text)]">
            Snap to grid
          </label>
        </div>

        <Button variant="secondary" className="w-full text-xs">
          Apply to All Segments
        </Button>
      </div>
    </CollapsibleSection>
  );
}
