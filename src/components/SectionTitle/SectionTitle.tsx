import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SectionTitleProps {
  chapter?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionTitle({
  chapter,
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = [chapterRef.current, titleRef.current, subtitleRef.current].filter(
      Boolean
    );

    // Initial state
    gsap.set(elements, {
      opacity: 0,
      y: 30,
    });

    // Intersection observer for scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.2,
              ease: 'power2.out',
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div ref={containerRef} className={`space-y-4 ${alignClass}`}>
      {/* Chapter number */}
      {chapter && (
        <div
          ref={chapterRef}
          className="text-white/40 text-xs md:text-sm tracking-[0.5em] font-light"
        >
          {chapter}
        </div>
      )}

      {/* Title */}
      <h2
        ref={titleRef}
        className="text-white/90 text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide"
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          ref={subtitleRef}
          className="text-white/60 text-sm md:text-base tracking-wider font-light max-w-2xl mx-auto"
        >
          {subtitle}
        </p>
      )}

      {/* Decorative line */}
      <div
        className={`w-24 h-px bg-white/20 ${
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        }`}
      />
    </div>
  );
}
