import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import type { Video } from '../../types/wedding';

interface VideoSectionProps {
  videos: Video[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              section,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
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

  const handlePlayVideo = (videoId: string, index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (isPlaying === videoId) {
      video.pause();
      setIsPlaying(null);
    } else {
      // Pause all other videos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
        }
      });

      video.play();
      setIsPlaying(videoId);
    }
  };

  // If no videos provided, show a placeholder
  if (!videos || videos.length === 0) {
    return (
      <section className="relative min-h-screen bg-black flex items-center justify-center py-24 px-6">
        <div className="text-center">
          <SectionTitle
            chapter="IV."
            title="Our Journey"
            subtitle="Video section - Coming soon"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24 px-6"
    >
      {/* Section Title */}
      <div className="max-w-7xl mx-auto mb-20">
        <SectionTitle
          chapter="IV."
          title="Our Journey"
          subtitle="Moments captured in motion"
        />
      </div>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handlePlayVideo(video.id, index)}
            >
              {/* Video */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.video_url}
                poster={video.thumbnail_url}
                className="w-full h-[50vh] object-cover"
                playsInline
                muted
                loop
                onEnded={() => setIsPlaying(null)}
              />

              {/* Play button overlay */}
              {isPlaying !== video.id && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-10 h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Border effect */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-colors rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
