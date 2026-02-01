import { AlertCircle, Play } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { ContentCase } from '../data/demoData';
import { VideoThumbnail } from './VideoThumbnail';

interface ContextualLabelProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCase: ContentCase;
}

export function ContextualLabel({ setActiveView, setSidebarOpen, selectedCase }: ContextualLabelProps) {
  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="User Context Overlay" 
        subtitle="Viewer experience"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 hidden lg:block">User Context Overlay</h1>
          <p className="text-gray-600 hidden lg:block">What viewers see when accessing flagged content</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            {/* Video Preview with Overlay */}
            <div className="relative bg-gray-900 aspect-video">
              {/* Background with video representation */}
              <div className="absolute inset-0">
                <VideoThumbnail 
                  gradient={selectedCase.thumbnailGradient}
                  icon={selectedCase.thumbnailIcon}
                />
              </div>
              
              {/* Context Notice Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 bg-black/30">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 sm:p-8 max-w-lg w-full border-2 border-amber-400 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold">Context Notice</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-sm sm:text-base text-gray-700">
                      This content may be manipulated or missing context.
                    </p>
                    <p className="text-sm sm:text-base text-gray-700">
                      Identity verification is currently in progress.
                    </p>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                    Why am I seeing this? →
                  </button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium mb-2">How This Works</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Labels are applied dynamically and updated as analysis evolves. The content remains accessible, but viewers are informed of potential manipulation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="text-sm text-gray-500 mb-1">Label Type</div>
                      <div className="font-medium text-sm sm:text-base">Manipulation Warning</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="text-sm text-gray-500 mb-1">Applied At</div>
                      <div className="font-medium text-sm sm:text-base">
                        {selectedCase.containmentActions?.contextLabel || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="text-sm text-gray-500 mb-1">Status</div>
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                        {selectedCase.containmentActions ? 'Active' : 'Not Required'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Transparency Note:</strong> This approach maintains freedom of expression while empowering viewers to make informed decisions about content credibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setActiveView('containment')}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              ← Back to Containment Actions
            </button>
            <button 
              onClick={() => setActiveView('audit-log')}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Full Audit Log →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}