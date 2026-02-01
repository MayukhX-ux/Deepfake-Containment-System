import { CheckCircle, AlertCircle, Bell, Tag, Shield, Search } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { ContentCase } from '../data/demoData';

interface AuditLogProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCase: ContentCase;
}

export function AuditLog({ setActiveView, setSidebarOpen, selectedCase }: AuditLogProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'detection':
        return { icon: Search, color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'analysis':
        return { icon: AlertCircle, color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 'risk':
        return { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100' };
      case 'containment':
        return { icon: Shield, color: 'text-orange-600', bgColor: 'bg-orange-100' };
      case 'label':
        return { icon: Tag, color: 'text-amber-600', bgColor: 'bg-amber-100' };
      case 'alert':
        return { icon: Bell, color: 'text-green-600', bgColor: 'bg-green-100' };
      default:
        return { icon: Search, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const logEntries = selectedCase.auditTimeline.map(entry => ({
    ...entry,
    ...getIconForType(entry.type)
  }));

  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="System Audit Trail" 
        subtitle="Complete action record"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 hidden lg:block">System Audit Trail</h1>
          <p className="text-gray-600 hidden lg:block">Complete chronological record of all actions and decisions</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-semibold break-all">Content ID: {selectedCase.fileName}</h3>
                  <p className="text-sm text-gray-600">Evidence ID: {selectedCase.id.toUpperCase()}</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-500">Total Duration</div>
                  <div className="font-semibold">{selectedCase.detectionTime}</div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Log Entries */}
                <div className="space-y-6">
                  {logEntries.map((entry, index) => {
                    const Icon = entry.icon;
                    return (
                      <div key={index} className="relative flex gap-3 sm:gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 ${entry.bgColor} rounded-full flex items-center justify-center z-10`}>
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${entry.color}`} />
                        </div>
                        <div className="flex-1 pt-1 sm:pt-2 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                            <div className="font-medium text-sm sm:text-base">{entry.event}</div>
                            <div className="text-sm text-gray-500">{entry.time}</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Automated system action · No manual intervention
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Accountability:</strong> All actions are logged for accountability and review. This creates a transparent chain of custody for evidence and decision-making.
            </p>
          </div>

          {selectedCase.containmentActions && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Final Summary</h3>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Outcome: Harm Contained Without Censorship</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Time to Detection</div>
                  <div className="text-xl sm:text-2xl font-semibold">{selectedCase.detectionTime}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Spread Reduction</div>
                  <div className="text-xl sm:text-2xl font-semibold text-green-600">≈ {selectedCase.spreadReduction}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Victim Notification Time</div>
                  <div className="text-xl sm:text-2xl font-semibold">{selectedCase.victimNotificationTime}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-center text-sm sm:text-base text-gray-700 italic px-4">
                  "The goal is not to eliminate deepfakes, but to limit their damage before it becomes irreversible."
                </p>
              </div>
            </div>
          )}

          {!selectedCase.containmentActions && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Assessment Complete</h3>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Low Risk - No Action Required</span>
                </div>
                <p className="text-sm text-gray-600">
                  Content assessed as low risk. Continued monitoring in place.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button 
              onClick={() => setActiveView('dashboard')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}