
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  isVisible: boolean;
  songName?: string;
  albumName?: string;
  albumImage?: string;
  currentTime?: number;
  duration?: number;
}

const MusicPlayer = ({ 
  isVisible, 
  songName = "Song name", 
  albumName = "Album name",
  albumImage = "/placeholder.svg",
  currentTime = 38,
  duration = 238
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-qtify-green px-6 py-3 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={albumImage} 
            alt={albumName}
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <h3 className="text-qtify-dark font-medium text-sm">{songName}</h3>
            <p className="text-qtify-dark/70 text-xs">{albumName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-qtify-dark" />
            ) : (
              <Play className="w-5 h-5 text-qtify-dark ml-0.5" />
            )}
          </button>
          
          <div className="flex items-center gap-2 flex-1">
            <span className="text-qtify-dark text-sm font-medium">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 bg-qtify-dark/20 rounded-full h-1 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-qtify-dark rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-qtify-dark text-sm">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        <div className="w-32"></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
