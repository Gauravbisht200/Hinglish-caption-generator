export default function EditorPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--app-background)]">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-text)]">
          Project: <span className="text-[var(--accent-blue)]">{params.projectId}</span>
        </h2>
        <p className="text-[var(--secondary-text)] text-lg animate-pulse">
          Editor will load here...
        </p>
        <div className="mt-8 p-12 border-2 border-dashed border-[var(--border)] rounded-3xl max-w-2xl mx-auto">
          <p className="text-sm text-[var(--secondary-text)]">
            Timeline, Video Preview, and Styling Panels coming in Part 2.
          </p>
        </div>
      </div>
    </div>
  );
}
