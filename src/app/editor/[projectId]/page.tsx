import EditorLayout from '@/components/layout/EditorLayout';
import VideoPreview from '@/components/video/VideoPreview';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[var(--app-background)] text-center">
      <div className="p-8 bg-white rounded-2xl shadow-xl border border-[var(--border)] max-w-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-sm text-[var(--secondary-text)] mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-[var(--accent-blue)] text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function EditorPage({ params }: { params: { projectId: string } }) {
  // In a real app, we would fetch the project data using the ID
  const projectName = params.projectId === 'demo-project' ? 'Introduction to Hinglish' : params.projectId;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <EditorLayout projectName={projectName}>
        <VideoPreview />
      </EditorLayout>
    </ErrorBoundary>
  );
}
