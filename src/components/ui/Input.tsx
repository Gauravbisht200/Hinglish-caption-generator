/**
 * FILE: src/components/ui/Input.tsx
 * Reusable text input component
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-xs font-medium text-[var(--secondary-text)] px-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-3 py-2 text-sm bg-white border rounded-[8px] transition-all focus:outline-none focus:ring-2",
          error 
            ? "border-[var(--error)] focus:ring-[var(--error)]/20" 
            : "border-[var(--border)] focus:ring-[var(--accent-blue)]/20 focus:border-[var(--accent-blue)]",
          "placeholder:text-slate-400",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-[10px] font-medium text-[var(--error)] px-1">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-[10px] text-[var(--secondary-text)] px-1">
          {helperText}
        </span>
      )}
    </div>
  );
}

/**
 * Usage Example:
 * <Input 
 *   label="Project Name" 
 *   placeholder="Enter name..." 
 *   error={errors.name}
 *   helperText="Max 50 characters"
 * />
 */
