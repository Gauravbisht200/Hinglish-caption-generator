/**
 * FILE: src/components/sidebar/StylePanel.tsx
 * Controls for global and individual caption styling
 */

'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import Select from '@/components/ui/Select';
import Slider from '@/components/ui/Slider';
import ColorPicker from '@/components/ui/ColorPicker';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function StylePanel() {
  const { globalStyle, updateGlobalStyle, selectedSubtitleId, updateSubtitle } = useEditorStore();
  const [applyTo, setApplyTo] = useState<'all' | 'selected'>('all');

  const handleUpdate = (updates: any) => {
    if (applyTo === 'all') {
      updateGlobalStyle(updates);
    } else if (selectedSubtitleId) {
      // In a real app, we'd merge with existing subtitle style
      updateSubtitle(selectedSubtitleId, { style: { ...globalStyle, ...updates } });
    }
  };

  const fonts = [
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
  ];

  const weights = [
    { value: '400', label: 'Regular' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi-Bold' },
    { value: '700', label: 'Bold' },
  ];

  return (
    <CollapsibleSection title="Styling" defaultOpen={false}>
      <div className="space-y-6">
        {/* Apply To Toggle */}
        <div className="flex p-1 bg-[var(--secondary-surface)] rounded-lg">
          <button
            onClick={() => setApplyTo('all')}
            className={cn(
              "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all",
              applyTo === 'all' ? "bg-white shadow-sm text-[var(--accent-blue)]" : "text-[var(--secondary-text)]"
            )}
          >
            Apply to All
          </button>
          <button
            onClick={() => setApplyTo('selected')}
            disabled={!selectedSubtitleId}
            className={cn(
              "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all disabled:opacity-50",
              applyTo === 'selected' ? "bg-white shadow-sm text-[var(--accent-blue)]" : "text-[var(--secondary-text)]"
            )}
          >
            Selected Only
          </button>
        </div>

        <div className="space-y-4">
          <Select 
            label="Font Family" 
            options={fonts} 
            value={globalStyle.fontFamily}
            onChange={(e) => handleUpdate({ fontFamily: e.target.value })}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Weight" 
              options={weights} 
              value={globalStyle.fontWeight.toString()}
              onChange={(e) => handleUpdate({ fontWeight: parseInt(e.target.value) })}
            />
            <Slider 
              label="Size" 
              min={16} 
              max={72} 
              value={globalStyle.fontSize} 
              onChange={(val) => handleUpdate({ fontSize: val })}
              unit="px"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ColorPicker 
              label="Text Color" 
              value={globalStyle.textColor}
              onChange={(val) => handleUpdate({ textColor: val })}
            />
            <ColorPicker 
              label="Active Word" 
              value={globalStyle.activeWordColor}
              onChange={(val) => handleUpdate({ activeWordColor: val })}
            />
          </div>

          <div className="space-y-4 pt-2 border-t border-[var(--border)]">
            <ColorPicker 
              label="Background" 
              value={globalStyle.backgroundColor}
              onChange={(val) => handleUpdate({ backgroundColor: val })}
            />
            <Slider 
              label="Opacity" 
              min={0} 
              max={100} 
              value={globalStyle.backgroundOpacity * 100} 
              onChange={(val) => handleUpdate({ backgroundOpacity: val / 100 })}
              unit="%"
            />
            <Slider 
              label="Corner Radius" 
              min={0} 
              max={24} 
              value={globalStyle.borderRadius} 
              onChange={(val) => handleUpdate({ borderRadius: val })}
              unit="px"
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-[var(--border)]">
            <label className="text-[10px] font-bold text-[var(--secondary-text)] uppercase tracking-wider">
              Highlight Mode
            </label>
            <div className="flex p-1 bg-[var(--secondary-surface)] rounded-lg">
              <button
                onClick={() => handleUpdate({ highlightMode: 'current' })}
                className={cn(
                  "flex-1 py-1.5 text-[10px] font-semibold rounded-md transition-all",
                  globalStyle.highlightMode === 'current' ? "bg-white shadow-sm text-[var(--accent-blue)]" : "text-[var(--secondary-text)]"
                )}
              >
                Current Word
              </button>
              <button
                onClick={() => handleUpdate({ highlightMode: 'accumulative' })}
                className={cn(
                  "flex-1 py-1.5 text-[10px] font-semibold rounded-md transition-all",
                  globalStyle.highlightMode === 'accumulative' ? "bg-white shadow-sm text-[var(--accent-blue)]" : "text-[var(--secondary-text)]"
                )}
              >
                Accumulative
              </button>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
