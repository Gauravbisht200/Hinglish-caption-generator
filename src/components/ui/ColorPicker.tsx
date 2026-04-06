/**
 * FILE: src/components/ui/ColorPicker.tsx
 * Reusable color picker component
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ColorPicker({
  label,
  value,
  onChange,
  className
}: ColorPickerProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
      {label && (
        <label className="text-xs font-medium text-[var(--secondary-text)] px-1">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-2 p-1.5 bg-white border border-[var(--border)] rounded-[8px]">
        <div className="relative w-8 h-8 rounded-md overflow-hidden border border-[var(--border)] shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 w-[200%] h-[200%] cursor-pointer border-none p-0"
          />
        </div>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs font-mono font-medium bg-transparent border-none focus:ring-0 p-0 uppercase"
          maxLength={7}
        />
        <div 
          className="w-4 h-4 rounded-full border border-[var(--border)] shrink-0"
          style={{ backgroundColor: value }}
        />
      </div>
    </div>
  );
}

/**
 * Usage Example:
 * <ColorPicker 
 *   label="Text Color" 
 *   value={color} 
 *   onChange={setColor} 
 * />
 */
