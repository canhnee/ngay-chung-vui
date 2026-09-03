import { useState, useEffect, useRef, useCallback } from 'react';

export function useMusic(musicUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance only once
    if (!audioRef.current && musicUrl) {
      const audio = new Audio(musicUrl);
      audio.volume = 1; // Maximum volume as per requirements
      audio.loop = true;
      audio.preload = 'auto';

      audio.addEventListener('canplaythrough', () => {
        setIsReady(true);
      });

      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsReady(false);
      });

      audioRef.current = audio;
    }

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [musicUrl]);

  const play = useCallback(async () => {
    if (!audioRef.current || !isReady) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, [isReady]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    play,
    pause,
    toggle,
    isPlaying,
    isReady,
  };
}
