import { Project, SubtitleSegment, CaptionStyle, CaptionPosition } from './types';

export const mockProject: Project = {
  id: 'demo-project',
  name: 'Introduction to Hinglish',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnailUrl: 'https://picsum.photos/seed/hinglish/800/450',
  duration: 120,
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'ready',
};

export const defaultCaptionStyle: CaptionStyle = {
  fontFamily: 'Montserrat',
  fontSize: 32,
  fontWeight: 700,
  textColor: '#FFFFFF',
  activeWordColor: '#FACC15',
  backgroundColor: '#0F172A',
  backgroundOpacity: 0.45,
  padding: 12,
  borderRadius: 8,
  textAlign: 'center',
  lineHeight: 1.4,
  maxWidth: 80,
};

export const defaultCaptionPosition: CaptionPosition = {
  x: 50,
  y: 85,
  anchor: 'bottom-center',
  snapToGrid: true,
};

export const mockSubtitles: SubtitleSegment[] = [
  {
    id: 'seg-1',
    text: 'Namaste dosto, aaj hum discuss karenge...',
    startTime: 0.5,
    endTime: 3.5,
    words: [
      { word: 'Namaste', start: 0.5, end: 1.0, confidence: 0.98 },
      { word: 'dosto,', start: 1.1, end: 1.6, confidence: 0.99 },
      { word: 'aaj', start: 1.7, end: 2.0, confidence: 0.95 },
      { word: 'hum', start: 2.1, end: 2.4, confidence: 0.97 },
      { word: 'discuss', start: 2.5, end: 3.0, confidence: 0.99 },
      { word: 'karenge...', start: 3.1, end: 3.5, confidence: 0.96 },
    ],
  },
  {
    id: 'seg-2',
    text: 'Hinglish captions kaise create karte hain.',
    startTime: 4.0,
    endTime: 7.5,
    words: [
      { word: 'Hinglish', start: 4.0, end: 4.6, confidence: 0.98 },
      { word: 'captions', start: 4.7, end: 5.3, confidence: 0.99 },
      { word: 'kaise', start: 5.4, end: 5.8, confidence: 0.97 },
      { word: 'create', start: 5.9, end: 6.5, confidence: 0.99 },
      { word: 'karte', start: 6.6, end: 7.0, confidence: 0.98 },
      { word: 'hain.', start: 7.1, end: 7.5, confidence: 0.99 },
    ],
  },
  {
    id: 'seg-3',
    text: 'Ye process bahut simple aur effective hai.',
    startTime: 8.0,
    endTime: 11.5,
    words: [
      { word: 'Ye', start: 8.0, end: 8.3, confidence: 0.95 },
      { word: 'process', start: 8.4, end: 9.0, confidence: 0.99 },
      { word: 'bahut', start: 9.1, end: 9.6, confidence: 0.98 },
      { word: 'simple', start: 9.7, end: 10.3, confidence: 0.99 },
      { word: 'aur', start: 10.4, end: 10.8, confidence: 0.97 },
      { word: 'effective', start: 10.9, end: 11.5, confidence: 0.99 },
      { word: 'hai.', start: 11.6, end: 12.0, confidence: 0.98 },
    ],
  }
];
