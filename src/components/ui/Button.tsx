/**
 * FILE: src/components/ui/Button.tsx
 * Reusable button component with variants
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md',
  className,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px]";
  
  const variants = {
    primary: "bg-[var(--accent-blue)] text-white hover:bg-blue-700 focus:ring-[var(--accent-blue)]",
    secondary: "bg-white border border-[var(--border)] text-[var(--primary-text)] hover:bg-[var(--secondary-surface)] focus:ring-[var(--border)]",
    ghost: "bg-transparent text-[var(--secondary-text)] hover:bg-[var(--secondary-surface)] hover:text-[var(--primary-text)] focus:ring-[var(--border)]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Usage Example:
 * <Button variant="primary" size="md" onClick={() => console.log('Clicked')}>
 *   Click Me
 * </Button>
 */
