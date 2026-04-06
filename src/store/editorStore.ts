import { create } from 'zustand';
import { EditorState, SubtitleSegment, CaptionStyle, CaptionPosition } from '@/lib/types';
import { mockSubtitles, defaultCaptionStyle, defaultCaptionPosition, mockProject } from '@/lib/mockData';

interface EditorStore extends EditorState {
  // Playback
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  
  // Selection
  selectSubtitle: (id: string | null) => void;
  
  // Editing
  updateSubtitle: (id: string, updates: Partial<SubtitleSegment>) => void;
  updateSubtitleText: (id: string, text: string) => void;
  updateSubtitleTiming: (id: string, startTime: number, endTime: number) => void;
  addSubtitle: (subtitle: SubtitleSegment) => void;
  removeSubtitle: (id: string) => void;
  
  // Styling
  updateGlobalStyle: (updates: Partial<CaptionStyle>) => void;
  
  // Position
  updateGlobalPosition: (updates: Partial<CaptionPosition>) => void;
  updateSubtitlePosition: (id: string, position: CaptionPosition) => void;
  
  // Timeline
  setZoom: (zoom: number) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  // Initial state
  project: mockProject,
  subtitles: mockSubtitles,
  selectedSubtitleId: null,
  currentTime: 0,
  isPlaying: false,
  zoom: 1,
  globalStyle: defaultCaptionStyle,
  globalPosition: defaultCaptionPosition,
  
  // Playback
  setCurrentTime: (time) => set({ currentTime: time }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  
  // Selection
  selectSubtitle: (id) => set({ selectedSubtitleId: id }),
  
  // Editing
  updateSubtitle: (id, updates) => set((state) => ({
    subtitles: state.subtitles.map((s) => s.id === id ? { ...s, ...updates } : s)
  })),
  
  updateSubtitleText: (id, text) => set((state) => ({
    subtitles: state.subtitles.map((s) => s.id === id ? { ...s, text } : s)
  })),
  
  updateSubtitleTiming: (id, startTime, endTime) => set((state) => {
    // Validation: No negative duration
    if (endTime <= startTime) return state;
    
    // Validation: Minimum duration 0.1s
    if (endTime - startTime < 0.1) return state;

    // Validation: Prevent invalid times
    const validStart = Math.max(0, startTime);
    const validEnd = Math.max(validStart + 0.1, endTime);

    const updatedSubtitles = state.subtitles.map((s) => 
      s.id === id ? { ...s, startTime: validStart, endTime: validEnd } : s
    );

    // Optional: Sort by start time to keep timeline organized
    return { subtitles: updatedSubtitles.sort((a, b) => a.startTime - b.startTime) };
  }),

  addSubtitle: (subtitle) => set((state) => ({
    subtitles: [...state.subtitles, subtitle].sort((a, b) => a.startTime - b.startTime)
  })),

  removeSubtitle: (id) => set((state) => ({
    subtitles: state.subtitles.filter((s) => s.id !== id),
    selectedSubtitleId: state.selectedSubtitleId === id ? null : state.selectedSubtitleId
  })),
  
  // Styling
  updateGlobalStyle: (updates) => set((state) => ({
    globalStyle: { ...state.globalStyle, ...updates }
  })),
  
  // Position
  updateGlobalPosition: (updates) => set((state) => ({
    globalPosition: { ...state.globalPosition, ...updates }
  })),
  
  updateSubtitlePosition: (id, position) => set((state) => ({
    subtitles: state.subtitles.map((s) => s.id === id ? { ...s, position } : s)
  })),
  
  // Timeline
  setZoom: (zoom) => set({ zoom }),
}));
