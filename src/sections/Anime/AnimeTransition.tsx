import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Photo } from '../../types/wedding';

interface AnimeTransitionProps {
  photos: Photo[];
}

export default function AnimeTransition({ photos }: AnimeTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animated sequence
            const tl = gsap.timeline();

            // Fade in section
            tl.fromTo(
              section,
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: 'power2.inOut' }
            );

            // Animate each image
            imageRefs.current.forEach((img, index) => {
              if (!img) return;

              tl.fromTo(
                img,
                {
                  opacity: 0,
                  scale: 1.3,
                  filter: 'blur(20px)',
                },
                {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 2,
                  ease: 'power2.out',
                },
                index === 0 ? '-=0.5' : '-=1.5'
              ).to(
                img,
                {
                  opacity: index === imageRefs.current.length - 1 ? 1 : 0,
                  duration: 1,
                  ease: 'power2.inOut',
                },
                '+=1'
              );
            });

            // Animate text
            tl.fromTo(
              text,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
              '-=2'
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Use first 3 anime photos or fallback
  const animePhotos = photos.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Images - stacked and animated */}
      {animePhotos.map((photo, index) => (
        <div
          key={photo.id}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          <img
            src={photo.image_url}
            alt={`Anime transition ${index + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

          {/* Special effects for anime-like feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 mix-blend-overlay" />
        </div>
      ))}

      {/* Sakura petals animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationName: 'sakura-fall',
              animationDuration: `${8 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-pink-300/60"
            >
              <path
                d="M10 0C10 0 8 4 10 6C12 8 10 10 10 10C10 10 12 8 14 10C16 12 20 10 20 10C20 10 16 8 14 6C12 4 10 0 10 0Z"
                fill="currentColor"
              />
              <path
                d="M10 10C10 10 8 12 6 10C4 8 0 10 0 10C0 10 4 12 6 14C8 16 10 20 10 20C10 20 12 16 10 14C8 12 10 10 10 10Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Light rays */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-32 bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-xl transform -rotate-12"
            style={{
              left: `${i * 25}%`,
              animationName: 'light-sweep',
              animationDuration: '10s',
              animationDelay: `${i * 2}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6 opacity-0"
      >
        <div className="mb-6">
          <div className="inline-block px-8 py-3 border border-white/30 backdrop-blur-sm">
            <span className="text-white/80 text-sm md:text-base tracking-[0.3em] font-light">
              A MOMENT IN TIME
            </span>
          </div>
        </div>

        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
          Like a Dream
          <br />
          Come True
        </h2>

        <p className="text-white/60 text-sm md:text-base tracking-wider max-w-lg mx-auto">
          Every love story is beautiful, but ours is painted with colors of forever
        </p>

        {/* Decorative element */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
          <div className="text-white/40 text-2xl">✦</div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
    </section>
  );
}
