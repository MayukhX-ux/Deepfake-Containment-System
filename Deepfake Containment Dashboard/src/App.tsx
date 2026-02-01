import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ContentMonitor } from './components/ContentMonitor';
import { RiskAnalysis } from './components/RiskAnalysis';
import { ViralityMonitoring } from './components/ViralityMonitoring';
import { ContainmentActions } from './components/ContainmentActions';
import { ContextualLabel } from './components/ContextualLabel';
import { VictimAlerts } from './components/VictimAlerts';
import { AuditLog } from './components/AuditLog';
import { demoContentCases, ContentCase } from './data/demoData';

export default function App() {
  const [activeView, setActiveView] = useState('content-monitor');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ContentCase>(demoContentCases[0]);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleViewChange} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">
        {activeView === 'dashboard' && (
          <Dashboard 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            cases={demoContentCases}
          />
        )}
        {activeView === 'content-monitor' && (
          <ContentMonitor 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            selectedCase={selectedCase}
            setSelectedCase={setSelectedCase}
            cases={demoContentCases}
          />
        )}
        {activeView === 'risk-analysis' && (
          <RiskAnalysis 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            selectedCase={selectedCase}
          />
        )}
        {activeView === 'virality' && (
          <ViralityMonitoring 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            selectedCase={selectedCase}
          />
        )}
        {activeView === 'containment' && (
          <ContainmentActions 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            selectedCase={selectedCase}
          />
        )}
        {activeView === 'contextual-label' && (
          <ContextualLabel 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            selectedCase={selectedCase}
          />
        )}
        {activeView === 'victim-alerts' && (
          <VictimAlerts 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            selectedCase={selectedCase}
          />
        )}
        {activeView === 'audit-log' && (
          <AuditLog 
            setActiveView={handleViewChange} 
            setSidebarOpen={setSidebarOpen}
            selectedCase={selectedCase}
          />
        )}
      </main>
    </div>
  );
}