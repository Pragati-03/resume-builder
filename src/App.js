import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { PenTool } from 'lucide-react';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
        <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <PenTool size={24} />
              <h1 className="text-xl font-bold tracking-tight text-gray-900">ResumeBuilder</h1>
            </div>
            <div className="text-sm text-gray-500">
              Build your professional resume in minutes
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Editor Side */}
            <div className="w-full lg:w-1/2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Editor</h2>
                <p className="text-sm text-gray-500">Fill in your details below.</p>
              </div>
              <ResumeForm />
            </div>

            {/* Preview Side */}
            <div className="w-full lg:w-1/2">
              <div className="hidden lg:block mb-4 h-12"></div> {/* Spacer to align with form title */}
              <ResumePreview />
            </div>
          </div>
        </main>

        <footer className="bg-white border-t mt-12 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </div>
        </footer>
      </div>
    </ResumeProvider>
  );
}

export default App;
