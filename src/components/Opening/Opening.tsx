import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Envelope from './Envelope';

interface OpeningProps {
  groomName: string;
  brideName: string;
  onOpen: () => void;
}

export default function Opening({ groomName, brideName, onOpen }: OpeningProps) {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const names = namesRef.current;

    if (!container || !title || !subtitle || !names) return;

    // Animation timeline
    const tl = gsap.timeline();

    // Start with everything hidden
    gsap.set([title, subtitle, names], { opacity: 0 });

    tl.to(title, {
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
    })
      .to(
        title,
        {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '+=1.5'
      )
      .to(
        names,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 2,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        subtitle,
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '-=0.8'
      )
      .call(() => {
        setShowEnvelope(true);
      }, [], '+=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        {/* Initial text */}
        <div
          ref={titleRef}
          className="text-white/90 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] font-light mb-8"
        >
          A STORY IS ABOUT TO BEGIN
        </div>

        {/* Names */}
        <div
          ref={namesRef}
          className="mb-6 sm:mb-8"
          style={{
            opacity: 0,
            filter: 'blur(10px)',
            transform: 'scale(1.08)',
          }}
        >
          <div className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-wider mb-3 sm:mb-4">
            {brideName.toUpperCase()}
          </div>
          <div className="text-white/60 text-2xl sm:text-3xl md:text-5xl font-serif my-4 sm:my-6">&</div>
          <div className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-wider">
            {groomName.toUpperCase()}
          </div>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="text-white/80 text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] font-light"
        >
          ARE GETTING MARRIED
        </div>

        {/* Envelope - shown after animation */}
        {showEnvelope && (
          <div className="mt-12 sm:mt-16">
            <Envelope onOpen={onOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
