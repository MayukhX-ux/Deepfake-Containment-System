import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  setSidebarOpen: (open: boolean) => void;
}

export function MobileHeader({ title, subtitle, setSidebarOpen }: MobileHeaderProps) {
  return (
    <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold truncate">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 truncate">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
