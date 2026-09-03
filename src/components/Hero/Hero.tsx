import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeroProps {
  groomName: string;
  brideName: string;
  ceremonyDate: string;
  ceremonyTime: string;
  heroImageUrl: string;
}

export default function Hero({
  groomName,
  brideName,
  ceremonyDate,
  ceremonyTime,
  heroImageUrl,
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageLoaded) return;

    const hero = heroRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const names = namesRef.current;
    const date = dateRef.current;

    if (!hero || !image || !content || !names || !date) return;

    // Initial state
    gsap.set([names, date], {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)',
    });

    // Entrance animation timeline
    const tl = gsap.timeline();

    // Image zoom in
    tl.fromTo(
      image,
      {
        scale: 1.2,
        filter: 'blur(20px)',
      },
      {
        scale: 1.08,
        filter: 'blur(0px)',
        duration: 3,
        ease: 'power2.out',
      }
    )
      // Names appear
      .to(
        names,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=2'
      )
      // Date appear
      .to(
        date,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.8'
      );

    // Continuous slow zoom
    gsap.to(image, {
      scale: 1,
      duration: 10,
      ease: 'none',
      delay: 3,
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const scrollPercent = Math.min(scrollY / maxScroll, 1);

      if (image) {
        gsap.to(image, {
          y: scrollY * 0.5,
          scale: 1.08 - scrollPercent * 0.08,
          duration: 0,
        });
      }

      if (content) {
        gsap.to(content, {
          opacity: 1 - scrollPercent * 1.5,
          y: scrollY * 0.3,
          duration: 0,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imageLoaded]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Hero Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.2)',
        }}
      >
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse" />
        )}

        {/* Preload image */}
        <img
          src={heroImageUrl}
          alt="Wedding hero"
          className="hidden"
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationName: 'float',
              animationDuration: `${8 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center"
      >
        {/* Names */}
        <div ref={namesRef} className="mb-8 sm:mb-12">
          <div className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif tracking-wider mb-4 sm:mb-6">
            {brideName}
          </div>
          <div className="text-white/50 text-3xl sm:text-4xl md:text-6xl font-serif my-6 sm:my-8">&</div>
          <div className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif tracking-wider">
            {groomName}
          </div>
        </div>

        {/* Divider */}
        <div className="w-20 sm:w-24 h-px bg-white/20 mb-6 sm:mb-8" />

        {/* Date & Time */}
        <div ref={dateRef}>
          <div className="text-white/80 text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-light mb-3 sm:mb-4">
            ARE GETTING MARRIED
          </div>
          <div className="text-white/60 text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] font-light">
            {ceremonyDate} • {ceremonyTime}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 sm:gap-3 opacity-60 animate-bounce">
            <div className="text-white/60 text-xs tracking-widest">SCROLL</div>
            <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
    </section>
  );
}
