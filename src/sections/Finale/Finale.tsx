import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Photo, Wedding } from '../../types/wedding';

interface FinaleProps {
  photos: Photo[];
  wedding: Wedding;
  onMusicFadeOut?: () => void;
}

export default function Finale({ photos, wedding, onMusicFadeOut }: FinaleProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const infinityRef = useRef<HTMLDivElement>(null);

  const finalePhotos = photos.slice(0, 3); // Use first 3 finale photos

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    const message = messageRef.current;
    const names = namesRef.current;
    const date = dateRef.current;
    const infinity = infinityRef.current;

    if (!section || !photo || !message || !names || !date || !infinity) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({
              onComplete: () => {
                // Fade out music after finale animation
                if (onMusicFadeOut) {
                  setTimeout(() => {
                    onMusicFadeOut();
                  }, 3000);
                }
              },
            });

            // Photo sequence - cycle through finale photos
            if (finalePhotos.length > 0) {
              finalePhotos.forEach((_, index) => {
                tl.call(() => {
                  setCurrentPhotoIndex(index);
                }, [], index === 0 ? 0 : '+=2');

                tl.fromTo(
                  photo,
                  { opacity: 0, scale: 1.2, filter: 'blur(20px)' },
                  {
                    opacity: 0.3,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 2,
                    ease: 'power2.out',
                  },
                  index === 0 ? 0 : '-=1.5'
                );

                if (index < finalePhotos.length - 1) {
                  tl.to(photo, {
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                  });
                }
              });
            }

            // Thank you message
            tl.fromTo(
              message,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
              '-=1'
            );

            // Names
            tl.fromTo(
              names,
              { opacity: 0, y: 30, filter: 'blur(10px)' },
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power2.out',
              },
              '+=0.5'
            );

            // Date
            tl.fromTo(
              date,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.2)' },
              '-=0.5'
            );

            // Infinity symbol
            tl.fromTo(
              infinity,
              { opacity: 0, scale: 0, rotation: 0 },
              {
                opacity: 1,
                scale: 1,
                rotation: 360,
                duration: 2,
                ease: 'power2.out',
              },
              '+=0.5'
            );

            // Fade to black
            tl.to(
              section,
              { opacity: 0, duration: 3, ease: 'power2.inOut' },
              '+=2'
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [finalePhotos.length, onMusicFadeOut]);

  const currentPhoto = finalePhotos[currentPhotoIndex];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background photo - slowly zooming out */}
      <div
        ref={photoRef}
        className="absolute inset-0"
        style={{ opacity: 0 }}
      >
        {currentPhoto && (
          <img
            src={currentPhoto.image_url}
            alt="Final memory"
            className="w-full h-full object-cover"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Falling petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationName: 'sakura-fall',
              animationDuration: `${10 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/40"
            >
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Thank you message */}
        <div ref={messageRef} style={{ opacity: 0 }}>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif leading-relaxed mb-8">
            {wedding.finale_text || (
              <>
                Thank You
                <br />
                For Being Part
                <br />
                Of Our Story
              </>
            )}
          </h2>
        </div>

        {/* Decorative divider */}
        <div className="my-12 flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
          <div className="text-white/40 text-2xl">✦</div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Names */}
        <div ref={namesRef} style={{ opacity: 0 }}>
          <div className="text-white/90 text-4xl md:text-5xl lg:text-6xl font-serif mb-4">
            {wedding.bride_name}
          </div>
          <div className="text-white/50 text-3xl md:text-4xl font-serif my-6">&</div>
          <div className="text-white/90 text-4xl md:text-5xl lg:text-6xl font-serif">
            {wedding.groom_name}
          </div>
        </div>

        {/* Date */}
        <div
          ref={dateRef}
          className="mt-12 text-white/60 text-xl md:text-2xl font-light tracking-wider"
          style={{ opacity: 0 }}
        >
          {wedding.ceremony_date_solar.split('/').join(' · ')}
        </div>

        {/* Infinity symbol */}
        <div
          ref={infinityRef}
          className="mt-16 text-white/80 text-7xl md:text-8xl"
          style={{ opacity: 0 }}
        >
          ∞
        </div>

        {/* Final message */}
        <div className="mt-12 text-white/30 text-sm tracking-widest opacity-0 animate-fadeIn-delayed">
          Forever Begins Here
        </div>
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </section>
  );
}
