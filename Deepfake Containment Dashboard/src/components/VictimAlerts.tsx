import { Bell, Shield, Download, Flag, FileText } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { ContentCase } from '../data/demoData';

interface VictimAlertsProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCase: ContentCase;
}

export function VictimAlerts({ setActiveView, setSidebarOpen, selectedCase }: VictimAlertsProps) {
  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="Potential Impersonation Alert" 
        subtitle="Victim notification"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 hidden lg:block">Potential Impersonation Alert</h1>
          <p className="text-gray-600 hidden lg:block">Privacy-first notification system for affected individuals</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            {/* Alert Header */}
            <div className="bg-amber-50 border-b border-amber-200 p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-amber-900 mb-1">
                    Possible Identity Misuse Detected
                  </h3>
                  <p className="text-sm text-amber-800">
                    Our systems detected content that may impersonate or misrepresent an individual's identity or statements.
                  </p>
                </div>
              </div>
            </div>

            {/* Alert Details */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Affected Individual</div>
                  <div className="font-medium">Public figure / Private individual</div>
                  <p className="text-xs text-gray-500 mt-1">(Identity protected in this view)</p>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Detection Time</div>
                  <div className="font-medium">{selectedCase.detectionTime}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Evidence Panel
                </h4>
                
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Evidence ID</div>
                      <div className="font-mono text-sm font-medium break-all">{selectedCase.id.toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Storage Status</div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <Shield className="w-3 h-3" />
                        Secure & Immutable
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">Stored Assets</div>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Video hash
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Frame snapshots
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Audio fingerprint
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-400 rounded-lg border border-gray-200 cursor-not-allowed"
                  >
                    <Flag className="w-4 h-4" />
                    <span className="text-sm">Report Platform</span>
                  </button>
                  <button 
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-400 rounded-lg border border-gray-200 cursor-not-allowed"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Request Takedown</span>
                  </button>
                  <button 
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-400 rounded-lg border border-gray-200 cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download Evidence</span>
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Action buttons available to affected individual upon verification
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-900">
              <strong>Privacy & Ethics:</strong> Alerts are private and do not assume malicious intent. The system focuses on empowering affected individuals with information and options.
            </p>
          </div>

          <button 
            onClick={() => setActiveView('audit-log')}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Complete Audit Trail →
          </button>
        </div>
      </div>
    </div>
  );
}