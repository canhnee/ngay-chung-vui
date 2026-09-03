import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import LazyImage from '../../components/LazyImage/LazyImage';
import type { Photo } from '../../types/wedding';

interface GalleryProps {
  photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const photoElements = grid.querySelectorAll('.gallery-item');

    photoElements.forEach((photo, index) => {
      gsap.set(photo, {
        opacity: 0,
        y: 80,
        scale: 0.9,
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(photo, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                delay: (index % 6) * 0.1,
                ease: 'power3.out',
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(photo as Element);
    });
  }, [photos]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPhoto]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24 px-6 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        {/* Section Title */}
        <div className="max-w-7xl mx-auto mb-20">
          <SectionTitle
            chapter="III."
            title="Gallery"
            subtitle="Capturing moments that will last forever"
          />
        </div>

        {/* Masonry Gallery Grid */}
        <div ref={gridRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {photos.map((photo, index) => {
              // Create varied heights for masonry effect
              const heightClasses = [
                'h-64 md:h-80',
                'h-80 md:h-96',
                'h-96 md:h-[28rem]',
                'h-72 md:h-[22rem]',
              ];
              const heightClass = heightClasses[index % heightClasses.length];

              // Some photos span 2 columns
              const spanClass = index % 7 === 0 ? 'col-span-2' : '';

              return (
                <div
                  key={photo.id}
                  className={`gallery-item relative ${heightClass} ${spanClass} group cursor-pointer overflow-hidden`}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Photo with lazy loading */}
                  <LazyImage
                    src={photo.image_url}
                    alt={photo.title || 'Gallery photo'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {photo.title && (
                        <h3 className="text-white text-lg md:text-xl font-serif mb-1">
                          {photo.title}
                        </h3>
                      )}
                      {photo.caption && (
                        <p className="text-white/70 text-xs md:text-sm">
                          {photo.caption}
                        </p>
                      )}
                    </div>

                    {/* Expand icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Border effect */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/5 text-4xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${12 + Math.random() * 8}s`,
              }}
            >
              ♥
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Photo */}
          <div className="relative max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.title || 'Gallery photo'}
              className="max-w-full max-h-[90vh] object-contain"
            />

            {/* Caption */}
            {(selectedPhoto.title || selectedPhoto.caption) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                {selectedPhoto.title && (
                  <h3 className="text-white text-2xl md:text-3xl font-serif mb-2">
                    {selectedPhoto.title}
                  </h3>
                )}
                {selectedPhoto.caption && (
                  <p className="text-white/70 text-sm md:text-base">
                    {selectedPhoto.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
