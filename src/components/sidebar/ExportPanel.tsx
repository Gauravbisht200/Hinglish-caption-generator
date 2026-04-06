/**
 * FILE: src/components/sidebar/ExportPanel.tsx
 * Export options for subtitles
 */

'use client';

import React, { useState } from 'react';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import Button from '@/components/ui/Button';
import { Download, FileText, Video, CheckCircle2, Loader2 } from 'lucide-react';
import { generateSRT, generateVTT, downloadFile } from '@/lib/exportUtils';
import { useEditorStore } from '@/store/editorStore';

export default function ExportPanel() {
  const { subtitles, project } = useEditorStore();
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = async (format: string) => {
    setIsExporting(format);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (format === 'srt') {
        const content = generateSRT(subtitles);
        downloadFile(content, `${project?.name || 'subtitles'}.srt`, 'text/srt');
      } else if (format === 'vtt') {
        const content = generateVTT(subtitles);
        downloadFile(content, `${project?.name || 'subtitles'}.vtt`, 'text/vtt');
      } else if (format === 'video') {
        alert('Video export requires backend FFmpeg processing. This will be implemented in Phase 2 (Backend Integration).');
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <CollapsibleSection title="Export" defaultOpen={false}>
      <div className="space-y-4">
        <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-green-800">Ready to export</span>
            <span className="text-[10px] text-green-600">All segments are timed and styled</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            variant="secondary" 
            className="w-full justify-start gap-3"
            onClick={() => handleExport('srt')}
            disabled={!!isExporting}
          >
            {isExporting === 'srt' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 text-[var(--secondary-text)]" />
            )}
            <span>Export as SRT</span>
            <Download className="w-3 h-3 ml-auto opacity-50" />
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full justify-start gap-3"
            onClick={() => handleExport('vtt')}
            disabled={!!isExporting}
          >
            {isExporting === 'vtt' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 text-[var(--secondary-text)]" />
            )}
            <span>Export as VTT</span>
            <Download className="w-3 h-3 ml-auto opacity-50" />
          </Button>

          <div className="pt-2">
            <Button 
              variant="primary" 
              className="w-full justify-center gap-2"
              onClick={() => handleExport('video')}
              disabled={!!isExporting}
            >
              {isExporting === 'video' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Video className="w-4 h-4" />
              )}
              <span>Burn Subtitles to Video</span>
            </Button>
          </div>
        </div>

        <p className="text-[10px] text-center text-[var(--secondary-text)] px-4">
          SRT and VTT exports include all word-level timing data for compatible players.
        </p>
      </div>
    </CollapsibleSection>
  );
}
