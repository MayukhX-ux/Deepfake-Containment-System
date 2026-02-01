import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingDown } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { ContentCase } from '../data/demoData';

interface ViralityMonitoringProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCase: ContentCase;
}

export function ViralityMonitoring({ setActiveView, setSidebarOpen, selectedCase }: ViralityMonitoringProps) {
  const hasContainment = selectedCase.containmentTriggeredAt !== undefined;
  const spreadReduction = selectedCase.spreadReduction || '0%';

  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="Content Spread Monitoring" 
        subtitle="Virality tracking"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 hidden lg:block">Content Spread Monitoring</h1>
          <p className="text-gray-600 hidden lg:block">Real-time virality tracking and intervention effectiveness</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <h2 className="font-semibold">View Growth Over Time</h2>
              {hasContainment && (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  <TrendingDown className="w-4 h-4" />
                  Containment Active
                </div>
              )}
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={selectedCase.viralityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  label={{ value: 'Time (minutes since upload)', position: 'insideBottom', offset: -5 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  label={{ value: 'Total Views', angle: -90, position: 'insideLeft' }}
                  stroke="#6b7280"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [value.toLocaleString(), '']}
                  labelFormatter={(label) => `${label} min`}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="line"
                  wrapperStyle={{ fontSize: '12px' }}
                />
                {hasContainment && selectedCase.containmentTriggeredAt && (
                  <ReferenceLine 
                    x={selectedCase.containmentTriggeredAt} 
                    stroke="#f97316" 
                    strokeDasharray="3 3"
                    label={{ value: '🟠 Containment Triggered', position: 'top', fill: '#f97316' }}
                  />
                )}
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Expected Spread (No Intervention)"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Actual Spread (With Containment)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-500 mb-1">Views at Upload</div>
              <div className="text-xl sm:text-2xl font-semibold">0</div>
            </div>
            {hasContainment && (
              <>
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Views Before Containment</div>
                  <div className="text-xl sm:text-2xl font-semibold text-orange-600">
                    {selectedCase.viewsBeforeContainment?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Views After Containment</div>
                  <div className="text-xl sm:text-2xl font-semibold text-blue-600">
                    {selectedCase.viewsAfterContainment?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Projected Without Containment</div>
                  <div className="text-xl sm:text-2xl font-semibold text-red-600">
                    {selectedCase.projectedWithoutContainment?.toLocaleString()}+
                  </div>
                </div>
              </>
            )}
            {!hasContainment && (
              <div className="col-span-3 bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">Current Views</div>
                <div className="text-xl sm:text-2xl font-semibold text-blue-600">
                  {selectedCase.currentViews.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-2">No containment triggered - low risk content</p>
              </div>
            )}
          </div>

          {hasContainment && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-900">
                <strong>Impact:</strong> Containment reduces amplification velocity without removing content. Approximately {spreadReduction} spread reduction achieved.
              </p>
            </div>
          )}

          {!hasContainment && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                <strong>Status:</strong> No containment required. Content risk score below intervention threshold.
              </p>
            </div>
          )}

          {hasContainment && (
            <button 
              onClick={() => setActiveView('containment')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Containment Actions →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}