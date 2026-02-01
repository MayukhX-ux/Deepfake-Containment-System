import { Video, Mic, Newspaper, Play } from 'lucide-react';

interface VideoThumbnailProps {
  gradient: string;
  icon: 'video' | 'interview' | 'speech' | 'news';
}

export function VideoThumbnail({ gradient, icon }: VideoThumbnailProps) {
  const getIcon = () => {
    switch (icon) {
      case 'interview':
        return <Mic className="w-16 h-16 sm:w-20 sm:h-20" />;
      case 'speech':
        return <Play className="w-16 h-16 sm:w-20 sm:h-20" />;
      case 'news':
        return <Newspaper className="w-16 h-16 sm:w-20 sm:h-20" />;
      default:
        return <Video className="w-16 h-16 sm:w-20 sm:h-20" />;
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>
      
      {/* Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      {/* Icon */}
      <div className="relative text-white opacity-70 z-10">
        {getIcon()}
      </div>
      
      {/* Animated Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
      </div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
      }}></div>
    </div>
  );
}
