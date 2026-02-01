import { Check, TrendingDown, MessageSquare, Tag, Archive } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MobileHeader } from './MobileHeader';
import { ContentCase } from '../data/demoData';

interface ContainmentActionsProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCase: ContentCase;
}

export function ContainmentActions({ setActiveView, setSidebarOpen, selectedCase }: ContainmentActionsProps) {
  if (!selectedCase.containmentActions) {
    return (
      <div className="min-h-screen">
        <MobileHeader 
          title="Automated Harm Containment" 
          subtitle="No containment required"
          setSidebarOpen={setSidebarOpen} 
        />
        <div className="p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-900">
                No containment actions required for this content. Risk score below intervention threshold.
              </p>
              <button 
                onClick={() => setActiveView('risk-analysis')}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                ← Back to Risk Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const actions = [
    {
      icon: TrendingDown,
      label: 'Algorithmic Amplification Reduced',
      timestamp: selectedCase.containmentActions.amplificationReduced,
      description: 'Content de-prioritized in recommendation algorithms',
    },
    {
      icon: MessageSquare,
      label: 'Re-share Friction Enabled',
      timestamp: selectedCase.containmentActions.reshareFriction,
      description: 'Additional confirmation step added before sharing',
    },
    {
      icon: Tag,
      label: 'Contextual Label Applied',
      timestamp: selectedCase.containmentActions.contextLabel,
      description: 'Warning overlay displayed to viewers',
    },
    {
      icon: Archive,
      label: 'Evidence Snapshot Archived',
      timestamp: selectedCase.containmentActions.evidenceArchived,
      description: 'Immutable copy stored for potential investigation',
    },
  ];

  const viewsPrevented = (selectedCase.projectedWithoutContainment || 0) - (selectedCase.viewsAfterContainment || 0);
  const spreadReduction = selectedCase.spreadReduction || '0%';

  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="Automated Harm Containment" 
        subtitle="Proportional response"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 hidden lg:block">Automated Harm Containment</h1>
          <p className="text-gray-600 hidden lg:block">Proportional, reversible actions triggered by risk assessment</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <div className="flex flex-col lg:flex-row">
              {/* Actions List */}
              <div className="flex-1 p-4 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                <h2 className="font-semibold mb-6">Actions Triggered Due to High Risk</h2>
                
                <div className="space-y-4">
                  {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1 gap-1">
                            <div className="font-medium flex items-center gap-2 text-sm sm:text-base">
                              <Icon className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>{action.label}</span>
                            </div>
                            <span className="text-sm text-gray-500 whitespace-nowrap">Triggered at {action.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Policy Logic Panel */}
              <div className="lg:w-80 p-4 sm:p-8 bg-gray-50">
                <h3 className="font-semibold mb-4">Policy Logic</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Trigger Threshold</div>
                    <div className="font-medium">Risk Score &gt; 80%</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Scope</div>
                    <div className="font-medium">Temporary, reversible</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Human Review</div>
                    <div className="font-medium">Available on escalation</div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">Content Status</div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Still Accessible
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <button 
                    onClick={() => setActiveView('contextual-label')}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View User Context Overlay →
                  </button>
                  <button 
                    onClick={() => setActiveView('victim-alerts')}
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    View Victim Alert →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Spread Comparison Graph */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h2 className="font-semibold">Spread Impact Analysis</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <TrendingDown className="w-4 h-4" />
                {spreadReduction} Reduction Achieved
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={selectedCase.viralityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  label={{ value: 'Time (minutes since upload)', position: 'insideBottom', offset: -5 }}
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ value: 'Total Views', angle: -90, position: 'insideLeft' }}
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [value.toLocaleString(), '']}
                  labelFormatter={(label) => `${label} min`}
                />
                <ReferenceLine 
                  x={selectedCase.containmentTriggeredAt} 
                  stroke="#f97316" 
                  strokeDasharray="3 3"
                  label={{ value: 'Containment', position: 'top', fill: '#f97316', fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Without Containment"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  name="With Containment"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Before Containment</div>
                <div className="text-lg sm:text-xl font-semibold text-orange-600">
                  {selectedCase.viewsBeforeContainment?.toLocaleString()}
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">After Containment</div>
                <div className="text-lg sm:text-xl font-semibold text-green-600">
                  {selectedCase.viewsAfterContainment?.toLocaleString()}
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Without Action</div>
                <div className="text-lg sm:text-xl font-semibold text-red-600">
                  {selectedCase.projectedWithoutContainment?.toLocaleString()}+
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Views Prevented</div>
                <div className="text-lg sm:text-xl font-semibold text-green-600">~{viewsPrevented.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-900">
              <strong>Ethics Principle:</strong> No content removal performed. System prioritizes proportional response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}