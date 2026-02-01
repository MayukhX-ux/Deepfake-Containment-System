import { AlertCircle } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { ContentCase } from '../data/demoData';

interface RiskAnalysisProps {
  setActiveView: (view: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCase: ContentCase;
}

export function RiskAnalysis({ setActiveView, setSidebarOpen, selectedCase }: RiskAnalysisProps) {
  const getSignalColor = (value: number) => {
    if (value >= 85) return 'bg-red-600';
    if (value >= 75) return 'bg-red-500';
    if (value >= 65) return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  const getSignalDescription = (label: string, value: number) => {
    if (label.includes('Facial')) {
      return value > 80 ? 'Significant frame distortion detected' : 'Minor frame distortion detected';
    }
    if (label.includes('Lip')) {
      return value > 85 ? 'Very high mismatch probability' : 'High mismatch probability';
    }
    if (label.includes('Identity')) {
      return value > 90 ? 'Face does not match known identity samples' : 'Moderate identity mismatch detected';
    }
    return 'Analysis complete';
  };

  const signals = [
    {
      label: 'Facial Consistency Score',
      value: selectedCase.facialConsistency,
      description: getSignalDescription('Facial', selectedCase.facialConsistency),
      color: getSignalColor(selectedCase.facialConsistency),
    },
    {
      label: 'Lip–Audio Synchronization',
      value: selectedCase.lipAudioSync,
      description: getSignalDescription('Lip', selectedCase.lipAudioSync),
      color: getSignalColor(selectedCase.lipAudioSync),
    },
    {
      label: 'Identity Match Confidence',
      value: selectedCase.identityMatch,
      description: getSignalDescription('Identity', selectedCase.identityMatch),
      color: getSignalColor(selectedCase.identityMatch),
    },
  ];

  const getMetadataColor = (integrity: string) => {
    switch (integrity) {
      case 'Low':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'High Harm Potential';
    if (score >= 60) return 'Moderate Risk';
    return 'Low Risk';
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="Manipulation Risk Assessment" 
        subtitle="Signal-level analysis"
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 hidden lg:block">Manipulation Risk Assessment</h1>
          <p className="text-gray-600 hidden lg:block">Detailed signal-level analysis for {selectedCase.fileName}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8 mb-6">
            <h2 className="font-semibold mb-6">Signal-Level Analysis</h2>
            
            <div className="space-y-6 mb-8">
              {signals.map((signal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm sm:text-base">{signal.label}</span>
                    <span className="font-semibold text-lg">{signal.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full ${signal.color}`}
                      style={{ width: `${signal.value}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{signal.description}</p>
                </div>
              ))}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm sm:text-base">Metadata Integrity</span>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getMetadataColor(selectedCase.metadataIntegrity)}`}>
                    {selectedCase.metadataIntegrity}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedCase.metadataIntegrity === 'Low' ? 'Encoding and timestamp anomalies found' : 
                   selectedCase.metadataIntegrity === 'Medium' ? 'Minor encoding inconsistencies detected' :
                   'No metadata anomalies detected'}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Overall Harm Risk Score</div>
                <div className={`text-5xl sm:text-6xl font-bold mb-4 ${getRiskColor(selectedCase.overallRiskScore)}`}>
                  {selectedCase.overallRiskScore}%
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium mb-6 ${
                  selectedCase.overallRiskScore >= 80 ? 'bg-red-100 text-red-700' :
                  selectedCase.overallRiskScore >= 60 ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  <AlertCircle className="w-5 h-5" />
                  {getRiskLevel(selectedCase.overallRiskScore)}
                </div>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                  Score derived from combined visual, audio, and behavioral signals. Confidence reflects likelihood, not certainty.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setActiveView('virality')}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Virality Monitoring →
            </button>
            {selectedCase.containmentActions && (
              <button 
                onClick={() => setActiveView('containment')}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                View Containment Actions →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}