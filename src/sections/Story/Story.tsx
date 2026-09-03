import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import type { Photo } from '../../types/wedding';

interface StoryProps {
  photos: Photo[];
  storyText?: string;
}

export default function Story({ photos, storyText }: StoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate photos on scroll
    const photoElements = section.querySelectorAll('.story-photo');

    photoElements.forEach((photo, index) => {
      gsap.set(photo, {
        opacity: 0,
        y: 60,
        scale: 0.95,
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(photo, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                delay: index * 0.15,
                ease: 'power2.out',
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(photo as Element);
    });
  }, [photos]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24 px-6"
    >
      {/* Section Title */}
      <div className="max-w-7xl mx-auto mb-20">
        <SectionTitle chapter="II." title="Our Story" subtitle={storyText} />
      </div>

      {/* Story Photos */}
      <div className="max-w-7xl mx-auto space-y-24">
        {photos.map((photo, index) => {
          // Alternate layout
          const isEven = index % 2 === 0;
          const isLarge = index % 3 === 0;

          return (
            <div
              key={photo.id}
              className={`story-photo relative ${
                isEven ? 'md:pr-24' : 'md:pl-24'
              }`}
            >
              <div
                className={`relative ${
                  isLarge
                    ? 'h-[70vh]'
                    : index % 3 === 1
                    ? 'h-[50vh]'
                    : 'h-[60vh]'
                } overflow-hidden`}
              >
                {/* Photo */}
                <img
                  src={photo.image_url}
                  alt={photo.title || 'Wedding photo'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Caption if exists */}
                {(photo.title || photo.caption) && (
                  <div
                    className={`absolute bottom-0 ${
                      isEven ? 'left-0' : 'right-0'
                    } p-8 max-w-md`}
                  >
                    {photo.title && (
                      <h3 className="text-white text-2xl font-serif mb-2">
                        {photo.title}
                      </h3>
                    )}
                    {photo.caption && (
                      <p className="text-white/70 text-sm tracking-wide">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Decorative element */}
              <div
                className={`absolute top-1/2 ${
                  isEven ? 'right-0' : 'left-0'
                } w-px h-32 bg-white/10 -translate-y-1/2 hidden md:block`}
              />
            </div>
          );
        })}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
