/**
 * FILE: src/lib/exportUtils.ts
 * Utilities for exporting subtitles in various formats
 */

import { SubtitleSegment } from './types';

/**
 * Formats seconds into SRT time format (HH:MM:SS,mmm)
 */
export function formatSRTTime(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds);
  const hh = date.getUTCHours().toString().padStart(2, '0');
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  const ms = Math.floor((seconds % 1) * 1000).toString().padStart(3, '0');
  return `${hh}:${mm}:${ss},${ms}`;
}

/**
 * Formats seconds into VTT time format (HH:MM:SS.mmm)
 */
export function formatVTTTime(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds);
  const hh = date.getUTCHours().toString().padStart(2, '0');
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  const ms = Math.floor((seconds % 1) * 1000).toString().padStart(3, '0');
  return `${hh}:${mm}:${ss}.${ms}`;
}

/**
 * Generates SRT file content
 */
export function generateSRT(subtitles: SubtitleSegment[]): string {
  return subtitles
    .map((s, i) => {
      return `${i + 1}\n${formatSRTTime(s.startTime)} --> ${formatSRTTime(s.endTime)}\n${s.text}\n`;
    })
    .join('\n');
}

/**
 * Generates VTT file content
 */
export function generateVTT(subtitles: SubtitleSegment[]): string {
  const header = 'WEBVTT\n\n';
  const body = subtitles
    .map((s) => {
      return `${formatVTTTime(s.startTime)} --> ${formatVTTTime(s.endTime)}\n${s.text}\n`;
    })
    .join('\n');
  return header + body;
}

/**
 * Triggers a file download in the browser
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
