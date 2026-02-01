import { ChevronDown, Video, Mic, Newspaper, Play } from 'lucide-react';
import { ContentCase } from '../data/demoData';

interface ContentSelectorProps {
  cases: ContentCase[];
  selectedCase: ContentCase;
  onSelectCase: (caseItem: ContentCase) => void;
}

export function ContentSelector({ cases, selectedCase, onSelectCase }: ContentSelectorProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'interview':
        return Mic;
      case 'speech':
        return Play;
      case 'news':
        return Newspaper;
      default:
        return Video;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High Risk':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Containment Active':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low Risk':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="relative group">
      <label className="block text-sm text-gray-600 mb-2">Select Content Case</label>
      <div className="relative">
        <select
          value={selectedCase.id}
          onChange={(e) => {
            const selected = cases.find(c => c.id === e.target.value);
            if (selected) onSelectCase(selected);
          }}
          className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {cases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.fileName} - {c.status}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedCase.status)}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          {selectedCase.status}
        </span>
        <span className="text-xs text-gray-500">Risk Score: {selectedCase.overallRiskScore}%</span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-xs text-gray-500">{selectedCase.uploadTime}</span>
      </div>
    </div>
  );
}
