import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import type { Wedding } from '../../types/wedding';

interface WeddingDetailsProps {
  wedding: Wedding;
}

export default function WeddingDetails({ wedding }: WeddingDetailsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dateCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const dateCard = dateCardRef.current;

    if (!section || !content || !dateCard) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();

            // Animate content
            tl.fromTo(
              content,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
            ).fromTo(
              dateCard,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.2)' },
              '-=0.8'
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      {/* Floating rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/5 text-6xl"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            💍
          </div>
        ))}
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="mb-16">
          <SectionTitle
            chapter="V."
            title="The Day Has Come"
            subtitle="Join us as we begin our forever"
          />
        </div>

        {/* Date card */}
        <div
          ref={dateCardRef}
          className="relative bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-md border border-white/10 p-12 md:p-16"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/20" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/20" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20" />

          {/* Solar calendar - Main date */}
          <div className="mb-12">
            <div className="text-white/50 text-xs md:text-sm tracking-[0.4em] font-light mb-6">
              SOLAR CALENDAR
            </div>
            <div className="text-white text-6xl md:text-7xl lg:text-8xl font-serif tracking-wider">
              {wedding.ceremony_date_solar.split('/').join(' · ')}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-white/20" />
            <div className="text-white/40 text-2xl">✦</div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Lunar calendar */}
          <div className="mb-12">
            <div className="text-white/50 text-xs md:text-sm tracking-[0.4em] font-light mb-4">
              LUNAR CALENDAR
            </div>
            <div className="text-white/80 text-2xl md:text-3xl font-serif">
              {wedding.ceremony_date_lunar}
            </div>
          </div>

          {/* Time */}
          <div className="pt-8 border-t border-white/10">
            <div className="text-white/50 text-xs md:text-sm tracking-[0.4em] font-light mb-4">
              CEREMONY TIME
            </div>
            <div className="text-white text-4xl md:text-5xl font-serif tracking-wider">
              {wedding.ceremony_time}
            </div>
          </div>

          {/* Parents names */}
          <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
            <div className="grid md:grid-cols-2 gap-8 text-white/70 text-sm md:text-base">
              <div>
                <div className="text-white/50 text-xs tracking-widest mb-2">
                  GROOM'S MOTHER
                </div>
                <div className="font-serif text-lg">{wedding.groom_mother}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs tracking-widest mb-2">
                  BRIDE'S MOTHER
                </div>
                <div className="font-serif text-lg">{wedding.bride_mother}</div>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="mt-12 flex items-center justify-center">
            <div className="text-white/20 text-4xl">∞</div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-12 text-white/50 text-sm tracking-wider">
          We joyfully invite you to celebrate with us
        </div>
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
    </section>
  );
}
