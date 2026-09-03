import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  onLoad?: () => void;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholderClassName = '',
  onLoad 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {/* Placeholder with blur effect */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse ${placeholderClassName}`}
        />
      )}
      
      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
    </div>
  );
}
