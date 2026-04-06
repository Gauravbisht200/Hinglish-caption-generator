// Project
export interface Project {
  id: string;
  name: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number; // in seconds
  createdAt: Date;
  updatedAt: Date;
  status: 'processing' | 'ready' | 'failed';
}

// Subtitle segment with word-level timings
export interface SubtitleSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  words: WordTiming[];
  style?: CaptionStyle;
  position?: CaptionPosition;
}

// Word-level timestamp (required for karaoke highlighting)
export interface WordTiming {
  word: string;
  start: number;
  end: number;
  confidence?: number;
}

// Caption styling
export interface CaptionStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textColor: string;
  activeWordColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  padding: number;
  borderRadius: number;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  maxWidth: number;
}

// Caption position
export interface CaptionPosition {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  anchor: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  snapToGrid: boolean;
}

// Editor state
export interface EditorState {
  project: Project | null;
  subtitles: SubtitleSegment[];
  selectedSubtitleId: string | null;
  currentTime: number;
  isPlaying: boolean;
  zoom: number;
  globalStyle: CaptionStyle;
  globalPosition: CaptionPosition;
}
