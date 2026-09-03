import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const envelope = envelopeRef.current;
    if (!envelope) return;

    // Entrance animation
    gsap.fromTo(
      envelope,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      }
    );
  }, []);

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);

    const envelope = envelopeRef.current;
    if (!envelope) return;

    // Envelope opening animation
    const tl = gsap.timeline({
      onComplete: () => {
        onOpen();
      },
    });

    tl.to(envelope, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.inOut',
    })
      .to(envelope, {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      })
      .to(
        {},
        {
          duration: 0.3,
        }
      );
  };

  return (
    <div ref={envelopeRef} className="flex flex-col items-center gap-6 md:gap-8 px-4">
      {/* Envelope icon representation */}
      <div className="relative">
        <svg
          width="100"
          height="75"
          viewBox="0 0 120 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/80 md:w-[120px] md:h-[90px]"
        >
          {/* Envelope body */}
          <rect
            x="10"
            y="20"
            width="100"
            height="60"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Envelope flap */}
          <path
            d="M10 20 L60 55 L110 20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Heart */}
          <path
            d="M60 45 C60 45, 52 38, 52 33 C52 28, 56 26, 60 30 C64 26, 68 28, 68 33 C68 38, 60 45, 60 45 Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Tap to open button with music icon */}
      <button
        ref={buttonRef}
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isOpening}
        className="group relative px-6 sm:px-8 md:px-12 py-3 md:py-4 
                   border border-white/30 text-white/90 
                   tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-light
                   hover:bg-white/5 hover:border-white/50 active:scale-95
                   transition-all duration-300 ease-out
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2 sm:gap-3
                   min-h-[48px] touch-manipulation"
        aria-label="Tap to open wedding invitation and start music"
      >
        {/* Music icon */}
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white/90 transition-colors animate-pulse"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>

        <span className="relative z-10">TAP TO OPEN</span>

        {/* Hover effect */}
        <div
          className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Pulse animation */}
        {!isOpening && (
          <div className="absolute inset-0 border border-white/20 animate-ping-slow" />
        )}
      </button>

      {/* Hint text with music indicator */}
      <div className="text-white/40 text-[10px] sm:text-xs tracking-wider animate-pulse flex items-center gap-2 text-center">
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
        
      </div>
    </div>
  );
}
