import { Activity, AlertCircle, Shield, Clock } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { ContentCase, getActiveContentCases, getHighRiskContentCases } from '../data/demoData';

interface DashboardProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  cases: ContentCase[];
}

export function Dashboard({ setActiveView, setSidebarOpen, cases }: DashboardProps) {
  const activeContent = getActiveContentCases();
  const highRiskContent = getHighRiskContentCases();
  const containmentActive = cases.filter(c => c.containmentActions).length;

  const metrics = [
    {
      label: 'Active Content Monitored',
      value: cases.length.toString(),
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'High-Risk Content',
      value: highRiskContent.length.toString(),
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Containment Actions Active',
      value: containmentActive.toString(),
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Avg Detection Time',
      value: '2 min 14 sec',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-8">
      <MobileHeader 
        title="Dashboard" 
        subtitle="System overview and key metrics"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2 hidden lg:block">Dashboard</h1>
        <p className="text-gray-600 hidden lg:block">System overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-3xl font-semibold mb-2">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <strong>Note:</strong> Risk scores indicate likelihood of manipulation, not factual verdicts.
        </p>
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {highRiskContent.slice(0, 3).map((content, index) => (
            <div key={content.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  content.status === 'High Risk' ? 'bg-red-500' :
                  content.status === 'Containment Active' ? 'bg-orange-500' :
                  'bg-green-500'
                }`}></div>
                <span className="text-sm truncate">
                  {content.status === 'High Risk' ? 'High-risk content detected' : 'Containment active'}: {content.fileName}
                </span>
              </div>
              <button 
                onClick={() => setActiveView('content-monitor')}
                className="text-sm text-blue-600 hover:text-blue-700 whitespace-nowrap ml-2"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}