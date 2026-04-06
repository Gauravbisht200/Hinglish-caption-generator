import Link from 'next/link';
import { PlusCircle, Video, Settings, Layout } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--app-background)]">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--primary-text)] tracking-tight">
            Hinglish <span className="text-[var(--accent-blue)]">Caption Studio</span>
          </h1>
          <p className="text-xl text-[var(--secondary-text)] max-w-2xl mx-auto">
            Create perfect captions for your videos with word-level timing and professional styling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[var(--border)] flex flex-col items-center space-y-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Video className="w-6 h-6 text-[var(--accent-blue)]" />
            </div>
            <h3 className="font-semibold text-lg">Smart Sync</h3>
            <p className="text-sm text-[var(--secondary-text)]">Automatic word-level timing for karaoke effects.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[var(--border)] flex flex-col items-center space-y-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <Settings className="w-6 h-6 text-[var(--warning)]" />
            </div>
            <h3 className="font-semibold text-lg">Custom Styles</h3>
            <p className="text-sm text-[var(--secondary-text)]">Professional templates and deep styling controls.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[var(--border)] flex flex-col items-center space-y-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <Layout className="w-6 h-6 text-[var(--success)]" />
            </div>
            <h3 className="font-semibold text-lg">Intuitive Editor</h3>
            <p className="text-sm text-[var(--secondary-text)]">Timeline-based editing designed for speed.</p>
          </div>
        </div>

        <div className="pt-10">
          <Link 
            href="/editor/demo-project"
            className="inline-flex items-center px-8 py-4 bg-[var(--accent-blue)] text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Project
          </Link>
        </div>
      </div>
    </main>
  );
}
