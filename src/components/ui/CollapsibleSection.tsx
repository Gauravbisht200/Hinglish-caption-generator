/**
 * FILE: src/components/ui/CollapsibleSection.tsx
 * Accordion section with smooth animations
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
  className
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b border-[var(--border)] last:border-none", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-[var(--secondary-surface)] transition-colors group"
      >
        <span className="text-sm font-semibold text-[var(--primary-text)]">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-[var(--secondary-text)] group-hover:text-[var(--primary-text)]"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Usage Example:
 * <CollapsibleSection title="Typography" defaultOpen={true}>
 *   <div className="space-y-4">
 *     <Select label="Font" options={fonts} />
 *     <Slider label="Size" min={12} max={72} value={32} />
 *   </div>
 * </CollapsibleSection>
 */
