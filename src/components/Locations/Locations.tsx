import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SectionTitle from '../SectionTitle/SectionTitle';
import type { Location } from '../../types/wedding';

interface LocationsProps {
  locations: Location[];
}

export default function Locations({ locations }: LocationsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const groomLocation = locations.find((loc) => loc.type === 'groom');
  const brideLocation = locations.find((loc) => loc.type === 'bride');

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cards.children,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
              }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
      </div>

      {/* Section Title */}
      <div className="max-w-7xl mx-auto mb-20">
        <SectionTitle
          chapter="VI."
          title="Where We Unite"
          subtitle="Two families, two homes, one love story"
        />
      </div>

      {/* Location Cards */}
      <div ref={cardsRef} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Groom's Location */}
          {groomLocation && (
            <div className="location-card group">
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 md:p-10 hover:border-white/30 transition-all duration-500">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-500/10 rounded-full border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white/90 text-2xl md:text-3xl font-serif text-center mb-4">
                  {groomLocation.title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-px bg-white/20 mx-auto mb-6" />

                {/* Address */}
                <p className="text-white/70 text-center text-sm md:text-base leading-relaxed mb-8">
                  {groomLocation.address}
                </p>

                {/* Map button */}
                {groomLocation.maps_url && (
                  <a
                    href={groomLocation.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-6 border border-white/20 text-white/80 text-center text-sm tracking-wider hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                  >
                    VIEW ON GOOGLE MAPS
                  </a>
                )}

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          )}

          {/* Bride's Location */}
          {brideLocation && (
            <div className="location-card group">
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 md:p-10 hover:border-white/30 transition-all duration-500">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center bg-pink-500/10 rounded-full border border-pink-500/20 group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white/90 text-2xl md:text-3xl font-serif text-center mb-4">
                  {brideLocation.title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-px bg-white/20 mx-auto mb-6" />

                {/* Address */}
                <p className="text-white/70 text-center text-sm md:text-base leading-relaxed mb-8">
                  {brideLocation.address}
                </p>

                {/* Map button */}
                {brideLocation.maps_url && (
                  <a
                    href={brideLocation.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-6 border border-white/20 text-white/80 text-center text-sm tracking-wider hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                  >
                    VIEW ON GOOGLE MAPS
                  </a>
                )}

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          )}
        </div>

        {/* Journey visualization */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="text-blue-400/40 text-4xl">●</div>
          <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-blue-400/20 via-pink-400/20 to-pink-400/20 relative">
            {/* Animated dot */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
          </div>
          <div className="text-pink-400/40 text-4xl">●</div>
        </div>

        {/* Journey text */}
        <div className="mt-8 text-center">
          <div className="text-white/40 text-xs md:text-sm tracking-[0.3em] font-light">
            THE JOURNEY OF TWO HEARTS
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
