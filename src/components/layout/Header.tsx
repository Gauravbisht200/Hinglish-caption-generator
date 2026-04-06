/**
 * FILE: src/components/layout/Header.tsx
 * Top navigation bar for the editor
 */

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Check, Share2, Download } from 'lucide-react';
import Button from '@/components/ui/Button';

interface HeaderProps {
  projectName?: string;
}

export default function Header({ projectName = "Untitled Project" }: HeaderProps) {
  return (
    <header className="h-[60px] bg-white border-b border-[var(--border)] shadow-sm flex items-center justify-between px-4 z-50">
      {/* Left: Logo & Back Button */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="p-2 hover:bg-[var(--secondary-surface)] rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-[var(--secondary-text)]" />
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[var(--accent-blue)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">HC</span>
          </div>
          <span className="font-display font-bold text-lg hidden md:block">Studio</span>
        </div>
      </div>

      {/* Center: Project Name */}
      <div className="flex items-center space-x-2">
        <h2 className="font-semibold text-[var(--primary-text)] truncate max-w-[200px] md:max-w-[400px]">
          {projectName}
        </h2>
        <div className="flex items-center text-[var(--success)] text-[10px] font-medium bg-green-50 px-2 py-0.5 rounded-full">
          <Check className="w-3 h-3 mr-1" />
          Saved
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button variant="primary" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </header>
  );
}
