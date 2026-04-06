/**
 * FILE: src/components/ui/Slider.tsx
 * Reusable range slider component
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  unit?: string;
}

export default function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
  unit = ''
}: SliderProps) {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      <div className="flex justify-between items-center px-1">
        {label && (
          <label className="text-xs font-medium text-[var(--secondary-text)]">
            {label}
          </label>
        )}
        <span className="text-xs font-mono font-medium text-[var(--accent-blue)] bg-[var(--accent-blue-soft)] px-1.5 py-0.5 rounded">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[var(--secondary-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-blue)]"
      />
    </div>
  );
}

/**
 * Usage Example:
 * <Slider 
 *   label="Font Size" 
 *   min={12} 
 *   max={72} 
 *   value={fontSize} 
 *   onChange={setFontSize} 
 *   unit="px"
 * />
 */
