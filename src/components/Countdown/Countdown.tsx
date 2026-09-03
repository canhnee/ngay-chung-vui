import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { getCountdown } from '../../lib/utils';

interface CountdownProps {
  targetDate?: string;
  targetTime?: string;
}

export default function Countdown({ targetDate, targetTime }: CountdownProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  // Update countdown every second
  useEffect(() => {
    if (!targetDate) return;

    const dateTimeString = targetTime
      ? `${targetDate} ${targetTime}`
      : targetDate;

    const updateCountdown = () => {
      setCountdown(getCountdown(dateTimeString));
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    const numbers = numbersRef.current;

    if (!section || !numbers) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              numbers.children,
              { opacity: 0, y: 30, scale: 0.8 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.4)',
              }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // No target date
  if (!targetDate) {
    return (
      <section
        ref={sectionRef}
        className="relative min-h-[60vh] bg-black flex items-center justify-center py-24 px-6"
      >
        <div className="text-center">
          <div className="text-white/40 text-sm md:text-base tracking-[0.4em] font-light">
            COMING SOON
          </div>
          <div className="mt-4 text-white/20 text-6xl">⏳</div>
        </div>
      </section>
    );
  }

  // Event has passed
  if (countdown.isPast) {
    return (
      <section
        ref={sectionRef}
        className="relative min-h-[60vh] bg-black flex items-center justify-center py-24 px-6"
      >
        <div className="text-center">
          <div className="text-white/60 text-2xl md:text-3xl font-serif mb-4">
            The Day Has Arrived
          </div>
          <div className="text-white/40 text-sm tracking-wider">
            We are now celebrating our forever
          </div>
          <div className="mt-8 text-white/20 text-6xl">💕</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Title */}
        <div className="mb-16">
          <div className="text-white/50 text-xs md:text-sm tracking-[0.4em] font-light mb-4">
            COUNTING DOWN TO FOREVER
          </div>
          <div className="text-white/80 text-2xl md:text-3xl font-serif">
            Until We Say "I Do"
          </div>
        </div>

        {/* Countdown numbers */}
        <div
          ref={numbersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {/* Days */}
          <div className="countdown-item">
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-lg">
              <div className="text-white text-5xl md:text-6xl lg:text-7xl font-serif tabular-nums">
                {countdown.days}
              </div>
              <div className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mt-4">
                DAYS
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="countdown-item">
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-lg">
              <div className="text-white text-5xl md:text-6xl lg:text-7xl font-serif tabular-nums">
                {countdown.hours}
              </div>
              <div className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mt-4">
                HOURS
              </div>
            </div>
          </div>

          {/* Minutes */}
          <div className="countdown-item">
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-lg">
              <div className="text-white text-5xl md:text-6xl lg:text-7xl font-serif tabular-nums">
                {countdown.minutes}
              </div>
              <div className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mt-4">
                MINUTES
              </div>
            </div>
          </div>

          {/* Seconds */}
          <div className="countdown-item">
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-lg">
              <div className="text-white text-5xl md:text-6xl lg:text-7xl font-serif tabular-nums">
                {countdown.seconds}
              </div>
              <div className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mt-4">
                SECONDS
              </div>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/20" />
          <div className="text-white/30 text-lg">♥</div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </div>
    </section>
  );
}
