import { useState, useEffect, useRef, useCallback } from 'react';

export function useMusic(musicUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance only once
    if (!audioRef.current && musicUrl) {
      console.log('🎵 Creating audio instance with URL:', musicUrl);
      const audio = new Audio(musicUrl);
      audio.volume = 1; // Maximum volume as per requirements
      audio.loop = true;
      audio.preload = 'auto';

      audio.addEventListener('canplaythrough', () => {
        console.log('✅ Audio ready to play');
        setIsReady(true);
      });

      audio.addEventListener('error', (e) => {
        console.error('❌ Audio error:', e);
        console.error('Audio src:', audio.src);
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
    if (!audioRef.current) {
      console.error('❌ Audio ref not available');
      return;
    }
    
    if (!isReady) {
      console.warn('⚠️ Audio not ready yet');
      return;
    }

    try {
      console.log('🎵 Attempting to play audio...');
      await audioRef.current.play();
      console.log('✅ Audio playing successfully');
      setIsPlaying(true);
    } catch (error) {
      console.error('❌ Error playing audio:', error);
    }
  }, [isReady]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;

    console.log('⏸️ Pausing audio');
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
