import EditorLayout from '@/components/layout/EditorLayout';
import VideoPreview from '@/components/video/VideoPreview';

export default function EditorPage({ params }: { params: { projectId: string } }) {
  // In a real app, we would fetch the project data using the ID
  const projectName = params.projectId === 'demo-project' ? 'Introduction to Hinglish' : params.projectId;

  return (
    <EditorLayout projectName={projectName}>
      <VideoPreview />
    </EditorLayout>
  );
}
