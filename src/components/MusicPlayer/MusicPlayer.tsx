import { useEffect, useState } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show music control after a brief delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center
                 bg-black/30 backdrop-blur-sm border border-white/20
                 text-white/80 hover:bg-black/40 hover:border-white/40
                 transition-all duration-300 rounded-full group"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <svg
          className="w-5 h-5 animate-pulse"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 1.5C9.36 1.5 6.87 2.4 5.02 4.02C3.17 5.65 2.25 8.2 2.25 11C2.25 13.8 3.17 16.35 5.02 17.98C6.87 19.6 9.36 20.5 12 20.5C14.64 20.5 17.13 19.6 18.98 17.98C20.83 16.35 21.75 13.8 21.75 11C21.75 8.2 20.83 5.65 18.98 4.02C17.13 2.4 14.64 1.5 12 1.5ZM12 3C14.21 3 16.27 3.77 17.78 5.11C19.29 6.45 20 8.29 20 11C20 13.71 19.29 15.55 17.78 16.89C16.27 18.23 14.21 19 12 19C9.79 19 7.73 18.23 6.22 16.89C4.71 15.55 4 13.71 4 11C4 8.29 4.71 6.45 6.22 5.11C7.73 3.77 9.79 3 12 3ZM9 8V14L10 14V8L9 8ZM11 8V14L12 14V8L11 8ZM13 8V14L14 14V8L13 8Z" />
          <circle cx="12" cy="11" r="1.5" opacity="0.3" />
          <circle cx="12" cy="11" r="2.5" opacity="0.2" />
          <circle cx="12" cy="11" r="3.5" opacity="0.1" className="animate-ping" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 opacity-50"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          <line
            x1="3"
            y1="3"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Tooltip */}
      <div
        className="absolute right-full mr-3 px-3 py-1.5 bg-black/80 text-white/90 text-xs
                   whitespace-nowrap rounded opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 pointer-events-none"
      >
        {isPlaying ? 'Music ON' : 'Music OFF'}
      </div>
    </button>
  );
}
