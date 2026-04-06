/**
 * FILE: src/components/ui/Select.tsx
 * Reusable dropdown select component
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  className?: string;
}

export default function Select({
  label,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col space-y-1.5 w-full relative">
      {label && (
        <label 
          htmlFor={selectId}
          className="text-xs font-medium text-[var(--secondary-text)] px-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full appearance-none px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/20 focus:border-[var(--accent-blue)] pr-10",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[var(--secondary-text)]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

/**
 * Usage Example:
 * <Select 
 *   label="Font Family" 
 *   options={[
 *     { value: 'inter', label: 'Inter' },
 *     { value: 'poppins', label: 'Poppins' }
 *   ]} 
 * />
 */
