import { TrendingUp } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { ContentCase } from '../data/demoData';
import { ContentSelector } from './ContentSelector';
import { VideoThumbnail } from './VideoThumbnail';

interface ContentMonitorProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCase: ContentCase;
  setSelectedCase: (caseItem: ContentCase) => void;
  cases: ContentCase[];
}

export function ContentMonitor({ setActiveView, setSidebarOpen, selectedCase, setSelectedCase, cases }: ContentMonitorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High Risk':
        return 'bg-red-100 text-red-800';
      case 'Containment Active':
        return 'bg-orange-100 text-orange-800';
      case 'Low Risk':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getGrowthVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="Incoming Content Monitor" 
        subtitle="Real-time content intake"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 hidden lg:block">Incoming Content Monitor</h1>
          <p className="text-gray-600 hidden lg:block">Real-time content intake and initial assessment</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Content Selector */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
            <ContentSelector 
              cases={cases}
              selectedCase={selectedCase}
              onSelectCase={setSelectedCase}
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Content Card */}
              <div className="flex-1 p-4 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                <div className="mb-4 flex items-center justify-between">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCase.status)}`}>
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    {selectedCase.status}
                  </span>
                </div>

                {/* Video Thumbnail */}
                <div className="mb-4">
                  <VideoThumbnail 
                    gradient={selectedCase.thumbnailGradient}
                    icon={selectedCase.thumbnailIcon}
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">File Name</div>
                    <div className="font-medium break-all">{selectedCase.fileName}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Duration</div>
                      <div className="font-medium">{selectedCase.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Upload Time</div>
                      <div className="font-medium">{selectedCase.uploadTime}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Upload Source</div>
                    <div className="font-medium">{selectedCase.uploadSource}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Uploader Status</div>
                    <div className="font-medium text-amber-600">{selectedCase.uploaderStatus}</div>
                  </div>
                </div>
              </div>

              {/* Initial Reach Panel */}
              <div className="lg:w-80 p-4 sm:p-8 bg-gray-50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className={`w-5 h-5 ${selectedCase.growthVelocity === 'High' ? 'text-red-500' : 'text-blue-500'}`} />
                  Initial Reach
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Current Views</div>
                    <div className="text-3xl font-semibold">{selectedCase.currentViews.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Re-shares / min</div>
                    <div className={`text-2xl font-semibold ${selectedCase.sharesPerMin > 100 ? 'text-red-600' : 'text-orange-600'}`}>
                      {selectedCase.sharesPerMin}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Growth Velocity</div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getGrowthVelocityColor(selectedCase.growthVelocity)}`}>
                      {selectedCase.growthVelocity}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => setActiveView('risk-analysis')}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Risk Analysis →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Content is automatically scanned during early distribution phase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}